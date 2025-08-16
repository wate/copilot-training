チートシート
=========================

このドキュメントでは、プロジェクトでよく使用するコマンドや設定を簡潔にまとめています。

開発環境セットアップ
-------------------------

### 依存関係のインストール

#### PHP（Composer）

```bash
composer install
```

#### Node.js（npm/yarn）

```bash
npm install
# または
yarn install
```

#### Python（pip）

```bash
pip install -r requirements.txt
```

プロジェクトの依存関係をインストールします。初回セットアップ時や依存関係が更新された際に実行します。

依存関係管理
-------------------------

### パッケージの追加

#### PHP

```bash
composer require {package-name}
composer require --dev {package-name}  # 開発環境のみ
```

#### Node.js

```bash
npm install {package-name}
npm install --save-dev {package-name}  # 開発環境のみ
```

### パッケージの更新

```bash
composer update     # PHP
npm update         # Node.js
```

コード品質チェック
-------------------------

### リンター・フォーマッター

#### PHP

```bash
# PHPCSでスタイルチェック
./vendor/bin/phpcs --colors -p
# 自動修正
./vendor/bin/phpcbf --colors -p
```

#### JavaScript/TypeScript

```bash
# ESLintでチェック
npm run lint
# Prettierでフォーマット
npm run format
```

### 静的解析

#### PHP

```bash
# PHPStan
./vendor/bin/phpstan analyze
# Psalm
./vendor/bin/psalm
```

#### TypeScript

```bash
# TypeScript型チェック
npm run type-check
```

テスト実行
-------------------------

### 単体テスト

#### PHP（PHPUnit）

```bash
./vendor/bin/phpunit --colors=always
```

#### JavaScript（Jest/Mocha）

```bash
npm test
npm run test:watch  # ファイル変更を監視
```

#### Python（pytest）

```bash
pytest
pytest --cov  # カバレッジ付き
```

ビルド・コンパイル
-------------------------

### アセットビルド

```bash
npm run build       # 本番用ビルド
npm run dev         # 開発用ビルド
npm run watch       # ファイル変更を監視してビルド
```

### Docker関連

```bash
docker-compose up -d        # コンテナ起動
docker-compose down         # コンテナ停止
docker-compose build        # イメージビルド
docker-compose logs -f      # ログ確認
```

開発サーバー
-------------------------

### 各種開発サーバー

```bash
# フレームワーク組み込みサーバー
npm run serve       # Node.js
php -S localhost:8000  # PHP
python manage.py runserver  # Django
```

Taskコマンド
-------------------------

### Task Runner

```bash
task                # デフォルトタスク
task {task-name}    # 特定のタスク実行
task --list         # 使用可能なタスク一覧
```

### Make

```bash
make                # デフォルトターゲット
make {target}       # 特定のターゲット実行
make help           # ヘルプ表示
```

デプロイメント
-------------------------

### デプロイコマンド

```bash
# Ansible
ansible-playbook -i inventory.yml deploy.yml

# Docker
docker-compose -f docker-compose.prod.yml up -d

# カスタムデプロイスクリプト
npm run deploy
```

メンテナンス・ユーティリティ
-------------------------

### キャッシュクリア

```bash
# アプリケーションキャッシュ
npm run cache:clear
composer dump-autoload

# システムキャッシュ
docker system prune -f
```

### データベース

```bash
# マイグレーション
npm run migrate        # Node.js
python manage.py migrate  # Django
./bin/console doctrine:migrations:migrate  # Symfony
```

### ログ確認

```bash
tail -f logs/app.log
docker-compose logs -f {service-name}
```

よく使用するファイルパス
-------------------------

- 設定ファイル: `config/`
- ソースコード: `src/` または `app/`
- テストファイル: `tests/` または `__tests__/`
- 静的ファイル: `public/` または `webroot/`
- ドキュメント: `docs/`

便利なオプション
-------------------------

### 共通オプション

- `--help`: ヘルプ表示
- `--version`: バージョン表示
- `--dry-run`: 実行せずに確認のみ
- `--verbose` または `-v`: 詳細出力

### 環境別実行

```bash
NODE_ENV=production npm run build    # Node.js
APP_ENV=prod composer install --no-dev  # PHP
```
