# 🔒 Vault - Decentralized Encrypted Storage

### **Your Data. Your Key. Forever.**

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Arweave](https://img.shields.io/badge/Storage-Arweave-000000?style=for-the-badge&logo=arweave&logoColor=white)
![Status](https://img.shields.io/badge/Status-Alpha-orange?style=for-the-badge)

---

## 📑 Table of Contents
- [🎯 Overview](#-overview)
- [❗ Problem Statement](#-problem-statement)
- [✨ Features](#-features)
- [🛠️ Technical Stack](#-technical-stack)
- [🏗️ Architecture](#-architecture)
- [🚀 Getting Started](#-getting-started)
- [📱 Demo](#-demo)
- [🔮 Future Enhancements](#-future-enhancements)
- [👥 About the Developers](#-about-the-developers)
- [📄 License](#-license)

---

## 🎯 Overview

**Vault** is a secure, decentralized file storage application designed to bridge the gap between Web2 usability and Web3 security. Unlike traditional cloud providers (Google Drive, Dropbox), Vault operates on a **Zero-Knowledge** architecture.

It allows users to encrypt files locally in the browser and store them permanently on the **Arweave Permaweb**. The system requires **no registration** and holds **no user data**—ensuring absolute privacy and data sovereignty.

🏆 **Achievement:** Final Year Project (2026) at Azrieli College of Engineering - Software Engineering Dept.

---

## ❗ Problem Statement

In the current digital landscape, users are forced to trade privacy for convenience.
**Traditional Cloud Storage (Web2) relies on:**
* **Centralized Control:** Providers hold your encryption keys and can access your data.
* **Privacy Risks:** Data mining, censorship, and potential server breaches.
* **Rent-Seeking:** You never own your storage; you rent it monthly.

**Vault solves this by offering:**
* ✅ **Client-Side Encryption:** Files are encrypted *before* they leave your device.
* ✅ **Zero-Registration:** No emails, passwords, or personal data collection.
* ✅ **Permanent Storage:** Pay once, store forever on the Arweave Blockchain.

---

## ✨ Features

### 🔐 **Client-Side Security**
* **AES-GCM Encryption:** Military-grade encryption performed entirely in the browser using the Web Crypto API.
* **Zero-Knowledge:** The server never receives the encryption key or the unencrypted file.

![Encryption Demo](path/to/encryption-screenshot.png)

### 📂 **Decentralized Storage**
* **Arweave Integration:** Data is stored on the Permaweb, ensuring it cannot be deleted or censored.
* **Bundlr Network:** Accelerated upload speeds and instant transaction finality.

### 💳 **Flexible Payments**
* **Crypto & Fiat:** Support for **Stripe** (Credit Card) and **MetaMask** (ETH/USDC) payments.
* **Pay-Per-Upload:** No monthly subscriptions.

![Payment Screen](path/to/payment-screenshot.png)

### 🔑 **The Vault Key**
* **Unique Identity:** Users receive a generated "Vault Key" (JSON) upon upload.
* **Recovery:** This key is the *only* way to retrieve and decrypt files.

---

## 🛠️ Technical Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) | UI Component Library |
| | ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) | Styling & Responsiveness |
| **Backend** | ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.dot.js&logoColor=white) | API & Payment Coordination |
| | ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) | Server Framework |
| **Storage** | ![Arweave](https://img.shields.io/badge/-Arweave-000000?logo=arweave&logoColor=white) | Permanent Decentralized Storage |
| **Database** | ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) | Anonymous Metadata & Logs |
| **Payments** | ![Stripe](https://img.shields.io/badge/-Stripe-008CDD?logo=stripe&logoColor=white) | Credit Card Processing |

---

## 🏗️ Architecture

Vault utilizes a **Client-Heavy Architecture** to ensure privacy.

**Flow:**
1.  **Browser:** Generates Key -> Encrypts File -> Sends Payment Request.
2.  **Server:** Verifies Payment -> Signs Upload Transaction.
3.  **Browser:** Uploads Encrypted Data directly to Arweave (bypassing the server for data transfer).

![System Architecture](path/to/architecture-diagram.png)

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v16 or higher)
* MongoDB Instance (Local or Atlas)
* Arweave Wallet Keyfile (for Bundlr node funding)
* Stripe Account (Test Mode)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Omar-Alian-dev/Project-Vault.git](https://github.com/Omar-Alian-dev/Project-Vault.git)
    cd Project-Vault
    ```

2.  **Install Dependencies (Root, Client, Server)**
    ```bash
    # Install root dependencies
    npm install

    # Install Client dependencies
    cd client && npm install

    # Install Server dependencies
    cd ../server && npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the `server` directory:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ARWEAVE_KEY=your_arweave_wallet_key
    ```

4.  **Run the Application**
    ```bash
    # Run both Client and Server concurrently
    npm run dev
    ```

---

## 📱 Demo

### 🎥 Live Demo
*(Coming Soon: Video demonstration showcasing the encryption process)*

### 📸 Key Features Preview

| Feature | Screenshot | Description |
| :--- | :--- | :--- |
| **Upload** | [View Screen] | Drag & Drop interface with file validation |
| **Encryption** | [View Screen] | Real-time progress bar for client-side encryption |
| **Vault Key** | [View Screen] | Success screen showing the generated key |
| **Retrieval** | [View Screen] | Input field to paste key and decrypt files |

---

## 🔮 Future Enhancements

* 📱 **Mobile Optimization:** Full responsive support for mobile browsers.
* 📄 **Recovery PDF:** Auto-generate a PDF containing the Vault Key and QR code.
* 🤝 **P2P Sharing:** Secure file sharing mechanism using public-key cryptography.
* 📊 **Admin Dashboard:** Analytics for system health and transaction volume.

---

## 👥 About the Developers

**Omar Alian**
*Full Stack Engineer | Blockchain Enthusiast*

**Anas Kadamany**
*Software Engineer | Backend Specialist*

🎓 **Education:** B.Sc in Software Engineering, Azrieli College of Engineering.
💻 **Specialization:** Web3, React, Node.js, Cryptography.

### 📫 Connect With Us
[![GitHub](https://img.shields.io/badge/GitHub-Omar--Alian--dev-181717?style=flat&logo=github)](https://github.com/Omar-Alian-dev)
[![GitHub](https://img.shields.io/badge/GitHub-Anas--Kadamany-181717?style=flat&logo=github)](https://github.com/)

---

## 🤝 Contributing
This is a private academic project. Contributions are not currently accepted from external developers.

---

## 📄 License
**Proprietary License**
Copyright (c) 2026 Omar Alian & Anas Kadamany. All rights reserved.

Made with ❤️ by Omar & Anas
