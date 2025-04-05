const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const VALID_ROLES = ['customer', 'admin', 'insurer', 'agent'];

const login = async (req, res) => {
    const client = await pool.connect();
    try {
        const { email, password } = req.body;
        
        const result = await client.query(
            'SELECT user_id, full_name, email, password, role FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { 
                userId: user.user_id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                userId: user.user_id,
                fullName: user.full_name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Error during login' });
    } finally {
        client.release();
    }
};

const register = async (req, res) => {
    const client = await pool.connect();
    try {
        const { 
            fullName, email, phone, password, address, upi_id, role = 'customer',
            // Additional insurer fields
            company_name, registration_number, company_type, designation
        } = req.body;
        
        // Validate role
        if (!VALID_ROLES.includes(role)) {
            return res.status(400).json({ 
                error: 'Invalid role',
                message: `Role must be one of: ${VALID_ROLES.join(', ')}`
            });
        }

        // Validate UPI ID format (basic validation)
        if (upi_id && !upi_id.includes('@')) {
            return res.status(400).json({
                error: 'Invalid UPI ID',
                message: 'UPI ID must be in the format username@provider'
            });
        }

        // Validate insurer specific fields
        if (role === 'insurer') {
            if (!company_name || !registration_number || !company_type || !designation) {
                return res.status(400).json({
                    error: 'Missing insurer details',
                    message: 'Company name, registration number, company type, and designation are required for insurers'
                });
            }

            // Validate company type
            if (!['health_insurance', 'travel_insurance'].includes(company_type)) {
                return res.status(400).json({
                    error: 'Invalid company type',
                    message: 'Company type must be either health_insurance or travel_insurance'
                });
            }
        }

        // Check if user already exists
        const existingUser = await client.query(
            'SELECT user_id FROM users WHERE email = $1 OR phone = $2',
            [email, phone]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with additional fields for insurers
        const result = await client.query(
            `INSERT INTO users (
                full_name, email, phone, role, upi_id, password, address,
                company_name, registration_number, company_type, designation
             )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
             RETURNING user_id, full_name, email, role, upi_id, company_name, company_type`,
            [
                fullName, email, phone, role, upi_id, hashedPassword, address,
                role === 'insurer' ? company_name : null,
                role === 'insurer' ? registration_number : null,
                role === 'insurer' ? company_type : null,
                role === 'insurer' ? designation : null
            ]
        );

        // Add audit log
        await client.query(
            `INSERT INTO audit_log (entity_type, entity_id, action, user_id, details)
             VALUES ($1, $2, $3, $4, $5)`,
            [
                'users', 
                result.rows[0].user_id, 
                'REGISTER', 
                result.rows[0].user_id, 
                `User registered with role: ${role}${role === 'insurer' ? `, company: ${company_name}` : ''}`
            ]
        );

        const user = result.rows[0];
        const token = jwt.sign(
            { 
                userId: user.user_id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                userId: user.user_id,
                fullName: user.full_name,
                email: user.email,
                role: user.role,
                upi_id: user.upi_id,
                ...(role === 'insurer' && {
                    company_name: user.company_name,
                    company_type: user.company_type
                })
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Error during registration' });
    } finally {
        client.release();
    }
};

const getProfile = async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT user_id, full_name, email, phone, role, upi_id, address,
                    company_name, registration_number, company_type, designation 
             FROM users WHERE user_id = $1`,
            [req.user.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = result.rows[0];
        res.json({
            user: {
                ...user,
                // Only include insurer fields if the user is an insurer
                ...(user.role !== 'insurer' && {
                    company_name: undefined,
                    registration_number: undefined,
                    company_type: undefined,
                    designation: undefined
                })
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Error fetching profile' });
    } finally {
        client.release();
    }
};

const updateProfile = async (req, res) => {
    const client = await pool.connect();
    try {
        const { 
            fullName, phone, address, upi_id,
            company_name, registration_number, company_type, designation 
        } = req.body;

        // Get current user data
        const currentUser = await client.query(
            'SELECT role FROM users WHERE user_id = $1',
            [req.user.userId]
        );

        if (currentUser.rows[0].role === 'insurer') {
            // Validate company type if it's being updated
            if (company_type && !['health_insurance', 'travel_insurance'].includes(company_type)) {
                return res.status(400).json({
                    error: 'Invalid company type',
                    message: 'Company type must be either health_insurance or travel_insurance'
                });
            }
        }
        
        const result = await client.query(
            `UPDATE users 
             SET full_name = $1, phone = $2, address = $3, upi_id = $4,
                 company_name = CASE WHEN role = 'insurer' THEN $5 ELSE company_name END,
                 registration_number = CASE WHEN role = 'insurer' THEN $6 ELSE registration_number END,
                 company_type = CASE WHEN role = 'insurer' THEN $7 ELSE company_type END,
                 designation = CASE WHEN role = 'insurer' THEN $8 ELSE designation END
             WHERE user_id = $9
             RETURNING user_id, full_name, email, phone, role, upi_id, address,
                       company_name, registration_number, company_type, designation`,
            [
                fullName, phone, address, upi_id,
                company_name, registration_number, company_type, designation,
                req.user.userId
            ]
        );

        const user = result.rows[0];
        res.json({
            user: {
                ...user,
                // Only include insurer fields if the user is an insurer
                ...(user.role !== 'insurer' && {
                    company_name: undefined,
                    registration_number: undefined,
                    company_type: undefined,
                    designation: undefined
                })
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Error updating profile' });
    } finally {
        client.release();
    }
};

module.exports = {
    login,
    register,
    getProfile,
    updateProfile
}; 