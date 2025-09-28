/**
 * ゲームメインロジック
 * ゲーム状態管理、エンティティ更新、衝突判定、描画処理を統合する
 */

// Game skeleton with state, update, and render
import { createInput } from './input.js';
import { createRenderer } from './systems/render.js';
import { createPlayer, updatePlayer, canFire, onFired } from './entities/player.js';
import { createBullet, updateBullet, createEnemyBullet } from './entities/bullet.js';
import { createInvader } from './entities/invader.js';
import { createFormation, updateFormation } from './entities/formation.js';
import { handlePlayerBulletVsInvaders, handleBulletVsBunkers, handleInvadersTouchBunkers, handleEnemyBulletsVsPlayer } from './systems/collision.js';
import { createBunker, drawBunker } from './entities/bunker.js';
import { createAudio } from './systems/audio.js';

/**
 * ゲームオブジェクトを作成する
 * @param {HTMLCanvasElement} canvas - Canvas要素
 * @param {CanvasRenderingContext2D} ctx - Canvas 2Dコンテキスト
 * @returns {Object} ゲーム制御メソッドを含むオブジェクト
 * @returns {Function} returns.init - ゲーム初期化
 * @returns {Function} returns.update - ゲーム更新
 * @returns {Function} returns.render - ゲーム描画
 */
export function createGame(canvas, ctx) {
	const input = createInput();
	const render = createRenderer(ctx, canvas.width, canvas.height);
	const audio = createAudio();

	const invaders = [];
	const bunkers = [];
	const enemyBullets = [];
	const formation = createFormation(canvas.width);
	const flashes = []; // simple hit flashes {x,y,t}

	const state = {
		lives: 3,
		score: 0,
		mode: 'PLAY', // PLAY | CLEAR | OVER
		player: createPlayer(canvas.width / 2, canvas.height - 40),
		enemyFireCooldown: 0,
	};

	/**
	 * インベーダーを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnInvaders() {
		invaders.length = 0;
		const rows = 5, cols = 11;
		const startX = 100, startY = 80, gapX = 48, gapY = 34;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + c * gapX;
				const y = startY + r * gapY;
				invaders.push(createInvader(r, c, x, y));
			}
		}
	}

	/**
	 * トーチカを初期配置する
	 * @returns {void} 戻り値なし
	 */
	function spawnBunkers() {
		bunkers.length = 0;
		const y = canvas.height - 140;
		const positions = [160, 320, 480, 640];
		for (const x of positions) bunkers.push(createBunker(x - 36, y));
	}

	/**
	 * ゲームをリセットする
	 * @returns {void} 戻り値なし
	 */
	function resetGame() {
		state.lives = 3;
		state.score = 0;
		state.mode = 'PLAY';
		state.player.x = canvas.width / 2;
		enemyBullets.length = 0;
		spawnInvaders();
		spawnBunkers();
	}

	/**
	 * ゲームを初期化する
	 * @returns {void} 戻り値なし
	 */
	function init() {
		spawnInvaders();
		spawnBunkers();
		window.addEventListener('keydown', (e) => {
			if (e.code === 'KeyM') audio.muteToggle();
			if ((state.mode === 'OVER' || state.mode === 'CLEAR') && e.code === 'Enter') resetGame();
		});
	}

	/**
	 * ゲーム状態を更新する
	 * @param {number} dt - 前フレームからの経過時間（秒）
	 * @returns {void} 戻り値なし
	 */
	function update(dt) {
		if (state.mode !== 'PLAY') return;
		updatePlayer(state.player, dt, input, canvas.width);

		// fire handling (single shot)
		if (input.consumeFireEdge && input.consumeFireEdge()) {
			if (canFire(state.player)) {
				state.player.bullet = createBullet(state.player.x - 1, state.player.y - 12, -400, 'player');
				onFired(state.player);
				audio.shoot();
			}
		}
		// update player bullet
		if (state.player.bullet) {
			updateBullet(state.player.bullet, dt, canvas.height);
			// bullet vs bunkers
			if (state.player.bullet && state.player.bullet.alive) {
				if (handleBulletVsBunkers(state.player.bullet, bunkers)) flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
			}
			if (!state.player.bullet.alive) state.player.bullet = null;
		}

		updateFormation(formation, invaders, dt, canvas.width);
		handleInvadersTouchBunkers(invaders, bunkers);

		// enemy fire pattern: random alive bottom of column at interval
		state.enemyFireCooldown -= dt;
		if (state.enemyFireCooldown <= 0) {
			state.enemyFireCooldown = Math.max(0.3, 1.2 - (55 - formation.aliveCount) * 0.01);
			// choose random column with alive invaders, fire from the lowest one
			const aliveByCol = new Map();
			for (const inv of invaders) {
				if (!inv.alive) continue;
				const cur = aliveByCol.get(inv.col);
				if (!cur || inv.y > cur.y) aliveByCol.set(inv.col, inv);
			}
			const cols = Array.from(aliveByCol.keys());
			if (cols.length > 0) {
				const col = cols[Math.floor(Math.random() * cols.length)];
				const shooter = aliveByCol.get(col);
				enemyBullets.push(createEnemyBullet(shooter.x + shooter.width / 2 - 1, shooter.y + shooter.height + 2));
			}
		}

		// update enemy bullets
		for (const b of enemyBullets) {
			if (!b.alive) continue;
			updateBullet(b, dt, canvas.height);
			if (b.alive) {
				if (handleBulletVsBunkers(b, bunkers)) flashes.push({ x: b.x, y: b.y, t: 0.12 });
			}
		}
		// remove dead bullets
		for (let i = enemyBullets.length - 1; i >= 0; i--) if (!enemyBullets[i].alive) enemyBullets.splice(i, 1);

		// collisions: player bullet vs invaders
		if (state.player.bullet) {
			const hit = handlePlayerBulletVsInvaders(state.player.bullet, invaders);
			if (hit) {
				state.score += hit.score;
				flashes.push({ x: state.player.bullet.x, y: state.player.bullet.y, t: 0.12 });
				audio.explode();
				state.player.bullet = null;
			}
		}

		// enemy bullets vs player
		if (handleEnemyBulletsVsPlayer(enemyBullets, state.player)) {
			state.lives -= 1;
			audio.explode();
			if (state.lives <= 0) {
				state.mode = 'OVER';
				audio.gameOver();
			} else {
				// simple respawn: clear bullets and reset player position
				enemyBullets.length = 0;
				state.player.x = canvas.width / 2;
			}
		}

		// win condition: all dead
		const anyAlive = invaders.some(v => v.alive);
		if (!anyAlive) {
			state.mode = 'CLEAR';
			audio.clear();
		}

		// lose condition: any invader reaches player y (occupation)
		if (invaders.some(v => v.alive && v.y + v.height >= state.player.y)) {
			state.mode = 'OVER';
			audio.gameOver();
		}

		// update flashes
		for (let i = flashes.length - 1; i >= 0; i--) {
			flashes[i].t -= dt;
			if (flashes[i].t <= 0) flashes.splice(i, 1);
		}
	}

	/**
	 * HUD（ヘッドアップディスプレイ）を描画する
	 * @returns {void} 戻り値なし
	 */
	function renderHud() {
		render.text(`SCORE: ${state.score}`, 12, 20, '#0f0');
		render.text(`LIVES: ${state.lives}`, 788, 20, '#0f0', 'right');
		if (state.mode === 'OVER') {
			render.text('GAME OVER', 400, 280, '#f33', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		if (state.mode === 'CLEAR') {
			render.text('CLEAR!', 400, 280, '#3f3', 'center');
			render.text('Press Enter to Restart', 400, 310, '#bbb', 'center');
		}
		const muteMsg = '(M)ute: ' + (audio.isMuted() ? 'ON' : 'OFF');
		render.text(muteMsg, 788, 580, '#888', 'right');
	}

	/**
	 * ゲームエンティティを描画する
	 * @returns {void} 戻り値なし
	 */
	function renderEntities() {
		// player
		render.rect(state.player.x - 16, state.player.y - 8, 32, 16, '#0af');
		// player bullet
		if (state.player.bullet) render.rect(state.player.bullet.x, state.player.bullet.y, 2, 8, '#ff6');
		// enemy bullets
		for (const b of enemyBullets) render.rect(b.x, b.y, 2, 8, '#f66');
		// invaders
		for (const inv of invaders) {
			if (!inv.alive) continue;
			render.rect(inv.x, inv.y, inv.width, inv.height, '#8f8');
		}
		// bunkers
		for (const b of bunkers) drawBunker(render, b);
		// flashes
		for (const f of flashes) render.rect(f.x - 4, f.y - 4, 8, 8, '#fff');
	}

	/**
	 * ゲーム全体を描画する
	 * @returns {void} 戻り値なし
	 */
	function renderAll() {
		render.clear();
		renderHud();
		renderEntities();
	}

	return { init, update, render: renderAll };
}
