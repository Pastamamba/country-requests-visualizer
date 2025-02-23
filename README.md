# Country Requests Visualizer

A dynamic React application that visualizes country-specific request data on a world map using D3 and [react-simple-maps](https://www.npmjs.com/package/react-simple-maps). This project displays request volume by country using an interactive map, offering an intuitive way to explore and compare global request statistics.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Interactive World Map**: Hover over any country to see the number of requests in real time.
- **Color Gradient**: The map uses a color scale to visually represent the intensity of requests.
- **Modular Architecture**: Built with reusable components in React.
- **Easy Deployment**: Uses Vite for fast development and production builds.

---

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Pastamamba/country-requests-visualizer.git

   ```

2. Navigate to the project directory:

   ```bash
   cd country-requests-visualizer

   ```

3. **Install dependencies:**

   ```bash
    npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Access the application at http://localhost:5173/ (or the port shown in your terminal).

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) as a package manager

---

### Usage

- Update country_requests_data.json with your actual country and request data.
- If necessary, replace or update features.json with your own GeoJSON data.
- Customize the color scale or additional features in MapChart.tsx based on your needs.

---

### Technologies

- React 18: UI library for building interactive user interfaces.
- TypeScript: Static type definitions for better code quality and maintainability.
- D3 Scale: For generating color scales based on data values.
- React Simple Maps: Library for building SVG maps in React.
- Vite: Fast development server and build tool.
- Prettier: Automatic code formatting for consistent styling.
- ESLint: Linter for catching errors and enforcing best practices.

---

### Contributing

Contributions are welcome! Feel free to open an issue for ideas or submit a pull request to improve the project.

---

## 🚀 Getting Started

Before making changes, follow these steps to keep your fork updated:

1. **Fork the repository**

   - Click the "Fork" button on GitHub to create a copy of the repository under your account.

2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/repository-name.git
   cd repository-name
   ```

3. **Add the original repository as `upstream`**
   ```bash
   git remote add upstream https://github.com/original-owner/repository-name.git
   ```

---

## 🔄 Keeping Your Fork Updated

Before making any changes, ensure your fork is in sync with the original repository:

1. **Fetch the latest updates from `upstream`**
   ```bash
   git fetch upstream
   ```
2. **Switch to the `main` branch**
   ```bash
   git checkout main
   ```
3. **Merge the latest changes from upstream**
   ```bash
   git merge upstream/main
   ```
4. **Push the updated `main` branch to your fork**
   ```bash
   git push origin main
   ```

---

## 🛠️ Making Contributions

Once your fork is updated, follow these steps to contribute:

1. **Create a new feature branch**

   ```bash
   git checkout -b feature/new-feature
   ```

   Replace `new-feature` with a descriptive name for your change.

2. **Make changes to the codebase**  
   After modifying files, check your changes:

   ```bash
   git status
   ```

   Stage and commit the changes:

   ```bash
   git add .
   git commit -m "commit message"
   ```

   Follow the [commit message guidelines](#commit-message-guidelines) below.

3. **Push your branch to your fork**

   ```bash
   git push origin feature/new-feature
   ```

4. **Open a Pull Request (PR)**
   - Go to the original repository on GitHub.
   - Click **"Compare & pull request"**.
   - Provide a clear PR title and description:
     - 📌 What issue does it fix? (if applicable)
     - 📌 What changes were made?
     - 📌 Any additional context?

---

### Commit Message Guidelines

We follow the **Conventional Commits** specification to maintain clear and structured commit messages. This helps both humans and automated tools understand the changes in the project.

#### **Commit Message Structure**

A commit message follows this format:

```plaintext
<type>(optional scope): <description>

[optional body]

[optional footer (e.g., BREAKING CHANGE)]
```

#### **Common Commit Types**

| Type       | Description                                 |
| ---------- | ------------------------------------------- |
| `feat`     | Introduce a new feature to the codebase     |
| `fix`      | Fix a bug in the codebase                   |
| `docs`     | Create/update documentation                 |
| `style`    | Feature and updates related to styling      |
| `refactor` | Refactor a specific section of the codebase |
| `test`     | Add or update code related to testing       |
| `chore`    | Regular code maintenance                    |

#### **Example Commit Messages**

- **Adding a new feature:**

  ```plaintext
  feat(api): add support to create coupons
  ```

- **Fixing a bug:**

  ```plaintext
  fix(auth): resolve login token expiration issue
  ```

- **Updating documentation:**

  ```plaintext
  docs: update API reference for authentication
  ```

- **Breaking changes:**  
  To indicate a breaking change, you can use **BREAKING CHANGE:** in the footer or add **!** after the commit type:

  ```plaintext
  chore!: update Python version to use newer libs

  More recent versions of important project libraries no longer support Python 3.6.
  This has prevented us from using new features offered by such libraries.
  Add support for Python 3.12.

  BREAKING CHANGE: drop support for Python 3.6.
  ```

By following this convention, we ensure a structured and maintainable commit history.

---

## 🔄 Responding to Feedback

If the maintainer requests changes:

1. Make the requested updates in the same branch.
2. Commit and push the changes:
   ```bash
   git add .
   git commit -m "Addressed PR feedback"
   git push origin feature/new-feature
   ```
   The PR will update automatically.

---

## ✅ Final Steps After Merge

Once your PR is merged, clean up your local repository:

1. **Switch back to the `main` branch**
   ```bash
   git checkout main
   ```
2. **Pull the latest changes from upstream**
   ```bash
   git pull upstream main
   ```
3. **Delete the branch locally**
   ```bash
   git branch -d feature/new-feature
   ```
4. **Delete the branch remotely**
   ```bash
   git push origin --delete feature/new-feature
   ```

Now you have successfully contributed to the project! 🎉

### License

This project is licensed under the MIT License.
