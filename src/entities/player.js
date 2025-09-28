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
