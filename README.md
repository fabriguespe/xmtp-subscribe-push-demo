## Overview

The USubscribe application is a React-based project that serves as a showcase for a subscribe/unsubscribe button functionality integrated with a simulated push notification system. The application allows users to connect their Ethereum wallets, subscribe or unsubscribe to notifications, and receive simulated push notifications.

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
