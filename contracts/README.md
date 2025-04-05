# Insurance Claims Smart Contract

A decentralized insurance claims management system built on the Ethereum blockchain. This smart contract enables automated processing of insurance claims with predefined policy terms and conditions.

## Features

- Policy creation and management
- Automated claim submission and verification
- Treatment type validation
- Co-pay calculation
- Waiting period enforcement
- Policy expiration handling
- Health record management
- Comprehensive policy terms and conditions

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Hardhat
- Solidity (v0.8.0 or later)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd voldemort-algoforge
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
PRIVATE_KEY=your_private_key
ALCHEMY_API_KEY=your_alchemy_api_key
```

## Project Structure

```
voldemort-algoforge/
├── contracts/
│   └── InsuranceClaims.sol
├── test/
│   └── InsuranceClaims.test.js
├── scripts/
│   └── deploy.js
├── hardhat.config.js
└── README.md
```

## Smart Contract Overview

### Policy Structure

A policy in this system contains the following components:

1. **Basic Information**:
   - Policyholder address
   - Coverage amount
   - Start and end dates
   - Policy type (HEALTH/TRAVEL)
   - Active status

2. **Policy Terms**:
   - Maximum coverage per claim
   - Co-pay percentage
   - Covered treatments
   - Excluded treatments
   - Waiting period
   - Maximum claims per year
   - Pre-existing conditions coverage
   - Various hospitalization limits

### Key Functions

1. **Policy Management**:
   - `createPolicy`: Creates a new insurance policy
   - `setInsurer`: Sets the insurer address

2. **Claim Processing**:
   - `submitClaim`: Submits a new insurance claim
   - `verifyClaim`: Verifies a submitted claim
   - `processClaim`: Processes a verified claim

3. **Health Records**:
   - `addHealthRecord`: Adds a health record to a policy

4. **View Functions**:
   - `getPolicy`: Retrieves policy details
   - `getClaim`: Retrieves claim details

## Testing

Run the test suite:
```bash
npx hardhat test
```

## Deployment

1. Configure your network in `hardhat.config.js`

2. Deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

## Policy Conditions

### Creation Requirements
- Valid policyholder address
- Positive coverage amount
- Valid date range
- Valid policy type
- Valid co-pay percentage
- Reasonable coverage limits

### Claim Requirements
- Active policy
- Valid waiting period
- Valid treatment type
- Within coverage limits
- Not expired

### Processing Requirements
- Verified claim
- Unpaid status
- Valid co-pay calculation

## Security Features

- Access control modifiers
- Input validation
- State management
- Event logging
- Safe math operations

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenZeppelin Contracts
- Hardhat Development Environment
- Ethereum Community 