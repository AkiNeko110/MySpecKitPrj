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
