import { useEffect } from 'react';
import { addResponseMessage, toggleInputDisabled, toggleMsgLoader, addLinkSnippet } from '@ryaneewx/react-chat-widget';
import { useUser } from './features/auth/context/UserContext';
import Chat from './features/chat';
import axiosInstance from './utils/axios';

function App({ domElement }: { domElement: HTMLElement | null }) {
  const { user, session, createUser, updateUser, createSession, initializeSession } = useUser();

  useEffect(() => {
    if (!user) {
      createUser({
        status: 'active',
        total_deposits: 0,
        session_count: 0,
        last_login: new Date().toISOString(),
      });
    } else {
      initializeSession();
    }
    console.log(user);
  }, [user]);

  const handleNewUserMessage = async (newMessage: string) => {
    console.log(`New message incoming! ${newMessage}`);
    toggleInputDisabled();
    toggleMsgLoader();

    const data = {
      agent_id: 6,
      session_id: session, // Use the session from the context
      message: newMessage,
    };

    try {
      const response = await axiosInstance.post('/chats/message', data);
      if (response.data && response.data.response) {
        addResponseMessage(response.data.response);
      } else {
        addResponseMessage('Sorry, I did not understand that.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addResponseMessage('There was an error sending your message.');
    } finally {
      toggleInputDisabled();
      toggleMsgLoader();
    }
  };

  const handleQuickButtonClicked = (value: string) => console.log(value);

  return (
    <Chat
      handleNewUserMessage={handleNewUserMessage}
      handleQuickButtonClicked={handleQuickButtonClicked}
      domElement={domElement}
    />
  );
}

export default App;
