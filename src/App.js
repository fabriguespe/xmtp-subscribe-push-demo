import React, { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";

import { USubscribe } from "./UWidgets/USubscribe"; // Update the path based on your folder structure
import {
  addSubscriber,
  checkSubscriptionStatus,
  removeSubscriber,
} from "./utils";

function App() {
  const [signer, setSigner] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false); // Add state for wallet connection
  const [subscriberCount, setSubscriberCount] = useState(0);

  const disconnectWallet = () => {
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("signerAddress");
    setSigner(null);
    setWalletConnected(false);
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
        setWalletConnected(true);
        const signerAddress = await signer?.getAddress();
        localStorage.setItem("walletConnected", JSON.stringify(true)); // Save connection status in local storage
        localStorage.setItem("signerAddress", JSON.stringify(signerAddress)); // Save signer address in local storage
      } catch (error) {
        console.error("User rejected request", error);
      }
    } else {
      console.error("Metamask not found");
    }
  };
  const simulatePushNotification = (message) => {
    // You can use native JavaScript API to show notifications
    if (Notification.permission === "granted") {
      new Notification(message);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(message);
        }
      });
    }
  };
  useEffect(() => {
    let initialCount = 0;
    const subscribers = localStorage.getItem("subscribers");
    if (subscribers) {
      initialCount = JSON.parse(subscribers).length;
    }
    setSubscriberCount(initialCount);
    const storedWalletConnected = localStorage.getItem("walletConnected");
    const storedSignerAddress = JSON.parse(
      localStorage.getItem("signerAddress"),
    );
    if (storedWalletConnected && storedSignerAddress) {
      setWalletConnected(JSON.parse(storedWalletConnected));
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setSigner(signer);
    }
  }, []);
  return (
    <div className="App">
      <button
        className="home-button"
        style={{ marginLeft: 10 }}
        onClick={() => connectWallet()}>
        {walletConnected ? "Connected" : "Connect Wallet"}
      </button>
      {walletConnected && (
        <button
          className="home-button"
          style={{ marginLeft: 10 }}
          onClick={() => disconnectWallet()}>
          Logout
        </button>
      )}

      <header className="App-header">
        <h1>USubscribe</h1>
        <small>Subscriber count: {subscriberCount}</small>
      </header>
      <section className="App-section">
        <div className="subscribe-container">
          <span className="badge">
            {`${"default"}`} | {`${"small"}`}
          </span>
          <USubscribe
            theme={"default"}
            size={"small"}
            wallet={signer}
            env={process.env.REACT_APP_XMTP_ENV}
            checkSubscriptionStatus={(address) => {
              return checkSubscriptionStatus(address);
            }}
            onSubscribe={(address) => {
              const count = addSubscriber(address);
              setSubscriberCount(count);
              simulatePushNotification("New Subscriber: " + address);
            }}
            onUnsubscribe={(address) => {
              const count = removeSubscriber(address);
              setSubscriberCount(count);
              simulatePushNotification("Unsubscribed: " + address);
            }}
            onError={(address) => {
              console.log("Error subscribing: " + address);
            }}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
