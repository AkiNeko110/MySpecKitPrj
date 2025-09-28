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
