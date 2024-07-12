
import './styles.css';
import { Widget, addResponseMessage } from '@ryaneewx/react-chat-widget';
function App() {


  const handleNewUserMessage = (newMessage: string) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message through the backend API
    addResponseMessage("ai response");
  };
  const handleQuickButtonClicked = (value: string) => console.log(value);

  return (
      <Widget
          handleNewUserMessage={handleNewUserMessage}
          handleQuickButtonClicked={handleQuickButtonClicked}
          // profileAvatar={'text'}
          title="Polls"
          subtitle="Polls Demo"
      />
  );
}

export default App;
