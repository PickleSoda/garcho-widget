// src/hooks/useChatStyles.ts

import { useEffect } from 'react';
import { ChatConfig } from "../config/types";

const useChatStyles = (styles: ChatConfig['styles']) => {
  useEffect(() => {
    if (styles) {
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        .rcw-client .rcw-message-text { ${styles.clientMessageText} }
        .rcw-response .rcw-message-text { ${styles.responseMessageText} }
        .rcw-conversation-container .rcw-header { ${styles.header} }
        .rcw-launcher { ${styles.launcher} }
        .rcw-messages-container { ${styles.container} }
        .rcw-sender { ${styles.sender} }
      `;
      document.head.appendChild(styleElement);
      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, [styles]);
};

export default useChatStyles;
