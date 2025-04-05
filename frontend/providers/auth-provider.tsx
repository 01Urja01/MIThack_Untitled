"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserResponse, getCurrentUser, isAuthenticated, logout } from "@/lib/auth";

interface AuthContextType {
  user: UserResponse | null;
  isLoggedIn: boolean;
  loading: boolean;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  loading: true,
  logoutUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // On initial load, check if user is authenticated
    const checkAuth = () => {
      const loggedIn = isAuthenticated();
      if (loggedIn) {
        // Get user data from session storage
        const userData = getCurrentUser();
        setUser(userData);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Handle protected routes
  useEffect(() => {
    if (!loading) {
      const isLoggedIn = isAuthenticated();
      const isAuthPage = pathname?.includes('/auth/');
      
      // Redirect to login if trying to access protected route while not logged in
      if (!isLoggedIn && !isAuthPage && pathname !== '/') {
        router.push('/auth/login');
      }
      
      // Redirect to dashboard if already logged in and trying to access auth pages
      if (isLoggedIn && isAuthPage) {
        const userRole = user?.role;
        if (userRole === 'customer') {
          router.push('/dashboard/user');
        } else if (userRole === 'insurer') {
          router.push('/dashboard/provider');
        }
      }
    }
  }, [loading, pathname, router, user]);

  const logoutUser = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
} 