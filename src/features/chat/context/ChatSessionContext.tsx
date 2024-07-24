// src/features/chat/context/ChatSessionContext.tsx

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axiosInstance from '../../../lib/axios';
import { addResponseMessage, addUserMessage, markAllAsRead } from '@picklesoda/react-chat-widget';

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

interface ChatSessionContextType {
    session: number | null;
    createSession: (userId: string) => void;
    initializeSession: (userId: string) => void;
    addMessageToSession: (message: Message) => void;
    loadSessionMessages: () => void;
    loadFirstMessage: (message: string) => void;
}

const ChatSessionContext = createContext<ChatSessionContextType | undefined>(undefined);

export const ChatSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [session, setSession] = useState<number | null>(null);

    const createSessionMutation: UseMutationResult<SessionResponse, Error, string> = useMutation({
        mutationFn: (userId: string) => axiosInstance.post('/sessions/create', { user_id: userId }),
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

    const initializeSession = useCallback((userId: string) => {
        const storedSession = window.sessionStorage.getItem('chat_session');
        if (storedSession) {
            setSession(Number(storedSession));
        } else {
            createSessionMutation.mutate(userId);
        }
    }, [createSessionMutation]);

    const addMessageToSession = useCallback((message: Message) => {
        const messages = JSON.parse(window.sessionStorage.getItem('chat_messages') || '[]');
        messages.push(message);
        window.sessionStorage.setItem('chat_messages', JSON.stringify(messages));
    }, []);

    const loadSessionMessages = useCallback(() => {
        const messages = JSON.parse(window.sessionStorage.getItem('chat_messages') || '[]');
        console.log('Loading session messages:', messages);
        messages.forEach((msg: Message) => {
            if (msg.sender === 'bot') {
                addResponseMessage(msg.message);
            } else {
                addUserMessage(msg.message);
            }
        });
        markAllAsRead();
    }, []);

    const loadFirstMessage = (message: string) => {
        const messages = JSON.parse(window.sessionStorage.getItem('chat_messages') || '[]');
        if (messages.length === 0) {
            addMessageToSession({ sender: 'bot', message });
            addResponseMessage(message);
            markAllAsRead()
        }
    };

    return (
        <ChatSessionContext.Provider value={{ session, createSession: createSessionMutation.mutate, initializeSession, addMessageToSession, loadSessionMessages, loadFirstMessage }}>
            {children}
        </ChatSessionContext.Provider>
    );
};

export const useChatSession = (): ChatSessionContextType => {
    const context = useContext(ChatSessionContext);
    if (!context) {
        throw new Error('useChatSession must be used within a ChatSessionProvider');
    }
    return context;
};
