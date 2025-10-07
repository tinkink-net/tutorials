# Working with Remote Repositories

## Introduction
Remotes let you collaborate, back up work, and deploy code. This tutorial covers adding, inspecting, syncing, pruning, and managing remote branches safely.

## Key Concepts
| Term | Meaning |
|------|---------|
| Remote | Named reference to a hosted repository (e.g. `origin`) |
| Tracking branch | Local branch linked to a remote branch (e.g. `main` tracking `origin/main`) |
| Fetch | Download objects + refs (no working tree change) |
| Pull | Fetch + integrate (merge or rebase) |
| Push | Upload local commits to a remote branch |

## Listing Remotes
```bash
git remote -v
```
Output shows fetch/push URLs.

## Adding a Remote
```bash
git remote add origin https://github.com/example/app.git
git remote add upstream https://github.com/org/app.git
```

## Changing URLs
```bash
git remote set-url origin git@github.com:example/app.git
```

## Removing a Remote
```bash
git remote remove upstream
```

## Fetching Updates
```bash
git fetch
git fetch --all          # All remotes
git fetch origin main    # Specific branch
```

## Viewing Remote Branches
```bash
git branch -r            # Remote-only
git branch -a            # Local + remote
```

## Creating a Tracking Branch
```bash
git checkout -b feature/ui origin/feature/ui
# or
git switch -c feature/ui --track origin/feature/ui
```

## Setting Upstream After Creation
```bash
git branch --set-upstream-to=origin/main main
# or first push
git push -u origin main
```

## Pull Strategies
Default pull merges. Many teams prefer rebase:
```bash
git config --global pull.rebase true
```
Or per repository:
```bash
git config pull.rebase true
```

## Safe Update Pattern
```bash
git fetch origin
git rebase origin/main   # or merge if policy requires
```

## Pushing Branches
```bash
git push origin feature/auth
```
Delete remote branch:
```bash
git push origin --delete feature/auth
```

## Renaming a Local Branch (and Remote)
```bash
git branch -m old-name new-name
git push origin :old-name new-name
git push origin -u new-name
```

## Pruning Stale Remote References
```bash
git remote prune origin
git fetch --prune
```

## Inspect Remote Details
```bash
git remote show origin
```
Displays tracking, stale branches, and push/pull configuration.

## Multiple Remotes Workflow
Fork model example:
```bash
git remote add upstream https://github.com/original/project.git
git fetch upstream
git rebase upstream/main   # Keep fork updated
git push origin main
```

## Mirroring (Administrative)
```bash
git clone --mirror https://github.com/source/repo.git
cd repo.git
git push --mirror git@internal:backup/repo.git
```

## Authentication Tips
- Prefer SSH for stability
- Use personal access tokens for HTTPS when 2FA enabled
- Cache credentials: `git config --global credential.helper cache`

## Common Issues
| Issue | Cause | Fix |
|-------|-------|-----|
| Rejected push (non-fast-forward) | Remote has new commits | `git pull --rebase` then push |
| Authentication failed | Invalid token / key | Regenerate credentials |
| Detached HEAD editing | Checked out remote ref directly | Create a branch: `git switch -c fix upstream/main` |
| Stale tracking branches | Remote branch deleted | `git fetch --prune` |

## Best Practices
1. Use consistent remote names (`origin`, `upstream`)
2. Enable pruning to reduce clutter
3. Avoid force-pushing shared branches
4. Keep `main` protected (branch protection rules)
5. Rotate tokens/SSH keys periodically

## Summary
Mastering remotes enables efficient collaboration. Fetch intentionally, pull with awareness of strategy, prune regularly, and keep upstream hygiene strong.

## Next Steps
- Code review workflows (`pull-requests-and-code-review-workflow.md`)
- Conflict handling (`git-conflict-resolution-strategies.md`)

---
**Key Commands**
```bash
git remote -v
git fetch --all --prune
git push origin <branch>
git remote show origin
git remote prune origin
```
