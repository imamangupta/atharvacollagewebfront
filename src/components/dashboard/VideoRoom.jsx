import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function VideoRoom() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Generate URL parameters
    const getUrlParams = (url) => {
      const urlStr = url.split("?")[1];
      const urlSearchParams = new URLSearchParams(urlStr);
      return Object.fromEntries(urlSearchParams.entries());
    };

    // Ensure the code runs on the client side
    if (typeof window !== "undefined") {
      const roomID = getUrlParams(window.location.href)["roomID"] || Math.floor(Math.random() * 10000).toString();
      const userID = Math.floor(Math.random() * 10000).toString();
      const userName = "userName" + userID;
      const appID = 528486919;
      const serverSecret = "df4ec1fb3f0638334c7f53008d8b58e4";

      // Generate the Kit Token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

      // Initialize ZegoUIKit and join the room
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
        turnOnMicrophoneWhenJoining: true,
        turnOnCameraWhenJoining: true,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        showTextChat: true,
        showUserList: true,
        maxUsers: 50,
        layout: "Auto",
        showLayoutButton: true,
      });
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}

export default VideoRoom;
