# ADR-003: React + TypeScript Framework Choice

## Status

Accepted

## Context

Anki Free AI Image Occlusion is a complex single-page application requiring:

- Rich user interface with interactive elements
- State management for cards, projects, and UI state
- Component reusability across different features
- Type safety for maintainability
- Good ecosystem and community support
- Performance optimization for large datasets

## Decision

Use React 18 with TypeScript as the primary frontend framework, complemented by:

- **Vite** for build tooling and development experience
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Custom state management** for simplicity

## Consequences

### Positive

- **Type Safety**: Compile-time error detection and better IDE support
- **Ecosystem**: Large ecosystem of libraries and community support
- **Performance**: React 18 improvements with concurrent features
- **Developer Experience**: Excellent tooling and debugging capabilities
- **Maintainability**: Strong typing makes code easier to maintain
- **Learning Curve**: Widely known framework, easier to find developers

### Negative

- **Bundle Size**: React adds to initial bundle size
- **Complexity**: More complex than vanilla JavaScript
- **Framework Lock-in**: Tied to React ecosystem
- **Performance Overhead**: Virtual DOM adds some overhead
- **Learning Curve**: TypeScript adds complexity for beginners

## Implementation Details

### Component Architecture

```typescript
// Example component with TypeScript
interface OcclusionAreaProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onUpdate: (id: string, updates: Partial<OcclusionArea>) => void;
  onDelete: (id: string) => void;
}

export const OcclusionArea: React.FC<OcclusionAreaProps> = ({
  id,
  x,
  y,
  width,
  height,
  onUpdate,
  onDelete,
}) => {
  // Component implementation
};
```

### State Management Strategy

```typescript
// Custom state management with TypeScript
interface AppState {
  currentProject: Project | null;
  cards: Card[];
  ui: UIState;
  settings: UserSettings;
}

class StateManager {
  private state: AppState;
  private listeners: Set<(state: AppState) => void>;

  setState(updates: Partial<AppState>): void;
  getState(): AppState;
  subscribe(listener: (state: AppState) => void): () => void;
}
```

### Routing Configuration

```typescript
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'editor/:projectId', element: <EditorPage /> },
      { path: 'settings', element: <SettingsPage /> }
    ]
  }
])
```

## Development Workflow

### TypeScript Configuration

- Strict mode enabled for maximum type safety
- Path mapping for cleaner imports
- ESLint integration for code quality
- Automatic type generation for APIs

### Component Patterns

- Functional components with hooks only
- Custom hooks for reusable logic
- Props interfaces for all components
- Storybook for component development

### Performance Optimizations

- React.memo for expensive components
- useMemo and useCallback for optimization
- Code splitting with React.lazy
- Virtual scrolling for large lists

## Alternatives Considered

### Vue.js + TypeScript

- **Pros**: Simpler learning curve, smaller bundle size
- **Cons**: Smaller ecosystem, less TypeScript adoption
- **Rejected**: Smaller ecosystem and community support

### Svelte + TypeScript

- **Pros**: No virtual DOM, smaller bundles, better performance
- **Cons**: Smaller ecosystem, less mature TypeScript support
- **Rejected**: Less mature TypeScript tooling and ecosystem

### Vanilla TypeScript

- **Pros**: Maximum performance, no framework overhead
- **Cons**: More boilerplate, no built-in state management
- **Rejected**: Development time would increase significantly

### Angular + TypeScript

- **Pros**: Comprehensive framework, strong TypeScript integration
- **Cons**: Steep learning curve, larger bundle size, more opinionated
- **Rejected**: Too complex for project requirements

## Migration Strategy

### Phase 1: Core Framework

- Set up React + TypeScript with Vite
- Implement basic routing and layout
- Create core component library

### Phase 2: Feature Implementation

- Implement PDF viewer component
- Create occlusion editor
- Add export functionality

### Phase 3: Optimization

- Implement performance optimizations
- Add error boundaries
- Improve accessibility

## Quality Assurance

### Type Safety

- 100% TypeScript coverage
- Strict type checking enabled
- No `any` types allowed
- Comprehensive interface definitions

### Testing Strategy

- Unit tests for utilities and hooks
- Component tests with React Testing Library
- Integration tests for user workflows
- E2E tests for critical paths

### Code Quality

- ESLint rules for React and TypeScript
- Prettier for consistent formatting
- Pre-commit hooks for quality checks
- Regular dependency updates

## Future Considerations

1. **React Server Components**: When stable, consider for performance
2. **State Management**: Evaluate Zustand or Jotai for complex state
3. **Performance**: Implement React concurrent features
4. **Mobile**: Consider React Native for mobile app

## Related Decisions

- [ADR-001: Offline-First Architecture](001-offline-first-architecture.md)
- [ADR-002: WebAssembly Integration](002-webassembly-integration.md)

## References

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
