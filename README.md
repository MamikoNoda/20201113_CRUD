# 20201113_CRUD

このリポジトリは Code Chrysalis の生徒であるときに作成しました（This was created during my time as a student at Code Chrysalis）

# Name（リポジトリ/プロジェクト/OSS などの名前）

カピバラ API

下記のエンドポイントを持っており、
家にいるカピバラぬいぐるみの管理をすることが可能です。

| エンドポイント | Path            | 機能                                                  |
| -------------- | --------------- | ----------------------------------------------------- |
| GET            | /kapibara       | カピバラの一覧を取得する                              |
| GET            | /kapibara/:name | カピバラの名前で検索を行う                            |
| POST           | /kapibara       | カピバラの情報を body に入れて登録する                |
| PATCH          | /kapibara       | body に名前と変更する情報を入力して、データを修正する |
| DELETE         | /kapibara       | body に入力した名前のカピバラを削除する               |

また、nodejs 起動後に下記の URL にて、上記機能にアクセスすることも出来ます。

```
nodemon index.js
または
node index.js

```

```
http://localhost:3000/top

```

# Feature&Requirement

サーバサイドに Node.js ＋ express を用い、
データベースは postgres を使用しています。
また、バリデーションチェックには express-validator を使用しています。

また、OR マッパーとして Sequelize というライブラリを使用しています。

_express": "^4.17.1",
_"express-validator": "^6.6.1",
\*"sequelize": "^6.3.5",

# Installation

事前に下記コマンドを入力の上

```
yarn global add sequelize-cli
```

yarn を用いて、Package.json のライブラリを
インストールしてください。

```bash
yarn init
yarn
```

ルートフォルダ配下に config フォルダを作成し、
config.json を作成

```
{
  "development": {
    "username": "*****",
    "password": "*****",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": "*****",
    "password": "*****",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "username": "*****",
    "password": "*****",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  }
}

```

その後、データベースを作成してください。

```
yarn sequelize db:create
```

migrate,seed は package.json にコマンド登録済みです。

以上がセットアップ方法になります。
