# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VitePress-based multilingual tutorials website hosted at https://tutorials.tinkink.net. The site contains comprehensive tutorials covering Linux, MySQL, Nginx, Git, VSCode, Mac, media processing, and other development tools.

## Key Commands

- `pnpm dev` or `npm run dev` - Start development server
- `pnpm build` or `npm run build` - Build the site for production
- `pnpm preview` or `npm run preview` - Preview the built site
- `npm run translate` - Translate content using OpenAI API (requires .env with OPENAI_KEY and OPENAI_BASEURL)

## Project Structure

### Content Organization
- `docs/` - Main documentation directory
  - `en/`, `zh-hans/`, `zh-hant/`, `ja/`, `de/`, `es/`, `fr/` - Language-specific content
  - `.vitepress/` - VitePress configuration and sidebar generation
  - `public/` - Static assets (images, ads.txt, robots.txt)
  - `attachments/` - Tutorial screenshots and images

### Build Scripts
- `build/translate.mjs` - Main translation script using OpenAI API
- `build/docs.mjs` - Document reading/writing utilities
- `build/openai.mjs` - OpenAI API integration for translation
- `build/mv.mjs` - File movement utilities

### Content Categories
- **Linux**: System administration, command line basics, DevOps
- **MySQL**: Database fundamentals, SQL commands, timezone handling
- **Nginx**: Web server configuration, reverse proxy, HTTPS
- **Git**: Version control, different project configurations
- **VSCode**: Editor usage, Copilot integration, development containers
- **Mac**: macOS development environment setup
- **Media**: FFmpeg video/audio processing

## Development Workflow

### Adding New Content
1. Create markdown files in `docs/en/` first (English is the source language)
2. Follow the existing folder structure: `docs/en/category/subcategory/filename.md`
3. Use the translation script to generate other language versions
4. The VitePress config automatically generates navigation and sidebars

### Translation Process
The project uses automated translation via OpenAI API:
- Source language: English (`en`)
- Target languages: Chinese (Simplified/Traditional), Japanese, German, Spanish, French
- Code blocks and technical terms are preserved during translation
- Run `npm run translate` to translate all content or use flags for specific languages/documents

### Configuration
- `docs/.vitepress/config.ts` - Main VitePress configuration with multilingual support
- Navigation is centralized and automatically translated
- Sidebar is auto-generated from file structure
- Supports i18n routing and proper SEO meta tags

## Important Notes

- The project uses TypeScript for configuration
- All content must be in Markdown format
- Images should be stored in `docs/attachments/` with appropriate subfolder structure
- The site supports 7 languages with proper i18n routing
- URLs are rewritten to remove chapter folder numbers for cleaner paths
- Environment variables needed for translation: `OPENAI_KEY` and `OPENAI_BASEURL`

## Development Environment

The project uses:
- Node.js with ES modules
- PNPM as package manager (but npm works too)
- VitePress for static site generation
- TypeScript for configuration
- OpenAI API for content translation