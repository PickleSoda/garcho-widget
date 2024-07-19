// src/hooks/useChatMessages.ts

import { useEffect, useCallback } from 'react';
import { addResponseMessage, toggleInputDisabled, toggleMsgLoader, dropMessages, markAllAsRead } from '@picklesoda/react-chat-widget';
import axiosInstance from '../../../lib/axios';
import { useChatSession } from '../context/ChatSessionContext';

const useChatMessages = (agent_id: string | null) => {

  const { session, addMessageToSession, loadSessionMessages } = useChatSession();


  useEffect(() => {
    if (session) {
      loadSessionMessages();
    }
    else
    {
      dropMessages();
      markAllAsRead();
      addResponseMessage("Welcome to Garcho! \n Let me know how if you need help with anything.");
    }
  }, [session, loadSessionMessages]);

  const handleNewUserMessage = useCallback(
    async (newMessage: string) => {
      console.log(`New message incoming! ${newMessage}`);
      toggleInputDisabled();
      toggleMsgLoader();

      addMessageToSession({ sender: 'user', message: newMessage });

      const data = {
        agent_id: agent_id,
        session_id: session,
        message: newMessage,
      };

      try {
        const response = await axiosInstance.post('/chats/message', data);
        if (response.data && response.data.response) {
          addResponseMessage(response.data.response);
          addMessageToSession({ sender: 'bot', message: response.data.response });
        } else {
          addResponseMessage('Sorry, I did not understand that.');
          addMessageToSession({ sender: 'bot', message: 'Sorry, I did not understand that.' });
        }
      } catch (error) {
        console.error('Error sending message:', error);
        addResponseMessage('There was an error sending your message.');
        addMessageToSession({ sender: 'bot', message: 'There was an error sending your message.' });
      } finally {
        toggleInputDisabled();
        toggleMsgLoader();
      }
    },
    [agent_id, session, addMessageToSession]
  );

  return {
    handleNewUserMessage,
  };
};

export default useChatMessages;
