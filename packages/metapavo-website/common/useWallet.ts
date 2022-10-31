import React, { useState } from 'react';
import { users } from '../types';

export const WalletContext = React.createContext<{
  address: string;
  user: users;
  setAddress: (address: string) => void;
  setUser: (user: users) => void;
  logout: () => Promise<void>;
}>({} as any);

export default function useWallet() {
  const [address, setAddress] = useState('');
  const [user, setUser] = useState<users>();

  const logout = async () => {};

  return {
    address,
    user,
    setAddress,
    setUser,
    logout,
  };
}
