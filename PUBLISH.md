# How to Publish npm Package Using Automation Token

This guide explains how to publish npm packages using automation tokens to bypass 2FA requirements.

## 🔑 Why Use Automation Tokens?

- **Bypass 2FA** - No need for authenticator apps or OTP codes
- **CI/CD friendly** - Perfect for automated deployments
- **Secure** - Token-based authentication
- **Simple** - One-time setup

## 📋 Step-by-Step Guide

### 1. Create npm Account
```bash
# Create account if you don't have one
npm adduser

# Verify login
npm whoami
```

### 2. Generate Automation Token

1. **Go to npm token settings**: https://www.npmjs.com/settings/tokens
2. **Click "Generate New Token"**
3. **Select "Automation" type** (important!)
4. **Enable "Bypass 2FA"** option
5. **Copy the token** (starts with `npm_`)

**Example token format**: `npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 3. Configure npm with Token

```bash
# Set the token for npm registry
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
```

**Example**:
```bash
npm config set //registry.npmjs.org/:_authToken npm_1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R
```

### 4. Prepare Your Package

Ensure your `package.json` is properly configured:

```json
{
  "name": "your-package-name",
  "version": "1.0.0",
  "description": "Your package description",
  "main": "src/index.js",
  "type": "module",
  "keywords": ["keyword1", "keyword2"],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/repo-name.git"
  }
}
```

### 5. Test Package Locally

```bash
# Check what files will be published
npm pack --dry-run

# Test imports work
node -e "import('./src/index.js').then(console.log)"
```

### 6. Publish Package

```bash
# Publish to npm registry
npm publish

# For scoped packages
npm publish --access public
```

### 7. Verify Publication

```bash
# Check if package is available
npm view your-package-name

# Test installation
npm install your-package-name
```

## 🔒 Security Best Practices

### Token Management
- **Never commit tokens** to version control
- **Use environment variables** in CI/CD
- **Rotate tokens regularly**
- **Revoke unused tokens**

### Environment Variables (CI/CD)
```bash
# Set token as environment variable
export NPM_TOKEN=npm_your_token_here

# Use in CI/CD scripts
npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN
npm publish
```

### GitHub Actions Example
```yaml
name: Publish to npm
on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 🚨 Troubleshooting

### Common Issues

**1. "403 Forbidden" Error**
```bash
# Solution: Ensure you're using Automation token with 2FA bypass
# Regular access tokens still require 2FA
```

**2. "EOTP" Error (Still asking for OTP)**
```bash
# Solution: Token type is wrong - must be "Automation" type
# Delete current token and create new "Automation" token
```

**3. "Package name already exists"**
```bash
# Solution: Choose a unique package name or use scoped packages
npm publish --access public  # for @username/package-name
```

**4. "Invalid token" Error**
```bash
# Solution: Check token is correctly set
npm config get //registry.npmjs.org/:_authToken

# Reset if needed
npm config delete //registry.npmjs.org/:_authToken
npm config set //registry.npmjs.org/:_authToken YOUR_NEW_TOKEN
```

## 📝 Token Types Comparison

| Token Type | 2FA Required | Use Case | Bypass 2FA |
|------------|--------------|----------|-------------|
| **Publish** | ✅ Yes | Manual publishing | ❌ No |
| **Automation** | ❌ No | CI/CD, Scripts | ✅ Yes |
| **Read-only** | ❌ No | Installing packages | ❌ N/A |

## 🔄 Token Lifecycle

### Creating Token
1. Go to npm settings → Tokens
2. Generate New Token → Automation
3. Enable "Bypass 2FA"
4. Copy and store securely

### Using Token
```bash
npm config set //registry.npmjs.org/:_authToken TOKEN
npm publish
```

### Revoking Token
1. Go to npm settings → Tokens
2. Find your token
3. Click "Delete" or "Revoke"

## ✅ Checklist

Before publishing:
- [ ] Package.json is complete
- [ ] Automation token created with 2FA bypass
- [ ] Token configured in npm
- [ ] Package tested locally
- [ ] Unique package name chosen
- [ ] README.md is comprehensive
- [ ] License file included

## 🎉 Success!

Once published, your package will be available at:
- **npm**: `https://www.npmjs.com/package/your-package-name`
- **Install**: `npm install your-package-name`

---

**Note**: Keep your automation tokens secure and never share them publicly!