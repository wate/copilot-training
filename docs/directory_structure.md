ディレクトリ構造
=========================

```
./
├── bin/
│   ├── cake
│   ├── cake.bat
│   ├── cake.php
│   ├── bash_completion.sh
│   ├── clear_docker_image.sh
│   └── sync_origin.sh
├── config/
│   ├── app.php
│   ├── app_local.php
│   ├── app_local.example.php
│   ├── bootstrap.php
│   ├── paths.php
│   ├── plugins.php
│   ├── routes.php
│   └── schema/
│       ├── i18n.sql
│       └── sessions.sql
├── docs/
│   ├── code_style.md
│   ├── directory_structure.md
│   ├── index.md
│   ├── persona.md
│   └── test_policy.md
├── logs/
├── plugins/
├── resources/
├── src/
│   ├── Application.php
│   ├── Console/
│   │   └── Installer.php
│   ├── Controller/
│   │   ├── AppController.php
│   │   ├── ErrorController.php
│   │   ├── PagesController.php
│   │   └── Component/
│   ├── Model/
│   │   ├── Behavior/
│   │   ├── Entity/
│   │   └── Table/
│   └── View/
│       ├── AjaxView.php
│       ├── AppView.php
│       ├── Cell/
│       └── Helper/
├── templates/
│   ├── cell/
│   ├── element/
│   │   └── flash/
│   ├── email/
│   │   ├── html/
│   │   └── text/
│   ├── Error/
│   │   ├── error400.php
│   │   └── error500.php
│   ├── layout/
│   │   ├── ajax.php
│   │   ├── default.php
│   │   ├── error.php
│   │   └── email/
│   └── Pages/
│       └── home.php
├── tests/
│   ├── bootstrap.php
│   ├── schema.sql
│   ├── Fixture/
│   └── TestCase/
│       ├── ApplicationTest.php
│       ├── Controller/
│       ├── Model/
│       └── View/
├── tmp/
│   ├── debug_kit.sqlite
│   ├── cache/
│   │   ├── models/
│   │   ├── persistent/
│   │   └── views/
│   ├── sessions/
│   └── tests/
├── vendor/
│   ├── autoload.php
│   ├── cakephp-plugins.php
│   ├── bin/
│   ├── cakephp/
│   └── ...
└── webroot/
    ├── css/
    ├── font/
    ├── img/
    ├── js/
    ├── favicon.ico
    └── index.php
```

ディレクトリの役割
-------------------------

### bin/

bin/ディレクトリは、実行可能なスクリプトやコマンドラインツールを格納するためのディレクトリです。

### config/

config/ディレクトリは、アプリケーションの設定ファイルを格納するためのディレクトリです。

### docs/

docs/ディレクトリは、プロジェクトのドキュメントを格納するためのディレクトリです。

### logs/

logs/ディレクトリは、アプリケーションのログファイルを格納するためのディレクトリです。

### plugins/

plugins/ディレクトリは、CakePHPプラグインを格納するためのディレクトリです。

### resources/

resources/ディレクトリは、リソースファイルを格納するためのディレクトリです。

### src/

src/ディレクトリは、アプリケーションのソースコードを格納するためのディレクトリです。
CakePHPアプリケーションのMVCパターンに基づいたコードがここに配置されます。

#### src/Console/

src/Console/ディレクトリは、コマンドラインインターフェース（CLI）用のコードを格納するためのディレクトリです。

#### src/Controller/

src/Controller/ディレクトリは、アプリケーションのコントローラークラスを格納するためのディレクトリです。

#### src/Model/

src/Model/ディレクトリは、アプリケーションのモデルクラスを格納するためのディレクトリです。

#### src/View/

src/View/ディレクトリは、アプリケーションのビュークラスを格納するためのディレクトリです。

### templates/

templates/ディレクトリは、アプリケーションのテンプレートファイルを格納するためのディレクトリです。

### tests/

tests/ディレクトリは、アプリケーションのテストコードを格納するためのディレクトリです。

### tmp/

tmp/ディレクトリは、一時ファイルを格納するためのディレクトリです。
キャッシュやセッション情報、テスト実行時の一時ファイルなどが保存されます。

### vendor/

vendor/ディレクトリは、Composerによってインストールされた外部ライブラリを格納するためのディレクトリです。

### webroot/

webroot/ディレクトリは、Webサーバーのドキュメントルートとなるディレクトリです。
CSS、JavaScript、画像などの静的なファイルが配置されます。
