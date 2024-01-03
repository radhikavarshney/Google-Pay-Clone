
# Google Pay Clone

This repository contains the backend code for a basic bank transfer system developed using Express.js and MongoDB. The system allows users to register, login, and perform transfers between accounts while implementing additional functionalities like cashback and coupon generation.

## Table of Contents

- **[Setup Instructions](#setup-instructions)**
- **[Project Structure](#project-structure)**
- **[Usage](#usage)**
- **[Additional Information](#additional-information)**
- **[Contributors](#contributors)**
- **[Disclaimer](#disclaimer)**

## Setup Instructions

### Clone Repository

```
git clone <repository_url.git>
cd project-folder
```

### Install Dependencies

```
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=<port_number>
MONGO_URL=<mongodb_connection_string>
```

### Run Application

```
npm start
```

## Project Structure

- **`index.js`**: Entry point of the application, sets up the Express server, and connects to the MongoDB database.
- **`routes/users.js`**: Defines routes for user registration and login.
- **`routes/transfer.js`**: Implements the logic for fund transfers between users.
- **`helpers/helperFunction.js`**: Contains a function to generate unique coupons for transactions.
- **`models/user.js`**: Schema definition for the User model in the MongoDB database.

## Usage

- **User Registration**
  - Endpoint: `/api/user/register`
  - Method: `POST`
  - Payload: `{ phoneNum: <phone_number>, initialAmount: <initial_balance> }`

- **User Login**
  - Endpoint: `/api/user/login`
  - Method: `POST`
  - Payload: `{ phoneNum: <phone_number> }`

- **Perform Transfer**
  - Endpoint: `/api/transfer`
  - Method: `POST`
  - Payload: `{ senderNum: <sender_phone_number>, receiverNum: <receiver_phone_number>, amount: <transfer_amount> }`

## Additional Information

- The transfer functionality includes validation for sufficient funds, user existence, and applies cashback on certain conditions.
- Transactions are recorded in user profiles.
- Coupons are generated based on transaction amounts that are multiples of 500.
