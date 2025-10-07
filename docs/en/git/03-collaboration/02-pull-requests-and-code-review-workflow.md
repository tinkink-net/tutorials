# Pull Requests and Code Review Workflow

## Introduction
Pull Requests (PRs) formalize integration: they bundle changes, surface diffs, trigger automation, and enable peer feedback. This tutorial presents an end-to-end, platform-agnostic workflow (GitHub/GitLab/Bitbucket apply similar concepts).

## Why Use Pull Requests?
- Quality gate (tests, lint, security scans)
- Knowledge sharing
- Change accountability & audit trail
- Encourages smaller, reviewable units

## Standard Branch Naming
| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<scope>` | `feature/payment-intents` |
| Bugfix | `fix/<issue-id>` | `fix/342-null-pointer` |
| Refactor | `refactor/<area>` | `refactor/auth-middleware` |
| Docs | `docs/<topic>` | `docs/api-pagination` |

## PR Lifecycle Overview
```
Plan → Branch → Commit → Sync → Open PR → Review → Update → Approve → Merge → Clean up
```

## Creating a PR (Example: GitHub CLI)
```bash
git checkout -b feature/user-deactivation
# ... commits ...
git push -u origin feature/user-deactivation
gh pr create --fill --base main --head feature/user-deactivation
```

## Constructing High-Quality PRs
**Checklist:**
- Clear title (imperative form)
- Concise description: problem → solution → notes
- Screenshots / GIFs for UI changes
- Linked issue IDs (`Fixes #123`)
- Test coverage notes
- Rollback considerations

### Example Description Template
```
## Summary
Implements soft-delete user deactivation flow.

## Changes
- Add `status` column
- Introduce service layer method `deactivateUser()`
- Migrate existing active users

## Testing
- Unit tests added
- Manual API test (POST /users/:id/deactivate)

## Rollback
Revert migration 202510071230_add_status_column.sql
```

## Review Best Practices
Reviewer responsibilities:
1. Understand intent before nitpicking syntax
2. Assess correctness, security, performance, readability
3. Suggest, don’t demand (unless policy)
4. Approve only when production-safe

Author responsibilities:
1. Keep PRs small (< ~400 added lines ideally)
2. Respond to every comment (resolve / explain)
3. Avoid force-pushing after review unless squashing at end
4. Maintain green CI

## Handling Feedback
```bash
# Make changes
git commit -m "Refactor: extract validation helper"
git push
```
Platform auto-updates PR diff.

## Draft vs Ready
Use draft mode while still stabilizing logic. Convert to ready once tests and self-review complete.

## Automations to Consider
| Automation | Purpose |
|------------|---------|
| CI pipeline | Run tests/lint/build |
| Static analysis | Security / quality gates |
| Conventional commit check | Enforce message style |
| Size labelling | Flag oversized PRs |
| Auto assign / reviewers | Shorten latency |

## Merge Strategies in PR
| Strategy | Description | Use |
|----------|-------------|-----|
| Squash | Combine commits into one | Small, noisy commit history |
| Rebase & merge | Linearizes branch | Teams preferring linear history |
| Merge commit | Preserve branch context | Feature groups / release trains |

## Rebase Before Merge (If Policy)
```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

## Avoiding Common Anti-Patterns
| Anti-Pattern | Problem |
|--------------|---------|
| Massive PR ("God diff") | Hard to review → bugs slip |
| Mixing refactor + feature | Obscures intent |
| Force-push after review comments | Invalidates prior review |
| No description | Reviewers guess intent |
| Ignoring failing CI | Wastes reviewer time |

## Post-Merge Cleanup
```bash
git checkout main
git pull origin main
git branch -d feature/user-deactivation
git push origin --delete feature/user-deactivation
```

## Metrics to Track (Team Level)
- Review turnaround time
- PR size distribution
- Re-opened / reverted merges
- Ratio of squash vs merge commits

## Summary
Well-structured PRs accelerate safe delivery. Optimize for clarity, small scope, automated validation, and respectful, actionable feedback loops.

## Next Steps
- Conflict strategies (`git-conflict-resolution-strategies.md`)
- Team collaboration guide (`git-best-practices-for-team-collaboration.md`)

---
**Key Commands**
```bash
git push -u origin <branch>
git branch -d <branch>
git push origin --delete <branch>
```
