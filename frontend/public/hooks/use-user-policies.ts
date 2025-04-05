import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';

export interface Policy {
  subscription_id: number;
  policy_id: string;
  policy_number: number;
  start_date: string;
  end_date: string;
  status: string;
  type: string;
  coverage: string;
  company: string;
  insurance_expiry_date: string;
  max_claims_per_year: number;
}

export interface PoliciesResponse {
  success: boolean;
  count: number;
  policies: Policy[];
}

export function useUserPolicies() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<PoliciesResponse>('insurance/user/policies');
        
        if (response.success) {
          setPolicies(response.policies);
        } else {
          setError('Failed to fetch policies');
        }
      } catch (err) {
        console.error('Error fetching policies:', err);
        setError('An error occurred while fetching policies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  return {
    policies,
    isLoading,
    error
  };
} 