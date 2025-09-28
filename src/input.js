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
