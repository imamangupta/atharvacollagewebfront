"use client"; // Ensure the component runs on the client side

import { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoRoom = () => {
  const containerRef = useRef(null); // Reference for the video call container
  const [roomID, setRoomID] = useState(""); // State to manage the roomID

  useEffect(() => {
    // Only run this code on the client side
    if (typeof window !== "undefined") {
      // Fetch or generate roomID
      const urlParams = new URLSearchParams(window.location.search);
      const urlRoomID = urlParams.get("roomID") || Math.floor(Math.random() * 10000).toString();
      setRoomID(urlRoomID);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && roomID && containerRef.current) {
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
  }, [roomID]);

  return (
    <div className="video-call-container" style={{ height: "80vh", width: "70vw" }}>
      {typeof window !== "undefined" && (
        <div ref={containerRef} className="h-full w-full"></div>
      )}
    </div>
  );
};

export default VideoRoom;
