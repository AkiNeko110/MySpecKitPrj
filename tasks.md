# タスク一覧: ブラウザ版シンプル・インベーダー

本タスクは `spec.md` と `plan.md` に基づく。番号順は依存順。`[P]` は並行可能の目安（同一ファイルを編集しない場合）。

## フェーズ 0: ベース構成 / 初期セットアップ
- T001: `index.html` を作成し、`<canvas id="game" width="800" height="600">` を配置
- T002: `src/main.js` を作成。Canvas 取得、`game.init()` 呼び出し、`requestAnimationFrame` ループ開始
- T003: `src/game.js` を作成。`Game` オブジェクト（state、update、render、reset）骨子実装
- T004: `src/input.js` を作成。`keydown`/`keyup` の状態管理（left/right/fire）
- T005: `src/systems/render.js` を作成。矩形/テキストの描画ユーティリティ

## フェーズ 1: 基本戦闘
- T006: `src/entities/player.js` を作成。左右移動、単発弾 `bullet` 保持ロジック
- T007: `src/entities/bullet.js` を作成。上向き自弾の移動とライフサイクル
- T008: `src/entities/invader.js` を作成。サイズ、段別スコア、描画
- T009: `src/entities/formation.js` を作成。横移動、端到達判定、下降＆反転、速度スケーリング
- T010: `src/systems/collision.js` を作成。AABB とユースケース別の衝突ハンドラ（自弾×敵）
- T011: `src/game.js` にプレイヤー/弾/編成の更新と描画、端クランプ、スコア加算を統合

## フェーズ 2: トーチカ
- T012: `src/entities/bunker.js` を作成。タイル表現（boolean[][]）、描画と部分破壊
- T013: `src/systems/collision.js` を拡張。自弾×トーチカ、敵弾×トーチカ、インベーダー×トーチカ
- T014: `src/game.js` にトーチカの初期配置・管理を追加

## フェーズ 3: 敵弾/被弾/残機
- T015: `src/entities/bullet.js` に敵弾（下向き）を追加し共通化
- T016: `src/game.js` で敵弾の生成パターン（列から確率発射）と更新
- T017: `src/systems/collision.js` を拡張。敵弾×プレイヤー（被弾処理）
- T018: `src/game.js` に残機管理、被弾時のリスポーン/無敵時間（任意）、GAME OVER 遷移

## フェーズ 4: 演出/仕上げ
- T019 [P]: `src/systems/audio.js` を作成。発射・爆発・ゲームオーバー音
- T020 [P]: 撃墜/被弾の簡易エフェクト（点滅/爆発）を `render.js` か専用モジュールに追加
- T021 [P]: HUD（スコア/残機/状態テキスト）描画の整備
- T022: CLEAR/OVER 表示とリスタート入力（Enter）

## 並行実行の目安
- [P] タグの T019〜T021 は同時進行可。
- それ以外は `src/game.js` の変更が絡むため、原則順次。

## 実行コマンド例
- （任意）ローカルサーバ: `npx serve` などで `index.html` を配信
