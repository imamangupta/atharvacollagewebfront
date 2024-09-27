"use client"; // Ensure this component runs only on the client side

import { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoRoom = () => {
  const containerRef = useRef(null); // Reference for the video call container
  const [roomID, setRoomID] = useState(""); // State to manage the roomID

  useEffect(() => {
    // Generate roomID only on the client side
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlRoomID = urlParams.get("roomID") || Math.floor(Math.random() * 10000).toString();
      setRoomID(urlRoomID);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && roomID && containerRef.current) {
      const userID = Math.floor(Math.random() * 10000).toString();
      const userName = `userName${userID}`;
      const appID = 528486919;
      const serverSecret = "df4ec1fb3f0638334c7f53008d8b58e4";

      // Generate Kit Token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

      // Initialize the ZegoUIKit and join the room
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: "Personal link",
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    }
  }, [roomID]);

  return (
    <div style={{ height: "80vh", width: "70vw" }}>
      <div ref={containerRef} style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
};

export default VideoRoom;
