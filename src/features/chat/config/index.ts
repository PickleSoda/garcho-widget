import { ChatConfig } from './types';

export type { ChatConfig } from './types';

export const defaultProps: ChatConfig = {
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