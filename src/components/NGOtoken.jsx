import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';

export default function NGOToken() {
  const { user, token, isAuthenticated } = useAuthStore();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      if (user && user.role === 'ngo') {
        setMessage(`NGO authenticated. Token: ${token.slice(0, 10)}...`);
      } else {
        setMessage('Authenticated, but not as an NGO');
      }
    } else {
      setMessage('Not authenticated');
    }
  }, [user, token, isAuthenticated]);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-2">NGO Authentication Status</h2>
      <p className="text-gray-700">{message}</p>
      {user && user.role === 'ngo' && (
        <div className="mt-4">
          <h3 className="text-md font-semibold">NGO Details:</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}