# Git Stash and Temporary Changes

## Introduction
`git stash` lets you *shelve* uncommitted work so you can switch tasks, pull updates, or apply emergency fixes without committing incomplete code.

## What Stash Stores
By default: modified tracked files + staged changes. Optionally untracked / ignored files.

## Basic Usage
```bash
git stash push -m "WIP: form validation"
git stash list
```
Example list entry:
```
stash@{0}: On feature/form: WIP: form validation
```

## Restoring Work
```bash
git stash apply stash@{0}   # Keep stash copy
git stash pop               # Apply then drop latest
```

## Include Untracked Files
```bash
git stash push -u -m "WIP: add config prototype"
```
Include ignored files:
```bash
git stash push -a -m "WIP: full env"
```

## Partial Stash (Interactive)
```bash
git stash push -p -m "WIP: selected changes"
```

## Viewing Stash Diff
```bash
git stash show stash@{1}
git stash show -p stash@{1}   # Full patch
```

## Dropping / Clearing
```bash
git stash drop stash@{2}
git stash clear   # Dangerous: removes all stashes
```

## Applying to Different Branch
```bash
git checkout feature/new-ui
git stash apply stash@{0}
```

## Creating a Branch from a Stash
```bash
git stash branch feature/resume stash@{0}
```

## Common Patterns
| Scenario | Command |
|----------|---------|
| Pull changes but keep WIP | `git stash push -m "WIP" && git pull && git stash pop` |
| Hotfix on main | Stash → switch → fix → return → pop |
| Clean workspace for build | Stash uncommitted noise |

## When NOT to Use Stash
- Long-term storage (make a WIP commit instead)
- Sharing with others (use a branch)
- Binary-heavy work (may cause large object churn)

## Alternatives
| Need | Alternative |
|------|------------|
| Safe checkpoint | Commit to temp branch |
| Experimental spike | `feature/spike-*` branch |
| Quick discard | `git restore` |

## Troubleshooting
| Issue | Solution |
|-------|----------|
| Conflict on apply | Resolve, `git add`, continue (stash already applied) |
| Lost stash after pop | Recover: `git fsck --lost-found` (sometimes) |
| Accidentally stashed untracked important file | Prefer branches in future |

## Summary
Stash is a tactical tool for *short-lived* interruptions. Use it deliberately; prefer explicit commits for durable progress.

## Next Steps
- Undo operations (`git-reset-revert-and-checkout-explained.md`)
- Deep conflict workflows (`git-conflict-resolution-strategies.md`)

---
**Key Commands**
```bash
git stash push -m "msg"
git stash list
git stash show -p stash@{n}
git stash pop
git stash branch <name> stash@{n}
```
