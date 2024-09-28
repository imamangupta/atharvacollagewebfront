import { PrettyChatWindow } from "react-chat-engine-pretty";

const ChatsPage = ({user}) => {
  return (
    <div style={{height:'100vh'}}>
      <PrettyChatWindow
        projectId='6227c2c0-fb5b-48f8-83e1-635b9811a54e'
        username={user.userName} // adam
        secret='secret' // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatsPage;