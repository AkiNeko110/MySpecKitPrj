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
