# 💰 Expense Tracker Dashboard

A responsive and modern expense tracking dashboard built with React.js to manage income and expenses, analyze spending patterns, and keep track of personal finances.

## 🚀 Live Demo

👉 https://yash-expensetracker.netlify.app/

## ✨ Features

- Add income and expense transactions
- Edit and delete transactions
- Search transactions
- Filter by category
- Filter by transaction type
- Filter transactions by date range
- Sort transactions by newest, oldest, highest amount, and lowest amount
- Automatic income, expense, and balance calculation
- Category-based expense visualization using a pie chart
- LocalStorage support for persistent data
- Empty state for no transactions
- Responsive design for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- React.js
- JavaScript
- CSS
- React Hook Form
- Recharts
- React Icons
- LocalStorage
- Vite

## 📂 Project Structure

```text
src/
├── assets/
├── component/
│   ├── Dashboard Summary.jsx
│   ├── PiechartComponent.jsx
│   ├── TransactionFilter.jsx
│   ├── TransactionList.jsx
│   ├── Transactions.jsx
│   └── TransactionsForm.jsx
├── App.jsx
├── App.css
└── index.css
## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
