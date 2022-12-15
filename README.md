# アプリケーション名
Twitter風SNSアプリ

< --- トップ画面の画像 ---- >
<img width="1438" alt="スクリーンショット 2021-03-27 14 49 27" src="https://user-images.githubusercontent.com/115058763/207849516-8bfeed24-5ff3-45a8-8c92-9edad084dc83.png">

## 作成した目的
演習目的

## アプリケーションURL
https://modern-practice-5ba00.web.app/login
メールアドレス、パスワードでログイン

## 他のリポジトリ
バックエンドのリポジトリ
https://github.com/TM-MZ/modern_api_practice.git

## 機能一覧
- Firebaseでの認証
- 投稿の一覧表示　追加処理　削除処理
- 投稿した名前と投稿内容が表示される
- 投稿の追加
- バツマークを押すと投稿が削除される
- いいね機能
- ハートマークを押すと良いね数が増えたり減ったりする
- コメント機能
- 矢印マークを押すとコメント画面に遷移する
- コメントした名前と投稿内容が表示される
- コメントの追加

## 使用技術（実行環境）
- Nuxt.js 2.15.8
- vee-validate 3.4.14
- Firebase 8.6.8

- 

## テーブル設計
< --- 作成したテーブル設計の画像 ---- >
![スクリーンショット 2022-12-15 20 48 50](https://user-images.githubusercontent.com/115058763/207852332-b93fe4fa-7369-4ae9-86a2-9cbadba9a34f.png)

## ER図
< --- 作成したER図の画像 ---- >
![スクリーンショット 2022-12-15 20 49 19](https://user-images.githubusercontent.com/115058763/207852371-226f2a5c-6c05-4478-889c-09c3a87cf566.png)

## 環境構築
```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

# アカウントの種類（テストユーザーなど）
テストユーザー:
メールアドレス:test@example.com
パスワード:password
