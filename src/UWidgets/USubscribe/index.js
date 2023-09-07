import React, { useEffect, useState } from "react";
import { Client } from "@xmtp/react-sdk";
import "./USubscribe.css";
import { ethers } from "ethers";
import Logo from "./Logo";

export function USubscribe({
  theme = "default",
  size = "medium",
  wallet,
  onSubscribe,
  onUnsubscribe,
  checkSubscriptionStatus,
  onError,
  env,
}) {
  const [loading, setLoading] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState("none");

  const getAddress = async (signer) => {
    try {
      return await signer?.getAddress();
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    let currentSigner = wallet || (await connectWallet());
    if (currentSigner) {
      await connect(currentSigner);
    }
    setLoading(false);
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        return provider.getSigner();
      } catch (error) {
        console.error("User rejected request", error);
      }
    } else {
      console.error("Metamask not found");
    }
  };

  const connect = async (signer) => {
    try {
      if (checkSubscriptionStatus) {
        const address = await getAddress(signer);
        const isSubscribed = await checkSubscriptionStatus(address);
        if (isSubscribed) {
          await unsubscribe(signer);
        } else {
          await subscribe(signer);
        }
      }
    } catch (error) {
      onError(error);
      console.log(error);
    }
  };

  async function unsubscribe(signer) {
    const address = await getAddress(signer);
    setSubscriptionStatus("unsubscribed");
    onUnsubscribe(address);
    setTimeout(() => {
      setSubscriptionStatus("none");
    }, 5000);
  }

  async function subscribe(signer) {
    const xmtp = await Client.create(signer, { env: env });
    setSubscriptionStatus("subscribed");
    onSubscribe(xmtp.address);
    setTimeout(() => {
      setSubscriptionStatus("none");
    }, 5000);
  }

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      setLoading(true);
      if (checkSubscriptionStatus && wallet) {
        const address = await getAddress(wallet);
        const isSubscribed = await checkSubscriptionStatus(address);
        if (isMounted) {
          setSubscriptionStatus(isSubscribed ? "subscribed" : "unsubscribed");
        }
      }
      setLoading(false);
    };
    init();
    return () => {
      isMounted = false;
    };
  }, [checkSubscriptionStatus, wallet]);

  return (
    <div
      className={`usubscribe-button-container ${theme} ${size} ${
        loading ? "loading" : ""
      }`}>
      <button className="usubscribe-button" onClick={handleClick}>
        <Logo className="logo" />
        {loading
          ? "Loading..."
          : subscriptionStatus === "subscribed"
          ? "Subscribed"
          : subscriptionStatus === "unsubscribed"
          ? "Unsubscribed"
          : "Subscribe with your wallet"}
      </button>
    </div>
  );
}
