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
