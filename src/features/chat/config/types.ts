export interface ChatConfig {
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
  