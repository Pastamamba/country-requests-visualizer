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

2. Navigate to the project directory:
   ```bash
   cd country-requests-visualizer

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

---

### Contributing

Contributions are welcome! Feel free to open an issue for ideas, or submit a pull request to improve the project.

- Fork the repository
- Create a feature branch (git checkout -b feature/new-feature)
- Commit your changes (git commit -m 'Add a new feature')
- Push to the branch (git push origin feature/new-feature)
- Open a Pull Request in the repository

### License
This project is licensed under the MIT License.
