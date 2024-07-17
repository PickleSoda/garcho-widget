import React, { useEffect } from 'react';
import { Widget } from '@ryaneewx/react-chat-widget';
import { ChatConfig } from "./types"


interface ChatProps {
  domElement: HTMLElement | null;
  handleNewUserMessage: (newMessage: string) => void;
  handleQuickButtonClicked: (newMessage: string) => void;
}

function Chat({ domElement, handleNewUserMessage, handleQuickButtonClicked }: ChatProps) {
  const config = domElement?.getAttribute("data-garcho-conf");


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

  useEffect(() => {
    if (parsedConfig.styles) {
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        .rcw-client .rcw-message-text { ${parsedConfig.styles.clientMessageText} }
        .rcw-response .rcw-message-text { ${parsedConfig.styles.responseMessageText} }
        .rcw-conversation-container .rcw-header { ${parsedConfig.styles.header} }
        .rcw-launcher { ${parsedConfig.styles.launcher} }
        .rcw-messages-container { ${parsedConfig.styles.container} }
        .rcw-sender { ${parsedConfig.styles.sender} }
      `;
      document.head.appendChild(styleElement);
    }
  }, [parsedConfig.styles]);

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      handleQuickButtonClicked={handleQuickButtonClicked}
      title={parsedConfig.title}
      subtitle={parsedConfig.subtitle}
      senderPlaceHolder={parsedConfig.senderPlaceHolder}
      showCloseButton={parsedConfig.showCloseButton}
      fullScreenMode={parsedConfig.fullScreenMode}
      autofocus={parsedConfig.autofocus}
      chatId={parsedConfig.chatId}
      launcherOpenLabel={parsedConfig.launcherOpenLabel}
      launcherCloseLabel={parsedConfig.launcherCloseLabel}
      launcherOpenImg={parsedConfig.launcherOpenImg || "chat.svg"}
      launcherCloseImg={parsedConfig.launcherCloseImg}
      sendButtonAlt={parsedConfig.sendButtonAlt}
      showTimeStamp={parsedConfig.showTimeStamp}
      imagePreview={parsedConfig.imagePreview}
      zoomStep={parsedConfig.zoomStep}
      showBadge={parsedConfig.showBadge}
      resizable
      resizableProps={{heightOffset:105, widthOffset:35}}
    />
  );
}

export default Chat;
