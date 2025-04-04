import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        '$1') || null;
      if (token) {
        setIsAuthenticated(true);
      } else {
        router.push('/login'); // Wait for navigation
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, loading };
};
