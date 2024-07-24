import React, { createContext, useContext, useState } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axiosInstance from '../../../lib/axios';
import { getUserFromCookies, setUserToCookies } from '../utils/cookies';

interface User {
  user_id: string;
  status: string;
  total_deposits: number;
  session_count: number;
  last_login: string;
}

interface UserResponse {
  data: {
    message: string;
    user: User;
  };
}

interface UserContextType {
  user: User | null;
  createUser: (data: Partial<User>) => number|void;
  updateUser: (data: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUserFromCookies());

  const createUserMutation: UseMutationResult<UserResponse, Error, Partial<User>> = useMutation({
    mutationFn: (data: Partial<User>) => axiosInstance.post('/users/create', data),
    onSuccess: (response) => {
      setUser(response.data.user);
      setUserToCookies(response.data.user);
    },
    onError: (error) => {
      console.error('Error creating user:', error);
    },
  });

  const updateUserMutation: UseMutationResult<UserResponse, Error, Partial<User>> = useMutation({
    mutationFn: (data: Partial<User>) => axiosInstance.put(`/users/update/${user?.user_id}`, data),
    onSuccess: (response) => {
      setUser(response.data.user);
    },
    onError: (error) => {
      console.error('Error updating user:', error);
    },
  });

  const createUser = (data: Partial<User>) => {
    return createUserMutation.mutate(data);

  };

  const updateUser = (data: Partial<User>) => {
    updateUserMutation.mutate(data);
  };

  return (
    <UserContext.Provider value={{ user, createUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
