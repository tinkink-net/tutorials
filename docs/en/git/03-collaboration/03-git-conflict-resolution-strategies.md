# Git Conflict Resolution Strategies

## Introduction
Conflicts are inevitable in collaborative development. This guide moves beyond basics—offering patterns, decision frameworks, and tooling techniques to resolve conflicts efficiently and safely.

## Types of Conflicts
| Type | Example | Cause |
|------|---------|-------|
| Content | Same lines edited | Parallel edits |
| Add/Delete | File removed in one, modified in another | Divergent refactor |
| Rename/Edit | File renamed + edited | Unsynchronized large changes |
| Binary | Image modified in both | Non-mergeable format |
| Directory/File | Dir changed to file or vice versa | Structural overhaul |

## General Resolution Flow
```
Detect → Classify → Decide intent → Edit / choose version → Test → Commit
```

## Inspecting Conflicts Quickly
```bash
git status
git diff --name-only --diff-filter=U
git diff --merge   # Show conflict sections with base
```

## Choosing Ours vs Theirs
```bash
# Keep our version
git checkout --ours path/file.txt
# Keep their version
git checkout --theirs path/file.txt
git add path/file.txt
```
Use sparingly—ensure semantic correctness.

## Structured Manual Merge Pattern
1. Read both sides fully
2. Identify intent (business logic, formatting, hotfix?)
3. Reconstruct desired combined behavior
4. Remove markers & re-run tests
5. `git add` and continue

## Using `git add -p` Beforehand
Reduce conflicts by committing smaller cohesive chunks early:
```bash
git add -p
```

## Strategic Rebase to Minimize Future Conflicts
Long-lived branch? Periodically:
```bash
git fetch origin
git rebase origin/main
```

## Tooling
| Tool | Command | Notes |
|------|---------|-------|
| VS Code | Built-in merge editor | Clear side-by-side |
| Meld | `git mergetool` | Visual diff/merge |
| Beyond Compare | `git mergetool` config | Commercial |
| IntelliJ | Auto conflict grouping | IDE-integrated |

## Conflict Annotation Example
```
<<<<<<< HEAD (current: main)
applyDiscount(cart, 0.10)
=======
applyDiscount(cart, discountRate())
>>>>>>> feature/dynamic-discount
```
Decision: keep dynamic but fallback default.
Result:
```js
applyDiscount(cart, discountRate() ?? 0.10)
```

## Resolving Binary Conflicts
Pick one:
```bash
git checkout --theirs assets/logo.png
git add assets/logo.png
```
OR rebuild/regenerate asset.

## Abort vs Continue
During merge/rebase:
```bash
git merge --abort
git rebase --abort
git rebase --continue
```

## Advanced: Rerere (Reuse Recorded Resolution)
```bash
git config --global rerere.enabled true
```
Git records how you resolved a conflict; if the same reoccurs it auto-applies.

## Preemptive Conflict Avoidance
| Technique | Benefit |
|-----------|---------|
| Consistent formatting tool | Removes stylistic diffs |
| Small PRs | Less overlap |
| Early branch sync | Fewer divergence points |
| Architectural communication | Avoid duplicate effort |
| Feature flags | Merge incomplete work safely |

## Regression Safety Net
After conflict resolution ALWAYS:
```bash
./run-tests.sh
git diff --check        # Detect stray whitespace
```

## Recovering From a Bad Resolution
```bash
git reflog              # Find pre-merge state
git reset --hard <hash>
```

## Summary
Conflicts are signals of parallel innovation—not failure. Systematic handling, proactive hygiene, and the right tools turn them into a minor speed bump instead of a blocker.

## Next Steps
- Undo operations (`git-reset-revert-and-checkout-explained.md`)
- Temporary changes (`git-stash-and-temporary-changes.md`)

---
**Key Commands**
```bash
git diff --name-only --diff-filter=U
git checkout --ours <file>
git checkout --theirs <file>
git merge --abort
git rebase --continue
```
