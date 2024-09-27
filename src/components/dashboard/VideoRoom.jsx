"use client"; // Ensure the component runs on the client side

import { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoRoom = () => {
  const containerRef = useRef(null); // Reference for the video call container
  const [roomID, setRoomID] = useState(""); // State to manage the roomID
  const [isClient, setIsClient] = useState(false); // Track if it's client-side

  useEffect(() => {
    // Check if it's running on the client side
    setIsClient(typeof window !== "undefined");
  }, []);

  useEffect(() => {
    if (isClient && roomID && containerRef.current) {
      // Initialize participant details
      const userID = Math.floor(Math.random() * 10000).toString();
      const userName = "userName" + userID;
      const appID = 528486919;
      const serverSecret = "df4ec1fb3f0638334c7f53008d8b58e4";

      // Generate the token for the video call
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

      // Create the ZegoUIKit instance and join the room
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
  }, [isClient, roomID]);

  useEffect(() => {
    if (isClient) {
      // Fetch or generate roomID only on the client side
      const urlParams = new URLSearchParams(window.location.search);
      const urlRoomID = urlParams.get("roomID") || Math.floor(Math.random() * 10000).toString();
      setRoomID(urlRoomID);
    }
  }, [isClient]);

  // Prevent rendering until it's confirmed the code is running on the client-side
  if (!isClient) {
    return null; // Prevent server-side rendering
  }

  return (
    <div className="video-call-container" style={{ height: "80vh", width: "70vw" }}>
      <div ref={containerRef} className="h-full w-full"></div>
    </div>
  );
};

export default VideoRoom;
