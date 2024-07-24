import Chat from './features/chat/Chat';
function App({ domElement }: { domElement: HTMLElement | null }) {

  return (
    <Chat
      domElement={domElement}
    />
  );
}

export default App;
