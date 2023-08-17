[![check](https://github.com/taigacat/mache-counter/actions/workflows/check.yml/badge.svg)](https://github.com/taigacat/mache-counter/actions/workflows/check.yml)
[![codecov](https://codecov.io/gh/taigacat/mache-counter/graph/badge.svg?token=752JC47UWK)](https://codecov.io/gh/taigacat/mache-counter)

# マシェバラギフトカウンター

Chrome 拡張機能「マシェバラギフトカウンター」は、マシェバラのギフトをカウントする拡張機能です。

ギフティングリストに表示されているギフトの数を集計して表示します。

![screenshot.png](screenshot.png)

## 利用方法

* 下記のインストール手順に従い、拡張機能をインストールする
* マシェバラの配信ページを開く

## インストール手順

### Chrome ウェブストアからインストール

※公開申請中※

### 手動インストール

* Release ページから extension.zip をダウンロード
* extension.zip を展開
* Chrome の拡張機能設定ページ chrome://extensions/ を開く
* デベロッパー モードを有効化する
* 「パッケージ化されていない拡張機能を読み込む」ボタンをクリックして、 extension.zip を展開したフォルダを指定する

## 開発者向け情報

### 環境構築

```sh
npm ci
```

### 静的解析

#### ESLint

```sh
npm run lint
```

自動修正する場合は、`npm run lint:fix` を実行する。

#### Stylelint

```sh
npm run stylelint
```

自動修正する場合は、`npm run stylelint:fix` を実行する。

### ユニットテスト

```sh
npm run test
```

### スナップショットテスト

```sh
npm run test:snapshot
```

スナップショットを更新する場合は、`npm run test:snapshot:update` を実行する。

### ビルド

```sh
npm run build
``` 
