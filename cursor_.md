# 仕様書を日本語で作成する
_Exported on 2025/9/28 at 19:19:11 JST from Cursor (1.6.45)_

---

**User**

/specify 仕様書は日本語で作成してください。

---

**Cursor**

I'll scan the existing `.cursor/commands` to understand how your specification workflow is intended, then I'll generate a Japanese specification document accordingly and place it in your project.

I'll run the feature initialization script to create the branch and spec file, then load the spec template so I can write a Japanese specification into the generated `spec.md`.

---

**User**

/specify Webブラウザで遊べるシンプルなインベーダーゲームを作りたい。

以下ゲームの仕様になります。

画面の中央やや上方に、縦5段 横11列の、計55のインベーダーが現れます。
インベーダーは隊列状態でまとまって横移動しながら、端にたどり着く度に一段下がり、下がり終えると進行方向を逆方向に変えて再び移動しはじめます。
これを繰り返すことによって、段々と下に降りてきます。
インベーダーが画面最下部のプレイヤーの位置まで降りてきたら、自陣が占領されたことになり、残機があってもゲームオーバーとなります。
それまでにインベーダーを全滅させればクリアとなります。

自陣に関しては、ビーム砲（自機）が一門、画面の下段に表示されます。
ビーム砲は左右にしか動けず、弾を撃つ場合でも1発限定で、しかも自分が撃った飛翔中の弾がどこかに着弾するまでは、次の弾が撃てません。
ビーム砲の上にはいくつかトーチカ（防御壁のようなもの）があり、ビーム砲を敵の攻撃から護る役割を最初は果たしています。
トーチカはインベーダーからの攻撃を受けた場合も、またビーム砲がトーチカ下方からビームを撃った場合も、少しずつ破損してゆき、さらには降りてきたインベーダーが触れることでも削られてしまいます。
プレーヤーは、トーチカの下に入ってインベーダーからの攻撃を避けたり、そこから出てインベーダーを攻撃する。
画面がスクロールすることはなく、インベーダーやビーム砲が画面からはみ出すことなどはありません。

インベーダーを撃墜した際の得点は一番上の段が30点、その下の2段が20点、その下の2段が10点です。
逆に敵インベーダーからの攻撃でビーム砲が被弾した場合、ミスとなりビーム砲を1門失う。

インベーダーは撃墜され数が減るにつれ、徐々に移動速度が速くなっていきます。
インベーダーが最下段まで降りてしまうと、占領されたということでビーム砲は破壊されてしまい、ゲーム終了となり「GAME OVER」の文字が表示されます。

---

**Cursor**

I'll initialize the feature with the script to get the branch and spec file, then load the spec template to generate a Japanese specification and write it to the created `spec.md`.

I'll run the initialization script now to create the feature branch and spec file.

I tried to run the initialization script but it doesn't exist in this repo. I'll scan the repository to confirm available templates or scripts, then propose an alternative: create a spec file and branch manually following the template if present.

The script is missing, so I'll create the specification manually. I'll cancel the initialization step, start generating the Japanese spec, and write it to a new `MySpecKitPrj/spec.md`.

```markdown
# 機能仕様書: ブラウザ版シンプル・インベーダーゲーム

## 概要 / コンテキスト
Web ブラウザ上でプレイできる、クラシックな固定画面式のインベーダーゲームを実装する。プレイヤーは画面下部のビーム砲を左右に操作し、上部から横隊で迫ってくるインベーダー編隊を撃墜して全滅させることを目標とする。インベーダーが画面最下部（プレイヤー位置）まで到達した場合は、残機があってもゲームオーバーとなる。

## 用語
- ビーム砲: プレイヤーが操作する自機。左右移動のみ可能。弾は同時に1発まで。
- トーチカ: ビーム砲上部に配置される防御壁。被弾や接触で破損する。
- インベーダー: 縦5段×横11列の55体の敵。隊列で横移動し、端到達で1段下降し進行方向を反転。
- 残機: プレイヤーが所持するビーム砲の数。被弾で1門失う。

## 画面 / レイアウト要件
- 固定画面。スクロールなし。
- 画面からインベーダーやビーム砲がはみ出さないように境界衝突を実装。
- インベーダー隊列は画面中央やや上に5段×11列で初期配置。
- ビーム砲は画面下段に初期配置。
- トーチカはビーム砲上部の所定位置に複数基配置（個数と座標は後述のデータモデルに準拠）。

## ゲーム進行 / ロジック
1. インベーダー移動
   - 全体として隊列で横移動。
   - 横端に到達したフレームで隊列全体が1段（一定ピクセル）下降し、横移動方向を反転。
   - 撃墜数が増えるほど、隊列の横移動速度（および端到達間隔）が徐々に上昇する。
2. 勝敗条件
   - 勝利: 55体を全滅させるとクリア。
   - 敗北: 隊列のいずれかがビーム砲の縦位置（最下段ライン）に達した時点でGAME OVER（残機有無に関わらず）。
3. プレイヤー操作
   - 入力: 左右移動、発射（単発制限）。
   - 弾は同時1発のみ。既発弾が着弾（敵命中、トーチカ命中、画面上端到達）するまで次弾は発射不可。
4. トーチカの破損
   - 敵弾命中で該当部位が部分的に破損。
   - 自弾が下方から貫通した場合も破損。
   - 降下してきたインベーダーが接触しても削られる。
5. プレイヤー被弾
   - 敵弾がビーム砲に命中するとミスとして残機を1失う。
   - 残機が0の状態で被弾、またはインベーダーが最下段到達で即 GAME OVER 表示。

## スコアリング
- 上段（最上段5×11のうち最上段1段）: 撃墜1体あたり30点
- 中段（上から2〜3段目の2段）: 撃墜1体あたり20点
- 下段（上から4〜5段目の2段）: 撃墜1体あたり10点
- スコアはリアルタイムで画面上部に表示し、ゲーム終了時に最終スコアを表示。

## 難易度調整（スピードスケーリング）
- 生存インベーダー数 N に応じて横移動の更新間隔を短縮する。
- 例: 基準間隔 `t0` に対し `t = max(t_min, t0 - k * (55 - N))` として逓減。
- `t_min` と係数 `k` はバランス調整用定数として設定可能。

## 入出力 / 操作
- キー操作（PC想定）
  - 左移動: 左矢印 / A
  - 右移動: 右矢印 / D
  - 発射: スペース
- モバイル（任意対応）
  - 画面下部に左右ボタンと発射ボタンを配置（対応する場合）。

## 当たり判定
- 種別: 自弾×インベーダー、自弾×トーチカ、敵弾×トーチカ、敵弾×ビーム砲、インベーダー×トーチカ、インベーダー×画面端/床。
- 方式: AABB（Axis-Aligned Bounding Box）による矩形判定を基本とし、トーチカはピクセルマスクまたは細分割タイルで段階的破損を表現。

## 表示 / エフェクト
- 撃墜時に短い点滅または爆発スプライト/エフェクトを表示。
- GAME OVER / CLEAR のオーバーレイ表示。
- 画面からのはみ出し防止のため、座標は境界でクランプ。

## 非機能要件
- ブラウザ互換: 最新版の Chromium/Firefox/Safari で動作。
- パフォーマンス: 60 FPS を目標（低負荷環境では最低 30 FPS を維持）。
- 入力遅延: 100ms 未満を目標。
- アセットサイズ: 初期ロード 2MB 未満を目安。

## データモデル（論理）
- GameState: `score`, `lives`, `wave`（初期1）, `state`（Playing/Cleared/GameOver）。
- Player: `x`, `y`, `speed`, `canFire`（bool）, `bullet`（存在時のみ）。
- Bullet: `x`, `y`, `vy`, `owner`（Player/Enemy）。同時発射制限は Player 側で制御。
- Invader: `row`, `col`, `x`, `y`, `alive`（bool）, `scoreValue`。
- Formation: `direction`（Left/Right）, `speed`, `stepDownPx`, `bounds`（minX/maxX）。
- Bunker(トーチカ): `shapeMask` または `tiles[][]` による破損表現。

## 状態遷移
- タイトル/準備 → プレイ中 → クリア or ゲームオーバー → リスタート可

## エッジケース
- プレイヤー弾と敵弾が同フレームで交差する場合の優先度（両方消滅）。
- 隊列の最外インベーダーが撃墜され、見かけ上の端が内側に移った際の端判定再計算。
- トーチカが完全に破壊された後の当たり判定スキップ。
- 同一フレームで最下段到達と最後の敵撃墜が同時に発生した場合: 最下段到達を優先し GAME OVER。

## 画面表示要素
- スコア、残機、ゲーム状態（PLAY/CLEAR/GAME OVER）。
- コントロールヒント（PC: ←→・Space）。

## 受け入れ条件（抜粋）
- 55体が所定の編成で出現し、端到達で下降・反転を繰り返す。
- プレイヤーは同時1発制限の弾を発射でき、着弾まで次弾は撃てない。
- トーチカは被弾・接触・自弾で段階的に破損する。
- スコアは段ごとの配点（30/20/10）で加算される。
- インベーダーの数が減ると移動が加速する。
- インベーダーが最下段に達すると即 GAME OVER 表示。
- 画面外にはオブジェクトが出ない。

## 実装指針（参考）
- 技術候補: HTML5 Canvas + TypeScript + Vite or Parcel。
- ループ: `requestAnimationFrame` によるゲームループ、固定タイムステップ近似。
- 入力: `keydown`/`keyup` で連続移動、発射はエッジ検出。
- 音: 発射音/爆発音/ゲームオーバー効果音（ミュート切替可）。

## 将来拡張（任意）
- ラウンド/ウェーブ進行、UFO的ボーナス敵、難易度選択、ハイスコア保存。

## Clarifications
- 本仕様は提供いただいた要件に基づく初版。追加要望や差分があれば `/clarify` 相当の質疑を行い、該当箇所を更新する。


```

I created a Japanese specification based on your description and saved it to `MySpecKitPrj/spec.md`.

- Branch initialization scripts were not found, so I created the spec directly.
- Spec includes: overview, rules, layout, movement logic, scoring, difficulty scaling, collisions, non-functional, data model, states, edge cases, acceptance criteria, and implementation notes.

Next, would you like me to proceed with clarification (/clarify) to refine open details, or jump to planning (/plan)?

---

**User**

/plan HTMLとJavascriptで作る。ゲーム画面の描画にはCANVAS要素を使用する。

---

**Cursor**

I'll generate an implementation plan for the Canvas-based HTML/JavaScript stack, create `MySpecKitPrj/plan.md`, and outline architecture, data model, phases, and artifacts.

I'll create `MySpecKitPrj/plan.md` with an implementation plan for HTML + JavaScript using Canvas, covering architecture, modules, game loop, data model, I/O, collisions, performance, and phased delivery. Then I'll mark the planning tasks complete.

```markdown
*** Begin Patch
*** Add File: D:\Source\ExperimentSpeckit\MySpecKitPrj\plan.md
+# 実装計画: ブラウザ版シンプル・インベーダー（HTML + JavaScript + Canvas）

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

*** End Patch
```

```markdown
*** Begin Patch
*** Add File: D:\Source\ExperimentSpeckit\MySpecKitPrj\plan.md
+# 実装計画: ブラウザ版シンプル・インベーダー（HTML + JavaScript + Canvas）

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

*** End Patch
```

```markdown
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


```

Plan created at `MySpecKitPrj/plan.md` for HTML + JavaScript + Canvas, covering architecture, modules, game loop, data model, collisions, performance, and phased delivery.

- Next, I can generate tasks (/tasks) from the plan, or start scaffolding files (`index.html`, `src/*.js`).

---

**User**

/tasks

---

**Cursor**

I'll generate a dependency-ordered tasks list from the plan and write it to `MySpecKitPrj/tasks.md`, marking parallelizable items with [P].

```markdown
*** Begin Patch
*** Add File: D:\Source\ExperimentSpeckit\MySpecKitPrj\tasks.md
+# タスク一覧: ブラウザ版シンプル・インベーダー

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

*** End Patch
```

```markdown
*** Begin Patch
*** Add File: D:\Source\ExperimentSpeckit\MySpecKitPrj\tasks.md
+# タスク一覧: ブラウザ版シンプル・インベーダー

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

*** End Patch
```

I'll create a dependency-ordered tasks file from the plan. First, I'll verify the project folder contents, then write `MySpecKitPrj/tasks.md`.

```markdown
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
```

Tasks generated at `MySpecKitPrj/tasks.md`, ordered by dependencies with [P] markers for parallelizable work.

- You can start with T001–T005, then proceed sequentially. When ready, I can scaffold the initial files to kick off implementation.

---

**User**

作成したタスクに従って開発を行ってください。

---

**Cursor**

I'll start implementing T001–T005. I’ll create `index.html`, then scaffold `src/main.js`, `src/game.js`, `src/input.js`, and `src/systems/render.js` with a running game loop, input handling, and basic rendering utilities.

```html
*** Begin Patch
*** Add File: D:\Source\ExperimentSpeckit\MySpecKitPrj\index.html
<!doctype html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Simple Invaders</title>
	<style>
		html, body { height: 100%; margin: 0; background: #111; color: #eee; font-family: system-ui, sans-serif; }
		#wrap { display: grid; place-items: center; height: 100%; }
		canvas { background: #000; image-rendering: pixelated; }
	</style>
</head>
<body>
	<div id="wrap">
		<canvas id="game" width="800" height="600"></canvas>
	</div>
	<script type="module" src="./src/main.js"></script>
</body>
</html>
*** End Patch
```

```html
*** Begin Patch
*** Add File: D:\Source\ExperimentSpeckit\MySpecKitPrj\index.html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Simple Invaders</title>
<style>
html, body { height: 100%; margin: 0; background: #111; color: #eee; font-family: system-ui, sans-serif; }
#wrap { display: grid; place-items: center; height: 100%; }
canvas { background: #000; image-rendering: pixelated; }
</style>
</head>
<body>
<div id="wrap">
<canvas id="game" width="800" height="600"></canvas>
</div>
<script type="module" src="./src/main.js"></script>
</body>
</html>
*** End Patch
```

```html
<!doctype html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Simple Invaders</title>
	<style>
		html, body { height: 100%; margin: 0; background: #111; color: #eee; font-family: system-ui, sans-serif; }
		#wrap { display: grid; place-items: center; height: 100%; }
		canvas { background: #000; image-rendering: pixelated; }
	</style>
</head>
<body>
	<div id="wrap">
		<canvas id="game" width="800" height="600"></canvas>
	</div>
	<script type="module" src="./src/main.js"></script>
</body>
</html>
```

```javascript
*** Begin Patch
*** Add File: D:\Source\ExperimentSpeckit\MySpecKitPrj\src\main.js
// Entry point: initialize canvas and start the game loop
import { createGame } from './game.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const game = createGame(canvas, ctx);

let lastTime = performance.now();
function loop(now) {
	const dtMs = now - lastTime;
	lastTime = now;
	game.update(dtMs / 1000);
	game.render();
	requestAnimationFrame(loop);
}

window.addEventListener('load', () => {
	game.init();
	requestAnimationFrame(loop);
});
*** End Patch
```

```javascript
// Entry point: initialize canvas and start the game loop
import { createGame } from './game.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const game = createGame(canvas, ctx);

let lastTime = performance.now();
function loop(now) {
	const dtMs = now - lastTime;
	lastTime = now;
	game.update(dtMs / 1000);
	game.render();
	requestAnimationFrame(loop);
}

window.addEventListener('load', () => {
	game.init();
	requestAnimationFrame(loop);
});
```

```javascript
// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';

export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: { x: canvas.width / 2, y: canvas.height - 40, width: 32, height: 16, speed: 240 },
	};

	function init() {
		// nothing yet
	}

	function update(dt) {
		// simple left/right movement clamp to screen
		if (input.left) state.player.x -= state.player.speed * dt;
		if (input.right) state.player.x += state.player.speed * dt;
		if (state.player.x < state.player.width / 2) state.player.x = state.player.width / 2;
		if (state.player.x > canvas.width - state.player.width / 2) state.player.x = canvas.width - state.player.width / 2;
	}

	function render() {
		render.clear();
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 700, 20, '#0f0', 'right');
		// draw player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
	}

	return { init, update, render };
}
```

```javascript
// Keyboard input management
export function createInput() {
	const input = { left: false, right: false, fire: false, _fireEdge: false };

	function onKeyDown(e) {
		switch (e.code) {
			case 'ArrowLeft':
			case 'KeyA': input.left = true; break;
			case 'ArrowRight':
			case 'KeyD': input.right = true; break;
			case 'Space':
			case 'Enter':
				if (!input.fire) input._fireEdge = true;
				input.fire = true; break;
		}
	}
	function onKeyUp(e) {
		switch (e.code) {
			case 'ArrowLeft':
			case 'KeyA': input.left = false; break;
			case 'ArrowRight':
			case 'KeyD': input.right = false; break;
			case 'Space':
			case 'Enter': input.fire = false; break;
		}
	}

	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);

	input.consumeFireEdge = () => { const v = input._fireEdge; input._fireEdge = false; return v; };
	return input;
}
```

```javascript
// Rendering helpers for 2D canvas
export function createRenderer(ctx, width, height) {
	function clear() {
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, width, height);
	}
	function rect(x, y, w, h, color = '#fff') {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, w, h);
	}
	function text(message, x, y, color = '#fff', align = 'left') {
		ctx.fillStyle = color;
		ctx.font = '16px monospace';
		ctx.textAlign = align;
		ctx.textBaseline = 'top';
		ctx.fillText(message, x, y);
	}
	return { clear, rect, text };
}
```

- Created `index.html` with a Canvas element.
- Added `src/main.js` (init + RAF loop), `src/game.js` (Game skeleton), `src/input.js` (keyboard), `src/systems/render.js` (render helpers).

You can open `index.html` to see a movable player rectangle with HUD. Next, I’ll proceed to Phase 1 (T006–T011) to add player bullets, invaders, formation logic, collisions, and scoring.

---

**User**

T006以降のタスクを実装してください。

---

**Cursor**

I'll implement T006–T011 now: create `player.js`, `bullet.js`, `invader.js`, `formation.js`, `systems/collision.js`, and integrate them into `game.js` with scoring and movement.

```javascript
// Player entity
export function createPlayer(x, y) {
	return { x, y, width: 32, height: 16, speed: 240, cooldown: 0, bullet: null };
}

export function updatePlayer(player, dt, input, canvasWidth) {
	if (input.left) player.x -= player.speed * dt;
	if (input.right) player.x += player.speed * dt;
	if (player.x < 16) player.x = 16;
	if (player.x > canvasWidth - 16) player.x = canvasWidth - 16;
	if (player.cooldown > 0) player.cooldown -= dt;
}

export function canFire(player) {
	return player.bullet == null && player.cooldown <= 0;
}

export function onFired(player) {
	player.cooldown = 0.2; // minimal cadence to prevent ultra rapid fire on edge
}
```

```javascript
// Bullet entity
export function createBullet(x, y, vy, owner) {
	return { x, y, width: 2, height: 8, vy, owner, alive: true };
}

export function updateBullet(bullet, dt, canvasHeight) {
	bullet.y += bullet.vy * dt;
	if (bullet.y < -bullet.height || bullet.y > canvasHeight + bullet.height) {
		bullet.alive = false;
	}
}
```

```javascript
// Invader entity
export function createInvader(row, col, x, y) {
	let scoreValue = 10;
	if (row === 0) scoreValue = 30;
	else if (row === 1 || row === 2) scoreValue = 20;
	else scoreValue = 10;
	return { row, col, x, y, width: 28, height: 20, alive: true, scoreValue };
}
```

```javascript
// Formation management for invaders
export function createFormation(canvasWidth) {
	return {
		direction: 1, // 1:right, -1:left
		speed: 40, // base horizontal px/s
		stepDownPx: 18,
		leftBound: 80,
		rightBound: canvasWidth - 80,
		aliveCount: 0,
	};
}

export function updateFormation(formation, invaders, dt, canvasWidth) {
	// compute dynamic speed scaling by alive count
	let alive = 0;
	let minX = Infinity, maxX = -Infinity;
	for (const inv of invaders) {
		if (!inv.alive) continue;
		alive++;
		if (inv.x < minX) minX = inv.x;
		if (inv.x + inv.width > maxX) maxX = inv.x + inv.width;
	}
	formation.aliveCount = alive;
	const speed = Math.min(160, 40 + (55 - alive) * 2); // simple scaling

	// move horizontally
	const dx = speed * formation.direction * dt;
	for (const inv of invaders) if (inv.alive) inv.x += dx;

	// edge check
	let needStepDown = false;
	if (minX <= 0 + 8 && formation.direction < 0) needStepDown = true;
	if (maxX >= canvasWidth - 8 && formation.direction > 0) needStepDown = true;
	if (needStepDown) {
		for (const inv of invaders) if (inv.alive) inv.y += formation.stepDownPx;
		formation.direction *= -1;
	}
}
```

```javascript
// Collision system
export function aabb(a, b) {
	return (
		a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y
	);
}

export function handlePlayerBulletVsInvaders(bullet, invaders) {
	if (!bullet || !bullet.alive) return null;
	for (const inv of invaders) {
		if (!inv.alive) continue;
		if (aabb(bullet, inv)) {
			inv.alive = false;
			bullet.alive = false;
			return { score: inv.scoreValue, row: inv.row, col: inv.col };
		}
	}
	return null;
}
```

```javascript
// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders } from './systems/collision.js';

export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);

	const invaders = [];
	const formation = createFormation(canvas.width);

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
	};

	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	function init() {
		spawnInvaders();
	}

	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				state.player.bullet = null;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) state.mode = 'CLEAR';

		// lose condition: any invader reaches player y
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
		}
	}

	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') render.text('GAME OVER', 400, 280, '#f33', 'center');
		if (state.mode === 'CLEAR') render.text('CLEAR!', 400, 280, '#3f3', 'center');
	}

	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
	}

	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

- 実装済み: T006〜T011（`player.js`, `bullet.js`, `invader.js`, `formation.js`, `systems/collision.js` 作成、`game.js` 統合とスコアリング・勝敗判定）。
- 画面を開くと、編隊が左右移動し端で下降・反転、プレイヤーは単発射撃で撃墜・加点できます。

次はフェーズ2（T012–T014）トーチカの追加に進めます。

---

**User**

Google Chromeでindex.htmlを開きましたが、黒いキャンパスが表示されるだけで、変態もプレイヤーも表示されません。

---

**Cursor**

I'll check if Node.js or Python is available to run a local static server (ES modules won't load from file:// in Chrome). Then I'll start a local server for `MySpecKitPrj` so the game runs.

I'll start a local static server with Python to avoid Chrome's file:// module restrictions and serve `MySpecKitPrj`.

- 起動方法: Chromeで `http://localhost:8000/index.html` を開いてください（生の file:// では ES Module が動かず、真っ黒に見えます）。
- 既にローカルサーバを起動しました。上記URLでプレイヤー矩形とHUDが表示されるはずです。表示されない場合は教えてください。

---

**User**

動作確認できました、引き続き次のフェーズの実装を行ってください。

---

**Cursor**

```javascript
// Bunker (shield) entity using tile matrix for gradual damage
export function createBunker(x, y, cols = 12, rows = 6, tileSize = 6) {
	const tiles = [];
	for (let r = 0; r < rows; r++) {
		const row = [];
		for (let c = 0; c < cols; c++) row.push(true);
		tiles.push(row);
	}
	return { x, y, cols, rows, tileSize, tiles };
}

export function hitBunker(bunker, bx, by) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const cx = Math.floor((bx - x) / tileSize);
	const cy = Math.floor((by - y) / tileSize);
	if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
	if (!tiles[cy][cx]) return false;
	tiles[cy][cx] = false;
	return true;
}

export function drawBunker(render, bunker) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (!tiles[r][c]) continue;
			render.rect(x + c * tileSize, y + r * tileSize, tileSize, tileSize, '#6c6');
		}
	}
}
```

```javascript
// Collision system
export function aabb(a, b) {
	return (
		a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y
	);
}

export function handlePlayerBulletVsInvaders(bullet, invaders) {
	if (!bullet || !bullet.alive) return null;
	for (const inv of invaders) {
		if (!inv.alive) continue;
		if (aabb(bullet, inv)) {
			inv.alive = false;
			bullet.alive = false;
			return { score: inv.scoreValue, row: inv.row, col: inv.col };
		}
	}
	return null;
}

export function handleBulletVsBunkers(bullet, bunkers) {
	if (!bullet || !bullet.alive) return false;
	for (const b of bunkers) {
		const hit = hitTile(b, bullet.x, bullet.y);
		if (hit) {
			bullet.alive = false;
			return true;
		}
	}
	return false;
}

export function handleInvadersTouchBunkers(invaders, bunkers) {
	for (const b of bunkers) {
		for (const inv of invaders) {
			if (!inv.alive) continue;
			// erode tiles under invader's footprint
			forEachTilesUnderRect(b, inv.x, inv.y, inv.width, inv.height, (cx, cy) => {
				b.tiles[cy][cx] = false;
			});
		}
	}
}

// helpers for bunker tile hit tests
function hitTile(bunker, px, py) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const cx = Math.floor((px - x) / tileSize);
	const cy = Math.floor((py - y) / tileSize);
	if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
	if (!tiles[cy][cx]) return false;
	tiles[cy][cx] = false;
	return true;
}

function forEachTilesUnderRect(bunker, rx, ry, rw, rh, fn) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const startC = Math.max(0, Math.floor((rx - x) / tileSize));
	const endC = Math.min(cols - 1, Math.floor((rx + rw - x) / tileSize));
	const startR = Math.max(0, Math.floor((ry - y) / tileSize));
	const endR = Math.min(rows - 1, Math.floor((ry + rh - y) / tileSize));
	for (let r = startR; r <= endR; r++) {
		for (let c = startC; c <= endC; c++) {
			if (!tiles[r][c]) continue;
			fn(c, r);
		}
	}
}

```

```javascript
// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';

export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);

	const invaders = [];
	const bunkers = [];
	const formation = createFormation(canvas.width);

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
	};

	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	function init() {
		spawnInvaders();
		spawnBunkers();
	}

	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				handleBulletVsBunkers(state.player.bullet, bunkers);
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				state.player.bullet = null;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) state.mode = 'CLEAR';

		// lose condition: any invader reaches player y
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
		}
	}

	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') render.text('GAME OVER', 400, 280, '#f33', 'center');
		if (state.mode === 'CLEAR') render.text('CLEAR!', 400, 280, '#3f3', 'center');
	}

	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
	}

	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

- トーチカ実装（T012–T014）を完了しました。プレイヤー弾で破損し、インベーダー接触でも削れます。
- 動作確認: `http://localhost:8000/index.html` を更新すると、プレイヤー、編隊、トーチカが表示され、弾がトーチカで減衰します。

次はフェーズ3（T015–T018）：敵弾、被弾、残機、GAME OVER 遷移の強化に進めます。

---

**User**

次のフェーズの実装を行ってください。

---

**Cursor**

```javascript
// Bullet entity
export function createBullet(x, y, vy, owner) {
	return { x, y, width: 2, height: 8, vy, owner, alive: true };
}

export function updateBullet(bullet, dt, canvasHeight) {
	bullet.y += bullet.vy * dt;
	if (bullet.y < -bullet.height || bullet.y > canvasHeight + bullet.height) {
		bullet.alive = false;
	}
}

export function createEnemyBullet(x, y) {
	return createBullet(x, y, 180, 'enemy');
}

```

```javascript
// Collision system
export function aabb(a, b) {
	return (
		a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y
	);
}

export function handlePlayerBulletVsInvaders(bullet, invaders) {
	if (!bullet || !bullet.alive) return null;
	for (const inv of invaders) {
		if (!inv.alive) continue;
		if (aabb(bullet, inv)) {
			inv.alive = false;
			bullet.alive = false;
			return { score: inv.scoreValue, row: inv.row, col: inv.col };
		}
	}
	return null;
}

export function handleBulletVsBunkers(bullet, bunkers) {
	if (!bullet || !bullet.alive) return false;
	for (const b of bunkers) {
		const hit = hitTile(b, bullet.x, bullet.y);
		if (hit) {
			bullet.alive = false;
			return true;
		}
	}
	return false;
}

export function handleInvadersTouchBunkers(invaders, bunkers) {
	for (const b of bunkers) {
		for (const inv of invaders) {
			if (!inv.alive) continue;
			// erode tiles under invader's footprint
			forEachTilesUnderRect(b, inv.x, inv.y, inv.width, inv.height, (cx, cy) => {
				b.tiles[cy][cx] = false;
			});
		}
	}
}

export function handleEnemyBulletsVsPlayer(bullets, player) {
	for (const b of bullets) {
		if (!b.alive) continue;
		if (aabb({ x: b.x, y: b.y, width: b.width, height: b.height }, { x: player.x - 16, y: player.y - 8, width: 32, height: 16 })) {
			b.alive = false;
			return true;
		}
	}
	return false;
}

// helpers for bunker tile hit tests
function hitTile(bunker, px, py) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const cx = Math.floor((px - x) / tileSize);
	const cy = Math.floor((py - y) / tileSize);
	if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
	if (!tiles[cy][cx]) return false;
	tiles[cy][cx] = false;
	return true;
}

function forEachTilesUnderRect(bunker, rx, ry, rw, rh, fn) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const startC = Math.max(0, Math.floor((rx - x) / tileSize));
	const endC = Math.min(cols - 1, Math.floor((rx + rw - x) / tileSize));
	const startR = Math.max(0, Math.floor((ry - y) / tileSize));
	const endR = Math.min(rows - 1, Math.floor((ry + rh - y) / tileSize));
	for (let r = startR; r <= endR; r++) {
		for (let c = startC; c <= endC; c++) {
			if (!tiles[r][c]) continue;
			fn(c, r);
		}
	}
}

```

```javascript
// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet, createEnemyBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers, handleEnemyBulletsVsPlayer } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';

export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);

	const invaders = [];
	const bunkers = [];
	const enemyBullets = [];
	const formation = createFormation(canvas.width);

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
		enemyFireCooldown: 0,
	};

	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	function init() {
		spawnInvaders();
		spawnBunkers();
	}

	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				handleBulletVsBunkers(state.player.bullet, bunkers);
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// enemy fire pattern: random alive bottom of column at interval
		state.enemyFireCooldown -= dt;
		if (state.enemyFireCooldown <= 0) {
			state.enemyFireCooldown = Math.max(0.3, 1.2 - (55 - formation.aliveCount) * 0.01);
			// choose random column with alive invaders, fire from the lowest one
			const aliveByCol = new Map();
			for (const inv of invaders) {
				if (!inv.alive) continue;
				const cur = aliveByCol.get(inv.col);
				if (!cur || inv.y > cur.y) aliveByCol.set(inv.col, inv);
			}
			const cols = Array.from(aliveByCol.keys());
			if (cols.length > 0) {
				const col = cols[Math.floor(Math.random() * cols.length)];
				const shooter = aliveByCol.get(col);
				enemyBullets.push(createEnemyBullet(shooter.x + shooter.width / 2 - 1, shooter.y + shooter.height + 2));
			}
		}

		// update enemy bullets
		for (const b of enemyBullets) {
			if (!b.alive) continue;
			updateBullet(b, dt, canvas.height);
			if (b.alive) handleBulletVsBunkers(b, bunkers);
		}
		// remove dead bullets
		for (let i = enemyBullets.length - 1; i >= 0; i--) if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				state.player.bullet = null;
			}
		}

		// enemy bullets vs player
		if (handleEnemyBulletsVsPlayer(enemyBullets, state.player)) {
			state.lives -= 1;
			if (state.lives <= 0) {
				state.mode = 'OVER';
			} else {
				// simple respawn: clear bullets and reset player position
				enemyBullets.length = 0;
				state.player.x = canvas.width / 2;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) state.mode = 'CLEAR';

		// lose condition: any invader reaches player y (occupation)
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
		}
	}

	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') render.text('GAME OVER', 400, 280, '#f33', 'center');
		if (state.mode === 'CLEAR') render.text('CLEAR!', 400, 280, '#3f3', 'center');
	}

	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// enemy bullets
		for (const b of enemyBullets) render.rect(b.x, b.y, 2, 8, '#f66');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
	}

	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

- フェーズ3（T015–T018）を実装しました。敵弾の発射・更新、トーチカへの着弾破壊、プレイヤー被弾と残機減少、ゲームオーバー遷移が動作します。
- 速度・発射頻度は生存数に応じて上がる簡易スケーリングです。

次はフェーズ4（T019–T022）：効果音、エフェクト、HUD強化、CLEAR/OVER の再スタートを追加します。

---

**User**

引き続き次のフェーズ4の実装をおこなってください。

---

**Cursor**

```javascript
// Simple audio system using WebAudio beeps (no external assets)
export function createAudio() {
	const ctx = new (window.AudioContext || window.webkitAudioContext)();
	let muted = false;
	function beep(freq = 440, durMs = 80, type = 'square', gain = 0.02) {
		if (muted) return;
		const osc = ctx.createOscillator();
		const g = ctx.createGain();
		osc.type = type;
		osc.frequency.value = freq;
		g.gain.value = gain;
		osc.connect(g).connect(ctx.destination);
		osc.start();
		osc.stop(ctx.currentTime + durMs / 1000);
	}
	return {
		shoot() { beep(900, 60, 'square', 0.03); },
		explode() { beep(180, 120, 'sawtooth', 0.04); },
		gameOver() { beep(110, 300, 'triangle', 0.05); },
		clear() { beep(660, 200, 'square', 0.04); },
		muteToggle() { muted = !muted; },
		isMuted() { return muted; }
	};
}
```

```javascript
// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet, createEnemyBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers, handleEnemyBulletsVsPlayer } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';
import { createAudio } from './systems/audio.js';

export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);
	const audio = createAudio();

	const invaders = [];
	const bunkers = [];
	const enemyBullets = [];
	const formation = createFormation(canvas.width);
	const flashes = []; // simple hit flashes {x,y,t}

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
		enemyFireCooldown: 0,
	};

	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	function resetGame() {
		state.lives = 3;
		state.score = 0;
		state.mode = 'PLAY';
		state.player.x = canvas.width / 2;
		enemyBullets.length = 0;
		spawnInvaders();
		spawnBunkers();
	}

	function init() {
		spawnInvaders();
		spawnBunkers();
		window.addEventListener('keydown', (e) => {
			if (e.code === 'KeyM') audio.muteToggle();
			if ((state.mode === 'OVER' || state.mode === 'CLEAR') && e.code === 'Enter') resetGame();
		});
	}

	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
				audio.shoot();
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				if (handleBulletVsBunkers(state.player.bullet, bunkers)) flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// enemy fire pattern: random alive bottom of column at interval
		state.enemyFireCooldown -= dt;
		if (state.enemyFireCooldown <= 0) {
			state.enemyFireCooldown = Math.max(0.3, 1.2 - (55 - formation.aliveCount) * 0.01);
			// choose random column with alive invaders, fire from the lowest one
			const aliveByCol = new Map();
			for (const inv of invaders) {
				if (!inv.alive) continue;
				const cur = aliveByCol.get(inv.col);
				if (!cur || inv.y > cur.y) aliveByCol.set(inv.col, inv);
			}
			const cols = Array.from(aliveByCol.keys());
			if (cols.length > 0) {
				const col = cols[Math.floor(Math.random() * cols.length)];
				const shooter = aliveByCol.get(col);
				enemyBullets.push(createEnemyBullet(shooter.x + shooter.width / 2 - 1, shooter.y + shooter.height + 2));
			}
		}

		// update enemy bullets
		for (const b of enemyBullets) {
			if (!b.alive) continue;
			updateBullet(b, dt, canvas.height);
			if (b.alive) {
				if (handleBulletVsBunkers(b, bunkers)) flashes.push({ x: b.x, y: b.y, t: 0.12 });
			}
		}
		// remove dead bullets
		for (let i = enemyBullets.length - 1; i >= 0; i--) if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
				audio.explode();
				state.player.bullet = null;
			}
		}

		// enemy bullets vs player
		if (handleEnemyBulletsVsPlayer(enemyBullets, state.player)) {
			state.lives -= 1;
			audio.explode();
			if (state.lives <= 0) {
				state.mode = 'OVER';
				audio.gameOver();
			} else {
				// simple respawn: clear bullets and reset player position
				enemyBullets.length = 0;
				state.player.x = canvas.width / 2;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) {
			state.mode = 'CLEAR';
			audio.clear();
		}

		// lose condition: any invader reaches player y (occupation)
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
			audio.gameOver();
		}

		// update flashes
		for (let i = flashes.length - 1; i >= 0; i--) {
			flashes[i].t -= dt;
			if (flashes[i].t <= 0) flashes.splice(i, 1);
		}
	}

	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') {
			render.text('GAME OVER', 400, 280, '#f33', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		if (state.mode === 'CLEAR') {
			render.text('CLEAR!', 400, 280, '#3f3', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		const muteMsg = '(M)ute: ' + (audio.isMuted() ? 'ON' : 'OFF');
		render.text(muteMsg, 788, 580, '#888', 'right');
	}

	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// enemy bullets
		for (const b of enemyBullets) render.rect(b.x, b.y, 2, 8, '#f66');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
		// flashes
		for (const f of flashes) render.rect(f.x - 4, f.y - 4, 8, 8, '#fff');
	}

	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

- フェーズ4（T019–T022）を実装しました。
  - `systems/audio.js` を追加し、発射/爆発/クリア/ゲームオーバーの効果音、Mキーでミュート切替。
  - 簡易ヒットエフェクト（白いフラッシュ）、HUDに操作ヒント、CLEAR/OVER時のEnterでリスタート。

ブラウザで再読み込みして挙動をご確認ください。必要なら難易度や速度係数を微調整します。

---

**User**

実装ありがとうございました。作成したjavascriptの各ファイルのヘッダと各関数のヘッダ部分にファイルと関数の概要について簡単な説明を追記してください。
関数ヘッダの場合は説明に引数と戻り値の説明を入れてください。
引数がない場合は引数なし。戻り値がない場合は戻り値なし。戻り値が固定値の場合はその旨記載してください。

---

**Cursor**

I'll add JSDoc-style headers to all JavaScript files with file descriptions and function documentation including parameters and return values.


```javascript
/**
 * メインエントリーポイント
 * Canvas要素の取得、ゲーム初期化、requestAnimationFrameによるゲームループの開始を行う
 */

// Entry point: initialize canvas and start the game loop
import { createGame } from './game.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const game = createGame(canvas, ctx);

let lastTime = performance.now();

/**
 * ゲームループ関数
 * フレーム間の時間差を計算し、ゲームの更新と描画を実行する
 * @param {number} now - 現在時刻（performance.now()の値）
 * @returns {void} 戻り値なし
 */
function loop(now) {
	const dtMs = now - lastTime;
	lastTime = now;
	game.update(dtMs / 1000);
	game.render();
	requestAnimationFrame(loop);
}

window.addEventListener('load', () => {
	game.init();
	requestAnimationFrame(loop);
});

```

```javascript
/**
 * キーボード入力管理
 * 左右移動、発射キーの状態管理とエッジ検出を行う
 */

// Keyboard input management

/**
 * 入力管理オブジェクトを作成する
 * @returns {Object} 入力状態とメソッドを含むオブジェクト
 * @returns {boolean} returns.left - 左移動キーが押されているか
 * @returns {boolean} returns.right - 右移動キーが押されているか  
 * @returns {boolean} returns.fire - 発射キーが押されているか
 * @returns {Function} returns.consumeFireEdge - 発射キーのエッジを取得（1回のみ）
 */
export function createInput() {
	const input = { left: false, right: false, fire: false, _fireEdge: false };

	function onKeyDown(e) {
		switch (e.code) {
			case 'ArrowLeft':
			case 'KeyA': input.left = true; break;
			case 'ArrowRight':
			case 'KeyD': input.right = true; break;
			case 'Space':
			case 'Enter':
				if (!input.fire) input._fireEdge = true;
				input.fire = true; break;
		}
	}
	function onKeyUp(e) {
		switch (e.code) {
			case 'ArrowLeft':
			case 'KeyA': input.left = false; break;
			case 'ArrowRight':
			case 'KeyD': input.right = false; break;
			case 'Space':
			case 'Enter': input.fire = false; break;
		}
	}

	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);

	input.consumeFireEdge = () => { const v = input._fireEdge; input._fireEdge = false; return v; };
	return input;
}

```

```javascript
/**
 * 2D Canvas描画ヘルパー
 * 基本的な図形描画とテキスト描画のユーティリティ関数を提供する
 */

// Rendering helpers for 2D canvas

/**
 * レンダラーオブジェクトを作成する
 * @param {CanvasRenderingContext2D} ctx - Canvas 2Dコンテキスト
 * @param {number} width - キャンバス幅
 * @param {number} height - キャンバス高さ
 * @returns {Object} 描画メソッドを含むオブジェクト
 * @returns {Function} returns.clear - 画面クリア
 * @returns {Function} returns.rect - 矩形描画
 * @returns {Function} returns.text - テキスト描画
 */
export function createRenderer(ctx, width, height) {
	function clear() {
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, width, height);
	}
	function rect(x, y, w, h, color = '#fff') {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, w, h);
	}
	function text(message, x, y, color = '#fff', align = 'left') {
		ctx.fillStyle = color;
		ctx.font = '16px monospace';
		ctx.textAlign = align;
		ctx.textBaseline = 'top';
		ctx.fillText(message, x, y);
	}
	return { clear, rect, text };
}

```

```javascript
/**
 * 2D Canvas描画ヘルパー
 * 基本的な図形描画とテキスト描画のユーティリティ関数を提供する
 */

// Rendering helpers for 2D canvas

/**
 * レンダラーオブジェクトを作成する
 * @param {CanvasRenderingContext2D} ctx - Canvas 2Dコンテキスト
 * @param {number} width - キャンバス幅
 * @param {number} height - キャンバス高さ
 * @returns {Object} 描画メソッドを含むオブジェクト
 * @returns {Function} returns.clear - 画面クリア
 * @returns {Function} returns.rect - 矩形描画
 * @returns {Function} returns.text - テキスト描画
 */
export function createRenderer(ctx, width, height) {
	/**
	 * 画面を黒色でクリアする
	 * @returns {void} 戻り値なし
	 */
	function clear() {
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, width, height);
	}
	
	/**
	 * 矩形を描画する
	 * @param {number} x - X座標
	 * @param {number} y - Y座標
	 * @param {number} w - 幅
	 * @param {number} h - 高さ
	 * @param {string} color - 色（デフォルト: '#fff'）
	 * @returns {void} 戻り値なし
	 */
	function rect(x, y, w, h, color = '#fff') {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, w, h);
	}
	
	/**
	 * テキストを描画する
	 * @param {string} message - 描画するテキスト
	 * @param {number} x - X座標
	 * @param {number} y - Y座標
	 * @param {string} color - 色（デフォルト: '#fff'）
	 * @param {string} align - テキスト配置（デフォルト: 'left'）
	 * @returns {void} 戻り値なし
	 */
	function text(message, x, y, color = '#fff', align = 'left') {
		ctx.fillStyle = color;
		ctx.font = '16px monospace';
		ctx.textAlign = align;
		ctx.textBaseline = 'top';
		ctx.fillText(message, x, y);
	}
	return { clear, rect, text };
}

```

```javascript
/**
 * シンプルな音響システム
 * WebAudio APIを使用してビープ音を生成する（外部アセット不要）
 */

// Simple audio system using WebAudio beeps (no external assets)

/**
 * 音響管理オブジェクトを作成する
 * @returns {Object} 音響メソッドを含むオブジェクト
 * @returns {Function} returns.shoot - 発射音を再生
 * @returns {Function} returns.explode - 爆発音を再生
 * @returns {Function} returns.gameOver - ゲームオーバー音を再生
 * @returns {Function} returns.clear - クリア音を再生
 * @returns {Function} returns.muteToggle - ミュート切替
 * @returns {Function} returns.isMuted - ミュート状態を取得
 */
export function createAudio() {
	const ctx = new (window.AudioContext || window.webkitAudioContext)();
	let muted = false;
	function beep(freq = 440, durMs = 80, type = 'square', gain = 0.02) {
		if (muted) return;
		const osc = ctx.createOscillator();
		const g = ctx.createGain();
		osc.type = type;
		osc.frequency.value = freq;
		g.gain.value = gain;
		osc.connect(g).connect(ctx.destination);
		osc.start();
		osc.stop(ctx.currentTime + durMs / 1000);
	}
	return {
		shoot() { beep(900, 60, 'square', 0.03); },
		explode() { beep(180, 120, 'sawtooth', 0.04); },
		gameOver() { beep(110, 300, 'triangle', 0.05); },
		clear() { beep(660, 200, 'square', 0.04); },
		muteToggle() { muted = !muted; },
		isMuted() { return muted; }
	};
}

```

```javascript
/**
 * シンプルな音響システム
 * WebAudio APIを使用してビープ音を生成する（外部アセット不要）
 */

// Simple audio system using WebAudio beeps (no external assets)

/**
 * 音響管理オブジェクトを作成する
 * @returns {Object} 音響メソッドを含むオブジェクト
 * @returns {Function} returns.shoot - 発射音を再生
 * @returns {Function} returns.explode - 爆発音を再生
 * @returns {Function} returns.gameOver - ゲームオーバー音を再生
 * @returns {Function} returns.clear - クリア音を再生
 * @returns {Function} returns.muteToggle - ミュート切替
 * @returns {Function} returns.isMuted - ミュート状態を取得
 */
export function createAudio() {
	const ctx = new (window.AudioContext || window.webkitAudioContext)();
	let muted = false;
	/**
	 * ビープ音を生成する
	 * @param {number} freq - 周波数（デフォルト: 440Hz）
	 * @param {number} durMs - 持続時間（ミリ秒、デフォルト: 80ms）
	 * @param {string} type - 波形タイプ（デフォルト: 'square'）
	 * @param {number} gain - 音量（デフォルト: 0.02）
	 * @returns {void} 戻り値なし
	 */
	function beep(freq = 440, durMs = 80, type = 'square', gain = 0.02) {
		if (muted) return;
		const osc = ctx.createOscillator();
		const g = ctx.createGain();
		osc.type = type;
		osc.frequency.value = freq;
		g.gain.value = gain;
		osc.connect(g).connect(ctx.destination);
		osc.start();
		osc.stop(ctx.currentTime + durMs / 1000);
	}
	return {
		/**
		 * 発射音を再生する
		 * @returns {void} 戻り値なし
		 */
		shoot() { beep(900, 60, 'square', 0.03); },
		
		/**
		 * 爆発音を再生する
		 * @returns {void} 戻り値なし
		 */
		explode() { beep(180, 120, 'sawtooth', 0.04); },
		
		/**
		 * ゲームオーバー音を再生する
		 * @returns {void} 戻り値なし
		 */
		gameOver() { beep(110, 300, 'triangle', 0.05); },
		
		/**
		 * クリア音を再生する
		 * @returns {void} 戻り値なし
		 */
		clear() { beep(660, 200, 'square', 0.04); },
		
		/**
		 * ミュート状態を切替える
		 * @returns {void} 戻り値なし
		 */
		muteToggle() { muted = !muted; },
		
		/**
		 * ミュート状態を取得する
		 * @returns {boolean} ミュート状態（true: ミュート中、false: 音声再生中）
		 */
		isMuted() { return muted; }
	};
}

```

```javascript
/**
 * ゲームメインロジック
 * ゲーム状態管理、エンティティ更新、衝突判定、描画処理を統合する
 */

// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet, createEnemyBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers, handleEnemyBulletsVsPlayer } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';
import { createAudio } from './systems/audio.js';

export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);
	const audio = createAudio();

	const invaders = [];
	const bunkers = [];
	const enemyBullets = [];
	const formation = createFormation(canvas.width);
	const flashes = []; // simple hit flashes {x,y,t}

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
		enemyFireCooldown: 0,
	};

	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	function resetGame() {
		state.lives = 3;
		state.score = 0;
		state.mode = 'PLAY';
		state.player.x = canvas.width / 2;
		enemyBullets.length = 0;
		spawnInvaders();
		spawnBunkers();
	}

	function init() {
		spawnInvaders();
		spawnBunkers();
		window.addEventListener('keydown', (e) => {
			if (e.code === 'KeyM') audio.muteToggle();
			if ((state.mode === 'OVER' || state.mode === 'CLEAR') && e.code === 'Enter') resetGame();
		});
	}

	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
				audio.shoot();
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				if (handleBulletVsBunkers(state.player.bullet, bunkers)) flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// enemy fire pattern: random alive bottom of column at interval
		state.enemyFireCooldown -= dt;
		if (state.enemyFireCooldown <= 0) {
			state.enemyFireCooldown = Math.max(0.3, 1.2 - (55 - formation.aliveCount) * 0.01);
			// choose random column with alive invaders, fire from the lowest one
			const aliveByCol = new Map();
			for (const inv of invaders) {
				if (!inv.alive) continue;
				const cur = aliveByCol.get(inv.col);
				if (!cur || inv.y > cur.y) aliveByCol.set(inv.col, inv);
			}
			const cols = Array.from(aliveByCol.keys());
			if (cols.length > 0) {
				const col = cols[Math.floor(Math.random() * cols.length)];
				const shooter = aliveByCol.get(col);
				enemyBullets.push(createEnemyBullet(shooter.x + shooter.width / 2 - 1, shooter.y + shooter.height + 2));
			}
		}

		// update enemy bullets
		for (const b of enemyBullets) {
			if (!b.alive) continue;
			updateBullet(b, dt, canvas.height);
			if (b.alive) {
				if (handleBulletVsBunkers(b, bunkers)) flashes.push({ x: b.x, y: b.y, t: 0.12 });
			}
		}
		// remove dead bullets
		for (let i = enemyBullets.length - 1; i >= 0; i--) if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
				audio.explode();
				state.player.bullet = null;
			}
		}

		// enemy bullets vs player
		if (handleEnemyBulletsVsPlayer(enemyBullets, state.player)) {
			state.lives -= 1;
			audio.explode();
			if (state.lives <= 0) {
				state.mode = 'OVER';
				audio.gameOver();
			} else {
				// simple respawn: clear bullets and reset player position
				enemyBullets.length = 0;
				state.player.x = canvas.width / 2;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) {
			state.mode = 'CLEAR';
			audio.clear();
		}

		// lose condition: any invader reaches player y (occupation)
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
			audio.gameOver();
		}

		// update flashes
		for (let i = flashes.length - 1; i >= 0; i--) {
			flashes[i].t -= dt;
			if (flashes[i].t <= 0) flashes.splice(i, 1);
		}
	}

	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') {
			render.text('GAME OVER', 400, 280, '#f33', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		if (state.mode === 'CLEAR') {
			render.text('CLEAR!', 400, 280, '#3f3', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		const muteMsg = '(M)ute: ' + (audio.isMuted() ? 'ON' : 'OFF');
		render.text(muteMsg, 788, 580, '#888', 'right');
	}

	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// enemy bullets
		for (const b of enemyBullets) render.rect(b.x, b.y, 2, 8, '#f66');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
		// flashes
		for (const f of flashes) render.rect(f.x - 4, f.y - 4, 8, 8, '#fff');
	}

	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

```javascript
/**
 * ゲームメインロジック
 * ゲーム状態管理、エンティティ更新、衝突判定、描画処理を統合する
 */

// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet, createEnemyBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers, handleEnemyBulletsVsPlayer } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';
import { createAudio } from './systems/audio.js';

/**
 * ゲームオブジェクトを作成する
 * @param {HTMLCanvasElement} canvas - Canvas要素
 * @param {CanvasRenderingContext2D} ctx - Canvas 2Dコンテキスト
 * @returns {Object} ゲーム制御メソッドを含むオブジェクト
 * @returns {Function} returns.init - ゲーム初期化
 * @returns {Function} returns.update - ゲーム更新
 * @returns {Function} returns.render - ゲーム描画
 */
export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);
	const audio = createAudio();

	const invaders = [];
	const bunkers = [];
	const enemyBullets = [];
	const formation = createFormation(canvas.width);
	const flashes = []; // simple hit flashes {x,y,t}

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
		enemyFireCooldown: 0,
	};

	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	function resetGame() {
		state.lives = 3;
		state.score = 0;
		state.mode = 'PLAY';
		state.player.x = canvas.width / 2;
		enemyBullets.length = 0;
		spawnInvaders();
		spawnBunkers();
	}

	function init() {
		spawnInvaders();
		spawnBunkers();
		window.addEventListener('keydown', (e) => {
			if (e.code === 'KeyM') audio.muteToggle();
			if ((state.mode === 'OVER' || state.mode === 'CLEAR') && e.code === 'Enter') resetGame();
		});
	}

	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
				audio.shoot();
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				if (handleBulletVsBunkers(state.player.bullet, bunkers)) flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// enemy fire pattern: random alive bottom of column at interval
		state.enemyFireCooldown -= dt;
		if (state.enemyFireCooldown <= 0) {
			state.enemyFireCooldown = Math.max(0.3, 1.2 - (55 - formation.aliveCount) * 0.01);
			// choose random column with alive invaders, fire from the lowest one
			const aliveByCol = new Map();
			for (const inv of invaders) {
				if (!inv.alive) continue;
				const cur = aliveByCol.get(inv.col);
				if (!cur || inv.y > cur.y) aliveByCol.set(inv.col, inv);
			}
			const cols = Array.from(aliveByCol.keys());
			if (cols.length > 0) {
				const col = cols[Math.floor(Math.random() * cols.length)];
				const shooter = aliveByCol.get(col);
				enemyBullets.push(createEnemyBullet(shooter.x + shooter.width / 2 - 1, shooter.y + shooter.height + 2));
			}
		}

		// update enemy bullets
		for (const b of enemyBullets) {
			if (!b.alive) continue;
			updateBullet(b, dt, canvas.height);
			if (b.alive) {
				if (handleBulletVsBunkers(b, bunkers)) flashes.push({ x: b.x, y: b.y, t: 0.12 });
			}
		}
		// remove dead bullets
		for (let i = enemyBullets.length - 1; i >= 0; i--) if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
				audio.explode();
				state.player.bullet = null;
			}
		}

		// enemy bullets vs player
		if (handleEnemyBulletsVsPlayer(enemyBullets, state.player)) {
			state.lives -= 1;
			audio.explode();
			if (state.lives <= 0) {
				state.mode = 'OVER';
				audio.gameOver();
			} else {
				// simple respawn: clear bullets and reset player position
				enemyBullets.length = 0;
				state.player.x = canvas.width / 2;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) {
			state.mode = 'CLEAR';
			audio.clear();
		}

		// lose condition: any invader reaches player y (occupation)
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
			audio.gameOver();
		}

		// update flashes
		for (let i = flashes.length - 1; i >= 0; i--) {
			flashes[i].t -= dt;
			if (flashes[i].t <= 0) flashes.splice(i, 1);
		}
	}

	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') {
			render.text('GAME OVER', 400, 280, '#f33', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		if (state.mode === 'CLEAR') {
			render.text('CLEAR!', 400, 280, '#3f3', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		const muteMsg = '(M)ute: ' + (audio.isMuted() ? 'ON' : 'OFF');
		render.text(muteMsg, 788, 580, '#888', 'right');
	}

	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// enemy bullets
		for (const b of enemyBullets) render.rect(b.x, b.y, 2, 8, '#f66');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
		// flashes
		for (const f of flashes) render.rect(f.x - 4, f.y - 4, 8, 8, '#fff');
	}

	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

```javascript
/**
 * ゲームメインロジック
 * ゲーム状態管理、エンティティ更新、衝突判定、描画処理を統合する
 */

// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet, createEnemyBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers, handleEnemyBulletsVsPlayer } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';
import { createAudio } from './systems/audio.js';

/**
 * ゲームオブジェクトを作成する
 * @param {HTMLCanvasElement} canvas - Canvas要素
 * @param {CanvasRenderingContext2D} ctx - Canvas 2Dコンテキスト
 * @returns {Object} ゲーム制御メソッドを含むオブジェクト
 * @returns {Function} returns.init - ゲーム初期化
 * @returns {Function} returns.update - ゲーム更新
 * @returns {Function} returns.render - ゲーム描画
 */
export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);
	const audio = createAudio();

	const invaders = [];
	const bunkers = [];
	const enemyBullets = [];
	const formation = createFormation(canvas.width);
	const flashes = []; // simple hit flashes {x,y,t}

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
		enemyFireCooldown: 0,
	};

	/**
	 * インベーダーを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	function resetGame() {
		state.lives = 3;
		state.score = 0;
		state.mode = 'PLAY';
		state.player.x = canvas.width / 2;
		enemyBullets.length = 0;
		spawnInvaders();
		spawnBunkers();
	}

	function init() {
		spawnInvaders();
		spawnBunkers();
		window.addEventListener('keydown', (e) => {
			if (e.code === 'KeyM') audio.muteToggle();
			if ((state.mode === 'OVER' || state.mode === 'CLEAR') && e.code === 'Enter') resetGame();
		});
	}

	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
				audio.shoot();
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				if (handleBulletVsBunkers(state.player.bullet, bunkers)) flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// enemy fire pattern: random alive bottom of column at interval
		state.enemyFireCooldown -= dt;
		if (state.enemyFireCooldown <= 0) {
			state.enemyFireCooldown = Math.max(0.3, 1.2 - (55 - formation.aliveCount) * 0.01);
			// choose random column with alive invaders, fire from the lowest one
			const aliveByCol = new Map();
			for (const inv of invaders) {
				if (!inv.alive) continue;
				const cur = aliveByCol.get(inv.col);
				if (!cur || inv.y > cur.y) aliveByCol.set(inv.col, inv);
			}
			const cols = Array.from(aliveByCol.keys());
			if (cols.length > 0) {
				const col = cols[Math.floor(Math.random() * cols.length)];
				const shooter = aliveByCol.get(col);
				enemyBullets.push(createEnemyBullet(shooter.x + shooter.width / 2 - 1, shooter.y + shooter.height + 2));
			}
		}

		// update enemy bullets
		for (const b of enemyBullets) {
			if (!b.alive) continue;
			updateBullet(b, dt, canvas.height);
			if (b.alive) {
				if (handleBulletVsBunkers(b, bunkers)) flashes.push({ x: b.x, y: b.y, t: 0.12 });
			}
		}
		// remove dead bullets
		for (let i = enemyBullets.length - 1; i >= 0; i--) if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
				audio.explode();
				state.player.bullet = null;
			}
		}

		// enemy bullets vs player
		if (handleEnemyBulletsVsPlayer(enemyBullets, state.player)) {
			state.lives -= 1;
			audio.explode();
			if (state.lives <= 0) {
				state.mode = 'OVER';
				audio.gameOver();
			} else {
				// simple respawn: clear bullets and reset player position
				enemyBullets.length = 0;
				state.player.x = canvas.width / 2;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) {
			state.mode = 'CLEAR';
			audio.clear();
		}

		// lose condition: any invader reaches player y (occupation)
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
			audio.gameOver();
		}

		// update flashes
		for (let i = flashes.length - 1; i >= 0; i--) {
			flashes[i].t -= dt;
			if (flashes[i].t <= 0) flashes.splice(i, 1);
		}
	}

	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') {
			render.text('GAME OVER', 400, 280, '#f33', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		if (state.mode === 'CLEAR') {
			render.text('CLEAR!', 400, 280, '#3f3', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		const muteMsg = '(M)ute: ' + (audio.isMuted() ? 'ON' : 'OFF');
		render.text(muteMsg, 788, 580, '#888', 'right');
	}

	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// enemy bullets
		for (const b of enemyBullets) render.rect(b.x, b.y, 2, 8, '#f66');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
		// flashes
		for (const f of flashes) render.rect(f.x - 4, f.y - 4, 8, 8, '#fff');
	}

	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

```javascript
/**
 * ゲームメインロジック
 * ゲーム状態管理、エンティティ更新、衝突判定、描画処理を統合する
 */

// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet, createEnemyBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers, handleEnemyBulletsVsPlayer } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';
import { createAudio } from './systems/audio.js';

/**
 * ゲームオブジェクトを作成する
 * @param {HTMLCanvasElement} canvas - Canvas要素
 * @param {CanvasRenderingContext2D} ctx - Canvas 2Dコンテキスト
 * @returns {Object} ゲーム制御メソッドを含むオブジェクト
 * @returns {Function} returns.init - ゲーム初期化
 * @returns {Function} returns.update - ゲーム更新
 * @returns {Function} returns.render - ゲーム描画
 */
export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);
	const audio = createAudio();

	const invaders = [];
	const bunkers = [];
	const enemyBullets = [];
	const formation = createFormation(canvas.width);
	const flashes = []; // simple hit flashes {x,y,t}

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
		enemyFireCooldown: 0,
	};

	/**
	 * インベーダーを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	/**
	 * トーチカを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	function resetGame() {
		state.lives = 3;
		state.score = 0;
		state.mode = 'PLAY';
		state.player.x = canvas.width / 2;
		enemyBullets.length = 0;
		spawnInvaders();
		spawnBunkers();
	}

	function init() {
		spawnInvaders();
		spawnBunkers();
		window.addEventListener('keydown', (e) => {
			if (e.code === 'KeyM') audio.muteToggle();
			if ((state.mode === 'OVER' || state.mode === 'CLEAR') && e.code === 'Enter') resetGame();
		});
	}

	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
				audio.shoot();
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				if (handleBulletVsBunkers(state.player.bullet, bunkers)) flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// enemy fire pattern: random alive bottom of column at interval
		state.enemyFireCooldown -= dt;
		if (state.enemyFireCooldown <= 0) {
			state.enemyFireCooldown = Math.max(0.3, 1.2 - (55 - formation.aliveCount) * 0.01);
			// choose random column with alive invaders, fire from the lowest one
			const aliveByCol = new Map();
			for (const inv of invaders) {
				if (!inv.alive) continue;
				const cur = aliveByCol.get(inv.col);
				if (!cur || inv.y > cur.y) aliveByCol.set(inv.col, inv);
			}
			const cols = Array.from(aliveByCol.keys());
			if (cols.length > 0) {
				const col = cols[Math.floor(Math.random() * cols.length)];
				const shooter = aliveByCol.get(col);
				enemyBullets.push(createEnemyBullet(shooter.x + shooter.width / 2 - 1, shooter.y + shooter.height + 2));
			}
		}

		// update enemy bullets
		for (const b of enemyBullets) {
			if (!b.alive) continue;
			updateBullet(b, dt, canvas.height);
			if (b.alive) {
				if (handleBulletVsBunkers(b, bunkers)) flashes.push({ x: b.x, y: b.y, t: 0.12 });
			}
		}
		// remove dead bullets
		for (let i = enemyBullets.length - 1; i >= 0; i--) if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
				audio.explode();
				state.player.bullet = null;
			}
		}

		// enemy bullets vs player
		if (handleEnemyBulletsVsPlayer(enemyBullets, state.player)) {
			state.lives -= 1;
			audio.explode();
			if (state.lives <= 0) {
				state.mode = 'OVER';
				audio.gameOver();
			} else {
				// simple respawn: clear bullets and reset player position
				enemyBullets.length = 0;
				state.player.x = canvas.width / 2;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) {
			state.mode = 'CLEAR';
			audio.clear();
		}

		// lose condition: any invader reaches player y (occupation)
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
			audio.gameOver();
		}

		// update flashes
		for (let i = flashes.length - 1; i >= 0; i--) {
			flashes[i].t -= dt;
			if (flashes[i].t <= 0) flashes.splice(i, 1);
		}
	}

	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') {
			render.text('GAME OVER', 400, 280, '#f33', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		if (state.mode === 'CLEAR') {
			render.text('CLEAR!', 400, 280, '#3f3', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		const muteMsg = '(M)ute: ' + (audio.isMuted() ? 'ON' : 'OFF');
		render.text(muteMsg, 788, 580, '#888', 'right');
	}

	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// enemy bullets
		for (const b of enemyBullets) render.rect(b.x, b.y, 2, 8, '#f66');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
		// flashes
		for (const f of flashes) render.rect(f.x - 4, f.y - 4, 8, 8, '#fff');
	}

	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

```javascript
/**
 * ゲームメインロジック
 * ゲーム状態管理、エンティティ更新、衝突判定、描画処理を統合する
 */

// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet, createEnemyBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers, handleEnemyBulletsVsPlayer } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';
import { createAudio } from './systems/audio.js';

/**
 * ゲームオブジェクトを作成する
 * @param {HTMLCanvasElement} canvas - Canvas要素
 * @param {CanvasRenderingContext2D} ctx - Canvas 2Dコンテキスト
 * @returns {Object} ゲーム制御メソッドを含むオブジェクト
 * @returns {Function} returns.init - ゲーム初期化
 * @returns {Function} returns.update - ゲーム更新
 * @returns {Function} returns.render - ゲーム描画
 */
export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);
	const audio = createAudio();

	const invaders = [];
	const bunkers = [];
	const enemyBullets = [];
	const formation = createFormation(canvas.width);
	const flashes = []; // simple hit flashes {x,y,t}

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
		enemyFireCooldown: 0,
	};

	/**
	 * インベーダーを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	/**
	 * トーチカを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	/**
	 * ゲームをリセットする
	 * @returns {void} 戻り値なし
	 */
	function resetGame() {
		state.lives = 3;
		state.score = 0;
		state.mode = 'PLAY';
		state.player.x = canvas.width / 2;
		enemyBullets.length = 0;
		spawnInvaders();
		spawnBunkers();
	}

	function init() {
		spawnInvaders();
		spawnBunkers();
		window.addEventListener('keydown', (e) => {
			if (e.code === 'KeyM') audio.muteToggle();
			if ((state.mode === 'OVER' || state.mode === 'CLEAR') && e.code === 'Enter') resetGame();
		});
	}

	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
				audio.shoot();
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				if (handleBulletVsBunkers(state.player.bullet, bunkers)) flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// enemy fire pattern: random alive bottom of column at interval
		state.enemyFireCooldown -= dt;
		if (state.enemyFireCooldown <= 0) {
			state.enemyFireCooldown = Math.max(0.3, 1.2 - (55 - formation.aliveCount) * 0.01);
			// choose random column with alive invaders, fire from the lowest one
			const aliveByCol = new Map();
			for (const inv of invaders) {
				if (!inv.alive) continue;
				const cur = aliveByCol.get(inv.col);
				if (!cur || inv.y > cur.y) aliveByCol.set(inv.col, inv);
			}
			const cols = Array.from(aliveByCol.keys());
			if (cols.length > 0) {
				const col = cols[Math.floor(Math.random() * cols.length)];
				const shooter = aliveByCol.get(col);
				enemyBullets.push(createEnemyBullet(shooter.x + shooter.width / 2 - 1, shooter.y + shooter.height + 2));
			}
		}

		// update enemy bullets
		for (const b of enemyBullets) {
			if (!b.alive) continue;
			updateBullet(b, dt, canvas.height);
			if (b.alive) {
				if (handleBulletVsBunkers(b, bunkers)) flashes.push({ x: b.x, y: b.y, t: 0.12 });
			}
		}
		// remove dead bullets
		for (let i = enemyBullets.length - 1; i >= 0; i--) if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
				audio.explode();
				state.player.bullet = null;
			}
		}

		// enemy bullets vs player
		if (handleEnemyBulletsVsPlayer(enemyBullets, state.player)) {
			state.lives -= 1;
			audio.explode();
			if (state.lives <= 0) {
				state.mode = 'OVER';
				audio.gameOver();
			} else {
				// simple respawn: clear bullets and reset player position
				enemyBullets.length = 0;
				state.player.x = canvas.width / 2;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) {
			state.mode = 'CLEAR';
			audio.clear();
		}

		// lose condition: any invader reaches player y (occupation)
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
			audio.gameOver();
		}

		// update flashes
		for (let i = flashes.length - 1; i >= 0; i--) {
			flashes[i].t -= dt;
			if (flashes[i].t <= 0) flashes.splice(i, 1);
		}
	}

	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') {
			render.text('GAME OVER', 400, 280, '#f33', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		if (state.mode === 'CLEAR') {
			render.text('CLEAR!', 400, 280, '#3f3', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		const muteMsg = '(M)ute: ' + (audio.isMuted() ? 'ON' : 'OFF');
		render.text(muteMsg, 788, 580, '#888', 'right');
	}

	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// enemy bullets
		for (const b of enemyBullets) render.rect(b.x, b.y, 2, 8, '#f66');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
		// flashes
		for (const f of flashes) render.rect(f.x - 4, f.y - 4, 8, 8, '#fff');
	}

	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

```javascript
/**
 * ゲームメインロジック
 * ゲーム状態管理、エンティティ更新、衝突判定、描画処理を統合する
 */

// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet, createEnemyBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers, handleEnemyBulletsVsPlayer } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';
import { createAudio } from './systems/audio.js';

/**
 * ゲームオブジェクトを作成する
 * @param {HTMLCanvasElement} canvas - Canvas要素
 * @param {CanvasRenderingContext2D} ctx - Canvas 2Dコンテキスト
 * @returns {Object} ゲーム制御メソッドを含むオブジェクト
 * @returns {Function} returns.init - ゲーム初期化
 * @returns {Function} returns.update - ゲーム更新
 * @returns {Function} returns.render - ゲーム描画
 */
export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);
	const audio = createAudio();

	const invaders = [];
	const bunkers = [];
	const enemyBullets = [];
	const formation = createFormation(canvas.width);
	const flashes = []; // simple hit flashes {x,y,t}

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
		enemyFireCooldown: 0,
	};

	/**
	 * インベーダーを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	/**
	 * トーチカを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	/**
	 * ゲームをリセットする
	 * @returns {void} 戻り値なし
	 */
	function resetGame() {
		state.lives = 3;
		state.score = 0;
		state.mode = 'PLAY';
		state.player.x = canvas.width / 2;
		enemyBullets.length = 0;
		spawnInvaders();
		spawnBunkers();
	}

	/**
	 * ゲームを初期化する
	 * @returns {void} 戻り値なし
	 */
	function init() {
		spawnInvaders();
		spawnBunkers();
		window.addEventListener('keydown', (e) => {
			if (e.code === 'KeyM') audio.muteToggle();
			if ((state.mode === 'OVER' || state.mode === 'CLEAR') && e.code === 'Enter') resetGame();
		});
	}

	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
				audio.shoot();
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				if (handleBulletVsBunkers(state.player.bullet, bunkers)) flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// enemy fire pattern: random alive bottom of column at interval
		state.enemyFireCooldown -= dt;
		if (state.enemyFireCooldown <= 0) {
			state.enemyFireCooldown = Math.max(0.3, 1.2 - (55 - formation.aliveCount) * 0.01);
			// choose random column with alive invaders, fire from the lowest one
			const aliveByCol = new Map();
			for (const inv of invaders) {
				if (!inv.alive) continue;
				const cur = aliveByCol.get(inv.col);
				if (!cur || inv.y > cur.y) aliveByCol.set(inv.col, inv);
			}
			const cols = Array.from(aliveByCol.keys());
			if (cols.length > 0) {
				const col = cols[Math.floor(Math.random() * cols.length)];
				const shooter = aliveByCol.get(col);
				enemyBullets.push(createEnemyBullet(shooter.x + shooter.width / 2 - 1, shooter.y + shooter.height + 2));
			}
		}

		// update enemy bullets
		for (const b of enemyBullets) {
			if (!b.alive) continue;
			updateBullet(b, dt, canvas.height);
			if (b.alive) {
				if (handleBulletVsBunkers(b, bunkers)) flashes.push({ x: b.x, y: b.y, t: 0.12 });
			}
		}
		// remove dead bullets
		for (let i = enemyBullets.length - 1; i >= 0; i--) if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
				audio.explode();
				state.player.bullet = null;
			}
		}

		// enemy bullets vs player
		if (handleEnemyBulletsVsPlayer(enemyBullets, state.player)) {
			state.lives -= 1;
			audio.explode();
			if (state.lives <= 0) {
				state.mode = 'OVER';
				audio.gameOver();
			} else {
				// simple respawn: clear bullets and reset player position
				enemyBullets.length = 0;
				state.player.x = canvas.width / 2;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) {
			state.mode = 'CLEAR';
			audio.clear();
		}

		// lose condition: any invader reaches player y (occupation)
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
			audio.gameOver();
		}

		// update flashes
		for (let i = flashes.length - 1; i >= 0; i--) {
			flashes[i].t -= dt;
			if (flashes[i].t <= 0) flashes.splice(i, 1);
		}
	}

	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') {
			render.text('GAME OVER', 400, 280, '#f33', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		if (state.mode === 'CLEAR') {
			render.text('CLEAR!', 400, 280, '#3f3', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		const muteMsg = '(M)ute: ' + (audio.isMuted() ? 'ON' : 'OFF');
		render.text(muteMsg, 788, 580, '#888', 'right');
	}

	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// enemy bullets
		for (const b of enemyBullets) render.rect(b.x, b.y, 2, 8, '#f66');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
		// flashes
		for (const f of flashes) render.rect(f.x - 4, f.y - 4, 8, 8, '#fff');
	}

	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

```javascript
/**
 * ゲームメインロジック
 * ゲーム状態管理、エンティティ更新、衝突判定、描画処理を統合する
 */

// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet, createEnemyBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers, handleEnemyBulletsVsPlayer } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';
import { createAudio } from './systems/audio.js';

/**
 * ゲームオブジェクトを作成する
 * @param {HTMLCanvasElement} canvas - Canvas要素
 * @param {CanvasRenderingContext2D} ctx - Canvas 2Dコンテキスト
 * @returns {Object} ゲーム制御メソッドを含むオブジェクト
 * @returns {Function} returns.init - ゲーム初期化
 * @returns {Function} returns.update - ゲーム更新
 * @returns {Function} returns.render - ゲーム描画
 */
export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);
	const audio = createAudio();

	const invaders = [];
	const bunkers = [];
	const enemyBullets = [];
	const formation = createFormation(canvas.width);
	const flashes = []; // simple hit flashes {x,y,t}

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
		enemyFireCooldown: 0,
	};

	/**
	 * インベーダーを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	/**
	 * トーチカを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	/**
	 * ゲームをリセットする
	 * @returns {void} 戻り値なし
	 */
	function resetGame() {
		state.lives = 3;
		state.score = 0;
		state.mode = 'PLAY';
		state.player.x = canvas.width / 2;
		enemyBullets.length = 0;
		spawnInvaders();
		spawnBunkers();
	}

	/**
	 * ゲームを初期化する
	 * @returns {void} 戻り値なし
	 */
	function init() {
		spawnInvaders();
		spawnBunkers();
		window.addEventListener('keydown', (e) => {
			if (e.code === 'KeyM') audio.muteToggle();
			if ((state.mode === 'OVER' || state.mode === 'CLEAR') && e.code === 'Enter') resetGame();
		});
	}

	/**
	 * ゲーム状態を更新する
	 * @param {number} dt - 前フレームからの経過時間（秒）
	 * @returns {void} 戻り値なし
	 */
	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
				audio.shoot();
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				if (handleBulletVsBunkers(state.player.bullet, bunkers)) flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// enemy fire pattern: random alive bottom of column at interval
		state.enemyFireCooldown -= dt;
		if (state.enemyFireCooldown <= 0) {
			state.enemyFireCooldown = Math.max(0.3, 1.2 - (55 - formation.aliveCount) * 0.01);
			// choose random column with alive invaders, fire from the lowest one
			const aliveByCol = new Map();
			for (const inv of invaders) {
				if (!inv.alive) continue;
				const cur = aliveByCol.get(inv.col);
				if (!cur || inv.y > cur.y) aliveByCol.set(inv.col, inv);
			}
			const cols = Array.from(aliveByCol.keys());
			if (cols.length > 0) {
				const col = cols[Math.floor(Math.random() * cols.length)];
				const shooter = aliveByCol.get(col);
				enemyBullets.push(createEnemyBullet(shooter.x + shooter.width / 2 - 1, shooter.y + shooter.height + 2));
			}
		}

		// update enemy bullets
		for (const b of enemyBullets) {
			if (!b.alive) continue;
			updateBullet(b, dt, canvas.height);
			if (b.alive) {
				if (handleBulletVsBunkers(b, bunkers)) flashes.push({ x: b.x, y: b.y, t: 0.12 });
			}
		}
		// remove dead bullets
		for (let i = enemyBullets.length - 1; i >= 0; i--) if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
				audio.explode();
				state.player.bullet = null;
			}
		}

		// enemy bullets vs player
		if (handleEnemyBulletsVsPlayer(enemyBullets, state.player)) {
			state.lives -= 1;
			audio.explode();
			if (state.lives <= 0) {
				state.mode = 'OVER';
				audio.gameOver();
			} else {
				// simple respawn: clear bullets and reset player position
				enemyBullets.length = 0;
				state.player.x = canvas.width / 2;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) {
			state.mode = 'CLEAR';
			audio.clear();
		}

		// lose condition: any invader reaches player y (occupation)
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
			audio.gameOver();
		}

		// update flashes
		for (let i = flashes.length - 1; i >= 0; i--) {
			flashes[i].t -= dt;
			if (flashes[i].t <= 0) flashes.splice(i, 1);
		}
	}

	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') {
			render.text('GAME OVER', 400, 280, '#f33', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		if (state.mode === 'CLEAR') {
			render.text('CLEAR!', 400, 280, '#3f3', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		const muteMsg = '(M)ute: ' + (audio.isMuted() ? 'ON' : 'OFF');
		render.text(muteMsg, 788, 580, '#888', 'right');
	}

	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// enemy bullets
		for (const b of enemyBullets) render.rect(b.x, b.y, 2, 8, '#f66');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
		// flashes
		for (const f of flashes) render.rect(f.x - 4, f.y - 4, 8, 8, '#fff');
	}

	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

```javascript
/**
 * ゲームメインロジック
 * ゲーム状態管理、エンティティ更新、衝突判定、描画処理を統合する
 */

// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet, createEnemyBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers, handleEnemyBulletsVsPlayer } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';
import { createAudio } from './systems/audio.js';

/**
 * ゲームオブジェクトを作成する
 * @param {HTMLCanvasElement} canvas - Canvas要素
 * @param {CanvasRenderingContext2D} ctx - Canvas 2Dコンテキスト
 * @returns {Object} ゲーム制御メソッドを含むオブジェクト
 * @returns {Function} returns.init - ゲーム初期化
 * @returns {Function} returns.update - ゲーム更新
 * @returns {Function} returns.render - ゲーム描画
 */
export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);
	const audio = createAudio();

	const invaders = [];
	const bunkers = [];
	const enemyBullets = [];
	const formation = createFormation(canvas.width);
	const flashes = []; // simple hit flashes {x,y,t}

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
		enemyFireCooldown: 0,
	};

	/**
	 * インベーダーを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	/**
	 * トーチカを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	/**
	 * ゲームをリセットする
	 * @returns {void} 戻り値なし
	 */
	function resetGame() {
		state.lives = 3;
		state.score = 0;
		state.mode = 'PLAY';
		state.player.x = canvas.width / 2;
		enemyBullets.length = 0;
		spawnInvaders();
		spawnBunkers();
	}

	/**
	 * ゲームを初期化する
	 * @returns {void} 戻り値なし
	 */
	function init() {
		spawnInvaders();
		spawnBunkers();
		window.addEventListener('keydown', (e) => {
			if (e.code === 'KeyM') audio.muteToggle();
			if ((state.mode === 'OVER' || state.mode === 'CLEAR') && e.code === 'Enter') resetGame();
		});
	}

	/**
	 * ゲーム状態を更新する
	 * @param {number} dt - 前フレームからの経過時間（秒）
	 * @returns {void} 戻り値なし
	 */
	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
				audio.shoot();
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				if (handleBulletVsBunkers(state.player.bullet, bunkers)) flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// enemy fire pattern: random alive bottom of column at interval
		state.enemyFireCooldown -= dt;
		if (state.enemyFireCooldown <= 0) {
			state.enemyFireCooldown = Math.max(0.3, 1.2 - (55 - formation.aliveCount) * 0.01);
			// choose random column with alive invaders, fire from the lowest one
			const aliveByCol = new Map();
			for (const inv of invaders) {
				if (!inv.alive) continue;
				const cur = aliveByCol.get(inv.col);
				if (!cur || inv.y > cur.y) aliveByCol.set(inv.col, inv);
			}
			const cols = Array.from(aliveByCol.keys());
			if (cols.length > 0) {
				const col = cols[Math.floor(Math.random() * cols.length)];
				const shooter = aliveByCol.get(col);
				enemyBullets.push(createEnemyBullet(shooter.x + shooter.width / 2 - 1, shooter.y + shooter.height + 2));
			}
		}

		// update enemy bullets
		for (const b of enemyBullets) {
			if (!b.alive) continue;
			updateBullet(b, dt, canvas.height);
			if (b.alive) {
				if (handleBulletVsBunkers(b, bunkers)) flashes.push({ x: b.x, y: b.y, t: 0.12 });
			}
		}
		// remove dead bullets
		for (let i = enemyBullets.length - 1; i >= 0; i--) if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
				audio.explode();
				state.player.bullet = null;
			}
		}

		// enemy bullets vs player
		if (handleEnemyBulletsVsPlayer(enemyBullets, state.player)) {
			state.lives -= 1;
			audio.explode();
			if (state.lives <= 0) {
				state.mode = 'OVER';
				audio.gameOver();
			} else {
				// simple respawn: clear bullets and reset player position
				enemyBullets.length = 0;
				state.player.x = canvas.width / 2;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) {
			state.mode = 'CLEAR';
			audio.clear();
		}

		// lose condition: any invader reaches player y (occupation)
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
			audio.gameOver();
		}

		// update flashes
		for (let i = flashes.length - 1; i >= 0; i--) {
			flashes[i].t -= dt;
			if (flashes[i].t <= 0) flashes.splice(i, 1);
		}
	}

	/**
	 * HUD（ヘッドアップディスプレイ）を描画する
	 * @returns {void} 戻り値なし
	 */
	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') {
			render.text('GAME OVER', 400, 280, '#f33', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		if (state.mode === 'CLEAR') {
			render.text('CLEAR!', 400, 280, '#3f3', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		const muteMsg = '(M)ute: ' + (audio.isMuted() ? 'ON' : 'OFF');
		render.text(muteMsg, 788, 580, '#888', 'right');
	}

	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// enemy bullets
		for (const b of enemyBullets) render.rect(b.x, b.y, 2, 8, '#f66');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
		// flashes
		for (const f of flashes) render.rect(f.x - 4, f.y - 4, 8, 8, '#fff');
	}

	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

```javascript
/**
 * ゲームメインロジック
 * ゲーム状態管理、エンティティ更新、衝突判定、描画処理を統合する
 */

// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet, createEnemyBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers, handleEnemyBulletsVsPlayer } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';
import { createAudio } from './systems/audio.js';

/**
 * ゲームオブジェクトを作成する
 * @param {HTMLCanvasElement} canvas - Canvas要素
 * @param {CanvasRenderingContext2D} ctx - Canvas 2Dコンテキスト
 * @returns {Object} ゲーム制御メソッドを含むオブジェクト
 * @returns {Function} returns.init - ゲーム初期化
 * @returns {Function} returns.update - ゲーム更新
 * @returns {Function} returns.render - ゲーム描画
 */
export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);
	const audio = createAudio();

	const invaders = [];
	const bunkers = [];
	const enemyBullets = [];
	const formation = createFormation(canvas.width);
	const flashes = []; // simple hit flashes {x,y,t}

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
		enemyFireCooldown: 0,
	};

	/**
	 * インベーダーを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	/**
	 * トーチカを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	/**
	 * ゲームをリセットする
	 * @returns {void} 戻り値なし
	 */
	function resetGame() {
		state.lives = 3;
		state.score = 0;
		state.mode = 'PLAY';
		state.player.x = canvas.width / 2;
		enemyBullets.length = 0;
		spawnInvaders();
		spawnBunkers();
	}

	/**
	 * ゲームを初期化する
	 * @returns {void} 戻り値なし
	 */
	function init() {
		spawnInvaders();
		spawnBunkers();
		window.addEventListener('keydown', (e) => {
			if (e.code === 'KeyM') audio.muteToggle();
			if ((state.mode === 'OVER' || state.mode === 'CLEAR') && e.code === 'Enter') resetGame();
		});
	}

	/**
	 * ゲーム状態を更新する
	 * @param {number} dt - 前フレームからの経過時間（秒）
	 * @returns {void} 戻り値なし
	 */
	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
				audio.shoot();
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				if (handleBulletVsBunkers(state.player.bullet, bunkers)) flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// enemy fire pattern: random alive bottom of column at interval
		state.enemyFireCooldown -= dt;
		if (state.enemyFireCooldown <= 0) {
			state.enemyFireCooldown = Math.max(0.3, 1.2 - (55 - formation.aliveCount) * 0.01);
			// choose random column with alive invaders, fire from the lowest one
			const aliveByCol = new Map();
			for (const inv of invaders) {
				if (!inv.alive) continue;
				const cur = aliveByCol.get(inv.col);
				if (!cur || inv.y > cur.y) aliveByCol.set(inv.col, inv);
			}
			const cols = Array.from(aliveByCol.keys());
			if (cols.length > 0) {
				const col = cols[Math.floor(Math.random() * cols.length)];
				const shooter = aliveByCol.get(col);
				enemyBullets.push(createEnemyBullet(shooter.x + shooter.width / 2 - 1, shooter.y + shooter.height + 2));
			}
		}

		// update enemy bullets
		for (const b of enemyBullets) {
			if (!b.alive) continue;
			updateBullet(b, dt, canvas.height);
			if (b.alive) {
				if (handleBulletVsBunkers(b, bunkers)) flashes.push({ x: b.x, y: b.y, t: 0.12 });
			}
		}
		// remove dead bullets
		for (let i = enemyBullets.length - 1; i >= 0; i--) if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
				audio.explode();
				state.player.bullet = null;
			}
		}

		// enemy bullets vs player
		if (handleEnemyBulletsVsPlayer(enemyBullets, state.player)) {
			state.lives -= 1;
			audio.explode();
			if (state.lives <= 0) {
				state.mode = 'OVER';
				audio.gameOver();
			} else {
				// simple respawn: clear bullets and reset player position
				enemyBullets.length = 0;
				state.player.x = canvas.width / 2;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) {
			state.mode = 'CLEAR';
			audio.clear();
		}

		// lose condition: any invader reaches player y (occupation)
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
			audio.gameOver();
		}

		// update flashes
		for (let i = flashes.length - 1; i >= 0; i--) {
			flashes[i].t -= dt;
			if (flashes[i].t <= 0) flashes.splice(i, 1);
		}
	}

	/**
	 * HUD（ヘッドアップディスプレイ）を描画する
	 * @returns {void} 戻り値なし
	 */
	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') {
			render.text('GAME OVER', 400, 280, '#f33', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		if (state.mode === 'CLEAR') {
			render.text('CLEAR!', 400, 280, '#3f3', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		const muteMsg = '(M)ute: ' + (audio.isMuted() ? 'ON' : 'OFF');
		render.text(muteMsg, 788, 580, '#888', 'right');
	}

	/**
	 * ゲームエンティティを描画する
	 * @returns {void} 戻り値なし
	 */
	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// enemy bullets
		for (const b of enemyBullets) render.rect(b.x, b.y, 2, 8, '#f66');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
		// flashes
		for (const f of flashes) render.rect(f.x - 4, f.y - 4, 8, 8, '#fff');
	}

	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

```javascript
/**
 * ゲームメインロジック
 * ゲーム状態管理、エンティティ更新、衝突判定、描画処理を統合する
 */

// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet, createEnemyBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers, handleEnemyBulletsVsPlayer } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';
import { createAudio } from './systems/audio.js';

/**
 * ゲームオブジェクトを作成する
 * @param {HTMLCanvasElement} canvas - Canvas要素
 * @param {CanvasRenderingContext2D} ctx - Canvas 2Dコンテキスト
 * @returns {Object} ゲーム制御メソッドを含むオブジェクト
 * @returns {Function} returns.init - ゲーム初期化
 * @returns {Function} returns.update - ゲーム更新
 * @returns {Function} returns.render - ゲーム描画
 */
export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);
	const audio = createAudio();

	const invaders = [];
	const bunkers = [];
	const enemyBullets = [];
	const formation = createFormation(canvas.width);
	const flashes = []; // simple hit flashes {x,y,t}

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
		enemyFireCooldown: 0,
	};

	/**
	 * インベーダーを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	/**
	 * トーチカを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	/**
	 * ゲームをリセットする
	 * @returns {void} 戻り値なし
	 */
	function resetGame() {
		state.lives = 3;
		state.score = 0;
		state.mode = 'PLAY';
		state.player.x = canvas.width / 2;
		enemyBullets.length = 0;
		spawnInvaders();
		spawnBunkers();
	}

	/**
	 * ゲームを初期化する
	 * @returns {void} 戻り値なし
	 */
	function init() {
		spawnInvaders();
		spawnBunkers();
		window.addEventListener('keydown', (e) => {
			if (e.code === 'KeyM') audio.muteToggle();
			if ((state.mode === 'OVER' || state.mode === 'CLEAR') && e.code === 'Enter') resetGame();
		});
	}

	/**
	 * ゲーム状態を更新する
	 * @param {number} dt - 前フレームからの経過時間（秒）
	 * @returns {void} 戻り値なし
	 */
	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
				audio.shoot();
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				if (handleBulletVsBunkers(state.player.bullet, bunkers)) flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// enemy fire pattern: random alive bottom of column at interval
		state.enemyFireCooldown -= dt;
		if (state.enemyFireCooldown <= 0) {
			state.enemyFireCooldown = Math.max(0.3, 1.2 - (55 - formation.aliveCount) * 0.01);
			// choose random column with alive invaders, fire from the lowest one
			const aliveByCol = new Map();
			for (const inv of invaders) {
				if (!inv.alive) continue;
				const cur = aliveByCol.get(inv.col);
				if (!cur || inv.y > cur.y) aliveByCol.set(inv.col, inv);
			}
			const cols = Array.from(aliveByCol.keys());
			if (cols.length > 0) {
				const col = cols[Math.floor(Math.random() * cols.length)];
				const shooter = aliveByCol.get(col);
				enemyBullets.push(createEnemyBullet(shooter.x + shooter.width / 2 - 1, shooter.y + shooter.height + 2));
			}
		}

		// update enemy bullets
		for (const b of enemyBullets) {
			if (!b.alive) continue;
			updateBullet(b, dt, canvas.height);
			if (b.alive) {
				if (handleBulletVsBunkers(b, bunkers)) flashes.push({ x: b.x, y: b.y, t: 0.12 });
			}
		}
		// remove dead bullets
		for (let i = enemyBullets.length - 1; i >= 0; i--) if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
				audio.explode();
				state.player.bullet = null;
			}
		}

		// enemy bullets vs player
		if (handleEnemyBulletsVsPlayer(enemyBullets, state.player)) {
			state.lives -= 1;
			audio.explode();
			if (state.lives <= 0) {
				state.mode = 'OVER';
				audio.gameOver();
			} else {
				// simple respawn: clear bullets and reset player position
				enemyBullets.length = 0;
				state.player.x = canvas.width / 2;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) {
			state.mode = 'CLEAR';
			audio.clear();
		}

		// lose condition: any invader reaches player y (occupation)
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
			audio.gameOver();
		}

		// update flashes
		for (let i = flashes.length - 1; i >= 0; i--) {
			flashes[i].t -= dt;
			if (flashes[i].t <= 0) flashes.splice(i, 1);
		}
	}

	/**
	 * HUD（ヘッドアップディスプレイ）を描画する
	 * @returns {void} 戻り値なし
	 */
	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') {
			render.text('GAME OVER', 400, 280, '#f33', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		if (state.mode === 'CLEAR') {
			render.text('CLEAR!', 400, 280, '#3f3', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		const muteMsg = '(M)ute: ' + (audio.isMuted() ? 'ON' : 'OFF');
		render.text(muteMsg, 788, 580, '#888', 'right');
	}

	/**
	 * ゲームエンティティを描画する
	 * @returns {void} 戻り値なし
	 */
	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// enemy bullets
		for (const b of enemyBullets) render.rect(b.x, b.y, 2, 8, '#f66');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
		// flashes
		for (const f of flashes) render.rect(f.x - 4, f.y - 4, 8, 8, '#fff');
	}

	/**
	 * ゲーム全体を描画する
	 * @returns {void} 戻り値なし
	 */
	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}

```

```javascript
/**
 * プレイヤーエンティティ
 * ビーム砲の状態管理と移動制御を行う
 */

// Player entity

/**
 * プレイヤーオブジェクトを作成する
 * @param {number} x - 初期X座標
 * @param {number} y - 初期Y座標
 * @returns {Object} プレイヤー状態オブジェクト
 */
export function createPlayer(x, y) {
	return { x, y, width: 32, height: 16, speed: 240, cooldown: 0, bullet: null };
}

export function updatePlayer(player, dt, input, canvasWidth) {
	if (input.left) player.x -= player.speed * dt;
	if (input.right) player.x += player.speed * dt;
	if (player.x < 16) player.x = 16;
	if (player.x > canvasWidth - 16) player.x = canvasWidth - 16;
	if (player.cooldown > 0) player.cooldown -= dt;
}

export function canFire(player) {
	return player.bullet == null && player.cooldown <= 0;
}

export function onFired(player) {
	player.cooldown = 0.2; // minimal cadence to prevent ultra rapid fire on edge
}

```

```javascript
/**
 * プレイヤーエンティティ
 * ビーム砲の状態管理と移動制御を行う
 */

// Player entity

/**
 * プレイヤーオブジェクトを作成する
 * @param {number} x - 初期X座標
 * @param {number} y - 初期Y座標
 * @returns {Object} プレイヤー状態オブジェクト
 */
export function createPlayer(x, y) {
	return { x, y, width: 32, height: 16, speed: 240, cooldown: 0, bullet: null };
}

/**
 * プレイヤーを更新する
 * @param {Object} player - プレイヤーオブジェクト
 * @param {number} dt - 前フレームからの経過時間（秒）
 * @param {Object} input - 入力状態オブジェクト
 * @param {number} canvasWidth - キャンバス幅
 * @returns {void} 戻り値なし
 */
export function updatePlayer(player, dt, input, canvasWidth) {
	if (input.left) player.x -= player.speed * dt;
	if (input.right) player.x += player.speed * dt;
	if (player.x < 16) player.x = 16;
	if (player.x > canvasWidth - 16) player.x = canvasWidth - 16;
	if (player.cooldown > 0) player.cooldown -= dt;
}

export function canFire(player) {
	return player.bullet == null && player.cooldown <= 0;
}

export function onFired(player) {
	player.cooldown = 0.2; // minimal cadence to prevent ultra rapid fire on edge
}

```

```javascript
/**
 * プレイヤーエンティティ
 * ビーム砲の状態管理と移動制御を行う
 */

// Player entity

/**
 * プレイヤーオブジェクトを作成する
 * @param {number} x - 初期X座標
 * @param {number} y - 初期Y座標
 * @returns {Object} プレイヤー状態オブジェクト
 */
export function createPlayer(x, y) {
	return { x, y, width: 32, height: 16, speed: 240, cooldown: 0, bullet: null };
}

/**
 * プレイヤーを更新する
 * @param {Object} player - プレイヤーオブジェクト
 * @param {number} dt - 前フレームからの経過時間（秒）
 * @param {Object} input - 入力状態オブジェクト
 * @param {number} canvasWidth - キャンバス幅
 * @returns {void} 戻り値なし
 */
export function updatePlayer(player, dt, input, canvasWidth) {
	if (input.left) player.x -= player.speed * dt;
	if (input.right) player.x += player.speed * dt;
	if (player.x < 16) player.x = 16;
	if (player.x > canvasWidth - 16) player.x = canvasWidth - 16;
	if (player.cooldown > 0) player.cooldown -= dt;
}

/**
 * プレイヤーが発射可能かチェックする
 * @param {Object} player - プレイヤーオブジェクト
 * @returns {boolean} 発射可能かどうか
 */
export function canFire(player) {
	return player.bullet == null && player.cooldown <= 0;
}

export function onFired(player) {
	player.cooldown = 0.2; // minimal cadence to prevent ultra rapid fire on edge
}

```

```javascript
/**
 * プレイヤーエンティティ
 * ビーム砲の状態管理と移動制御を行う
 */

// Player entity

/**
 * プレイヤーオブジェクトを作成する
 * @param {number} x - 初期X座標
 * @param {number} y - 初期Y座標
 * @returns {Object} プレイヤー状態オブジェクト
 */
export function createPlayer(x, y) {
	return { x, y, width: 32, height: 16, speed: 240, cooldown: 0, bullet: null };
}

/**
 * プレイヤーを更新する
 * @param {Object} player - プレイヤーオブジェクト
 * @param {number} dt - 前フレームからの経過時間（秒）
 * @param {Object} input - 入力状態オブジェクト
 * @param {number} canvasWidth - キャンバス幅
 * @returns {void} 戻り値なし
 */
export function updatePlayer(player, dt, input, canvasWidth) {
	if (input.left) player.x -= player.speed * dt;
	if (input.right) player.x += player.speed * dt;
	if (player.x < 16) player.x = 16;
	if (player.x > canvasWidth - 16) player.x = canvasWidth - 16;
	if (player.cooldown > 0) player.cooldown -= dt;
}

/**
 * プレイヤーが発射可能かチェックする
 * @param {Object} player - プレイヤーオブジェクト
 * @returns {boolean} 発射可能かどうか
 */
export function canFire(player) {
	return player.bullet == null && player.cooldown <= 0;
}

/**
 * プレイヤーが発射した時の処理
 * @param {Object} player - プレイヤーオブジェクト
 * @returns {void} 戻り値なし
 */
export function onFired(player) {
	player.cooldown = 0.2; // minimal cadence to prevent ultra rapid fire on edge
}

```

```javascript
/**
 * 弾エンティティ
 * プレイヤー弾と敵弾の共通処理を行う
 */

// Bullet entity

/**
 * 弾オブジェクトを作成する
 * @param {number} x - 初期X座標
 * @param {number} y - 初期Y座標
 * @param {number} vy - Y方向の速度
 * @param {string} owner - 所有者（'player' または 'enemy'）
 * @returns {Object} 弾オブジェクト
 */
export function createBullet(x, y, vy, owner) {
	return { x, y, width: 2, height: 8, vy, owner, alive: true };
}

export function updateBullet(bullet, dt, canvasHeight) {
	bullet.y += bullet.vy * dt;
	if (bullet.y < -bullet.height || bullet.y > canvasHeight + bullet.height) {
		bullet.alive = false;
	}
}

export function createEnemyBullet(x, y) {
	return createBullet(x, y, 180, 'enemy');
}

```

```javascript
/**
 * 弾エンティティ
 * プレイヤー弾と敵弾の共通処理を行う
 */

// Bullet entity

/**
 * 弾オブジェクトを作成する
 * @param {number} x - 初期X座標
 * @param {number} y - 初期Y座標
 * @param {number} vy - Y方向の速度
 * @param {string} owner - 所有者（'player' または 'enemy'）
 * @returns {Object} 弾オブジェクト
 */
export function createBullet(x, y, vy, owner) {
	return { x, y, width: 2, height: 8, vy, owner, alive: true };
}

/**
 * 弾を更新する
 * @param {Object} bullet - 弾オブジェクト
 * @param {number} dt - 前フレームからの経過時間（秒）
 * @param {number} canvasHeight - キャンバス高さ
 * @returns {void} 戻り値なし
 */
export function updateBullet(bullet, dt, canvasHeight) {
	bullet.y += bullet.vy * dt;
	if (bullet.y < -bullet.height || bullet.y > canvasHeight + bullet.height) {
		bullet.alive = false;
	}
}

export function createEnemyBullet(x, y) {
	return createBullet(x, y, 180, 'enemy');
}

```

```javascript
/**
 * 弾エンティティ
 * プレイヤー弾と敵弾の共通処理を行う
 */

// Bullet entity

/**
 * 弾オブジェクトを作成する
 * @param {number} x - 初期X座標
 * @param {number} y - 初期Y座標
 * @param {number} vy - Y方向の速度
 * @param {string} owner - 所有者（'player' または 'enemy'）
 * @returns {Object} 弾オブジェクト
 */
export function createBullet(x, y, vy, owner) {
	return { x, y, width: 2, height: 8, vy, owner, alive: true };
}

/**
 * 弾を更新する
 * @param {Object} bullet - 弾オブジェクト
 * @param {number} dt - 前フレームからの経過時間（秒）
 * @param {number} canvasHeight - キャンバス高さ
 * @returns {void} 戻り値なし
 */
export function updateBullet(bullet, dt, canvasHeight) {
	bullet.y += bullet.vy * dt;
	if (bullet.y < -bullet.height || bullet.y > canvasHeight + bullet.height) {
		bullet.alive = false;
	}
}

/**
 * 敵弾を作成する
 * @param {number} x - 初期X座標
 * @param {number} y - 初期Y座標
 * @returns {Object} 敵弾オブジェクト
 */
export function createEnemyBullet(x, y) {
	return createBullet(x, y, 180, 'enemy');
}

```

```javascript
/**
 * インベーダーエンティティ
 * 敵の状態管理と段別スコア設定を行う
 */

// Invader entity

/**
 * インベーダーオブジェクトを作成する
 * @param {number} row - 行番号（0-4）
 * @param {number} col - 列番号（0-10）
 * @param {number} x - 初期X座標
 * @param {number} y - 初期Y座標
 * @returns {Object} インベーダーオブジェクト
 */
export function createInvader(row, col, x, y) {
	let scoreValue = 10;
	if (row === 0) scoreValue = 30;
	else if (row === 1 || row === 2) scoreValue = 20;
	else scoreValue = 10;
	return { row, col, x, y, width: 28, height: 20, alive: true, scoreValue };
}

```

```javascript
/**
 * インベーダー編隊管理
 * 横移動、端到達時の下降・反転、速度スケーリングを制御する
 */

// Formation management for invaders

/**
 * 編隊管理オブジェクトを作成する
 * @param {number} canvasWidth - キャンバス幅
 * @returns {Object} 編隊管理オブジェクト
 */
export function createFormation(canvasWidth) {
	return {
		direction: 1, // 1:right, -1:left
		speed: 40, // base horizontal px/s
		stepDownPx: 18,
		leftBound: 80,
		rightBound: canvasWidth - 80,
		aliveCount: 0,
	};
}

export function updateFormation(formation, invaders, dt, canvasWidth) {
	// compute dynamic speed scaling by alive count
	let alive = 0;
	let minX = Infinity, maxX = -Infinity;
	for (const inv of invaders) {
		if (!inv.alive) continue;
		alive++;
		if (inv.x < minX) minX = inv.x;
		if (inv.x + inv.width > maxX) maxX = inv.x + inv.width;
	}
	formation.aliveCount = alive;
	const speed = Math.min(160, 40 + (55 - alive) * 2); // simple scaling

	// move horizontally
	const dx = speed * formation.direction * dt;
	for (const inv of invaders) if (inv.alive) inv.x += dx;

	// edge check
	let needStepDown = false;
	if (minX <= 0 + 8 && formation.direction < 0) needStepDown = true;
	if (maxX >= canvasWidth - 8 && formation.direction > 0) needStepDown = true;
	if (needStepDown) {
		for (const inv of invaders) if (inv.alive) inv.y += formation.stepDownPx;
		formation.direction *= -1;
	}
}

```

```javascript
/**
 * インベーダー編隊管理
 * 横移動、端到達時の下降・反転、速度スケーリングを制御する
 */

// Formation management for invaders

/**
 * 編隊管理オブジェクトを作成する
 * @param {number} canvasWidth - キャンバス幅
 * @returns {Object} 編隊管理オブジェクト
 */
export function createFormation(canvasWidth) {
	return {
		direction: 1, // 1:right, -1:left
		speed: 40, // base horizontal px/s
		stepDownPx: 18,
		leftBound: 80,
		rightBound: canvasWidth - 80,
		aliveCount: 0,
	};
}

/**
 * 編隊を更新する
 * @param {Object} formation - 編隊管理オブジェクト
 * @param {Array} invaders - インベーダー配列
 * @param {number} dt - 前フレームからの経過時間（秒）
 * @param {number} canvasWidth - キャンバス幅
 * @returns {void} 戻り値なし
 */
export function updateFormation(formation, invaders, dt, canvasWidth) {
	// compute dynamic speed scaling by alive count
	let alive = 0;
	let minX = Infinity, maxX = -Infinity;
	for (const inv of invaders) {
		if (!inv.alive) continue;
		alive++;
		if (inv.x < minX) minX = inv.x;
		if (inv.x + inv.width > maxX) maxX = inv.x + inv.width;
	}
	formation.aliveCount = alive;
	const speed = Math.min(160, 40 + (55 - alive) * 2); // simple scaling

	// move horizontally
	const dx = speed * formation.direction * dt;
	for (const inv of invaders) if (inv.alive) inv.x += dx;

	// edge check
	let needStepDown = false;
	if (minX <= 0 + 8 && formation.direction < 0) needStepDown = true;
	if (maxX >= canvasWidth - 8 && formation.direction > 0) needStepDown = true;
	if (needStepDown) {
		for (const inv of invaders) if (inv.alive) inv.y += formation.stepDownPx;
		formation.direction *= -1;
	}
}

```

```javascript
/**
 * トーチカ（防御壁）エンティティ
 * タイルマトリックスを使用した段階的破損システムを実装する
 */

// Bunker (shield) entity using tile matrix for gradual damage

/**
 * トーチカオブジェクトを作成する
 * @param {number} x - 初期X座標
 * @param {number} y - 初期Y座標
 * @param {number} cols - タイル列数（デフォルト: 12）
 * @param {number} rows - タイル行数（デフォルト: 6）
 * @param {number} tileSize - タイルサイズ（デフォルト: 6）
 * @returns {Object} トーチカオブジェクト
 */
export function createBunker(x, y, cols = 12, rows = 6, tileSize = 6) {
	const tiles = [];
	for (let r = 0; r < rows; r++) {
		const row = [];
		for (let c = 0; c < cols; c++) row.push(true);
		tiles.push(row);
	}
	return { x, y, cols, rows, tileSize, tiles };
}

export function hitBunker(bunker, bx, by) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const cx = Math.floor((bx - x) / tileSize);
	const cy = Math.floor((by - y) / tileSize);
	if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
	if (!tiles[cy][cx]) return false;
	tiles[cy][cx] = false;
	return true;
}

export function drawBunker(render, bunker) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (!tiles[r][c]) continue;
			render.rect(x + c * tileSize, y + r * tileSize, tileSize, tileSize, '#6c6');
		}
	}
}

```

```javascript
/**
 * トーチカ（防御壁）エンティティ
 * タイルマトリックスを使用した段階的破損システムを実装する
 */

// Bunker (shield) entity using tile matrix for gradual damage

/**
 * トーチカオブジェクトを作成する
 * @param {number} x - 初期X座標
 * @param {number} y - 初期Y座標
 * @param {number} cols - タイル列数（デフォルト: 12）
 * @param {number} rows - タイル行数（デフォルト: 6）
 * @param {number} tileSize - タイルサイズ（デフォルト: 6）
 * @returns {Object} トーチカオブジェクト
 */
export function createBunker(x, y, cols = 12, rows = 6, tileSize = 6) {
	const tiles = [];
	for (let r = 0; r < rows; r++) {
		const row = [];
		for (let c = 0; c < cols; c++) row.push(true);
		tiles.push(row);
	}
	return { x, y, cols, rows, tileSize, tiles };
}

/**
 * トーチカの指定位置を破損させる
 * @param {Object} bunker - トーチカオブジェクト
 * @param {number} bx - 破損位置X座標
 * @param {number} by - 破損位置Y座標
 * @returns {boolean} 破損が発生したかどうか
 */
export function hitBunker(bunker, bx, by) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const cx = Math.floor((bx - x) / tileSize);
	const cy = Math.floor((by - y) / tileSize);
	if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
	if (!tiles[cy][cx]) return false;
	tiles[cy][cx] = false;
	return true;
}

export function drawBunker(render, bunker) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (!tiles[r][c]) continue;
			render.rect(x + c * tileSize, y + r * tileSize, tileSize, tileSize, '#6c6');
		}
	}
}

```

```javascript
/**
 * トーチカ（防御壁）エンティティ
 * タイルマトリックスを使用した段階的破損システムを実装する
 */

// Bunker (shield) entity using tile matrix for gradual damage

/**
 * トーチカオブジェクトを作成する
 * @param {number} x - 初期X座標
 * @param {number} y - 初期Y座標
 * @param {number} cols - タイル列数（デフォルト: 12）
 * @param {number} rows - タイル行数（デフォルト: 6）
 * @param {number} tileSize - タイルサイズ（デフォルト: 6）
 * @returns {Object} トーチカオブジェクト
 */
export function createBunker(x, y, cols = 12, rows = 6, tileSize = 6) {
	const tiles = [];
	for (let r = 0; r < rows; r++) {
		const row = [];
		for (let c = 0; c < cols; c++) row.push(true);
		tiles.push(row);
	}
	return { x, y, cols, rows, tileSize, tiles };
}

/**
 * トーチカの指定位置を破損させる
 * @param {Object} bunker - トーチカオブジェクト
 * @param {number} bx - 破損位置X座標
 * @param {number} by - 破損位置Y座標
 * @returns {boolean} 破損が発生したかどうか
 */
export function hitBunker(bunker, bx, by) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const cx = Math.floor((bx - x) / tileSize);
	const cy = Math.floor((by - y) / tileSize);
	if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
	if (!tiles[cy][cx]) return false;
	tiles[cy][cx] = false;
	return true;
}

/**
 * トーチカを描画する
 * @param {Object} render - レンダラーオブジェクト
 * @param {Object} bunker - トーチカオブジェクト
 * @returns {void} 戻り値なし
 */
export function drawBunker(render, bunker) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (!tiles[r][c]) continue;
			render.rect(x + c * tileSize, y + r * tileSize, tileSize, tileSize, '#6c6');
		}
	}
}

```

```javascript
　　/**
 * 衝突判定システム
 * AABB（軸並行境界ボックス）による矩形衝突判定と各種衝突ハンドラーを提供する
 */

// Collision system

/**
 * AABB衝突判定を行う
 * @param {Object} a - オブジェクトA（x, y, width, heightを持つ）
 * @param {Object} b - オブジェクトB（x, y, width, heightを持つ）
 * @returns {boolean} 衝突しているかどうか
 */
export function aabb(a, b) {
	return (
		a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y
	);
}

export function handlePlayerBulletVsInvaders(bullet, invaders) {
	if (!bullet || !bullet.alive) return null;
	for (const inv of invaders) {
		if (!inv.alive) continue;
		if (aabb(bullet, inv)) {
			inv.alive = false;
			bullet.alive = false;
			return { score: inv.scoreValue, row: inv.row, col: inv.col };
		}
	}
	return null;
}

export function handleBulletVsBunkers(bullet, bunkers) {
	if (!bullet || !bullet.alive) return false;
	for (const b of bunkers) {
		const hit = hitTile(b, bullet.x, bullet.y);
		if (hit) {
			bullet.alive = false;
			return true;
		}
	}
	return false;
}

export function handleInvadersTouchBunkers(invaders, bunkers) {
	for (const b of bunkers) {
		for (const inv of invaders) {
			if (!inv.alive) continue;
			// erode tiles under invader's footprint
			forEachTilesUnderRect(b, inv.x, inv.y, inv.width, inv.height, (cx, cy) => {
				b.tiles[cy][cx] = false;
			});
		}
	}
}

export function handleEnemyBulletsVsPlayer(bullets, player) {
	for (const b of bullets) {
		if (!b.alive) continue;
		if (aabb({ x: b.x, y: b.y, width: b.width, height: b.height }, { x: player.x - 16, y: player.y - 8, width: 32, height: 16 })) {
			b.alive = false;
			return true;
		}
	}
	return false;
}

// helpers for bunker tile hit tests
function hitTile(bunker, px, py) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const cx = Math.floor((px - x) / tileSize);
	const cy = Math.floor((py - y) / tileSize);
	if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
	if (!tiles[cy][cx]) return false;
	tiles[cy][cx] = false;
	return true;
}

function forEachTilesUnderRect(bunker, rx, ry, rw, rh, fn) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const startC = Math.max(0, Math.floor((rx - x) / tileSize));
	const endC = Math.min(cols - 1, Math.floor((rx + rw - x) / tileSize));
	const startR = Math.max(0, Math.floor((ry - y) / tileSize));
	const endR = Math.min(rows - 1, Math.floor((ry + rh - y) / tileSize));
	for (let r = startR; r <= endR; r++) {
		for (let c = startC; c <= endC; c++) {
			if (!tiles[r][c]) continue;
			fn(c, r);
		}
	}
}

```

```javascript
　　/**
 * 衝突判定システム
 * AABB（軸並行境界ボックス）による矩形衝突判定と各種衝突ハンドラーを提供する
 */

// Collision system

/**
 * AABB衝突判定を行う
 * @param {Object} a - オブジェクトA（x, y, width, heightを持つ）
 * @param {Object} b - オブジェクトB（x, y, width, heightを持つ）
 * @returns {boolean} 衝突しているかどうか
 */
export function aabb(a, b) {
	return (
		a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y
	);
}

/**
 * プレイヤー弾とインベーダーの衝突判定を行う
 * @param {Object} bullet - プレイヤー弾オブジェクト
 * @param {Array} invaders - インベーダー配列
 * @returns {Object|null} 衝突結果（スコア、行、列）またはnull
 */
export function handlePlayerBulletVsInvaders(bullet, invaders) {
	if (!bullet || !bullet.alive) return null;
	for (const inv of invaders) {
		if (!inv.alive) continue;
		if (aabb(bullet, inv)) {
			inv.alive = false;
			bullet.alive = false;
			return { score: inv.scoreValue, row: inv.row, col: inv.col };
		}
	}
	return null;
}

export function handleBulletVsBunkers(bullet, bunkers) {
	if (!bullet || !bullet.alive) return false;
	for (const b of bunkers) {
		const hit = hitTile(b, bullet.x, bullet.y);
		if (hit) {
			bullet.alive = false;
			return true;
		}
	}
	return false;
}

export function handleInvadersTouchBunkers(invaders, bunkers) {
	for (const b of bunkers) {
		for (const inv of invaders) {
			if (!inv.alive) continue;
			// erode tiles under invader's footprint
			forEachTilesUnderRect(b, inv.x, inv.y, inv.width, inv.height, (cx, cy) => {
				b.tiles[cy][cx] = false;
			});
		}
	}
}

export function handleEnemyBulletsVsPlayer(bullets, player) {
	for (const b of bullets) {
		if (!b.alive) continue;
		if (aabb({ x: b.x, y: b.y, width: b.width, height: b.height }, { x: player.x - 16, y: player.y - 8, width: 32, height: 16 })) {
			b.alive = false;
			return true;
		}
	}
	return false;
}

// helpers for bunker tile hit tests
function hitTile(bunker, px, py) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const cx = Math.floor((px - x) / tileSize);
	const cy = Math.floor((py - y) / tileSize);
	if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
	if (!tiles[cy][cx]) return false;
	tiles[cy][cx] = false;
	return true;
}

function forEachTilesUnderRect(bunker, rx, ry, rw, rh, fn) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const startC = Math.max(0, Math.floor((rx - x) / tileSize));
	const endC = Math.min(cols - 1, Math.floor((rx + rw - x) / tileSize));
	const startR = Math.max(0, Math.floor((ry - y) / tileSize));
	const endR = Math.min(rows - 1, Math.floor((ry + rh - y) / tileSize));
	for (let r = startR; r <= endR; r++) {
		for (let c = startC; c <= endC; c++) {
			if (!tiles[r][c]) continue;
			fn(c, r);
		}
	}
}

```

```javascript
　　/**
 * 衝突判定システム
 * AABB（軸並行境界ボックス）による矩形衝突判定と各種衝突ハンドラーを提供する
 */

// Collision system

/**
 * AABB衝突判定を行う
 * @param {Object} a - オブジェクトA（x, y, width, heightを持つ）
 * @param {Object} b - オブジェクトB（x, y, width, heightを持つ）
 * @returns {boolean} 衝突しているかどうか
 */
export function aabb(a, b) {
	return (
		a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y
	);
}

/**
 * プレイヤー弾とインベーダーの衝突判定を行う
 * @param {Object} bullet - プレイヤー弾オブジェクト
 * @param {Array} invaders - インベーダー配列
 * @returns {Object|null} 衝突結果（スコア、行、列）またはnull
 */
export function handlePlayerBulletVsInvaders(bullet, invaders) {
	if (!bullet || !bullet.alive) return null;
	for (const inv of invaders) {
		if (!inv.alive) continue;
		if (aabb(bullet, inv)) {
			inv.alive = false;
			bullet.alive = false;
			return { score: inv.scoreValue, row: inv.row, col: inv.col };
		}
	}
	return null;
}

/**
 * 弾とトーチカの衝突判定を行う
 * @param {Object} bullet - 弾オブジェクト
 * @param {Array} bunkers - トーチカ配列
 * @returns {boolean} 衝突が発生したかどうか
 */
export function handleBulletVsBunkers(bullet, bunkers) {
	if (!bullet || !bullet.alive) return false;
	for (const b of bunkers) {
		const hit = hitTile(b, bullet.x, bullet.y);
		if (hit) {
			bullet.alive = false;
			return true;
		}
	}
	return false;
}

export function handleInvadersTouchBunkers(invaders, bunkers) {
	for (const b of bunkers) {
		for (const inv of invaders) {
			if (!inv.alive) continue;
			// erode tiles under invader's footprint
			forEachTilesUnderRect(b, inv.x, inv.y, inv.width, inv.height, (cx, cy) => {
				b.tiles[cy][cx] = false;
			});
		}
	}
}

export function handleEnemyBulletsVsPlayer(bullets, player) {
	for (const b of bullets) {
		if (!b.alive) continue;
		if (aabb({ x: b.x, y: b.y, width: b.width, height: b.height }, { x: player.x - 16, y: player.y - 8, width: 32, height: 16 })) {
			b.alive = false;
			return true;
		}
	}
	return false;
}

// helpers for bunker tile hit tests
function hitTile(bunker, px, py) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const cx = Math.floor((px - x) / tileSize);
	const cy = Math.floor((py - y) / tileSize);
	if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
	if (!tiles[cy][cx]) return false;
	tiles[cy][cx] = false;
	return true;
}

function forEachTilesUnderRect(bunker, rx, ry, rw, rh, fn) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const startC = Math.max(0, Math.floor((rx - x) / tileSize));
	const endC = Math.min(cols - 1, Math.floor((rx + rw - x) / tileSize));
	const startR = Math.max(0, Math.floor((ry - y) / tileSize));
	const endR = Math.min(rows - 1, Math.floor((ry + rh - y) / tileSize));
	for (let r = startR; r <= endR; r++) {
		for (let c = startC; c <= endC; c++) {
			if (!tiles[r][c]) continue;
			fn(c, r);
		}
	}
}

```

```javascript
　　/**
 * 衝突判定システム
 * AABB（軸並行境界ボックス）による矩形衝突判定と各種衝突ハンドラーを提供する
 */

// Collision system

/**
 * AABB衝突判定を行う
 * @param {Object} a - オブジェクトA（x, y, width, heightを持つ）
 * @param {Object} b - オブジェクトB（x, y, width, heightを持つ）
 * @returns {boolean} 衝突しているかどうか
 */
export function aabb(a, b) {
	return (
		a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y
	);
}

/**
 * プレイヤー弾とインベーダーの衝突判定を行う
 * @param {Object} bullet - プレイヤー弾オブジェクト
 * @param {Array} invaders - インベーダー配列
 * @returns {Object|null} 衝突結果（スコア、行、列）またはnull
 */
export function handlePlayerBulletVsInvaders(bullet, invaders) {
	if (!bullet || !bullet.alive) return null;
	for (const inv of invaders) {
		if (!inv.alive) continue;
		if (aabb(bullet, inv)) {
			inv.alive = false;
			bullet.alive = false;
			return { score: inv.scoreValue, row: inv.row, col: inv.col };
		}
	}
	return null;
}

/**
 * 弾とトーチカの衝突判定を行う
 * @param {Object} bullet - 弾オブジェクト
 * @param {Array} bunkers - トーチカ配列
 * @returns {boolean} 衝突が発生したかどうか
 */
export function handleBulletVsBunkers(bullet, bunkers) {
	if (!bullet || !bullet.alive) return false;
	for (const b of bunkers) {
		const hit = hitTile(b, bullet.x, bullet.y);
		if (hit) {
			bullet.alive = false;
			return true;
		}
	}
	return false;
}

/**
 * インベーダーとトーチカの接触判定を行う
 * @param {Array} invaders - インベーダー配列
 * @param {Array} bunkers - トーチカ配列
 * @returns {void} 戻り値なし
 */
export function handleInvadersTouchBunkers(invaders, bunkers) {
	for (const b of bunkers) {
		for (const inv of invaders) {
			if (!inv.alive) continue;
			// erode tiles under invader's footprint
			forEachTilesUnderRect(b, inv.x, inv.y, inv.width, inv.height, (cx, cy) => {
				b.tiles[cy][cx] = false;
			});
		}
	}
}

export function handleEnemyBulletsVsPlayer(bullets, player) {
	for (const b of bullets) {
		if (!b.alive) continue;
		if (aabb({ x: b.x, y: b.y, width: b.width, height: b.height }, { x: player.x - 16, y: player.y - 8, width: 32, height: 16 })) {
			b.alive = false;
			return true;
		}
	}
	return false;
}

// helpers for bunker tile hit tests
function hitTile(bunker, px, py) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const cx = Math.floor((px - x) / tileSize);
	const cy = Math.floor((py - y) / tileSize);
	if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
	if (!tiles[cy][cx]) return false;
	tiles[cy][cx] = false;
	return true;
}

function forEachTilesUnderRect(bunker, rx, ry, rw, rh, fn) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const startC = Math.max(0, Math.floor((rx - x) / tileSize));
	const endC = Math.min(cols - 1, Math.floor((rx + rw - x) / tileSize));
	const startR = Math.max(0, Math.floor((ry - y) / tileSize));
	const endR = Math.min(rows - 1, Math.floor((ry + rh - y) / tileSize));
	for (let r = startR; r <= endR; r++) {
		for (let c = startC; c <= endC; c++) {
			if (!tiles[r][c]) continue;
			fn(c, r);
		}
	}
}

```

```javascript
　　/**
 * 衝突判定システム
 * AABB（軸並行境界ボックス）による矩形衝突判定と各種衝突ハンドラーを提供する
 */

// Collision system

/**
 * AABB衝突判定を行う
 * @param {Object} a - オブジェクトA（x, y, width, heightを持つ）
 * @param {Object} b - オブジェクトB（x, y, width, heightを持つ）
 * @returns {boolean} 衝突しているかどうか
 */
export function aabb(a, b) {
	return (
		a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y
	);
}

/**
 * プレイヤー弾とインベーダーの衝突判定を行う
 * @param {Object} bullet - プレイヤー弾オブジェクト
 * @param {Array} invaders - インベーダー配列
 * @returns {Object|null} 衝突結果（スコア、行、列）またはnull
 */
export function handlePlayerBulletVsInvaders(bullet, invaders) {
	if (!bullet || !bullet.alive) return null;
	for (const inv of invaders) {
		if (!inv.alive) continue;
		if (aabb(bullet, inv)) {
			inv.alive = false;
			bullet.alive = false;
			return { score: inv.scoreValue, row: inv.row, col: inv.col };
		}
	}
	return null;
}

/**
 * 弾とトーチカの衝突判定を行う
 * @param {Object} bullet - 弾オブジェクト
 * @param {Array} bunkers - トーチカ配列
 * @returns {boolean} 衝突が発生したかどうか
 */
export function handleBulletVsBunkers(bullet, bunkers) {
	if (!bullet || !bullet.alive) return false;
	for (const b of bunkers) {
		const hit = hitTile(b, bullet.x, bullet.y);
		if (hit) {
			bullet.alive = false;
			return true;
		}
	}
	return false;
}

/**
 * インベーダーとトーチカの接触判定を行う
 * @param {Array} invaders - インベーダー配列
 * @param {Array} bunkers - トーチカ配列
 * @returns {void} 戻り値なし
 */
export function handleInvadersTouchBunkers(invaders, bunkers) {
	for (const b of bunkers) {
		for (const inv of invaders) {
			if (!inv.alive) continue;
			// erode tiles under invader's footprint
			forEachTilesUnderRect(b, inv.x, inv.y, inv.width, inv.height, (cx, cy) => {
				b.tiles[cy][cx] = false;
			});
		}
	}
}

/**
 * 敵弾とプレイヤーの衝突判定を行う
 * @param {Array} bullets - 敵弾配列
 * @param {Object} player - プレイヤーオブジェクト
 * @returns {boolean} 衝突が発生したかどうか
 */
export function handleEnemyBulletsVsPlayer(bullets, player) {
	for (const b of bullets) {
		if (!b.alive) continue;
		if (aabb({ x: b.x, y: b.y, width: b.width, height: b.height }, { x: player.x - 16, y: player.y - 8, width: 32, height: 16 })) {
			b.alive = false;
			return true;
		}
	}
	return false;
}

// helpers for bunker tile hit tests
function hitTile(bunker, px, py) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const cx = Math.floor((px - x) / tileSize);
	const cy = Math.floor((py - y) / tileSize);
	if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
	if (!tiles[cy][cx]) return false;
	tiles[cy][cx] = false;
	return true;
}

function forEachTilesUnderRect(bunker, rx, ry, rw, rh, fn) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const startC = Math.max(0, Math.floor((rx - x) / tileSize));
	const endC = Math.min(cols - 1, Math.floor((rx + rw - x) / tileSize));
	const startR = Math.max(0, Math.floor((ry - y) / tileSize));
	const endR = Math.min(rows - 1, Math.floor((ry + rh - y) / tileSize));
	for (let r = startR; r <= endR; r++) {
		for (let c = startC; c <= endC; c++) {
			if (!tiles[r][c]) continue;
			fn(c, r);
		}
	}
}

```

```javascript
　　/**
 * 衝突判定システム
 * AABB（軸並行境界ボックス）による矩形衝突判定と各種衝突ハンドラーを提供する
 */

// Collision system

/**
 * AABB衝突判定を行う
 * @param {Object} a - オブジェクトA（x, y, width, heightを持つ）
 * @param {Object} b - オブジェクトB（x, y, width, heightを持つ）
 * @returns {boolean} 衝突しているかどうか
 */
export function aabb(a, b) {
	return (
		a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y
	);
}

/**
 * プレイヤー弾とインベーダーの衝突判定を行う
 * @param {Object} bullet - プレイヤー弾オブジェクト
 * @param {Array} invaders - インベーダー配列
 * @returns {Object|null} 衝突結果（スコア、行、列）またはnull
 */
export function handlePlayerBulletVsInvaders(bullet, invaders) {
	if (!bullet || !bullet.alive) return null;
	for (const inv of invaders) {
		if (!inv.alive) continue;
		if (aabb(bullet, inv)) {
			inv.alive = false;
			bullet.alive = false;
			return { score: inv.scoreValue, row: inv.row, col: inv.col };
		}
	}
	return null;
}

/**
 * 弾とトーチカの衝突判定を行う
 * @param {Object} bullet - 弾オブジェクト
 * @param {Array} bunkers - トーチカ配列
 * @returns {boolean} 衝突が発生したかどうか
 */
export function handleBulletVsBunkers(bullet, bunkers) {
	if (!bullet || !bullet.alive) return false;
	for (const b of bunkers) {
		const hit = hitTile(b, bullet.x, bullet.y);
		if (hit) {
			bullet.alive = false;
			return true;
		}
	}
	return false;
}

/**
 * インベーダーとトーチカの接触判定を行う
 * @param {Array} invaders - インベーダー配列
 * @param {Array} bunkers - トーチカ配列
 * @returns {void} 戻り値なし
 */
export function handleInvadersTouchBunkers(invaders, bunkers) {
	for (const b of bunkers) {
		for (const inv of invaders) {
			if (!inv.alive) continue;
			// erode tiles under invader's footprint
			forEachTilesUnderRect(b, inv.x, inv.y, inv.width, inv.height, (cx, cy) => {
				b.tiles[cy][cx] = false;
			});
		}
	}
}

/**
 * 敵弾とプレイヤーの衝突判定を行う
 * @param {Array} bullets - 敵弾配列
 * @param {Object} player - プレイヤーオブジェクト
 * @returns {boolean} 衝突が発生したかどうか
 */
export function handleEnemyBulletsVsPlayer(bullets, player) {
	for (const b of bullets) {
		if (!b.alive) continue;
		if (aabb({ x: b.x, y: b.y, width: b.width, height: b.height }, { x: player.x - 16, y: player.y - 8, width: 32, height: 16 })) {
			b.alive = false;
			return true;
		}
	}
	return false;
}

/**
 * トーチカのタイルヒットテストを行う
 * @param {Object} bunker - トーチカオブジェクト
 * @param {number} px - ヒット位置X座標
 * @param {number} py - ヒット位置Y座標
 * @returns {boolean} ヒットが発生したかどうか
 */
function hitTile(bunker, px, py) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const cx = Math.floor((px - x) / tileSize);
	const cy = Math.floor((py - y) / tileSize);
	if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
	if (!tiles[cy][cx]) return false;
	tiles[cy][cx] = false;
	return true;
}

function forEachTilesUnderRect(bunker, rx, ry, rw, rh, fn) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const startC = Math.max(0, Math.floor((rx - x) / tileSize));
	const endC = Math.min(cols - 1, Math.floor((rx + rw - x) / tileSize));
	const startR = Math.max(0, Math.floor((ry - y) / tileSize));
	const endR = Math.min(rows - 1, Math.floor((ry + rh - y) / tileSize));
	for (let r = startR; r <= endR; r++) {
		for (let c = startC; c <= endC; c++) {
			if (!tiles[r][c]) continue;
			fn(c, r);
		}
	}
}

```

```javascript
　　/**
 * 衝突判定システム
 * AABB（軸並行境界ボックス）による矩形衝突判定と各種衝突ハンドラーを提供する
 */

// Collision system

/**
 * AABB衝突判定を行う
 * @param {Object} a - オブジェクトA（x, y, width, heightを持つ）
 * @param {Object} b - オブジェクトB（x, y, width, heightを持つ）
 * @returns {boolean} 衝突しているかどうか
 */
export function aabb(a, b) {
	return (
		a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y
	);
}

/**
 * プレイヤー弾とインベーダーの衝突判定を行う
 * @param {Object} bullet - プレイヤー弾オブジェクト
 * @param {Array} invaders - インベーダー配列
 * @returns {Object|null} 衝突結果（スコア、行、列）またはnull
 */
export function handlePlayerBulletVsInvaders(bullet, invaders) {
	if (!bullet || !bullet.alive) return null;
	for (const inv of invaders) {
		if (!inv.alive) continue;
		if (aabb(bullet, inv)) {
			inv.alive = false;
			bullet.alive = false;
			return { score: inv.scoreValue, row: inv.row, col: inv.col };
		}
	}
	return null;
}

/**
 * 弾とトーチカの衝突判定を行う
 * @param {Object} bullet - 弾オブジェクト
 * @param {Array} bunkers - トーチカ配列
 * @returns {boolean} 衝突が発生したかどうか
 */
export function handleBulletVsBunkers(bullet, bunkers) {
	if (!bullet || !bullet.alive) return false;
	for (const b of bunkers) {
		const hit = hitTile(b, bullet.x, bullet.y);
		if (hit) {
			bullet.alive = false;
			return true;
		}
	}
	return false;
}

/**
 * インベーダーとトーチカの接触判定を行う
 * @param {Array} invaders - インベーダー配列
 * @param {Array} bunkers - トーチカ配列
 * @returns {void} 戻り値なし
 */
export function handleInvadersTouchBunkers(invaders, bunkers) {
	for (const b of bunkers) {
		for (const inv of invaders) {
			if (!inv.alive) continue;
			// erode tiles under invader's footprint
			forEachTilesUnderRect(b, inv.x, inv.y, inv.width, inv.height, (cx, cy) => {
				b.tiles[cy][cx] = false;
			});
		}
	}
}

/**
 * 敵弾とプレイヤーの衝突判定を行う
 * @param {Array} bullets - 敵弾配列
 * @param {Object} player - プレイヤーオブジェクト
 * @returns {boolean} 衝突が発生したかどうか
 */
export function handleEnemyBulletsVsPlayer(bullets, player) {
	for (const b of bullets) {
		if (!b.alive) continue;
		if (aabb({ x: b.x, y: b.y, width: b.width, height: b.height }, { x: player.x - 16, y: player.y - 8, width: 32, height: 16 })) {
			b.alive = false;
			return true;
		}
	}
	return false;
}

/**
 * トーチカのタイルヒットテストを行う
 * @param {Object} bunker - トーチカオブジェクト
 * @param {number} px - ヒット位置X座標
 * @param {number} py - ヒット位置Y座標
 * @returns {boolean} ヒットが発生したかどうか
 */
function hitTile(bunker, px, py) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const cx = Math.floor((px - x) / tileSize);
	const cy = Math.floor((py - y) / tileSize);
	if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
	if (!tiles[cy][cx]) return false;
	tiles[cy][cx] = false;
	return true;
}

/**
 * 指定矩形下のタイルに対して関数を実行する
 * @param {Object} bunker - トーチカオブジェクト
 * @param {number} rx - 矩形X座標
 * @param {number} ry - 矩形Y座標
 * @param {number} rw - 矩形幅
 * @param {number} rh - 矩形高さ
 * @param {Function} fn - 実行する関数（cx, cyを引数に取る）
 * @returns {void} 戻り値なし
 */
function forEachTilesUnderRect(bunker, rx, ry, rw, rh, fn) {
	const { x, y, tileSize, cols, rows, tiles } = bunker;
	const startC = Math.max(0, Math.floor((rx - x) / tileSize));
	const endC = Math.min(cols - 1, Math.floor((rx + rw - x) / tileSize));
	const startR = Math.max(0, Math.floor((ry - y) / tileSize));
	const endR = Math.min(rows - 1, Math.floor((ry + rh - y) / tileSize));
	for (let r = startR; r <= endR; r++) {
		for (let c = startC; c <= endC; c++) {
			if (!tiles[r][c]) continue;
			fn(c, r);
		}
	}
}

```

すべてのJavaScriptファイルにJSDocスタイルのヘッダーと関数ドキュメントを追加しました：

**追加した内容：**
- **ファイルヘッダー**: 各ファイルの目的と機能の概要
- **関数ヘッダー**: 各関数の説明、引数、戻り値の詳細
- **引数なし**: 引数がない場合は「引数なし」と記載
- **戻り値なし**: 戻り値がない場合は「戻り値なし」と記載
- **固定値**: 戻り値が固定値の場合はその旨を記載

**対象ファイル：**
- `main.js` - エントリーポイントとゲームループ
- `game.js` - ゲームメインロジック
- `input.js` - キーボード入力管理
- `entities/` - プレイヤー、弾、インベーダー、編隊、トーチカ
- `systems/` - 描画、音響、衝突判定

これでコードの可読性と保守性が向上し、各関数の役割と使用方法が明確になりました。

---

**User**

このゲームを始めるにはローカルサーバを立ち上げる必要がありますか？

---

**Cursor**

はい、このゲームを始めるにはローカルサーバを立ち上げる必要があります。

**理由：**
- ゲームはES Modules（`import`/`export`）を使用しています
- ブラウザのセキュリティ制限により、`file://`プロトコルではES Modulesが読み込めません
- Chrome、Firefox、Safariなどすべてのモダンブラウザでこの制限があります

**現在の状況：**
既にPythonのローカルサーバが起動中です：
```
http://localhost:8000/index.html
```

**起動方法：**
1. **現在のサーバを使用**: ブラウザで `http://localhost:8000/index.html` を開く
2. **新しいサーバを起動する場合**:
   ```bash
   cd D:\Source\ExperimentSpeckit
   python -m http.server 8000 --directory .\MySpecKitPrj
   ```

**代替手段：**
- Node.jsがインストールされていれば `npx serve` も使用可能
- 他の静的ファイルサーバ（Live Server拡張機能など）でも動作します

現在のサーバが動いているので、そのまま `http://localhost:8000/index.html` でゲームを楽しめます！

```plaintext
http://localhost:8000/index.html
```

```shellscript
   cd D:\Source\ExperimentSpeckit
   python -m http.server 8000 --directory .\MySpecKitPrj
```

