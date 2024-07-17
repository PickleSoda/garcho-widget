import { useEffect } from 'react';
import { useUser } from './features/auth/context/UserContext';
import Chat from './features/chat/Chat';
import { useChatSession } from './features/chat/context/ChatSessionContext';

function App({ domElement }: { domElement: HTMLElement | null }) {
  const { user, createUser} = useUser();
  const { initializeSession } = useChatSession();

  useEffect(() => {
    if (!user) {
      createUser({
        status: 'active',
        total_deposits: 0,
        session_count: 0,
        last_login: new Date().toISOString(),
      });
    } else {
      initializeSession(user.user_id);
    }
  }, [user]);


  return (
    <Chat
      domElement={domElement}
    />
  );
}

export default App;
