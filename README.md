# Anki Free AI Image Occlusion

A modern web application for creating AI-powered image occlusion flashcards, built with React, TypeScript, and Vite.

## Features

- 📄 **PDF Import**: Import PDF documents and create occlusion cards from any page
- 🖼️ **Image Occlusion**: Create interactive occlusion areas on images for effective learning
- 🤖 **AI-Powered**: Leverage OCR and AI to automatically generate occlusion areas
- 💾 **Local Storage**: Store your cards locally using IndexedDB
- 📤 **Export Options**: Export cards to Anki format, JSON, or CSV
- 🎨 **Modern UI**: Clean, responsive interface built with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Custom state manager
- **Database**: IndexedDB via Dexie
- **PDF Handling**: PDF.js
- **Canvas**: Fabric.js
- **OCR**: Tesseract.js
- **File Processing**: JSZip
- **Testing**: Vitest with React Testing Library
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd anki-free-ai-image-occlusion
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── services/      # External service integrations
├── state/         # Global state management
├── utils/         # Utility functions
│   ├── pdf.ts     # PDF handling utilities
│   ├── storage.ts # IndexedDB operations
│   ├── export.ts  # Export functionality
│   ├── ocr.ts     # OCR operations
│   └── common.ts  # Common utilities
└── test/          # Test setup and utilities
```

## Development

This project uses a modern development stack with the following tools:

- **ESLint**: For code linting and error detection
- **Prettier**: For code formatting
- **Husky**: For Git hooks
- **lint-staged**: For running linters on staged files
- **Vitest**: For unit testing
- **TypeScript**: For type safety

### Code Style

The project follows these conventions:

- TypeScript for all new code
- Functional components with hooks
- Tailwind CSS for styling
- Consistent naming and file structure
- Pre-commit hooks ensure code quality

### Testing

Run tests with:

```bash
npm run test
```

For interactive test UI:

```bash
npm run test:ui
```

For coverage report:

```bash
npm run test:coverage
```

## Building

To create a production build:

```bash
npm run build
```

The build will be output to the `dist` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
