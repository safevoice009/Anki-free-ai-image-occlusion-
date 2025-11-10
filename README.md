# Anki Free AI Image Occlusion

A modern web application for creating AI-powered image occlusion flashcards, built with React, TypeScript, and Vite. This tool enables students and educators to create effective learning materials through interactive image occlusion techniques.

## 🌟 Features

- 📄 **PDF Import**: Import PDF documents and create occlusion cards from any page
- 🖼️ **Image Occlusion**: Create interactive occlusion areas on images for effective learning
- 🤖 **AI-Powered**: Leverage OCR and AI to automatically generate occlusion areas
- 💾 **Local Storage**: Store your cards locally using IndexedDB for offline access
- 📤 **Export Options**: Export cards to Anki format, JSON, or CSV
- 🎨 **Modern UI**: Clean, responsive interface built with Tailwind CSS
- 🔄 **Offline-First**: Works completely offline once loaded
- ⚡ **Performance**: Fast and efficient with WebAssembly optimizations

## 🛠️ Tech Stack

### Core Framework

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Custom state manager

### Data & Storage

- **Database**: IndexedDB via Dexie
- **File Processing**: JSZip
- **SQLite**: @sqlite.org/sqlite-wasm for advanced data operations

### Media & AI

- **PDF Handling**: PDF.js
- **Canvas**: Fabric.js
- **OCR**: Tesseract.js with WebAssembly support

### Development & Testing

- **Testing**: Vitest with React Testing Library
- **Code Quality**: ESLint, Prettier, Husky, lint-staged
- **Type Safety**: TypeScript with strict mode

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: use LTS version)
- npm 9+ or yarn 1.22+
- Modern web browser with JavaScript and WebAssembly support

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/anki-free-ai-image-occlusion.git
cd anki-free-ai-image-occlusion
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:5173`

### Quick Verification

Once the development server is running, you should be able to:

- Import a PDF file
- Create occlusion areas on images
- Export cards to different formats
- Access the application offline (after initial load)

## 📜 Available Scripts

### Development

- `npm run dev` - Start development server with hot reload
- `npm run preview` - Preview production build locally

### Building & Testing

- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run test` - Run tests in watch mode
- `npm run test:ui` - Run tests with interactive UI
- `npm run test:coverage` - Run tests with coverage report

### Code Quality

- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Automatically fix ESLint issues
- `npm run type-check` - Run TypeScript type checking without emitting files
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without changing files

### Git Hooks

- `npm run prepare` - Install Husky git hooks (runs automatically on install)

## 📁 Project Structure

```
anki-free-ai-image-occlusion/
├── public/              # Static assets (auto-generated)
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── ui/         # Base UI components
│   │   └── features/   # Feature-specific components
│   ├── pages/         # Page components and routing
│   ├── hooks/         # Custom React hooks
│   ├── services/      # External service integrations
│   ├── state/         # Global state management
│   ├── utils/         # Utility functions
│   │   ├── pdf.ts     # PDF handling utilities
│   │   ├── storage.ts # IndexedDB operations
│   │   ├── export.ts  # Export functionality (Anki/JSON/CSV)
│   │   ├── ocr.ts     # OCR operations
│   │   └── common.ts  # Common utilities
│   ├── test/          # Test setup and utilities
│   ├── App.tsx        # Root application component
│   └── main.tsx       # Application entry point
├── docs/              # Additional documentation
├── .husky/            # Git hooks
├── dist/              # Production build output
└── Configuration files
    ├── vite.config.ts    # Vite configuration
    ├── tsconfig.json     # TypeScript configuration
    ├── tailwind.config.js # Tailwind CSS configuration
    └── .eslintrc.cjs      # ESLint configuration
```

## 🛠️ Development Workflow

### Development Tools

This project uses a modern development stack with the following tools:

- **ESLint**: For code linting and error detection
- **Prettier**: For code formatting
- **Husky**: For Git hooks
- **lint-staged**: For running linters on staged files
- **Vitest**: For unit testing with Jest compatibility
- **TypeScript**: For type safety with strict mode

### Code Style & Conventions

The project follows these conventions:

- **TypeScript**: Strict mode enabled for all new code
- **React**: Functional components with hooks only
- **Styling**: Tailwind CSS utility classes
- **Naming**:
  - Components: PascalCase
  - Files: kebab-case for utilities, PascalCase for components
  - Variables/Functions: camelCase
- **File Structure**: Organized by feature and concern
- **Pre-commit hooks**: Automatically ensure code quality

### Development Process

1. **Create a feature branch** from `main`
2. **Write code** following the conventions above
3. **Test thoroughly** using the test commands
4. **Run linting, type checking, and formatting** (hooks will catch issues)
5. **Commit changes** with descriptive messages
6. **Create pull request** for review

### Testing Strategy

```bash
# Run all tests in watch mode
npm run test

# Interactive test UI for debugging
npm run test:ui

# Generate coverage report
npm run test:coverage
```

**Testing Guidelines:**

- Write unit tests for utility functions
- Test React components with React Testing Library
- Aim for 80%+ code coverage
- Test user interactions and edge cases
- Mock external dependencies (PDF.js, Tesseract, etc.)

## 🏗️ Building & Deployment

### Production Build

To create a production build:

```bash
npm run build
```

The build will be output to the `dist` directory and includes:

- Optimized JavaScript and CSS bundles
- WebAssembly files for OCR and SQLite
- Proper MIME types and headers for WASM files
- Source maps for debugging (in development)

### Local Preview

To preview the production build locally:

```bash
npm run build
npm run preview
```

### Deployment Platforms

#### Netlify Deployment

1. **Connect Repository**: Link your Git repository to Netlify
2. **Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18` (or latest LTS)

3. **Environment Variables** (if needed):
   - No required variables for basic deployment

4. **Headers Configuration** (add in `netlify.toml`):

```toml
[[headers]]
  for = "/*.wasm"
  [headers.values]
    Content-Type = "application/wasm"
    Cross-Origin-Embedder-Policy = "require-corp"
    Cross-Origin-Opener-Policy = "same-origin"
```

#### Vercel Deployment

1. **Import Project**: Connect your Git repository to Vercel
2. **Build Settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Node Version**: `18.x`

3. **Headers Configuration** (add `vercel.json`):

```json
{
  "headers": [
    {
      "source": "/(.*).wasm",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/wasm"
        },
        {
          "key": "Cross-Origin-Embedder-Policy",
          "value": "require-corp"
        },
        {
          "key": "Cross-Origin-Opener-Policy",
          "value": "same-origin"
        }
      ]
    }
  ]
}
```

### Static File Hosting

For other static hosting providers, ensure:

1. WASM files have `application/wasm` MIME type
2. Proper CORS headers for WebAssembly
3. Support for single-page application routing

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for detailed information.

### Quick Start for Contributors

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following our code conventions
4. **Run tests and quality checks**: `npm run test && npm run lint && npm run type-check`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Create a Pull Request**

### Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand our community standards.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏛️ Architecture Decisions

### Key Technology Choices

#### React + TypeScript

- **Decision**: React with TypeScript for type safety and better developer experience
- **Rationale**: Strong typing catches errors early, excellent ecosystem, and component reusability
- **Alternatives considered**: Vue.js, Svelte, plain JavaScript

#### Vite Build Tool

- **Decision**: Vite for fast development and optimized builds
- **Rationale**: Lightning-fast HMR, modern bundling, excellent TypeScript support
- **Alternatives considered**: Webpack, Rollup, Parcel

#### Offline-First Architecture

- **Decision**: Store all data locally using IndexedDB via Dexie
- **Rationale**: Privacy-focused, no server costs, works offline, faster performance
- **Alternatives considered**: Cloud storage, server-side database

#### WebAssembly Integration

- **Decision**: Use WASM for OCR (Tesseract.js) and SQLite operations
- **Rationale**: Near-native performance for compute-heavy tasks, cross-platform compatibility
- **Trade-offs**: Larger initial bundle size, but better user experience for intensive operations

#### Tailwind CSS

- **Decision**: Utility-first CSS framework
- **Rationale**: Rapid development, consistent design system, small bundle size with purging
- **Alternatives considered**: Styled Components, CSS Modules, Bootstrap

### Data Flow Architecture

```
User Interface (React Components)
         ↓
     State Management
         ↓
   Services Layer
    ↓        ↓
Storage   External APIs
(IndexedDB) (PDF.js, Tesseract)
```

### Offline Strategy

1. **Service Worker**: Cache all static assets for offline access
2. **Local Storage**: All user data stored in IndexedDB
3. **Progressive Enhancement**: Core functionality works without network
4. **Sync Strategy**: Future consideration for optional cloud sync

### Security Considerations

- **Content Security Policy**: Configured for WebAssembly requirements
- **Input Validation**: All file uploads validated before processing
- **Data Privacy**: No data sent to external servers unless explicitly requested
- **HTTPS Required**: For production deployment to ensure secure WASM execution

## 📚 Documentation

For detailed documentation, please visit our [docs/](docs/) directory:

- **[Architecture Decisions](docs/ADR/)** - Technical decisions and rationale
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Complete deployment instructions
- **[QA Checklist](docs/QA_CHECKLIST.md)** - Manual testing procedures
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to the project
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Community guidelines

## 🙏 Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) for PDF rendering
- [Fabric.js](http://fabricjs.com/) for canvas manipulation
- [Tesseract.js](https://tesseract.projectnaptha.com/) for OCR capabilities
- [Dexie](https://dexie.org/) for IndexedDB wrapper
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS framework

## 📞 Support

- 🐛 **Report Issues**: [GitHub Issues](https://github.com/your-username/anki-free-ai-image-occlusion/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/anki-free-ai-image-occlusion/discussions)
- 📖 **Documentation**: [Project Docs](docs/)

---

**Built with ❤️ for the open-source education community**
