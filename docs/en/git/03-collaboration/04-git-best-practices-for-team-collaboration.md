# Git Best Practices for Team Collaboration

## Introduction
Beyond commands, effective collaboration depends on *shared discipline*. This guide enumerates pragmatic, enforceable practices that scale from small teams to large organizations.

## Philosophy
Golden principles:
1. **Clarity beats cleverness** (history tells a story)
2. **Smaller changes ship faster**
3. **Automation over manual policing**
4. **Reproducibility = reliability**

## Branch Strategy Patterns
| Strategy | Description | When to Use |
|----------|-------------|-------------|
| Trunk-Based | Short-lived branches merged into `main` rapidly | Fast-moving teams, CI maturity |
| GitHub Flow | Feature branch → PR → merge → deploy | SaaS, continuous delivery |
| Git Flow | `develop`, release, hotfix branches | Versioned products, slower cadence |
| Release Train | Time-boxed merges & releases | Coordinated multi-team releases |

Pick the simplest that meets governance needs. Avoid over-engineering.

## Commit Message Convention (Example)
```
<type>(<scope>): <short summary>

<body>

<footer>
```
Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`.
Use conventional commits to enable automated changelogs.

## Enforce via Hooks / CI
Examples:
```bash
# .husky/commit-msg
#!/bin/sh
exec < /dev/tty
commitlint -E HUSKY_GIT_PARAMS
```

## Pull Request Hygiene
| Practice | Target |
|----------|--------|
| Max lines changed | ~400 (soft) |
| Review turnaround | < 24h |
| All checks pass | Required before merge |
| Linked issue present | 100% |

## Avoiding Long-Lived Branches
Mitigation tactics:
- Feature flags (merge incremental slices)
- API compatibility layers
- Dark launches / toggles
- Early upstream rebases

## Handling Hotfixes
Workflow example:
```bash
git checkout main
git pull
git checkout -b hotfix/critical-timezone
# fix, commit, test
git push origin hotfix/critical-timezone
# PR → merge → tag → deploy
```

## Tagging Releases
```bash
git tag -a v2.3.0 -m "Release v2.3.0"
git push origin v2.3.0
```

## Protecting Main Branch
Controls to enable (platform settings):
- Required status checks
- Required reviews (≥1 or ≥2)
- Disallow force pushes
- Linear history (optional)
- Signed commits (if security sensitive)

## Large File & Monorepo Guidance
- Use Git LFS for binaries
- Adopt sparse checkout for huge repos
- Define CODEOWNERS for critical paths

## Standard .gitignore Baseline
Keep it minimal + project-specific. Avoid committing generated artifacts.

## Pre-Merge Checklist (Automated Where Possible)
- [ ] Tests pass
- [ ] Linting/formatting clean
- [ ] Security scan passes
- [ ] No TODO left in changed code (or tracked issue)
- [ ] Docs updated if behavior changed

## Rewriting History Policy
| Action | Allowed? | Notes |
|--------|----------|-------|
| Rebase local feature | Yes | Before sharing |
| Force-push shared branch | Rare | Use `--force-with-lease` |
| Rebase protected branch | No | Breaks consumers |
| Squash on merge | Conditional | If preserving commit granularity not needed |

## Collaboration Anti-Patterns
| Pattern | Problem | Remedy |
|---------|---------|--------|
| Drive-by force pushes | Breaks teammates' clones | Restrict permissions |
| Mixed concerns PR | Hard to review | Split by concern |
| Silent merges | Low visibility | Require PR discussions |
| Working directly on main | Risk of broken production | Enforce branch protection |

## Documentation Anchors
Maintain:
- CONTRIBUTING.md
- CODEOWNERS
- Architecture decision records (ADR)
- Onboarding cheat sheet

## Metrics (Health Indicators)
- Mean time to merge (MTTM)
- % PRs > 1,000 LOC (reduce)
- Flaky test rate
- Revert frequency post-merge

## Summary
Effective Git collaboration blends social agreements, automation, and disciplined workflows. Make the happy path the *easy* path.

## Next Steps
- Hooks & automation (`git-hooks-and-automation.md`)
- Undo strategies (`git-reset-revert-and-checkout-explained.md`)

---
**Key Commands**
```bash
git tag -a <tag> -m "msg"
git push origin <tag>
git push origin --delete <branch>
```
