# ADR-002: WebAssembly Integration

## Status

Accepted

## Context

Anki Free AI Image Occlusion requires computationally intensive operations including:

- OCR (Optical Character Recognition) for text extraction
- PDF rendering and manipulation
- Image processing for occlusion creation
- Potential future: SQLite for advanced data operations

These operations need to run efficiently in the browser while maintaining performance and user experience.

## Decision

Integrate WebAssembly modules for compute-intensive operations, specifically:

- Tesseract.js for OCR capabilities
- @sqlite.org/sqlite-wasm for advanced database operations
- PDF.js with WebAssembly support for PDF processing

## Consequences

### Positive

- **Performance**: Near-native performance for intensive computations
- **Cross-Platform**: Consistent performance across different platforms
- **Offline Capability**: Full functionality without server dependencies
- **Security**: Sandboxed execution environment
- **Future-Proof**: Easy to add new WASM modules as needed

### Negative

- **Bundle Size**: Increased initial download size
- **Loading Time**: Additional time for WASM module initialization
- **Complexity**: More complex build and deployment configuration
- **Browser Support**: Requires modern browsers with WASM support
- **Memory Usage**: Higher memory consumption for WASM modules

## Implementation Details

### OCR Integration

```typescript
import Tesseract from 'tesseract.js';

// OCR with WebAssembly backend
const recognizeText = async (imageData: ImageData) => {
  const worker = await Tesseract.createWorker({
    logger: (m) => console.log(m),
    workerPath: '/node_modules/tesseract.js/dist/worker.min.js',
    langPath: '/lang-data',
    corePath: '/node_modules/tesseract.js-core/tesseract-core.wasm.js',
  });

  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const {
    data: { text },
  } = await worker.recognize(imageData);
  await worker.terminate();

  return text;
};
```

### SQLite Integration

```typescript
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const initializeDatabase = async () => {
  const sqlite3 = await sqlite3InitModule();
  const db = new sqlite3.oo1.DB(':memory:');

  // Advanced database operations
  return db;
};
```

### Headers Configuration

Required headers for WASM modules:

```toml
# netlify.toml
[[headers]]
  for = "/*.wasm"
  [headers.values]
    Content-Type = "application/wasm"
    Cross-Origin-Embedder-Policy = "require-corp"
    Cross-Origin-Opener-Policy = "same-origin"
```

## Performance Optimizations

### Lazy Loading

- Load WASM modules only when needed
- Implement loading states and progress indicators
- Cache compiled WASM modules in IndexedDB

### Memory Management

- Proper cleanup of WASM instances
- Monitor memory usage during intensive operations
- Implement fallbacks for low-memory devices

### Progressive Enhancement

- Graceful degradation if WASM fails to load
- Alternative implementations for critical features
- Clear error messaging for unsupported browsers

## Browser Support Matrix

| Browser     | WASM Support | SharedArrayBuffer | Notes        |
| ----------- | ------------ | ----------------- | ------------ |
| Chrome 57+  | ✅           | ✅                | Full support |
| Firefox 52+ | ✅           | ✅                | Full support |
| Safari 11+  | ✅           | ✅                | Full support |
| Edge 16+    | ✅           | ✅                | Full support |

## Alternatives Considered

### Pure JavaScript Implementation

- **Pros**: Smaller bundle size, broader browser support
- **Cons**: Poorer performance, longer processing times
- **Rejected**: Performance impact too significant for user experience

### Server-Side Processing

- **Pros**: Offload processing from client
- **Cons**: Requires server infrastructure, privacy concerns
- **Rejected**: Goes against offline-first architecture

### Web Workers (without WASM)

- **Pros**: Non-blocking UI, better performance than main thread
- **Cons**: Still JavaScript limitations, memory constraints
- **Rejected**: Performance insufficient for OCR operations

## Monitoring and Debugging

### Performance Metrics

- WASM module load times
- Memory usage during operations
- Processing time for OCR tasks
- Error rates and fallback usage

### Debugging Tools

- Chrome DevTools WebAssembly inspector
- Performance profiling for WASM modules
- Memory leak detection for long-running operations

## Future Enhancements

1. **Additional WASM Modules**: Image processing, compression
2. **WebGPU Integration**: GPU acceleration for image operations
3. **Streaming WASM**: Progressive loading for large modules
4. **Custom WASM Modules**: Domain-specific optimizations

## Related Decisions

- [ADR-001: Offline-First Architecture](001-offline-first-architecture.md)
- [ADR-003: React + TypeScript Framework Choice](003-framework-choice.md)

## References

- [WebAssembly Official Site](https://webassembly.org/)
- [Tesseract.js Documentation](https://tesseract.projectnaptha.com/)
- [SQLite WASM Documentation](https://sqlite.org/wasm/doc/trunk/index.md)
