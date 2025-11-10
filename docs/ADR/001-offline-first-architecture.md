# ADR-001: Offline-First Architecture

## Status

Accepted

## Context

Anki Free AI Image Occlusion is a tool for creating educational flashcards from PDF documents. Users need reliable access to their learning materials regardless of internet connectivity. The application handles sensitive educational content that users may not want stored on third-party servers.

## Decision

Implement an offline-first architecture using IndexedDB via Dexie for local data storage, with all core functionality available without an internet connection after initial page load.

## Consequences

### Positive

- **Privacy**: User data never leaves their device unless explicitly exported
- **Reliability**: Application works regardless of internet connectivity
- **Performance**: Faster response times with local data access
- **Cost**: No server infrastructure or hosting costs for data storage
- **Simplicity**: No backend API required for core functionality
- **GDPR Compliance**: Easier compliance as data stays local

### Negative

- **Storage Limits**: Browser storage quotas may limit large datasets
- **Data Loss Risk**: Users can lose data if browser storage is cleared
- **Sync Complexity**: Future multi-device sync will require additional infrastructure
- **Backup Responsibility**: Users must manage their own data backups
- **Cross-Device Access**: Data not automatically available across devices

## Implementation Details

### Storage Strategy

```typescript
// IndexedDB schema using Dexie
class AppDatabase extends Dexie {
  cards!: Table<Card>;
  projects!: Table<Project>;
  settings!: Table<Settings>;

  constructor() {
    super('AnkiOcclusionDB');
    this.version(1).stores({
      cards: '++id, projectId, createdAt, updatedAt',
      projects: '++id, name, createdAt, updatedAt',
      settings: 'id, key, value',
    });
  }
}
```

### Service Worker Implementation

- Cache all static assets for offline access
- Implement fallback strategies for dynamic content
- Update cache when new versions are available

### Data Management

- Automatic local storage of all user data
- Export functionality for data backup
- Import functionality for data restoration

## Alternatives Considered

### Cloud-Based Storage

- **Pros**: Automatic backup, cross-device sync, larger storage capacity
- **Cons**: Privacy concerns, infrastructure costs, dependency on internet
- **Rejected**: Privacy and reliability concerns outweigh benefits

### Hybrid Approach

- **Pros**: Best of both worlds with local cache and cloud backup
- **Cons**: Increased complexity, requires authentication
- **Rejected**: Adds unnecessary complexity for current requirements

### Server-Side Application

- **Pros**: Centralized control, easier updates
- **Cons**: Higher costs, privacy concerns, single point of failure
- **Rejected**: Doesn't align with privacy-first requirements

## Future Considerations

1. **Optional Cloud Sync**: Implement user-controlled cloud backup
2. **Export/Import Enhancements**: More formats and automated backup
3. **Storage Management**: Tools for managing local storage usage
4. **Progressive Web App**: Full PWA capabilities for better offline experience

## Related Decisions

- [ADR-002: WebAssembly Integration](002-webassembly-integration.md)
- [ADR-003: React + TypeScript Framework Choice](003-framework-choice.md)

## References

- [Offline First Architecture](https://offlinefirst.org/)
- [Progressive Web Apps](https://web.dev/progressive-web-apps/)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Dexie.js Documentation](https://dexie.org/docs/)
