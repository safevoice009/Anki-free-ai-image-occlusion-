# Deployment Guide

This guide covers deployment options and configurations for Anki Free AI Image Occlusion.

## 🚀 Quick Deployment Options

### Netlify (Recommended)

#### Prerequisites

- GitHub/GitLab/Bitbucket repository
- Netlify account

#### Steps

1. **Connect Repository**
   - Sign in to Netlify
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider and select the repository

2. **Configure Build Settings**

   ```
   Build command: npm run build
   Publish directory: dist
   Node version: 18
   ```

3. **Environment Variables** (Optional)
   - No required variables for basic deployment

4. **Deploy**
   - Netlify will automatically deploy on git push
   - Preview deployments available for pull requests

#### Custom Headers

The `netlify.toml` file in the repository includes necessary headers for WebAssembly support.

### Vercel

#### Prerequisites

- GitHub/GitLab/Bitbucket repository
- Vercel account

#### Steps

1. **Import Project**
   - Sign in to Vercel
   - Click "Add New..." → "Project"
   - Import your repository

2. **Configure Build Settings**

   ```
   Build Command: npm run build
   Output Directory: dist
   Node Version: 18.x
   ```

3. **Deploy**
   - Vercel will automatically deploy on git push
   - Preview deployments available for pull requests

#### Custom Headers

The `vercel.json` file includes necessary headers for WebAssembly support.

### GitHub Pages

#### Prerequisites

- GitHub repository
- GitHub account

#### Steps

1. **Configure GitHub Actions**
   Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages

## 🔧 Configuration Details

### WebAssembly Headers

Both Netlify and Vercel configurations include these critical headers for WebAssembly:

```http
Content-Type: application/wasm
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

### Security Headers

Recommended security headers included in configurations:

```http
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### Caching Strategy

Optimized caching for static assets:

```http
# WASM, JS, CSS files
Cache-Control: public, max-age=31536000, immutable

# HTML files
Cache-Control: public, max-age=0, must-revalidate
```

## 🌐 Custom Domain Setup

### Netlify

1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records as instructed
4. Enable HTTPS (automatic)

### Vercel

1. Go to Project settings → Domains
2. Add custom domain
3. Update DNS records as instructed
4. HTTPS enabled automatically

### GitHub Pages

1. Go to repository Settings → Pages
2. Add custom domain in Custom domain section
3. Update DNS records:
   ```
   CNAME: your-domain.com -> username.github.io
   A: @ -> 185.199.108.153
   A: @ -> 185.199.109.153
   A: @ -> 185.199.110.153
   A: @ -> 185.199.111.153
   ```

## 📊 Performance Optimization

### Build Optimizations

The production build includes:

- Code splitting for better caching
- Tree shaking to remove unused code
- Minification of JavaScript and CSS
- Image optimization
- Source maps (development only)

### CDN Configuration

For optimal performance:

- Use CDN provider (Netlify/Vercel include this)
- Enable HTTP/2 and HTTP/3
- Configure edge caching
- Use Brotli compression

### Monitoring

Set up monitoring for:

- Core Web Vitals (LCP, FID, CLS)
- Error rates and crash reporting
- Performance metrics
- User experience analytics

## 🔒 Security Considerations

### HTTPS

- Enforce HTTPS in production
- Use HSTS headers
- Configure SSL certificates

### Content Security Policy

Recommended CSP for WebAssembly applications:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; worker-src 'self'; font-src 'self'; img-src 'self' data: blob:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';
```

### Input Validation

- Validate all file uploads
- Sanitize user inputs
- Implement rate limiting
- Monitor for abuse

## 🚨 Troubleshooting

### Common Issues

#### WebAssembly Loading Errors

**Symptoms**: Console errors about WASM files
**Solutions**:

- Verify WASM headers are configured correctly
- Check MIME type configuration
- Ensure HTTPS is enabled (WASM requires secure context)
- Verify SharedArrayBuffer headers if needed

#### Build Failures

**Symptoms**: Build process fails
**Solutions**:

- Check Node.js version (requires 18+)
- Verify all dependencies installed
- Check TypeScript compilation errors
- Review build logs for specific errors

#### Performance Issues

**Symptoms**: Slow loading or poor performance
**Solutions**:

- Enable code splitting
- Optimize bundle size
- Implement lazy loading
- Check WebAssembly module loading

#### CORS Issues

**Symptoms**: Cross-origin errors in console
**Solutions**:

- Verify CORS headers configuration
- Check WebAssembly specific headers
- Ensure proper CSP configuration

### Debugging Tools

#### Browser DevTools

- Network tab for loading issues
- Console for JavaScript errors
- Performance tab for profiling
- Memory tab for memory leaks

#### Lighthouse

- Performance audits
- Accessibility checks
- Best practices verification
- SEO optimization

#### WebAssembly Inspector

- Chrome DevTools WebAssembly panel
- Debug WASM modules
- Performance profiling

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: 'Deploy from GitHub Actions'
          enable-pull-request-comment: false
          enable-commit-comment: false
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📋 Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] Build completes successfully
- [ ] Manual QA checklist completed
- [ ] Performance metrics meet targets
- [ ] Security headers configured
- [ ] WebAssembly modules load correctly
- [ ] Offline functionality works
- [ ] Error monitoring configured
- [ ] Backup strategy in place
- [ ] Rollback plan prepared

## 📚 Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [WebAssembly Best Practices](https://webassembly.org/getting-started/developers-guide/)
- [Progressive Web Apps](https://web.dev/progressive-web-apps/)
