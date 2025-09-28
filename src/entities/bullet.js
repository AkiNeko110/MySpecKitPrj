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
