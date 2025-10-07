# Git Reset, Revert, and Checkout Explained

## Introduction
When you need to **undo** something, choosing the correct command prevents data loss and preserves history integrity. This guide contrasts `reset`, `revert`, and `checkout` (and `restore` / `switch`).

## Quick Comparison
| Command | Scope | History Rewritten? | Common Use |
|---------|-------|--------------------|------------|
| reset | Moves branch refs / staging | Yes (non-public) | Redo local commits |
| revert | New commit undoing prior | No | Public undo |
| checkout (file) | Replace working tree file | No | Discard local changes |
| checkout (branch) | Switch HEAD | No | Change branches |
| restore | Modern file restore | No | Safer file operations |
| switch | Modern branch switch | No | Clarity for branch actions |

## Git Reset Modes
```bash
git reset --soft HEAD~1   # Keep changes staged
git reset --mixed HEAD~1  # (default) Unstage, keep working tree
git reset --hard HEAD~1   # Discard everything (danger!)
```

### Use Cases
- Soft: Combine last two commits (follow with amend)
- Mixed: Rework commit content / staging
- Hard: Throw away local experimental commits

## Moving a Branch Pointer
```bash
git reset --hard <commit>
```
If already pushed—avoid; use `revert` instead.

## Amending the Last Commit
```bash
git commit --amend -m "Refine API error handling"
```
If pushed: coordinate or avoid.

## Revert (Safe Public Undo)
```bash
git revert <commit>
git revert <old>..<new>   # Revert a range
```
Creates inverse patch commit(s), maintaining history.

### Reverting a Merge Commit
Find its hash then:
```bash
git revert -m 1 <merge-hash>
```
`-m 1` picks the mainline parent.

## Discarding Local File Changes
Classic:
```bash
git checkout -- path/file.txt
```
Modern:
```bash
git restore path/file.txt
git restore --staged path/file.txt   # Unstage
```

## Switching Branches (Modern Form)
```bash
git switch main
git switch -c feature/new-dashboard
```

## Recovering Lost Commits
```bash
git reflog
git checkout <lost-hash>
```
Then create a branch:
```bash
git switch -c recovery/<topic>
```

## Combining Commits (Interactive Rebase)
```bash
git rebase -i HEAD~5
```
Not strictly an undo, but powerful for rewriting before sharing.

## Decision Guide
| Situation | Use |
|-----------|-----|
| Undo local last 2 commits (not pushed) | `git reset --soft HEAD~2` + amend |
| Undo a public commit | `git revert <hash>` |
| Discard unstaged file edits | `git restore <file>` |
| Unstage accidentally added file | `git restore --staged <file>` |
| Return repo to known good state (local only) | `git reset --hard <hash>` |
| Explore old commit | `git checkout <hash>` (detached) |

## Safety Tips
1. Avoid `--hard` unless certain (stash first if unsure)
2. Use revert for anything already shared
3. Use branches as safety nets
4. Learn `reflog`—your time machine

## Summary
Choose the least destructive tool that achieves the goal. Reset rewrites; revert records corrective intent; checkout/restore manipulate workspace.

## Next Steps
- Temporary shelves (`git-stash-and-temporary-changes.md`)
- Automation (`git-hooks-and-automation.md`)

---
**Key Commands**
```bash
git reset --soft|--mixed|--hard <ref>
git revert <commit>
git restore [--staged] <file>
git reflog
```
