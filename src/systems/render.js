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
