import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axiosInstance from '../../../utils/axios';
import { getUserFromCookies, setUserToCookies } from '../utils/cookies';
import { addResponseMessage, addUserMessage,markAllAsRead } from '@ryaneewx/react-chat-widget';

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

interface SessionResponse {
  data: {
    message: string;
    session_id: number;
  };
}

interface Message {
  sender: 'user' | 'bot';
  message: string;
}

interface UserContextType {
  user: User | null;
  session: number | null;
  createUser: (data: Partial<User>) => void;
  updateUser: (data: Partial<User>) => void;
  createSession: (userId: string) => void;
  initializeSession: () => void;
  addMessageToSession: (message: Message) => void;
  loadSessionMessages: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUserFromCookies());
  const [session, setSession] = useState<number | null>(null);

  const createUserMutation: UseMutationResult<UserResponse, Error, Partial<User>> = useMutation({
    mutationFn: (data: Partial<User>) => axiosInstance.post('/users/create', data),
  });

  const updateUserMutation: UseMutationResult<UserResponse, Error, Partial<User>> = useMutation({
    mutationFn: (data: Partial<User>) => axiosInstance.put(`/users/update/${user?.user_id}`, data),
  });

  const createSessionMutation: UseMutationResult<SessionResponse, Error, string> = useMutation({
    mutationFn: (userId: string) => axiosInstance.post('/sessions/create', { user_id: userId }),
  });

  useEffect(() => {
    if (user) {
      setUserToCookies(user);
    }
  }, [user]);

  const createUser = (data: Partial<User>) => {
    createUserMutation.mutate(data, {
      onSuccess: (response) => {
        setUser(response.data.user);
      },
      onError: (error) => {
        console.error('Error creating user:', error);
      },
    });
  };

  const updateUser = (data: Partial<User>) => {
    updateUserMutation.mutate(data, {
      onSuccess: (response) => {
        setUser(response.data.user);
      },
      onError: (error) => {
        console.error('Error updating user:', error);
      },
    });
  };

  const createSession = (userId: string) => {
    createSessionMutation.mutate(userId, {
      onSuccess: (response) => {
        setSession(response.data.session_id);
        window.sessionStorage.setItem('chat_session', String(response.data.session_id));
        window.sessionStorage.setItem('chat_messages', JSON.stringify([]));
        console.log('Session created:', response.data.session_id);
      },
      onError: (error) => {
        console.error('Error creating session:', error);
      },
    });
  };

  const initializeSession = () => {
    const storedSession = window.sessionStorage.getItem('chat_session');
    if (storedSession) {
      setSession(Number(storedSession));
    } else if (user) {
      createSession(user.user_id);
    }
  };

  const addMessageToSession = (message: Message) => {
    const messages = JSON.parse(window.sessionStorage.getItem('chat_messages') || '[]');
    messages.push(message);
    window.sessionStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadSessionMessages = () => {
    const messages = JSON.parse(window.sessionStorage.getItem('chat_messages') || '[]');
    messages.forEach((msg: Message) => {
      if (msg.sender === 'bot') {
        addResponseMessage(msg.message);
      } else {
        addUserMessage(msg.message);
      }
    });
    markAllAsRead();
  };

  return (
    <UserContext.Provider value={{ user, session, createUser, updateUser, createSession, initializeSession, addMessageToSession, loadSessionMessages }}>
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
