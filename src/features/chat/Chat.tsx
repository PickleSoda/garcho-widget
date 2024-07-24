import React, {  useRef } from 'react';
import { Widget } from '@picklesoda/react-chat-widget';
import { ChatConfig, defaultProps } from "./config";
import useChatMessages from './hooks/useChatMessages';
import useChatStyles from './hooks/useChatStyles';
import { useChatSession } from './context/ChatSessionContext';
import { useUser } from '../auth/context/UserContext';
import { toggleInputDisabled } from '@picklesoda/react-chat-widget';

interface ChatProps {
  domElement: HTMLElement | null;
}

function Chat({ domElement }: ChatProps) {
  const config = domElement?.getAttribute("data-garcho-conf");
  const agent_id = domElement?.getAttribute('data-agent-id');
  const message = domElement?.getAttribute('data-message') || 'Hello, how can I help you today?';

  const { user, createUser } = useUser();
  const { session, loadSessionMessages, initializeSession } = useChatSession();
  const { handleNewUserMessage } = useChatMessages(agent_id || null);

  const parsedConfig: ChatConfig = config ? JSON.parse(config) : defaultProps;
  useChatStyles(parsedConfig.styles);

  const hasLoadedMessages = useRef(false);

  const handleToggleLoader = (status: boolean) => {
    console.log('Toggling loader:', status);
    toggleInputDisabled();
    if (status) {
      if (!user) {
        createUser({
          status: 'active',
          total_deposits: 0,
          session_count: 0,
          last_login: new Date().toISOString(),
        }, (createdUserId) => {
          initializeSession(createdUserId);
        });
      } else {
        initializeSession(user.user_id);
      }

      if (!hasLoadedMessages.current) {
        console.log('Loading session messages');
        loadSessionMessages(message);
        hasLoadedMessages.current = true;
      } else if (!session) {
        hasLoadedMessages.current = true;
      }
    }
    toggleInputDisabled();
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title={parsedConfig.title}
      subtitle={parsedConfig.subtitle}
      senderPlaceHolder={parsedConfig.senderPlaceHolder}
      showCloseButton={parsedConfig.showCloseButton}
      fullScreenMode={parsedConfig.fullScreenMode}
      autofocus={parsedConfig.autofocus}
      chatId={parsedConfig.chatId}
      launcherOpenLabel={parsedConfig.launcherOpenLabel}
      launcherCloseLabel={parsedConfig.launcherCloseLabel}
      launcherOpenImg={parsedConfig.launcherOpenImg}
      launcherCloseImg={parsedConfig.launcherCloseImg}
      sendButtonAlt={parsedConfig.sendButtonAlt}
      showTimeStamp={parsedConfig.showTimeStamp}
      imagePreview={parsedConfig.imagePreview}
      zoomStep={parsedConfig.zoomStep}
      showBadge={parsedConfig.showBadge}
      resizable
      emojis
      handleToggle={handleToggleLoader}
      resizableProps={{ heightOffset: 55, widthOffset: 35 }}
    />
  );
}

export default Chat;
