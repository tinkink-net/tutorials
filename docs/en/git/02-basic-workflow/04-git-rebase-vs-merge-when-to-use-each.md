# Git Rebase vs Merge: When to Use Each

## Introduction
Both `merge` and `rebase` integrate changes from one branch into another—but they do so differently. Understanding the distinction empowers you to maintain a clear, navigable history while minimizing integration pain.

## Core Difference
| Operation | What It Does | History Shape | Commit IDs | Typical Use |
|-----------|--------------|---------------|------------|-------------|
| Merge | Creates a new merge commit tying histories together | Non-linear (graph) | Preserved | Integrating completed feature branches |
| Rebase | Replays commits on top of another branch | Linear | Rewritten (new IDs) | Updating a feature branch before merging |

## Visual Model
Initial divergence:
```
     A---B  (feature)
    /
---o---C---D (main)
```
Merge result:
```
---o---C---D----M (main)
        \   /
         A-B
```
Rebase result (feature rebased onto updated main):
```
---o---C---D---A'---B' (feature)
```

## Pros & Cons
### Merge
Pros:
- Preserves true historical context
- Safe (no rewriting published commits)
- Shows integration points

Cons:
- Can create noisy graphs
- Frequent merges bloat history

### Rebase
Pros:
- Clean, linear history
- Easier `git bisect`
- Logical story of development

Cons:
- Rewrites commit hashes
- Dangerous if used on shared/pushed branches
- Conflict repetition on long chains

## Safe Rebase Rules
1. Never rebase commits already shared with others (unless coordinated)
2. Use rebase locally to synchronize with `main` before opening a PR
3. Avoid rebasing *after* review has begun (forces reviewers to re-diff)

## Updating a Feature Branch (Recommended Pattern)
```bash
git checkout feature/api-auth
git fetch origin
git rebase origin/main
# Resolve conflicts as they appear
git push --force-with-lease
```
`--force-with-lease` prevents overwriting others' work inadvertently.

## Interactive Rebase for Cleanup
```bash
git rebase -i HEAD~6
```
Actions:
- `pick` keep commit
- `squash` combine into previous
- `fixup` like squash (discard message)
- `reword` edit message
- `edit` stop to amend

### Example Cleanup Flow
Before:
```
Add API skeleton
Fix route bug
Add logging
Fix logging typo
```
After interactive rebase:
```
Add API skeleton with logging
```

## When to Prefer Merge
Use merge when:
- Integrating a completed feature branch into `main`
- Preserving context of large collaborative efforts
- Performing release branch merges
- Keeping audit trails of integration order

## When to Prefer Rebase
Use rebase when:
- Refreshing a feature branch with latest `main`
- Cleaning commit history before sharing
- Splitting or squashing messy exploratory commits
- Avoiding needless merge commits in small repos

## Hybrid Workflow (Common)
1. Develop on `feature/*`
2. Periodically `git fetch && git rebase origin/main`
3. Open PR
4. Merge with `--no-ff` (records integration point)

## Conflict Handling During Rebase
When a conflict occurs:
```bash
# Fix file(s)
git add <file>
git rebase --continue
```
Other useful commands:
```bash
git rebase --skip      # Drop the problematic commit
git rebase --abort     # Return to pre-rebase state
```

## Converting a Merge-Oriented History
If history is full of merge commits and you want a linear version for a patch series:
```bash
git checkout feature
git rebase --rebase-merges origin/main
```
`--rebase-merges` attempts to preserve structured branch topology while linearizing.

## Golden Rule (Again)
Do **not** rebase public commits unless every affected collaborator agrees. If in doubt—merge.

## Summary Decision Table
| Goal | Preferred | Rationale |
|------|-----------|-----------|
| Preserve integration context | Merge | Shows when branches landed |
| Keep linear readable history | Rebase | Simplifies navigation |
| Clean commit messages | Interactive Rebase | Reword/squash logically |
| Prepare feature before PR | Rebase onto main | Avoids merge noise |
| Emergency revertability | Merge | Keeps granular context |

## Summary
Rebase and merge are complementary: rebase while *developing* to keep your branch current; merge when *integrating* to record the event. Use each intentionally.

## Next Steps
- Learn structured conflict techniques (`git-conflict-resolution-strategies.md`)
- Explore undo operations (`git-reset-revert-and-checkout-explained.md`)

---
**Key Commands**
```bash
git rebase origin/main
git rebase -i HEAD~N
git merge <branch>
git push --force-with-lease
```
