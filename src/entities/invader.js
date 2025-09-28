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
