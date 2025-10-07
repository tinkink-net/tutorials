# Git Hooks and Automation

## Introduction
Git hooks are scripts that run at specific lifecycle events, enabling automation for quality, security, and compliance. This tutorial covers local hooks, server-side hooks (conceptually), and modern tooling wrappers.

## Hook Categories
| Type | Runs When | Example Use |
|------|-----------|-------------|
| Client (local) | Developer actions | Lint before commit |
| Server-side | Push / receive | Enforce commit policy |

## Location
`.git/hooks/` directory contains sample scripts (with `.sample` suffix). Enable by removing suffix and making executable.

## Common Client Hooks
| Hook | Trigger | Example |
|------|---------|---------|
| pre-commit | Before committing staged snapshot | Lint / format / test subset |
| commit-msg | After message entered | Enforce conventional commits |
| pre-push | Before push | Run fast test suite |
| post-merge | After merge | Install dependencies |
| prepare-commit-msg | Before editor opens | Inject template |

## Simple Pre-Commit Example
`.git/hooks/pre-commit`:
```bash
#!/usr/bin/env bash
echo "Running lint..."
eslint . || exit 1
```
Make executable:
```bash
chmod +x .git/hooks/pre-commit
```

## Commit Message Validation
`.git/hooks/commit-msg`:
```bash
#!/usr/bin/env bash
MSG_FILE=$1
PATTERN='^(feat|fix|docs|refactor|test|chore|perf)(\(.+\))?: .+'
if ! grep -Eq "$PATTERN" "$MSG_FILE"; then
  echo "Commit message must follow conventional format" >&2
  exit 1
fi
```

## Sharing Hooks (Problem & Solution)
Local hooks are not versioned by default. Solutions:
1. Use a wrapper tool (Husky, Lefthook, pre-commit)
2. Custom script: store hooks in `./hooks` and symlink/copy

### Husky Example (JavaScript Project)
```bash
npx husky add .husky/pre-commit "npm test"
```
Creates `.husky/pre-commit` maintained in repo.

### Python `pre-commit` Framework Example
`.pre-commit-config.yaml` snippet:
```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 24.3.0
    hooks:
      - id: black
```
Install:
```bash
pre-commit install
```

## Server-Side Hooks (Overview)
Exist on remote (bare) repos: `pre-receive`, `update`, `post-receive` for enforcing policy (signed commits, size limits). Usually managed by platform (GitHub Actions / GitLab push rules).

## What to Automate
- Lint & format
- Type check
- Secret scanning
- Unit tests (fast subset)
- Commit message quality
- License header insertion

## What NOT to Automate in Hooks
- Long integration tests (push/CI instead)
- Heavy builds (slow dev loop)
- External deployments (use CI/CD triggers)

## Failing Fast Philosophy
Catch low-effort issues locally; keep CI green and reviewers focused on logic, not style.

## Security Considerations
Only run trusted hook code. Review third-party hook frameworks pinned to versions.

## Disabling Temporarily
```bash
git commit --no-verify
```
Use sparingly; investigate why a hook fails.

## Auditing Hook Performance
Log durations; if pre-commit > 2–3s, developers will bypass. Optimize by scoping (e.g., lint changed files only).

## Example Fast Lint Script (Changed Files)
```bash
#!/usr/bin/env bash
CHANGED=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(js|ts|jsx|tsx)$') || true
if [ -z "$CHANGED" ]; then
  echo "No JS/TS changes."; exit 0
fi
eslint $CHANGED || exit 1
```

## Summary
Hooks raise baseline quality, shift feedback left, and encode cultural standards. Keep them fast, versioned, and transparent.

## Next Steps
- Team practices (`git-best-practices-for-team-collaboration.md`)
- Submodules (`git-submodules-and-large-repositories.md`)

---
**Key Commands**
```bash
git config core.hooksPath hooks
chmod +x .git/hooks/<hook>
```
