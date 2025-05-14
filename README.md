# 🧠 Noēsis: A Decentralized Mirror of Thought

**Noēsis** is an experimental, on-chain platform for reflecting, connecting, and evolving ideas.  
Built around the principle of decentralized philosophical exploration, it allows anyone to submit "reflections" — ideas, intuitions, or insights — and permanently anchor them on IPFS and the Ethereum blockchain.

### 🌍 Live Site

🔗 https://noesis-net.org

---

### ⚙️ How It Works

1. A user enters a **reflection** at `/reflect`
2. The content is uploaded to **IPFS** using Web3.Storage
3. The IPFS link is stored on-chain via the `ReflectionVault` smart contract on **Sepolia**
4. `/feed` listens to events and displays reflections in real-time

---

### 🧪 Testnet Info

- **Chain:** Ethereum Sepolia
- **Contract:** `0x437c332495a8ef52e00ca721f9cF26Dc81B0aC3D`
- **RPC Provider:** [Alchemy](https://dashboard.alchemy.com/)
- **IPFS via:** [Web3.Storage](https://web3.storage/)

---

### 👨‍💻 Development

Install dependencies:

```bash
npm install
