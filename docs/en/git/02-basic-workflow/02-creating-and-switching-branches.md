# Creating and Switching Branches in Git

Branching is Git’s superpower. It lets you create isolated lines of development so you can experiment, fix bugs, or build features without disturbing the stability of the main code line. Mastering how to create and switch branches efficiently is foundational to any effective Git workflow.

---
## 1. Why Branches Exist (Mental Model)
Think of the `main` (or `master`) branch as the published history of your project. A branch is simply a movable pointer to a commit. When you create a new branch, you are saying: “From this point in history, I want to start a new line of work.” Nothing is copied; Git just creates a lightweight reference.

Key ideas:
- A branch points to a commit.
- Your `HEAD` tells you which branch (or commit) you are “on.”
- When you commit on a branch, the branch pointer moves forward.

Because branches are cheap, you should use them generously: one branch per feature, per bug fix, per experiment.

---
## 2. Listing and Understanding Current Branches
To see existing branches locally:
```
$ git branch
```
The current branch is marked with an asterisk. To see both local and remote branches:
```
$ git branch -a
```
To see what each branch points to along with last commit info:
```
$ git branch -v
```
If you want to clean up stale remote-tracking branches (references to branches deleted on the remote):
```
$ git fetch --prune
```

---
## 3. Creating a New Branch
You typically create a branch from the latest state of another branch (often `main`). First ensure you are up to date:
```
$ git checkout main
$ git pull origin main
```
Now create a branch:
```
$ git branch feature/login-form
```
This creates it but does not switch you to it. To both create and switch immediately (preferred):
```
$ git switch -c feature/login-form
```
Older syntax (still valid):
```
$ git checkout -b feature/login-form
```
Naming conventions matter. Use:
- `feature/<name>` for new functionality
- `bugfix/<ticket-id>` for fixes
- `hotfix/<critical>` for urgent production patches
- `chore/…`, `refactor/…`, etc.

Avoid spaces, uppercase, and ambiguous names like `new` or `temp`.

---
## 4. Switching Between Branches
To switch to an existing branch:
```
$ git switch feature/login-form
```
Or using older syntax:
```
$ git checkout feature/login-form
```
Git will refuse to switch if you have uncommitted changes that would be overwritten. Options:
- Commit them.
- Stash them (`git stash push -m "WIP"`).
- Discard them (`git restore .`).

To return to the previous branch quickly:
```
$ git switch -
```

### Detached HEAD State
If you checkout a specific commit (not a branch):
```
$ git checkout 4f2a9c1
```
You enter “detached HEAD” mode. You can explore, build, or test, but if you make commits without creating a branch, those commits may become hard to find later. To preserve work:
```
$ git switch -c experiment/performance-tuning
```

---
## 5. Keeping Your Branch Updated
While working on a feature branch, other commits may land on `main`. To incorporate them:
```
$ git switch feature/login-form
$ git fetch origin
$ git merge origin/main
```
This creates a merge commit (if needed). For a linear history and if the branch is only yours:
```
$ git fetch origin
$ git rebase origin/main
```
Rebasing rewrites your branch’s commits on top of the latest `main` tip. Do NOT rebase shared branches that others might be using; it changes commit hashes.

---
## 6. Pushing Your Branch to Remote
A branch exists only locally until you push it:
```
$ git push -u origin feature/login-form
```
`-u` sets the upstream so future `git push` and `git pull` commands know the default remote branch.

To list tracking relationships:
```
$ git branch -vv
```

---
## 7. Renaming a Branch
If the branch name is unclear or requirements changed:
### If you are on the branch you want to rename (local):
```
$ git branch -m feature/login-form feature/auth-ui
```
If already pushed, delete the old name remotely and push the new:
```
$ git push origin :feature/login-form
$ git push -u origin feature/auth-ui
```
Some hosting platforms offer a “rename” feature that handles redirects automatically—use that if available.

---
## 8. Deleting Branches
After merging (and once you’re sure it’s no longer needed):
Local delete:
```
$ git branch -d feature/login-form
```
`-d` is safe; it refuses if unmerged. To force (dangerous):
```
$ git branch -D feature/login-form
```
Remote delete:
```
$ git push origin :feature/login-form
```
Or the newer syntax:
```
$ git push origin --delete feature/login-form
```
Cleaning up reduces cognitive load.

---
## 9. Common Workflow Example (Feature Branch)
1. Update main: `git switch main && git pull`.
2. Create branch: `git switch -c feature/report-export`.
3. Code + commit frequently with meaningful messages.
4. Periodically rebase or merge `origin/main` to stay current.
5. Push: `git push -u origin feature/report-export`.
6. Open a Pull Request (PR) / Merge Request (MR).
7. After merge, delete local + remote branch.

This loop keeps history segmented by purpose and improves code review focus.

---
## 10. Troubleshooting Scenarios
| Situation | Cause | Resolution |
|-----------|-------|------------|
| Cannot switch branches | Uncommitted conflicting changes | Commit, stash, or restore files |
| Detached HEAD warning | Checked out a commit, not a branch | Create a branch with `git switch -c new-branch` |
| Branch missing after clone | Only default branch cloned | `git fetch --all` then `git switch branch-name` |
| Push rejected (non-fast-forward) | Remote advanced independently | `git pull --rebase` then re-push |
| Accidentally deleted branch | No reference exists | Recover via `git reflog` -> `git branch recovered <commit>` |

---
## 11. Using Branches Strategically
Branches are not just for features:
- Prototype explorations
- Hotfixes directly from release tags
- Long-running integration branches (use sparingly—consider trunk-based + feature flags instead)
- Documentation or infrastructure changes

Aim to keep feature branches short-lived. The longer a branch lives, the harder it is to merge cleanly.

---
## 12. Practice Exercise
1. Clone or init a repo.
2. Create `feature/colors` branch and add a file.
3. Commit twice with meaningful messages.
4. Rebase it onto an updated `main` after adding an unrelated commit there.
5. Rename the branch to `feature/theme-colors`.
6. Push and open a PR.
7. Merge and delete branch locally and remotely.

Reflect: Which steps felt slow? Automate them with aliases or scripts (e.g., `gco`, `gpl`, `gpsup`).

---
## 13. Key Takeaways
- Branch creation is instant; use many small, focused branches.
- `switch` is the modern, clearer command for changing branches.
- Keep branches up to date proactively to minimize merge friction.
- Clean up after merges to maintain a tidy repository.
- Always create a branch before committing exploratory work.

Mastering branching sets the stage for advanced workflows like rebasing, interactive history editing, and multi-branch release strategies.
