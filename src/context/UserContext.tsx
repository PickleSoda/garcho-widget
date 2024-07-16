import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axiosInstance from '../utils/axios';
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
  }
}

interface SessionResponse {
  data: {

    message: string;
    session_id: number;
  }
}

interface UserContextType {
  user: User | null;
  createUser: (data: Partial<User>) => void;
  updateUser: (data: Partial<User>) => void;
  createSession: (userId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUserFromCookies());

  const createUserMutation: UseMutationResult<UserResponse, Error, Partial<User>> = useMutation(
    {
      mutationFn: (data: Partial<User>) => axiosInstance.post('/users/create', data)
    }
  );

  const updateUserMutation: UseMutationResult<UserResponse, Error, Partial<User>> = useMutation({
    mutationFn: (data: Partial<User>) => axiosInstance.put(`/users/update/${user?.user_id}`, data)
  }
  );

  const createSessionMutation: UseMutationResult<SessionResponse, Error, string> = useMutation({
    mutationFn: (userId: string) => axiosInstance.post('/sessions/create', { user_id: userId })

  }
  );

  useEffect(() => {
    if (user) {
      setUserToCookies(user);
    }
  }, [user]);

  const createUser = (data: Partial<User>) => {
    createUserMutation.mutate(data, {
      onSuccess: (response) => {
        setUser(response.data.user);
      }
    });
  };

  const updateUser = (data: Partial<User>) => {
    updateUserMutation.mutate(data, {
      onSuccess: (response) => {
        setUser(response.data.user);
      }
    });
  };

  const createSession = (userId: string) => {
    createSessionMutation.mutate(userId, {
      onSuccess: (response) => {
        console.log('Session created:', response.data.session_id);
      }
    });
  };

  return (
    <UserContext.Provider value={{ user, createUser, updateUser, createSession }}>
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
