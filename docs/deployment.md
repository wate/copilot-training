デプロイ手順書
=========================

本手順書は、本プロジェクトのアプリケーションをサーバーにデプロイするための手順を記載しています。
デプロイには、Ansibleを使用しています。

デプロイの前提条件
-------------------------

デプロイを実行するために、以下の環境が必要です。

* Ansible 2.9以上
* Git（リモートリポジトリからのクローンに使用）
* Composer（PHPの依存パッケージ管理に使用）
* SSH接続情報（各環境のサーバーに接続するための認証情報）

デプロイ方法
-------------------------

各環境毎のデプロイ方法は以下のとおりです。

### 開発環境（develop）

開発環境へのデプロイは、以下のコマンドを実行します。

```sh
ansible-playbook -i inventory.yml deploy.yml --limit develop
```

### ステージング環境（staging）

ステージング環境へのデプロイは、以下のコマンドを実行します。

```sh
ansible-playbook -i inventory.yml deploy.yml --limit staging
```

### 本番環境（production）

本番環境へのデプロイは、以下のコマンドを実行します。

```sh
ansible-playbook -i inventory.yml deploy.yml --limit production
```

### 環境変数の設定

デプロイ時に追加設定が必要な場合は、以下のように環境変数を設定します。

```sh
# Slackへの通知を有効にする場合
export SLACK_TOKEN="xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx"
export SLACK_CHANNEL="#デプロイ通知"
export SLACK_USERNAME="デプロイボット"

ansible-playbook -i inventory.yml deploy.yml --limit production
```

変数
-------------------------

Playbookで利用されている主な変数は以下のとおりです。

### インベントリファイル（inventory.yml）の変数

* `app_repo`: アプリケーションのGitリポジトリURL
* `app_deploy_path`: デプロイ先のパス
* `app_repo_branch`: デプロイ対象のGitブランチ（環境ごとに設定）
* `app_env`: アプリケーション環境（development, staging, production）
* `rsync_exclude_opts`: rsync実行時に除外するファイル・ディレクトリのリスト

### サーバー接続に関する変数（各環境ごとに設定可能）

* `ansible_host`: サーバーのIPアドレスまたはホスト名
* `ansible_port`: SSHポート番号
* `ansible_user`: SSH接続ユーザー名
* `ansible_password`: SSH接続パスワード（非推奨、SSH鍵認証を推奨）
* `ansible_ssh_private_key_file`: SSH秘密鍵のパス

### プレイブック（deploy.yml）内で使用される変数

* `security_salt`: CakePHPのセキュリティソルト（未設定の場合は自動生成されません）
* `database_url`: データベース接続URL（設定されている場合のみ使用）
* `debug`: デバッグモードの設定（デフォルトはfalse）
* `create_asset_symlinks`: アセットのシンボリックリンクを作成するかどうか（デフォルトはfalse）
* `rebuild_orm_cache`: ORMキャッシュを再構築するかどうか（デフォルトはfalse）

デプロイ手順の詳細
-------------------------

以下の内容はPlaybookに記載されている内容を元に、手動で対応を行う場合の手順を記載しています。
何らかの理由でAnsibleを使用できない場合に参考にしてください。

### 1. ソースコードのチェックアウト

```sh
git clone [リポジトリURL] [デプロイ先パス]
cd [デプロイ先パス]
git checkout [ブランチ名]
```

### 2. 新規セットアップ処理（初回デプロイ時）

#### 2.1 Composerの依存パッケージをインストール

```sh
cd [デプロイ先パス]
composer install --no-dev --optimize-autoloader --no-interaction
```

#### 2.2 設定ファイルのコピー

```sh
cp config/app_local.example.php config/app_local.php
```

#### 2.3 一時ディレクトリの作成

```sh
mkdir -p tmp/cache/models tmp/cache/persistent tmp/cache/views tmp/sessions tmp/tests tmp/debug_kit logs
chmod 775 tmp/cache/models tmp/cache/persistent tmp/cache/views tmp/sessions tmp/tests tmp/debug_kit logs
```

#### 2.4 セキュリティソルトの設定

```sh
# app_local.phpファイル内のSecuritySalt設定を更新
```

#### 2.5 データベースマイグレーションの実行

```sh
DATABASE_URL=[データベース接続URL] DEBUG=false SECURITY_SALT=[セキュリティソルト] bin/cake migrations migrate
```

### 3. 更新時のセットアップ処理

#### 3.1 Composerの依存パッケージを更新

```sh
cd [デプロイ先パス]
composer install --no-dev --optimize-autoloader --no-interaction
```

#### 3.2 一時ディレクトリの権限を設定

```sh
chmod 775 -R tmp logs
```

#### 3.3 キャッシュをクリア

```sh
DEBUG=false bin/cake cache clear_all
```

#### 3.4 アセットのシンボリックリンクを作成（必要な場合）

```sh
DEBUG=false bin/cake plugin assets symlink
```

#### 3.5 データベースマイグレーションの実行

```sh
bin/cake migrations migrate
```

#### 3.6 ORMキャッシュの再構築（必要な場合）

```sh
bin/cake orm_cache clear
bin/cake orm_cache build
```

### 4. 通知処理

成功または失敗時にSlackへの通知を設定している場合、自動的に通知が送信されます。

セキュリティに関する注意点
-------------------------

### SSH鍵認証の利用

パスワード認証よりもSSH鍵認証を使用することを強く推奨します。

### セキュリティソルト

プロジェクトごとに一意のセキュリティソルトを設定し、環境変数として管理することを推奨します。

### 機密情報の管理

データベースURL等の機密情報は直接ファイルに記述せず、環境変数などで安全に管理してください。

### 権限設定

デプロイ先のディレクトリやファイルの権限は必要最小限に設定し、特に設定ファイルへのアクセスを制限してください。

トラブルシューティング
-------------------------

### デプロイ失敗時の対応

1. **ログの確認**: Ansibleの実行ログを確認して、失敗した箇所を特定します。
2. **手動での確認**: 失敗したタスクを手動で実行し、エラーの詳細を確認します。
3. **権限の確認**: ファイルやディレクトリの権限が適切に設定されているか確認します。
4. **ディスク容量の確認**: サーバーのディスク容量が不足していないか確認します。

### よくあるエラーと対応

1. **Gitリポジトリへのアクセス権限エラー**: SSH鍵が正しく設定されているか確認してください。
2. **Composerインストール失敗**: メモリ制限やタイムアウト設定を見直してください。
3. **データベース接続エラー**: 接続情報やデータベースサーバーの状態を確認してください。
4. **ファイル権限エラー**: Webサーバーのユーザーとデプロイ実行ユーザーの関係を確認してください。

メンテナンスモードとロールバック
-------------------------

現在のPlaybookにはメンテナンスモードやロールバック機能が実装されていません。
必要に応じて以下のような対応を手動で行うことを検討してください。

### メンテナンスモードの実装案

メンテナンスモード中であることを示すファイルを作成し、Webサーバーの設定でそのファイルの存在を確認するような仕組みを導入することができます。

### ロールバックの実施方法

1. 前回のデプロイバージョンにGitリポジトリを戻す
2. データベースマイグレーションがある場合は、手動でロールバック用のSQLを実行する
3. キャッシュを全てクリアする

注意事項と推奨事項
-------------------------

### 本番環境への変更前のテスト

本番環境にデプロイする前に、必ずステージング環境でテストを行ってください。

### デプロイ時間の考慮

大規模なデータベースマイグレーションがある場合は、  
サービス影響の少ない時間帯にデプロイを実施してください。

### バックアップの実施

デプロイ前にデータベースとアプリケーションのバックアップを取得することを推奨します。

### 監視の強化

デプロイ後は、アプリケーションのパフォーマンスやエラーログを注意深く監視してください。

### 段階的なロールアウト

可能であれば、全サーバーへの一斉デプロイではなく、段階的にデプロイすることを検討してください。
