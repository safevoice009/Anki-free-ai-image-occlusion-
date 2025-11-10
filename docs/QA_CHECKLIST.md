# Manual QA Checklist

This checklist ensures core functionality is verified before releasing new versions of Anki Free AI Image Occlusion.

## 🚀 Pre-Release Testing

### Environment Setup

- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on different screen sizes (mobile, tablet, desktop)
- [ ] Test with both online and offline connectivity
- [ ] Clear browser cache/storage before testing

### Core Functionality Tests

#### 1. Application Initialization

- [ ] Application loads without JavaScript errors
- [ ] UI renders correctly on all screen sizes
- [ ] Service worker registers successfully
- [ ] Offline functionality works after initial load
- [ ] WebAssembly modules load correctly

#### 2. PDF Import

- [ ] Can import PDF files of various sizes
- [ ] PDF pages render correctly
- [ ] Can navigate between PDF pages
- [ ] Large PDF files handle gracefully (no memory issues)
- [ ] Corrupted PDF files show appropriate error messages
- [ ] PDF import works offline after initial load

#### 3. Image Occlusion Creation

- [ ] Can create occlusion areas on PDF pages
- [ ] Occlusion areas can be resized and moved
- [ ] Multiple occlusion areas can be created
- [ ] Occlusion areas can be deleted
- [ ] Occlusion areas maintain position after page navigation
- [ ] Can save occlusion cards to local storage

#### 4. OCR Functionality

- [ ] OCR processes images correctly
- [ ] OCR results display accurately
- [ ] OCR works with different text sizes and fonts
- [ ] OCR handles non-English text appropriately
- [ ] OCR memory usage stays within acceptable limits
- [ ] OCR provides progress feedback during processing

#### 5. Data Storage

- [ ] Cards save correctly to IndexedDB
- [ ] Cards can be retrieved from storage
- [ ] Cards persist across browser sessions
- [ ] Storage handles large numbers of cards
- [ ] Storage quota warnings work appropriately
- [ ] Data can be cleared without errors

#### 6. Export Functionality

- [ ] Anki export generates correct format
- [ ] JSON export includes all necessary data
- [ ] CSV export works correctly
- [ ] Export files download successfully
- [ ] Exported files can be imported in target applications
- [ ] Large exports handle memory properly

#### 7. User Interface

- [ ] All buttons and controls are responsive
- [ ] Loading states display appropriately
- [ ] Error messages are clear and helpful
- [ ] Tooltips and help text display correctly
- [ ] Keyboard navigation works where expected
- [ ] Accessibility features (ARIA labels, etc.) work

#### 8. Performance Tests

- [ ] Application loads within acceptable time (< 3 seconds)
- [ ] PDF import completes within reasonable time
- [ ] OCR processing doesn't block UI
- [ ] Memory usage stays within acceptable limits
- [ ] Animations and transitions are smooth
- [ ] No memory leaks during extended use

## 📱 Cross-Platform Testing

### Desktop Browsers

- [ ] Chrome (latest version)
- [ ] Firefox (latest version)
- [ ] Safari (latest version)
- [ ] Edge (latest version)

### Mobile Browsers

- [ ] Chrome on Android
- [ ] Safari on iOS
- [ ] Firefox on Android
- [ ] Edge on mobile

### Responsive Design

- [ ] Mobile view (< 768px)
- [ ] Tablet view (768px - 1024px)
- [ ] Desktop view (> 1024px)
- [ ] Ultra-wide screens

## 🔒 Security & Privacy Tests

- [ ] No data sent to external servers without consent
- [ ] Local storage encryption works correctly
- [ ] File upload validation works properly
- [ ] XSS protection is effective
- [ ] CSP headers are correctly implemented
- [ ] Sensitive data is cleared on logout/clear

## 🌐 Offline Functionality

- [ ] Application works completely offline after initial load
- [ ] All features work without internet connection
- [ ] Data syncs when connection is restored (if applicable)
- [ ] Offline indicators work correctly
- [ ] Caching strategies work as expected

## 🧪 Edge Cases

### File Handling

- [ ] Very large PDF files (> 100MB)
- [ ] PDFs with many pages (> 100)
- [ ] Corrupted or invalid files
- [ ] Files with special characters in names
- [ ] Multiple file uploads simultaneously

### Data Management

- [ ] Maximum storage quota reached
- [ ] Very large numbers of cards (> 1000)
- [ ] Cards with very long text content
- [ ] Special characters in card content
- [ ] Concurrent data operations

### Browser Behavior

- [ ] Browser refresh during operations
- [ ] Browser back/forward navigation
- [ ] Multiple tabs of the application
- [ ] Browser memory pressure
- [ ] Network interruptions during operations

## 📊 Performance Benchmarks

### Load Performance

- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1

### Runtime Performance

- [ ] OCR processing time < 10s per page
- [ ] PDF import time < 5s per 10 pages
- [ ] UI response time < 100ms
- [ ] Memory usage < 512MB during normal use

## 🔧 Development Environment Tests

- [ ] Development server starts without errors
- [ ] Production build completes successfully
- [ ] All tests pass in CI/CD
- [ ] Linting shows no errors
- [ ] TypeScript compilation succeeds
- [ ] Build size is within acceptable limits

## 📝 Release Sign-off

Before releasing, ensure:

- [ ] All critical tests pass
- [ ] No blocking bugs in issue tracker
- [ ] Documentation is updated
- [ ] Version number is updated
- [ ] Release notes are prepared
- [ ] Deployment configuration is verified

## 🐛 Bug Reporting Template

If issues are found during testing, document:

1. **Environment**: Browser, OS, device
2. **Steps to Reproduce**: Detailed reproduction steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happened
5. **Screenshots/Videos**: Visual evidence
6. **Console Errors**: Any JavaScript errors
7. **Additional Context**: Other relevant information

---

**Note**: This checklist should be updated regularly as new features are added or existing ones are modified.
