# Merging Branches and Resolving Conflicts

## Introduction

Branching lets you isolate work; merging brings that work back together. This tutorial shows you how to perform safe merges, understand different merge strategies, and confidently resolve conflicts when Git needs your help.

## Prerequisites
- Comfortable with basic workflow (`add`, `commit`, `push`)
- Created and switched branches (see `creating-and-switching-branches.md`)
- Basic understanding of commit history and `git log`

## Learning Goals
By the end you will be able to:
1. Merge feature branches into a mainline branch
2. Choose between fast-forward and non–fast-forward merges
3. Detect, view, and resolve merge conflicts
4. Abort or restart a problematic merge
5. Apply best practices to reduce conflict frequency

## Mental Model of a Merge
A merge creates a new commit that has **two parents** (the tips of the branches you are combining) unless Git can do a **fast-forward**. Git performs a **three-way merge** using:
```
BASE (merge base)  ← common ancestor
HEAD (current branch)
OTHER (branch being merged in)
```
Git compares differences (BASE→HEAD) and (BASE→OTHER) and applies both sets if they don’t overlap. Overlaps become conflicts.

## Fast-Forward vs Merge Commit
| Scenario | Result | When | Pros | Cons |
|----------|--------|------|------|------|
| Fast-forward | Pointer moves forward | Branch strictly ahead | Linear history | Loses branch boundary context |
| Merge commit | New commit with 2 parents | Histories diverged | Retains integration point | Extra commits; can become noisy |

### Forcing a Merge Commit
```bash
git merge --no-ff feature/login
```
This records a dedicated merge commit even if fast-forward is possible (useful for grouping related changes).

## Basic Merge Workflow
```bash
# 1. Ensure main is current
git checkout main
git pull origin main

# 2. Merge the feature branch
git merge feature/login

# 3. Push result
git push origin main
```

## Viewing What Will Merge
```bash
# Show commits that will be merged
git log --oneline main..feature/login

# Show a merge preview (no commit)
git merge --no-commit --no-ff feature/login
# If you decide not to proceed
git merge --abort
```

## Typical Conflict Scenario
Two branches edit the same lines of `config/app.json`.
```bash
git checkout main
git merge feature/rate-limit
# Auto-merging config/app.json
# CONFLICT (content): Merge conflict in config/app.json
# Automatic merge failed; fix conflicts and commit the result.
```

### Conflict Markers
Inside the file:
```
<<<<<<< HEAD
"rateLimit": 200,
=======
"rateLimit": 500,
>>>>>>> feature/rate-limit
```
Resolve by choosing / combining desired value, then remove markers entirely.

### Inspecting Conflicts
```bash
git status                # Lists unmerged paths
git diff                  # Shows conflict regions
git diff --name-only --diff-filter=U  # Only conflicted files
```

### After Editing
```bash
git add config/app.json
git commit          # Uses merge template message
```
Or supply a custom message:
```bash
git commit -m "Merge feature/rate-limit into main: adjust limit to 300"
```

## Aborting a Merge
If things look wrong and you haven’t committed yet:
```bash
git merge --abort
```
Returns the working tree to the pre-merge state.

## Strategies & Options
| Option | Purpose |
|--------|---------|
| `--no-ff` | Force a merge commit |
| `--squash` | Combine changes into working tree (no merge commit) |
| `--commit` / `--no-commit` | Auto-commit or pause before committing |
| `--abort` | Reset state after conflict (uncommitted) |
| `-X ours` | Favor current branch on conflicts |
| `-X theirs` | Favor merging branch on conflicts |

### Squash Merge (Combine Changes)
```bash
git checkout main
git merge --squash feature/search
git commit -m "Add search functionality"
```
Squash keeps a cleaner main history but loses individual feature commits.

## Visualizing Merges
```bash
git log --graph --oneline --decorate
```

## Advanced Conflict Tools
```bash
git mergetool     # Launch configured merge tool
git config merge.tool code
git config mergetool.code.cmd 'code --wait --merge $REMOTE $LOCAL $BASE $MERGED'
```

## Preventing Conflicts
1. Pull / rebase frequently on long-running branches
2. Keep feature branches small and focused
3. Avoid formatting churn mixed with logic changes
4. Align on shared file ordering / linting
5. Communicate early about large refactors

## Handling Binary Conflicts
For images/binaries you can’t line-merge:
```bash
git checkout --ours  path/to/asset.png
git checkout --theirs path/to/asset.png
git add path/to/asset.png
```
Pick one version explicitly.

## Common Pitfalls
| Problem | Cause | Fix |
|---------|-------|-----|
| Repeated conflicts | Long-lived branch diverged | Rebase or integrate earlier |
| Huge conflict cluster | Mixed formatting + logic commits | Separate format-only commit first |
| Accidental merge commit | Auto fast-forward disabled by policy | Use `git pull --ff-only` or review hooks |
| Lost changes | Used `checkout` to discard before staging | Recover via `git reflog` |

## Checklist Before Merging
- [ ] CI green (tests pass)
- [ ] Code reviewed (if team policy)
- [ ] Branch updated (`git fetch && git rebase origin/main` or latest merge)
- [ ] No debug artifacts / secrets
- [ ] Commit messages clean

## Summary
Merging integrates divergent histories. Understand the type of merge, review incoming commits, resolve conflicts surgically, and commit a clear merge snapshot. Consistent hygiene reduces friction.

## Next Steps
- Explore rebase vs merge (`git-rebase-vs-merge-when-to-use-each.md`)
- Learn structured conflict strategies (`git-conflict-resolution-strategies.md`)

---
**Key Commands Recap**
```bash
git merge <branch>
git merge --no-ff <branch>
git merge --squash <branch>
git merge --abort
git diff --name-only --diff-filter=U
git log --graph --oneline --decorate
```
