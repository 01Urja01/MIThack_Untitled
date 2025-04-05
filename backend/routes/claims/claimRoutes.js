const express = require('express');
const router = express.Router();
const claimController = require('../../controllers/claims/claimController');
const { validateToken } = require('../../middlewares/authMiddleware');

// Claims routes
router.get('/pending-claims', validateToken, claimController.getPendingClaims);
router.get('/claim/:claimId', validateToken, claimController.getClaimDetails);
router.post('/claim', validateToken, claimController.createClaim);
router.post('/claim/:claimId/verify', validateToken, claimController.verifyClaim);
router.post('/claim/:claimId/process', validateToken, claimController.processClaim);

module.exports = router; 