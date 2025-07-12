// Classe responsável pelo jogador (personagem principal)
import { assets } from "../config.js";

export default class Player {
  // Tempo entre frames da animação de corrida
  WALK_ANIMATION_TIMER = 200;
  walkAnimationTimer = this.WALK_ANIMATION_TIMER;
  // Imagens de animação de corrida
  playerRunImages = [];

  // Controle de pulo
  jumpPressed = false;
  jumpInProgress = false;
  falling = false;
  // Velocidade do pulo
  JUMP_SPEED = 0.6;
  // Gravidade aplicada ao personagem
  GRAVITY = 0.4;

  /**
   * @param {CanvasRenderingContext2D} ctx - Contexto do canvas
   * @param {number} width - Largura do personagem
   * @param {number} height - Altura do personagem
   * @param {number} minJumpHeight - Altura mínima do pulo
   * @param {number} maxJumpHeight - Altura máxima do pulo
   * @param {number} scaleRatio - Fator de escala do jogo
   */
  constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.minJumpHeight = minJumpHeight;
    this.maxJumpHeight = maxJumpHeight;
    this.scaleRatio = scaleRatio;

    // Posição inicial do personagem
    this.x = 10 * scaleRatio;
    this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
    this.yStandingPosition = this.y;

    // Imagem do personagem parado
    this.standingStillImage = new Image();
    this.standingStillImage.src = assets.images.player;
    this.image = this.standingStillImage;

    // Imagem do personagem no Game Over
    this.gameOverImage = new Image();
    this.gameOverImage.src = assets.images.playerGameOver;

    // Estado do jogo
    this.isGameOver = false;

    // Imagens de animação de corrida
    const playerRunImage1 = new Image();
    playerRunImage1.src = assets.images.playerRun1;
    const playerRunImage2 = new Image();
    playerRunImage2.src = assets.images.playerRun2;
    this.playerRunImages.push(playerRunImage1);
    this.playerRunImages.push(playerRunImage2);

    //keyboard
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('keyup', this.keyup);

    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);

    //touch
    window.removeEventListener('touchstart', this.touchstart);
    window.removeEventListener('touchend', this.touchend);

    window.addEventListener('touchstart', this.touchstart);
    window.addEventListener('touchend', this.touchend);
  }

  /**
   * Evento de toque para iniciar o pulo
   */
  touchstart = () => {
    this.jumpPressed = true;
  };

  /**
   * Evento de toque para finalizar o pulo
   */
  touchend = () => {
    this.jumpPressed = false;
  };

  /**
   * Evento de teclado para iniciar o pulo
   */
  keydown = (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      this.jumpPressed = true;
    }
  };

  /**
   * Evento de teclado para finalizar o pulo
   */
  keyup = (event) => {
    if (event.code === "Space") {
      this.jumpPressed = false;
    }
  };

  /**
   * Atualiza o estado do personagem (corrida e pulo)
   * @param {number} gameSpeed - Velocidade do jogo
   * @param {number} frameTimeDelta - Delta de tempo do frame
   */
  update(gameSpeed, frameTimeDelta) {
    if (!this.isGameOver) {
      this.run(gameSpeed, frameTimeDelta);

      if (this.jumpInProgress) {
        this.image = this.standingStillImage;
      }

      this.jump(frameTimeDelta);
    }
  }

  /**
   * Lógica de pulo do personagem
   * @param {number} frameTimeDelta - Delta de tempo do frame
   */
  jump(frameTimeDelta) {
    if (this.jumpPressed) {
      this.jumpInProgress = true;
    }

    if (this.jumpInProgress && !this.falling) {
      // Sobe até atingir a altura mínima ou máxima
      if (
        this.y > this.canvas.height - this.minJumpHeight ||
        (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)
      ) {
        this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
      } else {
        this.falling = true;
      }
    } else {
      // Desce até voltar à posição inicial
      if (this.y < this.yStandingPosition) {
        this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
        if (this.y + this.height > this.canvas.height) {
          this.y = this.yStandingPosition;
        }
      } else {
        this.falling = false;
        this.jumpInProgress = false;
      }
    }
  }

  /**
   * Lógica de animação de corrida do personagem
   * @param {number} gameSpeed - Velocidade do jogo
   * @param {number} frameTimeDelta - Delta de tempo do frame
   */
  run(gameSpeed, frameTimeDelta) {
    if (this.walkAnimationTimer <= 0) {
      // Alterna entre as imagens de corrida
      if (this.image === this.playerRunImages[0]) {
        this.image = this.playerRunImages[1];
      } else {
        this.image = this.playerRunImages[0];
      }
      this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    }
    this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
  }

  /**
   * Define o estado de Game Over para o personagem
   */
  setGameOver() {
    this.isGameOver = true;
    this.image = this.gameOverImage;
  }

  /**
   * Reseta o estado do personagem para o início do jogo
   */
  reset() {
    this.isGameOver = false;
    this.image = this.standingStillImage;
    this.y = this.yStandingPosition;
    this.jumpInProgress = false;
    this.falling = false;
    this.jumpPressed = false;
  }

  /**
   * Desenha o personagem no canvas
   */
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
