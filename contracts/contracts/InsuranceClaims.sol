// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsuranceClaims {
    address public owner;
    address public insurer;
    uint256 public nextPolicyNumber;
    uint256 public nextClaimId;
    uint256 public nextRecordId;

    struct PolicyTerms {
        uint256 maxCoveragePerClaim;
        uint256 copayPercentage;
        string[] coveredTreatments;
        string[] excludedTreatments;
        uint256 waitingPeriod;
        uint256 maxClaimsPerYear;
        bool preExistingConditionsCovered;
        uint256 maxHospitalizationDays;
        uint256 maxRoomRent;
        uint256 maxICUCharges;
        uint256 maxOperationCharges;
        uint256 maxMedicineCharges;
        uint256 maxDiagnosticCharges;
        uint256 maxAmbulanceCharges;
        uint256 maxPreHospitalizationDays;
        uint256 maxPostHospitalizationDays;
        // Travel-specific fields
        uint256 delayTimeMinutes;
        bool cancellationStatus;
        uint256 travelTimeHours;
    }

    struct Policy {
        address policyholder;
        uint256 coverageAmount;
        uint256 startDate;
        uint256 endDate;
        string policyType;
        bool isActive;
        PolicyTerms terms;
        uint256 claimsCount;
    }

    struct Claim {
        uint256 policyNumber;
        address policyholder;
        uint256 amount;
        string treatmentType;
        uint256 timestamp;
        bool isVerified;
        bool isPaid;
        uint256 paidAmount;
        // Health claim specific fields
        string aabhaId;
        uint256 patientAdmissionDate;
        // Travel claim specific fields
        uint256 flightId;
        bool flightCancellationStatus;
        uint256 flightDelayMinutes;
        uint256 flightDurationMinutes;
    }

    mapping(uint256 => Policy) public policies;
    mapping(uint256 => Claim) public claims;
    mapping(uint256 => uint256[]) public policyClaims;
    mapping(uint256 => uint256) public claimsCountPerYear;

    event PolicyCreated(uint256 indexed policyNumber, address indexed policyholder, uint256 coverageAmount, uint256 startDate, uint256 endDate, string policyType);
    event ClaimSubmitted(uint256 indexed claimId, uint256 indexed policyNumber, address indexed claimant, uint256 amount, string treatmentType);
    event ClaimVerified(uint256 indexed claimId);
    event ClaimProcessed(uint256 indexed claimId, uint256 indexed policyNumber, address indexed claimant, uint256 paidAmount);

    constructor() {
        owner = msg.sender;
        nextPolicyNumber = 1;
        nextClaimId = 1;
        nextRecordId = 1;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyInsurer() {
        require(msg.sender == insurer, "Only insurer can call this function");
        _;
    }

    modifier policyExists(uint256 _policyNumber) {
        require(policies[_policyNumber].policyholder != address(0), "Policy does not exist");
        _;
    }

    modifier claimExists(uint256 _claimId) {
        require(claims[_claimId].timestamp != 0, "Claim does not exist");
        _;
    }

    function setInsurer(address _insurer) public onlyOwner {
        insurer = _insurer;
    }

    function createPolicy(
        address _policyholder,
        uint256 _coverageAmount,
        uint256 _startDate,
        uint256 _endDate,
        string memory _policyType,
        uint256 _maxCoveragePerClaim,
        uint256 _copayPercentage,
        string[] memory _coveredTreatments,
        string[] memory _excludedTreatments,
        uint256 _waitingPeriod,
        uint256 _maxClaimsPerYear,
        bool _preExistingConditionsCovered,
        uint256 _maxHospitalizationDays,
        uint256 _maxRoomRent,
        uint256 _maxICUCharges,
        uint256 _maxOperationCharges,
        uint256 _maxMedicineCharges,
        uint256 _maxDiagnosticCharges,
        uint256 _maxAmbulanceCharges,
        uint256 _maxPreHospitalizationDays,
        uint256 _maxPostHospitalizationDays,
        uint256 _delayTimeMinutes,
        bool _cancellationStatus,
        uint256 _travelTimeHours
    ) external onlyInsurer {
        require(_policyholder != address(0), "Invalid policyholder address");
        require(_coverageAmount > 0, "Coverage amount must be greater than zero");
        require(_startDate > 0, "Invalid start date");
        require(_endDate > _startDate, "End date must be after start date");
        require(_maxCoveragePerClaim <= _coverageAmount, "Max coverage per claim cannot exceed total coverage");
        require(_copayPercentage <= 100, "Copay percentage cannot exceed 100");
        require(_waitingPeriod <= 90, "Waiting period cannot exceed 90 days");
        require(_maxClaimsPerYear > 0 && _maxClaimsPerYear <= 10, "Max claims per year must be between 1 and 10");
        require(_maxHospitalizationDays <= 365, "Max hospitalization days cannot exceed 365");
        require(_maxPreHospitalizationDays <= 30, "Max pre-hospitalization days cannot exceed 30");
        require(_maxPostHospitalizationDays <= 60, "Max post-hospitalization days cannot exceed 60");
        require(_delayTimeMinutes <= 480, "Delay time cannot exceed 8 hours");
        require(_travelTimeHours <= 48, "Travel time cannot exceed 48 hours");

        // Validate policy type
        require(
            keccak256(bytes(_policyType)) == keccak256(bytes("HEALTH")) ||
            keccak256(bytes(_policyType)) == keccak256(bytes("TRAVEL")),
            "Invalid policy type"
        );

        uint256 policyNumber = nextPolicyNumber++;
        Policy storage policy = policies[policyNumber];
        policy.policyholder = _policyholder;
        policy.coverageAmount = _coverageAmount;
        policy.startDate = _startDate;
        policy.endDate = _endDate;
        policy.policyType = _policyType;
        policy.terms.maxCoveragePerClaim = _maxCoveragePerClaim;
        policy.terms.copayPercentage = _copayPercentage;
        policy.terms.coveredTreatments = _coveredTreatments;
        policy.terms.excludedTreatments = _excludedTreatments;
        policy.terms.waitingPeriod = _waitingPeriod;
        policy.terms.maxClaimsPerYear = _maxClaimsPerYear;
        policy.terms.preExistingConditionsCovered = _preExistingConditionsCovered;
        policy.terms.maxHospitalizationDays = _maxHospitalizationDays;
        policy.terms.maxRoomRent = _maxRoomRent;
        policy.terms.maxICUCharges = _maxICUCharges;
        policy.terms.maxOperationCharges = _maxOperationCharges;
        policy.terms.maxMedicineCharges = _maxMedicineCharges;
        policy.terms.maxDiagnosticCharges = _maxDiagnosticCharges;
        policy.terms.maxAmbulanceCharges = _maxAmbulanceCharges;
        policy.terms.maxPreHospitalizationDays = _maxPreHospitalizationDays;
        policy.terms.maxPostHospitalizationDays = _maxPostHospitalizationDays;
        policy.terms.delayTimeMinutes = _delayTimeMinutes;
        policy.terms.cancellationStatus = _cancellationStatus;
        policy.terms.travelTimeHours = _travelTimeHours;
        policy.isActive = true;
        policy.claimsCount = 0;

        emit PolicyCreated(
            policyNumber,
            _policyholder,
            _coverageAmount,
            _startDate,
            _endDate,
            _policyType
        );
    }

    function submitClaim(
        uint256 _policyNumber,
        uint256 _amount,
        string memory _treatmentType,
        string memory _aabhaId,
        uint256 _patientAdmissionDate,
        uint256 _flightId,
        bool _flightCancellationStatus,
        uint256 _flightDelayMinutes,
        uint256 _flightDurationMinutes
    ) external {
        Policy storage policy = policies[_policyNumber];
        require(policy.policyholder == msg.sender, "Only policyholder can submit claims");
        require(policy.isActive, "Policy is not active");
        require(block.timestamp >= policy.startDate + (policy.terms.waitingPeriod * 1 days), "Waiting period not over");
        require(block.timestamp <= policy.endDate, "Policy expired");
        require(_amount > 0, "Claim amount must be greater than zero");
        require(_amount <= policy.terms.maxCoveragePerClaim, "Claim amount exceeds maximum coverage per claim");
        require(policy.claimsCount < policy.terms.maxClaimsPerYear, "Maximum claims per year reached");

        // Validate treatment type based on policy type
        if (keccak256(bytes(policy.policyType)) == keccak256(bytes("HEALTH"))) {
            require(bytes(_aabhaId).length > 0, "Health claim must include AABHA ID");
            require(_patientAdmissionDate > 0, "Health claim must include admission date");
            require(_flightId == 0, "Health claim should not include flight details");
            require(!_flightCancellationStatus, "Health claim should not include flight cancellation");
            require(_flightDelayMinutes == 0, "Health claim should not include flight delay");
            require(_flightDurationMinutes == 0, "Health claim should not include flight duration");

            // First check if treatment is excluded
            for (uint256 i = 0; i < policy.terms.excludedTreatments.length; i++) {
                if (keccak256(bytes(policy.terms.excludedTreatments[i])) == keccak256(bytes(_treatmentType))) {
                    revert("Treatment excluded by policy");
                }
            }

            // Then check if treatment is covered
            bool isTreatmentCovered = false;
            for (uint256 i = 0; i < policy.terms.coveredTreatments.length; i++) {
                if (keccak256(bytes(policy.terms.coveredTreatments[i])) == keccak256(bytes(_treatmentType))) {
                    isTreatmentCovered = true;
                    break;
                }
            }
            require(isTreatmentCovered, "Treatment not covered by policy");

        } else if (keccak256(bytes(policy.policyType)) == keccak256(bytes("TRAVEL"))) {
            require(bytes(_aabhaId).length == 0, "Travel claim should not include AABHA ID");
            require(_patientAdmissionDate == 0, "Travel claim should not include admission date");
            require(_flightId > 0, "Travel claim must include flight ID");
            require(_flightDelayMinutes <= policy.terms.delayTimeMinutes, "Flight delay exceeds policy limit");
            require(_flightDurationMinutes <= (policy.terms.travelTimeHours * 60), "Flight duration exceeds policy limit");
            require(
                keccak256(bytes(_treatmentType)) == keccak256(bytes("DELAY")) ||
                keccak256(bytes(_treatmentType)) == keccak256(bytes("CANCELLATION")),
                "Invalid travel claim type"
            );
        }

        uint256 claimId = nextClaimId++;
        Claim storage claim = claims[claimId];
        claim.policyNumber = _policyNumber;
        claim.policyholder = msg.sender;
        claim.amount = _amount;
        claim.treatmentType = _treatmentType;
        claim.aabhaId = _aabhaId;
        claim.patientAdmissionDate = _patientAdmissionDate;
        claim.flightId = _flightId;
        claim.flightCancellationStatus = _flightCancellationStatus;
        claim.flightDelayMinutes = _flightDelayMinutes;
        claim.flightDurationMinutes = _flightDurationMinutes;
        claim.isVerified = false;
        claim.isPaid = false;
        claim.paidAmount = 0;
        claim.timestamp = block.timestamp;

        policy.claimsCount++;

        policyClaims[_policyNumber].push(claimId);
        claimsCountPerYear[_policyNumber]++;
        emit ClaimSubmitted(
            claimId,
            _policyNumber,
            msg.sender,
            _amount,
            _treatmentType
        );
    }

    function verifyClaim(uint256 _claimId) public claimExists(_claimId) {
        Claim storage claim = claims[_claimId];
        Policy storage policy = policies[claim.policyNumber];
        
        // Additional verification based on policy type
        if (keccak256(bytes(policy.policyType)) == keccak256(bytes("HEALTH"))) {
            require(bytes(claim.aabhaId).length > 0, "Missing AABHA ID");
            require(claim.patientAdmissionDate > 0, "Missing admission date");
        } else {
            require(claim.flightId > 0, "Missing flight ID");
            require(claim.flightDelayMinutes <= policy.terms.delayTimeMinutes, "Flight delay exceeds policy limit");
            require(claim.flightDurationMinutes <= policy.terms.travelTimeHours * 60, "Flight duration exceeds policy limit");
            require(claim.flightCancellationStatus == policy.terms.cancellationStatus, "Flight cancellation status mismatch");
        }

        claim.isVerified = true;
        emit ClaimVerified(_claimId);
    }

    function processClaim(uint256 _claimId) external {
        Claim storage claim = claims[_claimId];
        require(claim.isVerified, "Claim not verified");
        require(!claim.isPaid, "Claim already paid");

        Policy storage policy = policies[claim.policyNumber];

        uint256 copayAmount = (claim.amount * policy.terms.copayPercentage) / 100;
        uint256 payableAmount = claim.amount - copayAmount;

        claim.isPaid = true;
        claim.paidAmount = payableAmount;

        emit ClaimProcessed(
            _claimId,
            claim.policyNumber,
            claim.policyholder,
            payableAmount
        );
    }

    function getPolicy(uint256 _policyNumber) public view returns (
        address policyholder,
        uint256 coverageAmount,
        uint256 startDate,
        uint256 endDate,
        string memory policyType,
        bool isActive
    ) {
        Policy storage policy = policies[_policyNumber];
        require(policy.policyholder != address(0), "Policy does not exist");
        return (
            policy.policyholder,
            policy.coverageAmount,
            policy.startDate,
            policy.endDate,
            policy.policyType,
            policy.isActive
        );
    }

    function getClaim(uint256 _claimId) public view claimExists(_claimId) returns (
        uint256 policyNumber,
        address policyholder,
        uint256 amount,
        string memory treatmentType,
        uint256 timestamp,
        bool isVerified,
        bool isPaid,
        uint256 paidAmount,
        string memory aabhaId,
        uint256 patientAdmissionDate,
        uint256 flightId,
        bool flightCancellationStatus,
        uint256 flightDelayMinutes,
        uint256 flightDurationMinutes
    ) {
        Claim storage claim = claims[_claimId];
        return (
            claim.policyNumber,
            claim.policyholder,
            claim.amount,
            claim.treatmentType,
            claim.timestamp,
            claim.isVerified,
            claim.isPaid,
            claim.paidAmount,
            claim.aabhaId,
            claim.patientAdmissionDate,
            claim.flightId,
            claim.flightCancellationStatus,
            claim.flightDelayMinutes,
            claim.flightDurationMinutes
        );
    }
} 