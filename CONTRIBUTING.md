# Contributing to Anki Free AI Image Occlusion

Thank you for your interest in contributing to our project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When filing a bug report, include:

- **Clear description** of the bug
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Environment details** (browser, OS, version)
- **Screenshots** if applicable
- **Console errors** if any

### Suggesting Features

Feature suggestions are welcome! Please provide:

- **Clear description** of the feature
- **Use case** and why it's valuable
- **Implementation ideas** (optional)
- **Alternatives considered** (optional)

### Code Contributions

#### Setup Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/anki-free-ai-image-occlusion.git
   cd anki-free-ai-image-occlusion
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/anki-free-ai-image-occlusion.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```

#### Development Workflow

1. **Create a new branch** for your contribution:

   ```bash
   git checkout -b feature/your-feature-name
   ```

   Or for bug fixes:

   ```bash
   git checkout -b fix/bug-description
   ```

2. **Make your changes** following our coding standards:
   - Use TypeScript for all new code
   - Follow existing code style and patterns
   - Write meaningful commit messages
   - Add tests for new functionality

3. **Run tests and quality checks**:

   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

4. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** with:
   - Clear title and description
   - Reference any related issues
   - Screenshots for UI changes
   - Testing instructions

## 📝 Coding Standards

### TypeScript Guidelines

- **Strict mode**: All code must pass TypeScript strict checks
- **Type annotations**: Provide explicit types where inference isn't clear
- **Interfaces**: Use interfaces for object shapes
- **Enums**: Prefer string enums over numeric enums
- **Avoid `any`**: Use proper types or `unknown` instead

### React Guidelines

- **Functional components**: Use functional components with hooks only
- **Props interface**: Define interfaces for component props
- **Default props**: Use default parameters instead of defaultProps
- **State management**: Use appropriate state management (useState, useReducer, context)
- **Custom hooks**: Extract reusable logic into custom hooks

### Code Style

- **Naming conventions**:
  - Components: PascalCase (`MyComponent`)
  - Files: kebab-case for utilities (`pdf-utils.ts`), PascalCase for components (`MyComponent.tsx`)
  - Variables/Functions: camelCase (`getUserData`)
  - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

- **File organization**:
  - Group related files together
  - Keep components focused and small
  - Use index files for clean imports

- **Imports**:
  - Order: React → third-party → internal → relative
  - Use named exports for utilities
  - Use default exports for components

### Testing Guidelines

- **Unit tests**: Test utility functions and business logic
- **Component tests**: Test React components with React Testing Library
- **Integration tests**: Test user workflows
- **Coverage**: Aim for 80%+ test coverage
- **Mocking**: Mock external dependencies (PDF.js, Tesseract, etc.)

#### Example Test Structure

```typescript
import { render, screen } from '@testing-library/react'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected text')).toBeInTheDocument()
  })

  it('handles user interaction', async () => {
    // Test user interactions
  })
})
```

## 📋 Pull Request Process

### Before Submitting

- [ ] Code follows project coding standards
- [ ] All tests pass (`npm run test`)
- [ ] No linting errors (`npm run lint`)
- [ ] TypeScript compilation succeeds
- [ ] Added tests for new functionality
- [ ] Updated documentation if needed
- [ ] Self-reviewed the changes

### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Added unit tests
- [ ] Added integration tests
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

## 🏷️ Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:

```
feat: add PDF export functionality
fix: resolve OCR memory leak
docs: update API documentation
test: add component integration tests
```

## 🐛 Issue Triage

When contributing to issue discussions:

- **Be respectful** and constructive
- **Ask clarifying questions** if needed
- **Provide reproduction steps** for bugs
- **Suggest solutions** based on project architecture
- **Avoid duplicate discussions** on existing issues

## 🌟 Recognition

Contributors are recognized in:

- README.md contributors section
- Release notes for significant contributions
- Project documentation

## 📞 Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For general questions and ideas
- **Documentation**: Check existing docs first

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Anki Free AI Image Occlusion! 🎉
