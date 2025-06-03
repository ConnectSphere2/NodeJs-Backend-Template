# 🚀 Node.js Backend Template

This is a scalable and production-ready Node.js backend boilerplate using:

- TypeScript
- Express
- MongoDB (via Mongoose)
- Redis
- Prettier + ESLint
- Husky Git hooks
- Jest for testing
- GitHub Actions for CI

---

## 📦 Features

- 🧱 Modular Folder Structure
- 🔐 Environment-based config
- 🛠 Built-in Logger
- 🧪 Unit Testing with Jest
- ♻️ Git Hooks with Husky
- 🧼 Code Formatting with Prettier
- 🚨 Linting with ESLint
- 📊 GitHub Actions CI Workflow

---

## 📁 Folder Structure


.
├── src/
│   ├── config/        # DB, Redis, Logger config
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── models/
│   ├── services/
│   └── index.ts       # Entry point
│
├── .github/           # GitHub Actions workflows
├── .husky/            # Git hooks (pre-commit, etc.)
├── test/              # Jest test cases
├── .env               # Environment variables (ignored)
├── .eslintrc.json     # Lint config
├── .prettierrc        # Prettier config
├── tsconfig.json      # TypeScript config
├── package.json
└── README.md





🚀 Getting Started
1️⃣ Clone & Install
git clone https://github.com/ConnectSphere2/NodeJs-Backend-Template.git
cd your-nodejs-template
npm install
2️⃣ Environment Variables
Create a .env file in the root:


PORT=3000
MONGODB_URI=mongodb://localhost:27017/test
REDIS_URL=redis://localhost:6379
🧪 Running the Project
Run in Dev Mode (with Nodemon)

npm run dev
Run in Production Mode

npm run build
npm start
🧹 Code Quality
Run Lint

npm run lint
Run Formatter (Prettier)

npm run format
Check Format (without fixing)

npm run format:check
🧪 Testing

npm run test
🔐 Git Hooks with Husky
Git hooks are set up with Husky to run lint and tests before every commit.

Enable hooks after cloning:

npx husky install
⚙️ GitHub Actions
CI is configured via .github/workflows/ci.yml. It runs:

Linting

Formatting check

Tests on push and pull requests

📌 Notes
Don't forget to install Husky hooks after every fresh clone.

.env files should not be committed.

You can customize scripts in package.json as needed.

🤝 Contributing
Fork this repo

Create a feature branch

Commit and push your changes

Open a Pull Request

📜 License
This project is licensed under the MIT License.

Made with ❤️ by Arbaaz khan


---

### 🛠 Also add these scripts to your `package.json` if missing:

```json
"scripts": {
  "dev": "ts-node-dev --respawn src/index.ts",
  "start": "node dist/index.js",
  "build": "tsc",
  "lint": "eslint . --ext .ts",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "test": "jest"
}








