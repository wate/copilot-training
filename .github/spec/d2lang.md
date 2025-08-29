
D2言語リファレンス
=========================

D2言語（Declarative Diagramming）は、テキストから図を生成するダイアグラムスクリプト言語です。  
以下はD2言語の基本構文からスタイル属性まで包括的なリファレンスです。

基本構文
-------------------------

### ノード（Shape）の定義

```d2
# 基本的なノード定義
imAShape
im_a_shape
"im a shape"
i'm_a_shape
a-shape

# セミコロンで同一行に複数定義
x; y; z

# ラベルの指定（キーとラベルを分ける）
server: Web Server
db: Database

# 図形の種類を指定
circle_node: {
  shape: circle
}
```

### エッジ（Connection）の定義

```d2
# 基本的な接続方法
x -- y          # 線
x -> y          # 右向き矢印
x <- y          # 左向き矢印
x <-> y         # 双方向矢印

# ラベル付き接続
x -> y: connects to

# 接続の連鎖
A -> B -> C -> D

# 複数の接続（同じ接続を複数回定義すると複数の線が引かれる）
Database -> S3: backup
Database -> S3: backup
```

### コンテナ（グループ化）

```d2
# ネスト構文
server: {
  api
  db
  auth
}

# ドット記法
server.api
server.db
server.auth

# コンテナラベル（2つの方法）
clouds: "Cloud Services" {
  aws
  gcloud
}

# または
clouds: {
  label: Cloud Services
  aws
  gcloud
}

# 親要素への参照（アンダースコア）
container: {
  child
  _.parent_sibling
}
```

図形（Shape）の種類
-------------------------

### 基本図形

- `rectangle` (デフォルト)
- `square`
- `circle`
- `oval`
- `diamond`
- `parallelogram`
- `hexagon`
- `cylinder`
- `queue`
- `package`
- `step`
- `callout`
- `stored_data`
- `person`
- `document`
- `page`
- `cloud`

### 特殊図形

- `sql_table`: データベーステーブル
- `class`: UMLクラス図
- `sequence_diagram`: シーケンス図
- `code`: コードブロック
- `text`: テキストボックス

### 1:1比率維持図形

以下の図形は常に幅と高さが等しく保たれます：

- `circle`
- `square`

接続の詳細仕様
-------------------------

### 矢印の種類

- `triangle` (デフォルト): 三角矢印
- `arrow`: より尖った矢印
- `diamond`: ダイヤモンド型
- `circle`: 円型
- `box`: 四角型
- `cf-one`, `cf-one-required`: カラスの足（1対1）
- `cf-many`, `cf-many-required`: カラスの足（1対多）

### 矢印のカスタマイズ

```d2
A -> B: {
  source-arrowhead: diamond
  target-arrowhead: circle
  source-arrowhead.style.filled: true
  target-arrowhead.style.filled: false
}
```

### 接続の参照

```d2
x -> y: connection 1
x -> y: connection 2

# 最初の接続を参照
(x -> y)[0].style.stroke: red
# 二番目の接続を参照
(x -> y)[1].style.stroke: blue
```

コメント
-------------------------

```d2
# 行コメント
shape1

"""
複数行コメント
ブロックコメント
"""
shape2
```

スタイル属性
-------------------------

D2言語では、ノード（shape）やエッジ（connection）、図全体（root）に様々なスタイル属性を適用できます。  
以下は適用対象別に分類したスタイル属性の一覧です。

### 1. 全般的に使用可能な属性

### opacity（透明度）

- 適用対象: shape、edge
- 値: 0.0から1.0の間の浮動小数点数
- 説明: 要素の透明度を指定

### stroke（線の色）

- 適用対象: shape、edge、root
- 値: CSS色名、16進数カラーコード、CSS グラデント文字列の一部
- 説明: 要素の線の色を指定
- 特記事項: sql_tableやclassでは、bodyの塗りつぶし色として適用される

### stroke-width（線の太さ）

- 適用対象: shape、edge、root
- 値: 1から15の整数
- 説明: 線の太さを指定

### stroke-dash（破線）

- 適用対象: shape、edge、root
- 値: 0から10の整数
- 説明: 破線のパターンを指定

### border-radius（角の丸み）

- 適用対象: shape、edge
- 値: 0から20の整数
- 説明: 角の丸みを指定。エッジでは角の丸みを制御
- 特記事項: 高い値を指定するとピル効果を作成

### font（フォント）

- 適用対象: shape、edge
- 値: 現在は`mono`のみ
- 説明: フォントを指定

### font-size（フォントサイズ）

- 適用対象: shape、edge
- 値: 8から100の整数
- 説明: フォントサイズを指定

### font-color（フォント色）

- 適用対象: shape、edge
- 値: CSS色名、16進数カラーコード、CSS グラデント文字列の一部
- 説明: テキストの色を指定
- 特記事項: sql_tableやclassでは、ヘッダーテキストのみに適用

### animated（アニメーション）

- 適用対象: shape、edge
- 値: true、false
- 説明: アニメーション効果を適用

### bold, italic, underline（テキスト装飾）

- 適用対象: shape、edge
- 値: true、false
- 説明: テキストの太字、斜体、下線を指定

### text-transform（テキスト変換）

- 適用対象: shape、edge
- 値: uppercase、lowercase、title、none
- 説明: ラベルの大文字・小文字変換

### 2. Shape（ノード）専用属性

### fill（塗りつぶし色）

- 適用対象: shape専用
- 値: CSS色名、16進数カラーコード、CSS グラデント文字列の一部
- 説明: shapeの内部の塗りつぶし色を指定
- 特記事項: sql_tableやclassでは、ヘッダーに適用

### fill-pattern（塗りつぶしパターン）

- 適用対象: shape専用
- 値: dots、lines、grain、none
- 説明: 塗りつぶしのパターンを指定

### shadow（影）

- 適用対象: shape専用
- 値: true、false
- 説明: 影効果を適用

### multiple（複数表示）

- 適用対象: shape専用
- 値: true、false
- 説明: 複数の要素を表示する効果

### 3. 特定Shape専用属性

#### 3d（3D効果）

- 適用対象: rectangle/square専用
- 値: true、false
- 説明: 3D効果を適用

#### double-border（二重枠線）

- 適用対象: rectangle/oval専用、root
- 値: true、false
- 説明: 二重の枠線を表示

### 4. Root（図全体）専用属性

root レベルで適用できるスタイル属性：

#### style.fill

- 説明: 図の背景色

#### style.fill-pattern

- 説明: 背景の塗りつぶしパターン

#### style.stroke

- 説明: 図の周りのフレーム

#### style.stroke-width

- 説明: フレームの線の太さ

#### style.stroke-dash

- 説明: フレームの破線パターン

#### style.double-border

- 説明: 二重フレーム（人気のフレーミング手法）

グロブ（Globs）機能
-------------------------

グロブは一行でグローバルな変更を行える強力な言語機能です。  
ワイルドカードパターンを使用して複数の要素に一括でスタイルや属性を適用できます。

### 基本的なグロブパターン

#### * (シングルグロブ)

- 説明: 現在のスコープ内の全ての要素にマッチ
- 例: `*.style.fill: blue` - 全ての要素を青色に

#### ** (ダブルグロブ)

- 説明: 再帰的にすべての要素にマッチ（ネストした要素含む）
- 例: `**.style.stroke: red` - 全ての要素の線を赤色に

#### *** (トリプルグロブ)

- 説明: 図全体にグローバルに適用、レイヤーやインポートを跨いで適用
- 例: `***.style.font: mono` - 図全体のフォントをmonoに

### グロブの特徴

#### 双方向適用

- グロブルールは既存の要素と新規作成される要素の両方に適用される
- 後から作成された要素にも自動的に適用される

#### 大文字小文字の区別なし

- グロブパターンは大文字小文字を区別しない
- `*diddy*` は "Diddy Kong" にもマッチする

#### スコープ適用

- グロブは定義されたスコープ内でのみ適用される
- ネストされたコンテナ内のグロブはそのコンテナ内でのみ有効

### グロブ接続

- `* -> *`: 全ての要素間に接続を作成
- 自己接続は実用的な理由で省略される
- 既存の接続のスタイル変更にも使用可能

### フィルター機能

#### プロパティフィルター

- `&`: 条件に一致する要素のみを対象とする
- `!&`: 条件に一致しない要素のみを対象とする（逆フィルター）

#### 特殊プロパティフィルター

- `connected: true|false`: 接続されている要素のみ
- `leaf: true|false`: リーフノード（子要素を持たない要素）のみ

#### 接続エンドポイントフィルター

- `&src`: 接続の送信元でフィルター
- `&dst`: 接続の送信先でフィルター

### 使用例

#### デフォルトスタイルの変更

```d2
*.style.fill: lightblue
*.style.stroke: darkblue
```

#### 条件付きスタイル適用

```d2
*: {
  &shape: circle
  style.fill: red
}
```

#### 接続の一括スタイル変更

```d2
* -> *: {
  style.stroke: green
  style.stroke-width: 2
}
```

参考リンク
-------------------------

### 公式ドキュメント

- [D2言語公式サイト](https://d2lang.com/)
- [D2言語ツアー](https://d2lang.com/tour/intro/)
- [スタイル仕様](https://d2lang.com/tour/style/)
- [グロブ機能](https://d2lang.com/tour/globs/)
- [図形の種類](https://d2lang.com/tour/shapes/)
- [接続の仕様](https://d2lang.com/tour/connections/)
- [コンテナとレイアウト](https://d2lang.com/tour/containers/)

### GitHub関連

- [D2言語GitHubリポジトリ](https://github.com/terrastruct/d2)
- [リリースノート](https://github.com/terrastruct/d2/releases)
- [Issues（バグ報告・機能要望）](https://github.com/terrastruct/d2/issues)

### 関連ツール

- [D2プレイグラウンド](https://play.d2lang.com/)
- [VSCode拡張機能](https://marketplace.visualstudio.com/items?itemName=terrastruct.d2)

補足情報
-------------------------

- 図にフレームを作成する場合は、paddingの追加を検討してください
- デフォルトスタイルの変更については、上記のグロブ機能リンクを参照
- 最新の仕様変更やアップデート情報は、公式GitHubリポジトリのリリースノートで確認できます
