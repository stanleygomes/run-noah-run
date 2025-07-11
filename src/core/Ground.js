// Classe responsável por desenhar e movimentar o chão do jogo
import { assets } from "../config.js";

export default class Ground {
  /**
   * @param {CanvasRenderingContext2D} ctx - Contexto do canvas
   * @param {number} width - Largura do chão
   * @param {number} height - Altura do chão
   * @param {number} speed - Velocidade base do chão
   * @param {number} scaleRatio - Fator de escala para adaptação do canvas
   */
  constructor(ctx, width, height, speed, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.scaleRatio = scaleRatio;

    // Posição inicial do chão
    this.x = 0;
    // Posição Y: base do canvas menos a altura do chão
    this.y = this.canvas.height - this.height;

    // Imagem do chão
    this.groundImage = new Image();
    this.groundImage.src = assets.images.ground;
  }

  /**
   * Atualiza a posição do chão conforme a velocidade do jogo
   * @param {number} gameSpeed - Velocidade do jogo
   * @param {number} frameTimeDelta - Delta de tempo do frame
   */
  update(gameSpeed, frameTimeDelta) {
    // Move o chão para a esquerda simulando movimento
    this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio;
  }

  /**
   * Desenha o chão no canvas, duplicando a imagem para criar efeito de looping
   */
  draw() {
    // Desenha a imagem do chão na posição atual
    this.ctx.drawImage(
      this.groundImage,
      this.x,
      this.y,
      this.width,
      this.height
    );

    // Desenha uma segunda imagem ao lado para criar o efeito contínuo
    this.ctx.drawImage(
      this.groundImage,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );

    // Quando a imagem sair totalmente da tela, reinicia a posição
    if (this.x < -this.width) {
      this.x = 0;
    }
  }

  /**
   * Reseta a posição do chão para o início
   */
  reset() {
    this.x = 0;
  }
}
