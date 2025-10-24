# Spanish Numbers App

This is a single-page application designed to help users practice writing numbers in words in Spanish. The app generates random numbers (0–1000) and asks the user to type the corresponding Spanish words. It provides instant feedback on correctness.

## Features

- **Random Number Generation**: Numbers are generated based on user-selected ranges (e.g., 0–10, 11–20, 0–1000).
- **Spanish Number Conversion**: Converts numbers to their Spanish word equivalents.
- **Feedback System**: Displays success or error messages based on user input.
- **Responsive Design**: Styled with Tailwind CSS for a clean and responsive UI.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/spanish-numbers-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd spanish-numbers-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

To start the development server with hot-reloading:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Building for Production

To create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

- `src/App.vue`: Main application logic and UI.
- `src/numberToSpanish.js`: Core logic for converting numbers to Spanish words.
- `src/components/`: Contains reusable components like `AlertError` and `AlertSuccess`.
- `public/`: Static assets.
- `package.json`: Project scripts and dependencies.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/).
- Styled with [Tailwind CSS](https://tailwindcss.com/).
