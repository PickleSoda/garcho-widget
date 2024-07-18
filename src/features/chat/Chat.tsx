// src/features/chat/Chat.tsx

import React from 'react';
import { Widget } from '@picklesoda/react-chat-widget';
import { ChatConfig } from "./types";
import useChatMessages from './hooks/useChatMessages';
import useChatStyles from './hooks/useChatStyles';


interface ChatProps {
  domElement: HTMLElement | null;
}

function Chat({ domElement }: ChatProps) {
  const config = domElement?.getAttribute("data-garcho-conf");
  const agent_id = domElement?.getAttribute('data-agent-id');

  const { handleNewUserMessage } = useChatMessages(agent_id|| null);

  const defaultProps: ChatConfig = {
    title: 'Welcome',
    subtitle: 'This is your chat subtitle',
    senderPlaceHolder: 'Type a message...',
    showCloseButton: true,
    fullScreenMode: false,
    autofocus: true,
    chatId: 'rcw-chat-container',
    launcherOpenLabel: 'Open chat',
    launcherCloseLabel: 'Close chat',
    launcherOpenImg: '',
    launcherCloseImg: '',
    sendButtonAlt: 'Send',
    showTimeStamp: true,
    imagePreview: false,
    zoomStep: 80,
    showBadge: true,
    styles: {
      clientMessageText: '',
      responseMessageText: '',
      header: '',
      closeButton: '',
      launcher: '',
      container: '',
      sender: '',
    }
  };

  const parsedConfig: ChatConfig = config ? JSON.parse(config) : defaultProps;
  useChatStyles(parsedConfig.styles);


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
      resizableProps={{ heightOffset: 105, widthOffset: 35 }}
    />
  );
}

export default Chat;
