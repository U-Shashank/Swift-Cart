# SwiftCart
Full stack e-commerce website developed using mern stack

## Hosting
Project has been hosted on vercel [click to visit](https://swift-cart-seven.vercel.app/).

## Demo
[https://youtu.be/7IiuzXLiiY8](https://youtu.be/7IiuzXLiiY8)

### Admin credentials: 
- username: admin@mail.com
- password: password
### Payment Gateway: 
For successfull transaction use this card number: 4111111111111111
- For more information visit https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live/php
## Getting Started

To run locally on your machine, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/U-Shashank/Swift-Cart.git
   ```

2. **Navigate to Project Directory**
   ```bash
   cd Swift-Cart
   ```

3. **Install Dependencies**
   ```bash
   npm install
   cd client
   npm install
   cd ..
   cd server
   npm install
   ```


4. **Set Up Environment Variable**
   ### For client:
   Backend api endpoint (This will change when server is deployed)
   - VITE_HOST_URL = http://localhost:3000/api/v1
   ### For server:
   - PORT = 3000
   - JWT_SECRET = YOUR_JWT_SECRET
   - MONGO_URI = YOUR_MONGODB_CONNECTION_STRING
   - Get the following from [Braintree](https://www.braintreepayments.com/sandbox) :
     - MERCHANT_ID = YOUR_MERCHANT_ID
     - PUBLIC_KEY = YOUR_PUBLIC_KEY
     - PRIVATE_KEY = YOUR_PRIVATE_KEY

5. **Run the App**
   ### In the main directory Swift-Cart:
   ```bash
   npm run dev
   ```
   Will start both server and client together using concurrently

## Technologies Used
- MongoDB
- Express.js
- Node.js
- React
- Tailwind
- JWT


