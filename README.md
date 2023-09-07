## Overview

The application allows users to connect their Ethereum wallets to the XMTP network, subscribe or unsubscribe to notifications, and receive simulated push notifications.

- [Live Demo](https://xmtp-subscribe-push-demo.vercel.app/)

**Note**: The push notification in this application is only a simulation. To implement actual push notifications, further backend work and integration would be required.

## Features

- Wallet Connection
- Subscription Count
- Subscribe/Unsubscribe Functionality
- Simulated Push Notifications

## How to Run

1. Install all the required packages:

```sh
npm install
npm run dev
```

### How it Works

#### Wallet Connection

The application enables users to connect their Ethereum wallets through Metamask. Once connected, users can perform subscribe and unsubscribe actions that are managed by smart contracts.

#### Subscription

Users can subscribe or unsubscribe to receive simulated push notifications. The subscriber count is displayed on the main screen.

#### Simulated Push Notifications

The application triggers simulated push notifications when a user subscribes or unsubscribes. These are basic browser notifications and not real push notifications.

#### Note on Push Notifications

The simulated push notification system serves as a placeholder. A more complex architecture involving backend servers and notification services is required to achieve a full-fledged push notification system.

## Notification Flow Diagram

Here's a sequence diagram to explain the hypothetical flow for real push notifications:

<img src="/notifications.png"/>

_This diagram outlines how a full-fledged push notification system might work, involving various services like a backend, a notification server, and notification delivery platforms (e.g., FCM for Android or APNS for Apple devices)_

## Relevant resources

- [Architectural overview of XMTP](https://xmtp.org/docs/concepts/architectural-overview)
- [Setup Guide for XMTP Notification Server](https://xmtp.org/docs/tutorials/other/notifications-server)
- [Notification Servers Go](https://github.com/xmtp/example-notification-server-go/blob/np/export-kotlin-proto-code/README.md#local-setup)
