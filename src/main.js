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
