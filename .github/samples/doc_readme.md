プロジェクト名
=========================

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PHP Version](https://img.shields.io/badge/php-%5E8.1-blue)](https://php.net)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/owner/repo/actions)

プロジェクトの簡潔な説明をここに記載します。
このプロジェクトが解決する問題や提供する価値を1-2文で説明します。

主要機能
-------------------------

- 機能1: 具体的な機能の説明
- 機能2: 具体的な機能の説明
- 機能3: 具体的な機能の説明
- 機能4: 具体的な機能の説明

技術スタック
-------------------------

### フロントエンド

- HTML5/CSS3
- JavaScript (ES6+)
- Bootstrap 5

### バックエンド

- PHP 8.1+
- CakePHP 4.x
- MySQL 8.0+

### 開発・運用ツール

- Composer: 依存関係管理
- PHPUnit: テスティングフレームワーク
- Ansible: デプロイメント自動化
- Docker: 開発環境構築

セットアップ手順
-------------------------

### 前提条件

以下のソフトウェアがインストールされている必要があります:

- PHP 8.1以上
- Composer
- MySQL 8.0以上
- Node.js 16以上 (開発時のみ)

### インストール

1. リポジトリをクローンします:

    ```bash
    git clone https://github.com/owner/repo.git
    cd repo
    ```

2. 依存関係をインストールします:

    ```bash
    composer install
    ```

3. 環境設定ファイルをコピーして編集します:

    ```bash
    cp config/app_local.example.php config/app_local.php
    ```

4. データベースを作成し、マイグレーションを実行します:

    ```bash
    bin/cake migrations migrate
    ```

5. 開発サーバーを起動します:

    ```bash
    bin/cake server
    ```

ブラウザで `http://localhost:8765` にアクセスして動作を確認してください。

使用方法
-------------------------

### 基本的な使い方

1. **ユーザー登録**
   - `/users/register` にアクセスしてアカウントを作成

2. **ログイン**
   - `/users/login` でログイン

3. **データ管理**
   - ダッシュボードからデータの追加・編集・削除が可能

### コマンドライン操作

```bash
# データベースのマイグレーション
bin/cake migrations migrate

# キャッシュクリア
bin/cake cache clear_all

# テスト実行
vendor/bin/phpunit
```

プロジェクト構造
-------------------------

```
├── README.md                 # このファイル
├── bin/                      # 実行可能スクリプト
├── config/                   # 設定ファイル
├── docs/                     # プロジェクトドキュメント
├── src/                      # アプリケーションソースコード
│   ├── Controller/              # コントローラークラス
│   ├── Model/                   # モデルクラス
│   └── View/                    # ビュークラス
├── templates/                # テンプレートファイル
├── tests/                    # テストコード
├── tmp/                      # 一時ファイル
├── vendor/                   # 外部ライブラリ
├── webroot/                  # 公開ディレクトリ
├── composer.json             # Composer設定
└── phpunit.xml.dist          # PHPUnit設定
```

詳細なディレクトリ構造については[ディレクトリ構造ドキュメント](./docs/directory_structure.md)を参照してください。

関連ドキュメント
-------------------------

### プロジェクト概要・要件

- [プロジェクト概要](./docs/index.md) - プロジェクトの背景と目的
- [要件定義](./docs/requirements.md) - 機能要件と非機能要件
- [課題整理](./docs/problem.md) - プロジェクトで解決すべき課題

### 開発・技術

- [技術スタック](./docs/technology.md) - 使用技術の詳細
- [ディレクトリ構造](./docs/directory_structure.md) - プロジェクト構成の詳細
- [コーディング規約](./docs/code_style.md) - コードスタイルガイド
- [テスト方針](./docs/test_policy.md) - テスト戦略と手法

### 運用・デプロイ

- [デプロイ手順](./docs/deployment.md) - 本番環境へのデプロイ方法

### その他

- [用語集](./docs/glossary.md) - プロジェクト固有の用語定義
- [ペルソナ定義](./docs/persona.md) - ユーザーペルソナの定義
- [ヒアリング結果](./docs/hearing.md) - 要件ヒアリングの結果
