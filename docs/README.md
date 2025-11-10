# Documentation

This directory contains comprehensive documentation for the Anki Free AI Image Occlusion project.

## 📚 Documentation Index

### Getting Started

- [../README.md](../README.md) - Main project documentation
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) - Community code of conduct

### Architecture & Design

- [ADR/](ADR/) - Architecture Decision Records
  - [ADR-001: Offline-First Architecture](ADR/001-offline-first-architecture.md)
  - [ADR-002: WebAssembly Integration](ADR/002-webassembly-integration.md)
  - [ADR-003: React + TypeScript Framework Choice](ADR/003-framework-choice.md)

### Deployment & Operations

- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [QA_CHECKLIST.md](QA_CHECKLIST.md) - Manual QA checklist

## 🏗️ Project Architecture

### High-Level Overview

Anki Free AI Image Occlusion is built as an offline-first progressive web application with the following key architectural decisions:

1. **Offline-First**: All data stored locally using IndexedDB
2. **WebAssembly**: Performance-critical operations using WASM
3. **Modern Stack**: React 18 + TypeScript + Vite
4. **Privacy-First**: No data sent to external servers

### Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Storage**: IndexedDB via Dexie
- **PDF**: PDF.js
- **Canvas**: Fabric.js
- **OCR**: Tesseract.js (WebAssembly)
- **Database**: SQLite WASM (for advanced operations)

## 🚀 Quick Start

### For Developers

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development: `npm run dev`
4. Open `http://localhost:5173`

### For Users

1. Visit the deployed application
2. Import a PDF file
3. Create occlusion areas
4. Export cards to desired format

## 📋 Documentation Standards

### Writing Style

- Use clear, concise language
- Include code examples where helpful
- Provide step-by-step instructions
- Use consistent formatting

### File Organization

- Use kebab-case for file names
- Include table of contents for long documents
- Cross-reference related documents
- Keep documentation up to date

### Code Examples

- Use TypeScript syntax highlighting
- Include imports and context
- Provide working examples
- Add comments for complex logic

## 🔄 Documentation Maintenance

### Regular Updates

- Update documentation with code changes
- Review and update deployment guides
- Keep ADRs current with architectural decisions
- Update testing procedures

### Version Control

- Document version-specific changes
- Maintain backward compatibility notes
- Tag documentation releases
- Track documentation changes

## 🤝 Contributing to Documentation

### How to Contribute

1. Fork the repository
2. Create a documentation branch
3. Make your changes
4. Test any code examples
5. Submit a pull request

### Documentation Types

- **User Documentation**: Guides, tutorials, reference
- **Developer Documentation**: Architecture, API docs, setup
- **Operations Documentation**: Deployment, monitoring, troubleshooting

### Review Process

- Technical accuracy review
- Grammar and style review
- User experience review
- Cross-reference verification

## 📖 Additional Resources

### External Documentation

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Community Resources

- [GitHub Discussions](https://github.com/your-repo/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/anki-occlusion)
- [Discord Community](https://discord.gg/your-invite)

## 📞 Getting Help

### Documentation Issues

- Report documentation bugs via GitHub issues
- Suggest improvements via pull requests
- Ask questions in GitHub discussions

### Technical Support

- Check troubleshooting guides first
- Search existing issues
- Create new issue with details

---

This documentation is maintained by the Anki Free AI Image Occlusion team. Last updated: 2025-01-10
