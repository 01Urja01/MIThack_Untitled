import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';
import { Payment } from './use-user-claims';

export interface PaymentsResponse {
  success: boolean;
  count: number;
  payments: Payment[];
}

export function useUserPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<PaymentsResponse>('insurance/user/payments');
        
        if (response.success) {
          setPayments(response.payments);
        } else {
          setError('Failed to fetch payments');
        }
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('An error occurred while fetching payments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return {
    payments,
    isLoading,
    error
  };
} 