# 実装計画: ブラウザ版シンプル・インベーダー（HTML + JavaScript + Canvas）

## 1. 目的
`spec.md` の要件に基づき、HTML とプレーン JavaScript（ES2020 目安）で HTML5 Canvas を用いた固定画面のインベーダーゲームを実装する。

## 2. 技術スタック / 方針
- ランタイム: 最新ブラウザ（Chromium/Firefox/Safari）
- UI/描画: `<canvas>` 2D コンテキスト
- 言語: JavaScript（型は JSDoc で最小限明示）
- ビルド: ひとまず不要（原始構成）。将来的に Vite 等へ移行可能。
- 依存: なし（音再生は `Audio` 標準 API）

## 3. ディレクトリ構成（提案）
- `index.html`
- `src/`
  - `main.js`（エントリ、ゲーム初期化）
  - `game.js`（ゲームループ、状態管理）
  - `input.js`（入力管理）
  - `entities/`
    - `player.js`
    - `invader.js`
    - `bullet.js`
    - `bunker.js`
    - `formation.js`
  - `systems/`
    - `collision.js`（AABB 判定、マスク処理）
    - `render.js`（描画ユーティリティ）
    - `audio.js`
  - `state.js`（StateMachine: Title/Play/Clear/GameOver）
- `assets/`（画像・音。初期はプレースホルダでも可）

## 4. ゲームループ / タイミング
- `requestAnimationFrame` を使用。
- 固定タイムステップ近似（例: 16.67ms）で更新、レンダの分離は不要な限り単一パス。
- 速度スケーリング: 生存インベーダー数に応じて `formation.speed` を逓増。

## 5. 入力
- `keydown`/`keyup` を `input.js` で集約。
- 左右移動は押下中フラグで継続。発射は立ち上がり検出（押下エッジ）により 1 発制限を維持。

## 6. 当たり判定
- AABB（矩形）を基本。
- トーチカはタイル分割（例: 8×N の小矩形集合）で段階破壊を表現。
- 判定組み合わせ:
  - 自弾×インベーダー
  - 自弾×トーチカ（破壊）
  - 敵弾×トーチカ（破壊）
  - 敵弾×プレイヤー（被弾）
  - インベーダー×トーチカ（接触破壊）
  - インベーダー隊列の端×キャンバス端（反転＋下降）

## 7. エンティティ / データモデル
- Player: `{ x, y, width, height, speed, canFire, bullet?: Bullet }`
- Bullet: `{ x, y, width, height, vy, owner: 'player'|'enemy' }`
- Invader: `{ row, col, x, y, width, height, alive, scoreValue }`
- Formation: `{ direction: -1|1, speed, stepDownPx, leftBound, rightBound }`
- Bunker: `{ tiles: boolean[][], x, y, tileSize }`
- GameState: `{ score, lives, wave, state }`

## 8. 表示 / レイアウト
- 解像度例: 800×600（比率固定）。CSS で拡大スケール可。
- 初期配置:
  - インベーダー: 5 段×11 列を中央上部にグリッド配置。
  - プレイヤー: 画面下段中央。
  - トーチカ: 下段上の等間隔 3〜4 基（実装時に座標定義）。
- テキスト HUD: スコア、残機、状態（PLAY/CLEAR/GAME OVER）。

## 9. スコアリング / ルール
- 段別スコア: 最上段 30、上から 2〜3 段 20、上から 4〜5 段 10。
- 撃墜加速: 生存数減少で `formation.speed` を逓増。上限 `t_min` を超えない。
- 勝利: 全滅で CLEAR。
- 敗北: インベーダーがプレイヤー縦位置到達、または残機 0 で被弾 → GAME OVER。

## 10. サウンド
- `audio.js` で発射/爆発/ゲームオーバー効果音。
- ミュートトグルを `M` キーで切替（任意）。

## 11. パフォーマンス / 品質
- 60 FPS 目標、低環境で 30 FPS 維持。
- 可能な限りバッチ描画（パス数削減）、オブジェクト再利用で GC 抑制。
- 画面外クランプで不要処理を抑える。

## 12. テスト / 検証
- 手動シナリオ:
  - 端到達での下降・反転確認
  - 単発制限の遵守
  - 段別スコア加算の確認
  - 生存数減少による速度上昇
  - 最下段到達の GAME OVER 優先
- 単体的ユーティリティは関数分離（例: AABB 判定）し、後日テスト導入可能。

## 13. フェーズ計画
- フェーズ 0: ベース構成
  - `index.html`, `src/main.js`, `src/game.js`, `src/input.js`, `src/render.js`
  - 画面生成、ループ稼働、プレイヤー描画/移動のみ
- フェーズ 1: 基本戦闘
  - 自弾発射（単発制限）、AABB 判定、インベーダー編成の横移動/下降/反転
  - 撃墜と段別スコア、隊列速度スケーリング
- フェーズ 2: トーチカ
  - タイル表現、破壊ロジック（自弾・敵弾・接触）
- フェーズ 3: 敵弾/被弾/残機
  - 敵弾生成パターン、プレイヤー被弾、残機管理、GAME OVER 遷移
- フェーズ 4: 演出/仕上げ
  - エフェクト、サウンド、HUD、CLEAR/OVER 画面、リスタート

## 14. 出力アーティファクト
- 本ファイル: `MySpecKitPrj/plan.md`
- 以降の実装で作成: `index.html`, `src/**/*.js`, `assets/**/*`

## 15. リスク / 留意点
- モバイル入力対応は任意（後回し可）。
- 当たり判定と端判定の優先順位（端→下降→反転→移動の順など）を実装で厳密化。
- 最下段到達と全滅同時発生時は最下段到達を優先（`spec.md` 準拠）。


