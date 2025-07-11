// Arquivo principal do jogo Run Noah, Run
// Responsável por inicializar, configurar e executar o loop do jogo
import Player from "./core/Player.js";
import Ground from "./core/Ground.js";
import CactiController from "./core/ObstacleController.js";
import Score from "./core/Score.js";
import { assets } from "./config.js";

// Canvas e contexto 2D
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Constantes de configuração do jogo
const GAME_SPEED_START = 1; // Velocidade inicial do jogo
const GAME_SPEED_INCREMENT = 0.00001; // Incremento de velocidade por frame

const GAME_WIDTH = 800; // Largura do canvas
const GAME_HEIGHT = 200; // Altura do canvas
const PLAYER_WIDTH = 88 / 1.5; // Largura do personagem
const PLAYER_HEIGHT = 94 / 1.5; // Altura do personagem
const MAX_JUMP_HEIGHT = GAME_HEIGHT; // Altura máxima do pulo
const MIN_JUMP_HEIGHT = 150; // Altura mínima do pulo
const GROUND_WIDTH = 2400; // Largura do chão
const GROUND_HEIGHT = 24; // Altura do chão
const GROUND_AND_CACTUS_SPEED = 0.5; // Velocidade do chão e obstáculos

// Configuração dos obstáculos (cactos)
const CACTI_CONFIG = [
  { width: 48 / 1.5, height: 100 / 1.5, image: assets.images.obstacle1 },
  { width: 98 / 1.5, height: 100 / 1.5, image: assets.images.obstacle2 },
  { width: 68 / 1.5, height: 70 / 1.5, image: assets.images.obstacle3 },
];

// Objetos principais do jogo
let player = null;
let ground = null;
let cactiController = null;
let score = null;

// Variáveis de estado do jogo
let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingToStart = true;

/**
 * Cria e inicializa os sprites do jogo (player, chão, obstáculos, score)
 */
function createSprites() {
  // Calcula dimensões dos sprites com base no scaleRatio
  const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
  const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
  const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
  const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

  const groundWidthInGame = GROUND_WIDTH * scaleRatio;
  const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

  // Inicializa o jogador
  player = new Player(
    ctx,
    playerWidthInGame,
    playerHeightInGame,
    minJumpHeightInGame,
    maxJumpHeightInGame,
    scaleRatio
  );

  // Inicializa o chão
  ground = new Ground(
    ctx,
    groundWidthInGame,
    groundHeightInGame,
    GROUND_AND_CACTUS_SPEED,
    scaleRatio
  );

  // Inicializa os obstáculos
  const cactiImages = CACTI_CONFIG.map((cactus) => {
    const image = new Image();
    image.src = cactus.image;
    return {
      image: image,
      width: cactus.width * scaleRatio,
      height: cactus.height * scaleRatio,
    };
  });

  cactiController = new CactiController(
    ctx,
    cactiImages,
    scaleRatio,
    GROUND_AND_CACTUS_SPEED
  );

  // Inicializa o placar
  score = new Score(ctx, scaleRatio);
}

/**
 * Ajusta o tamanho do canvas e recria os sprites conforme o tamanho da tela
 */
function setScreen() {
  scaleRatio = getScaleRatio();
  canvas.width = GAME_WIDTH * scaleRatio;
  canvas.height = GAME_HEIGHT * scaleRatio;
  createSprites();
}

setScreen();
//Use setTimeout on Safari mobile rotation otherwise works fine on desktop
window.addEventListener("resize", () => setTimeout(setScreen, 500));

if (screen.orientation) {
  screen.orientation.addEventListener("change", setScreen);
}

/**
 * Calcula o fator de escala do canvas com base no tamanho da tela
 * @returns {number} scaleRatio
 */
function getScaleRatio() {
  const screenHeight = Math.min(
    window.innerHeight,
    document.documentElement.clientHeight
  );

  const screenWidth = Math.min(
    window.innerWidth,
    document.documentElement.clientWidth
  );

  // Se a janela for mais larga que o jogo, escala pela largura; senão, pela altura
  if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
    return screenWidth / GAME_WIDTH;
  } else {
    return screenHeight / GAME_HEIGHT;
  }
}

/**
 * Exibe a mensagem de Game Over na tela
 */
function showGameOver() {
  const fontSize = 70 * scaleRatio;
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = "grey";
  const x = canvas.width / 4.5;
  const y = canvas.height / 2;
  ctx.fillText("GAME OVER", x, y);
}

/**
 * Adiciona eventos para reiniciar o jogo após o Game Over
 */
function setupGameReset() {
  if (!hasAddedEventListenersForRestart) {
    hasAddedEventListenersForRestart = true;

    setTimeout(() => {
      window.addEventListener("keyup", reset, { once: true });
      window.addEventListener("touchstart", reset, { once: true });
    }, 1000);
  }
}

/**
 * Reseta o estado do jogo para iniciar uma nova partida
 */
function reset() {
  hasAddedEventListenersForRestart = false;
  gameOver = false;
  waitingToStart = false;
  ground.reset();
  cactiController.reset();
  score.reset();
  gameSpeed = GAME_SPEED_START;
}

/**
 * Exibe a mensagem de início do jogo na tela
 */
function showStartGameText() {
  const fontSize = 40 * scaleRatio;
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = "grey";
  const x = canvas.width / 14;
  const y = canvas.height / 2;
  ctx.fillText("Tap Screen or Press Space To Start", x, y);
}

/**
 * Atualiza a velocidade do jogo conforme o tempo
 * @param {number} frameTimeDelta
 */
function updateGameSpeed(frameTimeDelta) {
  gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
}

/**
 * Limpa o canvas para desenhar o próximo frame
 */
function clearScreen() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Loop principal do jogo: atualiza e desenha todos os objetos, gerencia estados
 * @param {number} currentTime - Timestamp do frame
 */
function gameLoop(currentTime) {
  if (previousTime === null) {
    previousTime = currentTime;
    requestAnimationFrame(gameLoop);
    return;
  }
  const frameTimeDelta = currentTime - previousTime;
  previousTime = currentTime;

  clearScreen();

  if (!gameOver && !waitingToStart) {
    // Atualiza objetos do jogo
    ground.update(gameSpeed, frameTimeDelta);
    cactiController.update(gameSpeed, frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta);
    score.update(frameTimeDelta);
    updateGameSpeed(frameTimeDelta);
  }

  // Verifica colisão entre player e obstáculos
  if (!gameOver && cactiController.collideWith(player)) {
    gameOver = true;
    setupGameReset();
    score.setHighScore();
  }

  // Desenha objetos do jogo
  ground.draw();
  cactiController.draw();
  player.draw();
  score.draw();

  if (gameOver) {
    showGameOver();
  }

  if (waitingToStart) {
    showStartGameText();
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener("keyup", reset, { once: true });
window.addEventListener("touchstart", reset, { once: true });
