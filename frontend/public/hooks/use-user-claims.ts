import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';

export interface Payment {
  transaction_id: number;
  claim_id: number;
  amount: string;
  transaction_hash: string;
  timestamp: string;
  upi_reference: string | null;
  status: string;
  transaction_type: string;
  notes: string;
  policy_number?: number;
  claim_type?: string;
  company?: string;
}

export interface AabhaRecord {
  aabha_id: string;
  patient_name: string;
  treatment: string;
  diagnosis: string;
  hospital_name: string;
  doctor_name: string;
  patient_admission_date: string;
  patient_discharge_date: string;
  bill_amount: string;
  created_at: string;
}

export interface FlightData {
  flight_id: number;
  flight_number: string;
  cancellation_status: boolean;
  delay_time_minutes: number;
  flight_from: string;
  flight_to: string;
  flight_company: string;
  flight_duration_minutes: number;
  scheduled_departure: string;
  actual_departure: string;
  created_at: string;
}

export interface Claim {
  claim_id: number;
  user_id: number;
  policy_number: number;
  policy_id: string;
  filing_date: string;
  claim_amount: string;
  approved_amount: string | null;
  claim_status: string;
  claim_type: string;
  incident_description: string;
  bill_start_date: string;
  bill_end_date: string;
  aabha_id: string | null;
  flight_id: number | null;
  processing_notes: string | null;
  decision_timestamp: string | null;
  company: string;
  policy_type: string;
  policyholder_name: string;
}

export interface ClaimDetail extends Claim {
  created_at?: string;
  updated_at?: string;
  coverage?: string;
}

export interface ClaimDetailResponse {
  success: boolean;
  claim: ClaimDetail;
  payments: Payment[];
  aabhaRecord: AabhaRecord | null;
  flightData: FlightData | null;
}

export interface ClaimsResponse {
  success: boolean;
  count: number;
  claims: Claim[];
}

export function useUserClaims() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<ClaimsResponse>('insurance/claims');
        
        if (response.success) {
          setClaims(response.claims);
        } else {
          setError('Failed to fetch claims');
        }
      } catch (err) {
        console.error('Error fetching claims:', err);
        setError('An error occurred while fetching claims');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const fetchClaimDetails = async (claimId: number) => {
    try {
      const response = await apiClient.get<ClaimDetailResponse>(`insurance/claim/${claimId}`);
      return response;
    } catch (err) {
      console.error('Error fetching claim details:', err);
      throw err;
    }
  };

  return {
    claims,
    isLoading,
    error,
    fetchClaimDetails
  };
} 