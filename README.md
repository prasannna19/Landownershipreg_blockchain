<<<<<<< HEAD

React + Vite + Blockchain
🏠 Land Ownership Registry DApp
This project is a decentralized land ownership registry system built using **React + Vite ** for the frontend and Ganache + MetaMask for blockchain simulation. It allows Buyers, Sellers, and an Admin (Land Inspector) to register, interact, and manage land assets securely on the blockchain.

🚀 Tech Stack
⚛️ React with Vite — Lightweight frontend framework and development server
💻 Solidity — Smart contracts for managing land data
🦊 MetaMask — Ethereum wallet for signing and simulating blockchain transactions
🔁 Ganache — Local blockchain simulator for smart contract testing
🗃️ localStorage — Used for user data and transaction state in frontend
🎨 CSS + Pastel Themes — Clean and modern UI styling
👥 User Roles
1. Buyer
Can register and log in
View available lands
Request to purchase lands
Make payments via MetaMask (Ganache-backed)
View owned lands and payment receipts
Transfer land to others
2. Seller
Can register and log in
Add new lands with documents & image links
View and approve buyer requests
See their own listed lands
3. Admin (Land Inspector)
Verify Buyers and Sellers
Approve ownership transfers
View all registered users and transaction flow
💡 Features
🔐 MetaMask wallet connection for authentication
📄 Add land with title, city, state, price, document (PDF), and image
🔍 View verified lands only (Buyers)
🧾 Payment and receipt generation
🧑 Admin Panel to verify users and approve land ownership transfers
💼 Stylish dashboards for each user type
📦 Project persistence using localStorage
📷 Background image themes on dashboard and homepage
📂 Folder Structure
blockland-registry/ ├── public/ │ └── bg.jpg (landing background image) ├── src/ │ ├── pages/ │ │ ├── RegistrationPage.jsx │ │ ├── SellerDashboard.jsx │ │ ├── BuyerDashboard.jsx │ │ ├── AdminDashboard.jsx │ │ ├── ViewLands.jsx │ │ ├── MakePayment.jsx │ │ ├── TransferOwnership.jsx │ │ ├── PaymentReceipts.jsx │ │ └── ... │ ├── styles/ │ │ ├── RegistrationPage.css │ │ ├── SellerDashboard.css │ │ ├── BuyerDashboard.css │ │ └── AdminDashboard.css │ └── App.jsx ├── backend/ │ └── make_payment.py (Python Flask server to simulate ETH transfers) └── README.md

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

@vitejs/plugin-react uses Babel for Fast Refresh
@vitejs/plugin-react-swc uses SWC for Fast Refresh
Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the TS template to integrate TypeScript and typescript-eslint in your project.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# Landownershipreg_blockchain
>>>>>>> 162effa1a30e9c55d19d39545e48653c111d0651
