# Paybursement: Payment Disbursement Automation System with Razorpay

This project is a **Paybursement** built using the **MERN Stack** and Razorpay, designed to automate the process of transferring salaries from the owner's bank account to employees' accounts.

## Features

- **Employee Management**: Add, update, and manage employee details, including bank information.
- **Salary Disbursement**: Automatically transfer salaries to employees' bank accounts using Razorpay's payout API.
- **Transaction Logs**: Maintain a record of all payouts for auditing purposes.
- **Secure API Integration**: Implemented with Razorpay for secure payment processing.
- **Automated Scheduling**: Automate salary disbursement with customizable schedules.
- **Responsive UI**: User-friendly frontend for easy navigation and operation.

---

## Tech Stack

- **Frontend**: React, Tailwind CSS, ShadCN
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: Razorpay

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/payroll-automation.git
   cd payroll-automation
   ```
2. Install the dependencies:
   ```bash
    cd frontend
    npm install
    cd ..
    cd backend
    npm install
    ```
3. Create a `.env` file in the `frontend` directory and add the following environment variables:
    ```env
    VITE_BASE_URL=http://localhost:3000
    VITE_RAZORPAY_KEY_ID=rzp_test_key_id
    VITE_RAZORPAY_KEY_SECRET=rzp_test_key_secret
    ```
3. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```
4. Start the backend server:
    ```bash
    cd backend
    npm start
    ```
5. Start the frontend server:
    ```bash
    cd frontend
    npm start
    ```
6. Open your browser and go to `http://localhost:5173` to view the application.

---

## Additional Information

- **Contributors**: [Gamandeep Singh](https://github.com/gamandeepsingh)
- **License**: MIT
- **Status**: In Development
- **Support**: [Contact us](mailto:gamandeepsingh6@gmail.com)