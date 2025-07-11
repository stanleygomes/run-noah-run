// Controlador responsável por gerenciar obstáculos (ex-cactos) no jogo
import Obstacle from "./Obstacle.js";

/**
 * Controla a geração, atualização, desenho e colisão dos obstáculos
 */
export default class ObstacleController {
  // Intervalo mínimo e máximo entre obstáculos
  OBSTACLE_INTERVAL_MIN = 500;
  OBSTACLE_INTERVAL_MAX = 2000;

  // Tempo até o próximo obstáculo
  nextObstacleInterval = null;
  // Lista de obstáculos ativos
  obstacles = [];

  /**
   * @param {CanvasRenderingContext2D} ctx - Contexto do canvas
   * @param {Array} cactiImages - Array de imagens e dimensões dos obstáculos
   * @param {number} scaleRatio - Fator de escala do jogo
   * @param {number} speed - Velocidade base dos obstáculos
   */
  constructor(ctx, obstacleImages, scaleRatio, speed) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.obstacleImages = obstacleImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;

    // Inicializa o tempo para o próximo obstáculo
    this.setNextObstacleTime();
  }

  /**
   * Define o tempo até o próximo obstáculo
   */
  setNextObstacleTime() {
    const num = this.getRandomNumber(
      this.OBSTACLE_INTERVAL_MIN,
      this.OBSTACLE_INTERVAL_MAX
    );
    this.nextObstacleInterval = num;
  }

  /**
   * Retorna um número aleatório entre min e max (inclusive)
   */
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Cria um novo obstáculo e adiciona à lista
   */
  createObstacle() {
    const index = this.getRandomNumber(0, this.obstacleImages.length - 1);
    const obstacleImage = this.obstacleImages[index];
    const x = this.canvas.width * 1.5;
    const y = this.canvas.height - obstacleImage.height;
    const obstacle = new Obstacle(
      this.ctx,
      x,
      y,
      obstacleImage.width,
      obstacleImage.height,
      obstacleImage.image
    );
    this.obstacles.push(obstacle);
  }

  /**
   * Atualiza todos os obstáculos e gerencia o tempo de criação
   * @param {number} gameSpeed - Velocidade do jogo
   * @param {number} frameTimeDelta - Delta de tempo do frame
   */
  update(gameSpeed, frameTimeDelta) {
    if (this.nextObstacleInterval <= 0) {
      this.createObstacle();
      this.setNextObstacleTime();
    }
    this.nextObstacleInterval -= frameTimeDelta;

    // Atualiza posição de todos os obstáculos
    this.obstacles.forEach((obstacle) => {
      obstacle.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
    });

    // Remove obstáculos que já saíram da tela
    this.obstacles = this.obstacles.filter((obstacle) => obstacle.x > -obstacle.width);
  }

  /**
   * Desenha todos os obstáculos no canvas
   */
  draw() {
    this.obstacles.forEach((obstacle) => obstacle.draw());
  }

  /**
   * Verifica se algum obstáculo colidiu com o sprite informado
   * @param {Object} sprite - Objeto do jogador
   * @returns {boolean} - true se houver colisão
   */
  collideWith(sprite) {
    return this.obstacles.some((obstacle) => obstacle.collideWith(sprite));
  }

  /**
   * Remove todos os obstáculos (reset do jogo)
   */
  reset() {
    this.obstacles = [];
  }
}
