import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const useUserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        if (!response.ok) throw new Error('User not found');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  return { user, loading, error };
};