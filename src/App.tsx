import React, { useEffect } from 'react';
import { Widget, addResponseMessage, toggleInputDisabled, toggleMsgLoader, addLinkSnippet } from '@ryaneewx/react-chat-widget';
import { useUser } from './context/UserContext';
interface Config {
  title: string;
  subtitle: string;
  senderPlaceHolder: string;
  showCloseButton: boolean;
  fullScreenMode: boolean;
  autofocus: boolean;
  chatId: string;
  launcherOpenLabel: string;
  launcherCloseLabel: string;
  launcherOpenImg: string;
  launcherCloseImg: string;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  imagePreview: boolean;
  zoomStep: number;
  showBadge: boolean;
  styles?: {
    clientMessageText?: string;
    responseMessageText?: string;
    header?: string;
    closeButton?: string;
    launcher?: string;
    container?: string;
    sender?: string;
  };
}

const defaultProps: Config = {
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

function App({ domElement }: { domElement: HTMLElement | null }) {
  const config = domElement?.getAttribute("data-garcho-conf");
  const parsedConfig: Config = config ? JSON.parse(config) : defaultProps;
  const { user, createUser, updateUser, createSession } = useUser();

  useEffect(() => {
    if (!user) {
      createUser({
        status: 'active',
        total_deposits: 150.75,
        session_count: 5,
        last_login: new Date().toISOString(),
      });
    } else {
      updateUser({
        status: 'active',
        total_deposits: user.total_deposits + 50,
        session_count: user.session_count + 1,
        last_login: new Date().toISOString(),
      });

      createSession(user.user_id);
    }
  }, [user, createUser, updateUser, createSession]);
  const handleNewUserMessage = (newMessage: string) => {
    console.log(`New message incoming! ${newMessage}`);
    toggleInputDisabled();
    toggleMsgLoader();
    setTimeout(() => {
      toggleInputDisabled();
      toggleMsgLoader();
      addResponseMessage("ai response");
      addLinkSnippet({ link: 'https://www.bettycrocker.com/recipes/tuna-pickle-pitas/cb8181ca-c6cc-4c6f-b6f4-1a02d47ed868', title: 'Tuna Pickle Pitas' });
    }, 2000);
  };

  const handleQuickButtonClicked = (value: string) => console.log(value);

  useEffect(() => {
    if (parsedConfig.styles) {
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        .rcw-client .rcw-message-text { ${parsedConfig.styles.clientMessageText} }
        .rcw-response .rcw-message-text { ${parsedConfig.styles.responseMessageText} }
        .rcw-conversation-container .rcw-header { ${parsedConfig.styles.header} }
        .rcw-conversation-container .rcw-close-button{ ${parsedConfig.styles.header} }
        .rcw-launcher { ${parsedConfig.styles.launcher} }
        .rcw-messages-container { ${parsedConfig.styles.container} }
        .rcw-sender { ${parsedConfig.styles.sender} }
        .rcw-send {${parsedConfig.styles.sender} }
        .rcw-picker-btn { ${parsedConfig.styles.sender} }
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
      launcherOpenImg={parsedConfig.launcherOpenImg}
      launcherCloseImg={parsedConfig.launcherCloseImg}
      sendButtonAlt={parsedConfig.sendButtonAlt}
      showTimeStamp={parsedConfig.showTimeStamp}
      imagePreview={parsedConfig.imagePreview}
      zoomStep={parsedConfig.zoomStep}
      showBadge={parsedConfig.showBadge}
    />
  );
}

export default App;
