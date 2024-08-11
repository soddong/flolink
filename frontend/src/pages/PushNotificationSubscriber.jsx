import React, { useEffect, useState } from "react";
import { requestPermissionAndGetToken } from "../service/notification/firebase.js";
import tokenStore from "../store/tokenStore.js";
const PushNotificationSubscriber = () => {
  const [isTokenFound, setTokenFound] = useState(false);
  const [permission, setPermission] = useState("default");
  const { token, setToken } = tokenStore(state => ({
    token: state.token,
    setToken: state.setToken,
    getToken: state.getToken,
  }));
 
  const handleGetPushTokenEvent = async () => {
    try {
      const tmp_token = await requestPermissionAndGetToken();
      if (tmp_token&&token) {
        setToken(tmp_token);
        setTokenFound(true);
        setPermission("granted");
      }
    } catch (error) {
      console.error("Permission or token retrieval failed:", error);
      setPermission("denied");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Firebase Push Notification Test</h2>
      <p>
        <strong>Notification Permission:</strong> {permission}
      </p>
      
      <p>
        {isTokenFound
          ? "Token found and sent to server"
          : "Token not found or permission denied"}
      </p>

      {permission === "default" && (
        <button onClick={handleGetPushTokenEvent}>푸시 알림 구독하기</button>
      )}
    </div>
  );
};

export default PushNotificationSubscriber;
