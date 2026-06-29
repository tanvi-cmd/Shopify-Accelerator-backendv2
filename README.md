# Shopify-Accelerator-backend
Shopify Accelerator Backend

# HX Shopify Headless Accelerator (Backend)

A Serverless Node.js backend that connects to Shopify Storefront API and exposes Graphql endpoints for products, collections, search, and store data and so on

What is built so far is a **Shopify Reusable Headless Backend Template**  . It provides all the reusable Shopify integrations. Just we need to copy the code base to whatever project and it will start working based on inputs provided by user.

But this project also  have AI module in this project. We can build an AI layer on top of existing APIs anytime as a PHASE 2.

****PHASE 1 : Existing core reusable Shopify Headless Backend Template**.: 
**
React Frontend
       │
       ▼
Serverless (AWS Lambda)
       │
       ▼
Shopify Storefront GraphQL API

The backend:

Accepts Store URL and Storefront Token
Calls Shopify GraphQL APIs
Returns JSON
Acts as a reusable backend template

---

## 🚀 Features

- Shopify Storefront API integration (GraphQL)
- Serverless Framework (AWS Lambda support)
- Local offline development support
- Modular architecture (routes/services/modules)
- Product, Collection, Store, and Search APIs etc
- Environment-based configuration

---

## 🧰 Tech Stack

- Node.js 20+
- TypeScript
- Serverless Framework
- AWS Lambda
- Shopify Storefront API (GraphQL)
- Serverless Offline

---

## 📁 Project Structure

src/
modules/
products/
collections/
search/
store/
routes/
utils/
config/
serverless.yml
---

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install

**2. Configure environment variables - NOT NEEDED, as we are getting inpout from user on frontend 
**
Create .env file:

SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your_storefront_token
API_VERSION=2026-07

3. Run locally

npx serverless offline

Server will start at:

http://localhost:3000

API Endpoints
Health Check
GET /health
Products
GET /products
Collections
GET /collections
Store Info
GET /store
Search
GET /search?q=shirt

⚠️ Query is required only for /search

Testing

You can test endpoints using:

Postman
cURL
Browser (GET routes)

Example:

curl http://localhost:3000/products
☁️ Deployment

Deploy to AWS:

npx serverless deploy

Notes

Ensure Shopify Storefront API token is valid
API version must match Shopify admin configuration
CORS is enabled for frontend integration

🛠 Troubleshooting

401 Unauthorized
Check SHOPIFY_STOREFRONT_TOKEN
Verify store domain
Offline server not starting
Ensure serverless-offline plugin installed

SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your_storefront_token
API_VERSION=2026-07
