# リモートリポジトリの操作

## はじめに
リモートを使用することで、協力作業、作業のバックアップ、コードのデプロイが可能になります。このチュートリアルでは、リモートブランチの追加、検査、同期、プルーニング、安全な管理について説明します。

## 主要な概念
| 用語 | 意味 |
|------|---------|
| リモート | ホストされているリポジトリへの名前付き参照（例：`origin`） |
| トラッキングブランチ | リモートブランチにリンクされたローカルブランチ（例：`main`が`origin/main`をトラッキング） |
| フェッチ | オブジェクトと参照のダウンロード（ワーキングツリーは変更されない） |
| プル | フェッチ + 統合（マージまたはリベース） |
| プッシュ | ローカルのコミットをリモートブランチにアップロード |

## リモートの一覧表示
```bash
git remote -v
```
出力にはフェッチ/プッシュURLが表示されます。

## リモートの追加
```bash
git remote add origin https://github.com/example/app.git
git remote add upstream https://github.com/org/app.git
```

## URLの変更
```bash
git remote set-url origin git@github.com:example/app.git
```

## リモートの削除
```bash
git remote remove upstream
```

## 更新のフェッチ
```bash
git fetch
git fetch --all          # すべてのリモート
git fetch origin main    # 特定のブランチ
```

## リモートブランチの表示
```bash
git branch -r            # リモートのみ
git branch -a            # ローカル + リモート
```

## トラッキングブランチの作成
```bash
git checkout -b feature/ui origin/feature/ui
# または
git switch -c feature/ui --track origin/feature/ui
```

## 作成後のアップストリームの設定
```bash
git branch --set-upstream-to=origin/main main
# または最初のプッシュ時に
git push -u origin main
```

## プル戦略
デフォルトのプルはマージです。多くのチームはリベースを好みます：
```bash
git config --global pull.rebase true
```
または特定のリポジトリに対して：
```bash
git config pull.rebase true
```

## 安全な更新パターン
```bash
git fetch origin
git rebase origin/main   # またはポリシーで必要な場合はマージ
```

## ブランチのプッシュ
```bash
git push origin feature/auth
```
リモートブランチの削除：
```bash
git push origin --delete feature/auth
```

## ローカルブランチの名前変更（およびリモート）
```bash
git branch -m old-name new-name
git push origin :old-name new-name
git push origin -u new-name
```

## 古いリモート参照のプルーニング
```bash
git remote prune origin
git fetch --prune
```

## リモートの詳細確認
```bash
git remote show origin
```
トラッキング、古いブランチ、プッシュ/プル設定が表示されます。

## 複数リモートのワークフロー
フォークモデルの例：
```bash
git remote add upstream https://github.com/original/project.git
git fetch upstream
git rebase upstream/main   # フォークを最新に保つ
git push origin main
```

## ミラーリング（管理者向け）
```bash
git clone --mirror https://github.com/source/repo.git
cd repo.git
git push --mirror git@internal:backup/repo.git
```

## 認証のヒント
- 安定性のためにSSHを優先
- 2FA有効時はHTTPSで個人アクセストークンを使用
- 認証情報のキャッシュ: `git config --global credential.helper cache`

## 一般的な問題
| 問題 | 原因 | 解決策 |
|-------|-------|-----|
| プッシュ拒否（非fast-forward） | リモートに新しいコミットがある | `git pull --rebase`してからプッシュ |
| 認証失敗 | 無効なトークン/キー | 認証情報を再生成 |
| 分離HEADの編集 | リモート参照を直接チェックアウトした | ブランチを作成: `git switch -c fix upstream/main` |
| 古いトラッキングブランチ | リモートブランチが削除された | `git fetch --prune` |

## ベストプラクティス
1. 一貫したリモート名を使用する（`origin`、`upstream`）
2. プルーニングを有効にして混乱を減らす
3. 共有ブランチへのフォースプッシュを避ける
4. `main`を保護する（ブランチ保護ルール）
5. トークン/SSHキーを定期的にローテーションする

## まとめ
リモートをマスターすることで効率的な協力が可能になります。意図的にフェッチし、戦略を意識してプルし、定期的にプルーニングし、アップストリームの衛生状態を良好に保ちましょう。

## 次のステップ
- コードレビューワークフロー（`pull-requests-and-code-review-workflow.md`）
- コンフリクト処理（`git-conflict-resolution-strategies.md`）

---
**主要なコマンド**
```bash
git remote -v
git fetch --all --prune
git push origin <branch>
git remote show origin
git remote prune origin
```
