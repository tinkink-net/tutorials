# Basic Git Workflow: Add, Commit, Push

## Introduction

Now that you have created your first Git repository and understand the basic concepts, it's time to learn the fundamental Git workflow. This workflow forms the backbone of daily Git usage and consists of three main steps: **Add**, **Commit**, and **Push**.

This tutorial will guide you through these essential operations, helping you understand how to track changes, save snapshots of your work, and share your code with others.

## Prerequisites

Before starting this tutorial, make sure you have:
- A Git repository created ([Creating Your First Git Repository](./creating-your-first-git-repository.md))
- Basic understanding of Git concepts ([Understanding Git Basics and Terminology](./understanding-git-basics-and-terminology.md))
- Some files in your repository to work with

## The Basic Git Workflow

The standard Git workflow follows these steps:

```
1. Modify files in working directory
2. Stage changes (git add)
3. Commit changes (git commit)
4. Push to remote repository (git push)
```

Let's explore each step in detail.

## Step 1: Understanding Current Status

Before making any changes, let's check the current status of our repository:

```bash
git status
```

You should see something like:
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	README.md
	config.json
	hello.py
	sample.txt

nothing added to commit but untracked files present (use "git add" to track)
```

This shows:
- Current branch: `main`
- No commits yet
- Several untracked files

## Step 2: Adding Files to Staging Area (git add)

The `git add` command moves files from the working directory to the staging area. This is where you prepare your next commit.

### Adding Individual Files

Add files one by one:

```bash
# Add the README file
git add README.md

# Check status
git status
```

You should see:
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	config.json
	hello.py
	sample.txt
```

**Notice the difference:**
- `README.md` is now under "Changes to be committed" (staged)
- Other files remain "Untracked"

### Adding Multiple Files

Add multiple files at once:

```bash
# Add multiple specific files
git add hello.py config.json

# Or add all files in current directory
git add .

# Check status
git status
```

After adding all files:
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   .gitignore
	new file:   README.md
	new file:   config.json
	new file:   hello.py
	new file:   sample.txt
```

### Common git add Patterns

```bash
# Add all files
git add .

# Add all files in current directory and subdirectories
git add -A

# Add only modified files (not new files)
git add -u

# Add files interactively
git add -i

# Add specific file types
git add *.py
git add *.md
```

### Understanding the Staging Area

The staging area allows you to:
- **Craft precise commits** - Choose exactly what goes into each commit
- **Review changes** - See what will be committed before committing
- **Split changes** - Commit related changes separately

## Step 3: Making Your First Commit (git commit)

A commit creates a snapshot of your staged changes. Each commit should represent a logical unit of work.

### Basic Commit Command

```bash
git commit -m "Initial commit: Add project files"
```

You should see output like:
```
[main (root-commit) a1b2c3d] Initial commit: Add project files
 5 files changed, 23 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 config.json
 create mode 100755 hello.py
 create mode 100644 sample.txt
```

**Understanding the output:**
- `main` - Current branch
- `root-commit` - This is the first commit
- `a1b2c3d` - Short commit hash
- `5 files changed, 23 insertions(+)` - Summary of changes

### Commit Message Best Practices

Good commit messages are crucial for project maintenance:

#### Structure
```
Short summary (50 characters or less)

More detailed explanation if needed. Wrap at 72 characters.
Explain what and why, not how.

- Use bullet points for multiple changes
- Reference issue numbers if applicable
```

#### Examples of Good Commit Messages
```bash
# Good - Clear and concise
git commit -m "Add user authentication system"

# Good - Explains the why
git commit -m "Fix login bug that prevented password reset"

# Good - Multiple line commit
git commit -m "Implement user profile editing

- Add form validation
- Update user model
- Add profile image upload
- Fix styling issues on mobile"
```

#### Examples of Bad Commit Messages
```bash
# Bad - Too vague
git commit -m "fix stuff"

# Bad - Not descriptive
git commit -m "update"

# Bad - Too long for summary
git commit -m "This commit adds the new user authentication system that allows users to log in and register accounts with email validation and password reset functionality"
```

### Alternative Commit Methods

#### Using Default Editor
```bash
# Opens your default editor for commit message
git commit
```

#### Committing All Changes
```bash
# Stages and commits all tracked files
git commit -a -m "Update all tracked files"
```

## Step 4: Viewing Commit History

After making commits, you can view your repository's history:

```bash
# View commit history
git log
```

Output:
```
commit a1b2c3d4e5f6789... (HEAD -> main)
Author: Your Name <your.email@example.com>
Date:   Wed Jul 9 10:30:00 2025 +0000

    Initial commit: Add project files
```

### Useful git log Options

```bash
# Compact one-line format
git log --oneline

# Show last 3 commits
git log -3

# Show commits with file changes
git log --stat

# Show commits with actual changes
git log -p

# Graphical representation
git log --graph --oneline
```

## Making Additional Changes

Let's practice the workflow with some changes:

### Step 1: Modify a File

Edit the README.md file:

```bash
echo "

## Recent Updates

- Added basic project structure
- Created initial configuration
- Set up Git repository" >> README.md
```

### Step 2: Check Status

```bash
git status
```

You should see:
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md

no changes added to commit (use "git add" and commit)
```

### Step 3: View Changes

See what changed:

```bash
git diff
```

This shows the differences between your working directory and the last commit.

### Step 4: Stage and Commit

```bash
# Stage the changes
git add README.md

# Commit the changes
git commit -m "Update README with project status"
```

## Understanding File States

Files in Git go through different states:

```
Untracked → Staged → Committed
    ↓         ↓         ↓
  git add → git commit → git push
```

### File Status Examples

```bash
# Check detailed status
git status

# See short status
git status -s
```

Short status symbols:
- `??` - Untracked file
- `A` - Added (staged)
- `M` - Modified
- `D` - Deleted
- `R` - Renamed

## Step 5: Setting Up a Remote Repository

To push your changes, you need a remote repository. Let's set up a remote:

### Using GitHub (Example)

1. Create a new repository on GitHub
2. Copy the repository URL
3. Add it as a remote:

```bash
# Add remote repository
git remote add origin https://github.com/yourusername/my-first-git-project.git

# Verify remote
git remote -v
```

### Using GitLab or Other Services

The process is similar:
```bash
# GitLab example
git remote add origin https://gitlab.com/yourusername/my-first-git-project.git

# Self-hosted Git server
git remote add origin user@server:/path/to/repo.git
```

## Step 6: Pushing to Remote Repository (git push)

Push your commits to the remote repository:

```bash
# Push to remote repository
git push -u origin main
```

The `-u` flag sets up tracking between your local `main` branch and the remote `main` branch.

### Understanding Push Output

```
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 4 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (7/7), 1.23 KiB | 1.23 MiB/s, done.
Total 7 (delta 0), reused 0 (delta 0)
To https://github.com/yourusername/my-first-git-project.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### Future Pushes

After the initial push with `-u`, you can simply use:

```bash
git push
```

## Complete Workflow Example

Here's a complete example of the Git workflow:

```bash
# 1. Make changes
echo "print('Hello, Git!')" > new_script.py

# 2. Check status
git status

# 3. Stage changes
git add new_script.py

# 4. Commit changes
git commit -m "Add new Python script"

# 5. Push to remote
git push
```

## Common Git Workflow Patterns

### Feature Development Workflow
```bash
# Start working on a feature
git status
# ... make changes ...
git add .
git commit -m "Implement feature X"
git push
```

### Bug Fix Workflow
```bash
# Fix a bug
git status
# ... fix the bug ...
git add -u  # Add only modified files
git commit -m "Fix bug in user authentication"
git push
```

### Regular Development Workflow
```bash
# Daily development cycle
git status
# ... work on code ...
git add .
git commit -m "Add user profile validation"
# ... more work ...
git add .
git commit -m "Update error handling"
git push
```

## Best Practices

### 1. Commit Often
- Make small, focused commits
- Commit related changes together
- Don't wait too long between commits

### 2. Write Good Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Keep first line under 50 characters
- Explain why, not just what

### 3. Review Before Committing
```bash
# Always check what you're committing
git status
git diff --staged
```

### 4. Use Staging Area Effectively
- Stage only related changes
- Use `git add -p` for partial file staging
- Review staged changes before committing

## Troubleshooting Common Issues

### Issue: "Nothing to commit"
**Cause**: No changes staged for commit.
**Solution**: Use `git add` to stage changes first.

### Issue: "Repository not found"
**Cause**: Remote repository URL is incorrect.
**Solution**: Check remote URL with `git remote -v`.

### Issue: "Authentication failed"
**Cause**: Incorrect credentials or permissions.
**Solution**: Verify your username/password or SSH keys.

### Issue: "Uncommitted changes"
**Cause**: Trying to push with uncommitted changes.
**Solution**: Commit or stash changes first.

## Useful Commands Summary

### Status and Information
```bash
git status          # Check repository status
git log             # View commit history
git diff            # Show changes
git remote -v       # Show remote repositories
```

### Staging and Committing
```bash
git add <file>      # Stage specific file
git add .           # Stage all files
git commit -m "msg" # Commit with message
git commit -a -m "msg" # Stage and commit tracked files
```

### Remote Operations
```bash
git remote add origin <url>  # Add remote repository
git push -u origin main      # Push and set upstream
git push                     # Push to configured remote
```

## Summary

You've successfully learned the basic Git workflow! Here's what you accomplished:

1. **Understanding the workflow**: Add → Commit → Push
2. **Staging changes**: Using `git add` to prepare commits
3. **Making commits**: Creating snapshots with `git commit`
4. **Setting up remotes**: Connecting to external repositories
5. **Pushing changes**: Sharing your work with `git push`
6. **Best practices**: Writing good commit messages and organizing work

### Key Commands Mastered:
- `git add` - Stage changes for commit
- `git commit` - Create a snapshot of staged changes
- `git push` - Upload commits to remote repository
- `git status` - Check current repository state
- `git log` - View commit history
- `git diff` - See changes between versions

### Workflow Pattern:
```
Edit files → git add → git commit → git push
```

This basic workflow forms the foundation of all Git usage. Whether you're working alone or with a team, these commands will be your daily tools for version control.

## Next Steps

Now that you understand the basic Git workflow, you're ready to explore more advanced topics:

1. [Understanding Git Branches](./understanding-git-branches.md)
2. [Creating and Switching Branches](./creating-and-switching-branches.md)
3. [Working with Remote Repositories](./working-with-remote-repositories.md)

## Related Resources

- [Creating Your First Git Repository](./creating-your-first-git-repository.md)
- [Understanding Git Basics and Terminology](./understanding-git-basics-and-terminology.md)
- [Git Installation and Setup](./git-installation-and-setup.md)
- [Official Git Tutorial](https://git-scm.com/docs/gittutorial)
- [Pro Git Book - Git Basics](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)
