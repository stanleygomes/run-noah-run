// Classe responsável por desenhar, movimentar e detectar colisão de obstáculos
export default class Obstacle {
  /**
   * @param {CanvasRenderingContext2D} ctx - Contexto do canvas
   * @param {number} x - Posição X inicial do obstáculo
   * @param {number} y - Posição Y inicial do obstáculo
   * @param {number} width - Largura do obstáculo
   * @param {number} height - Altura do obstáculo
   * @param {Image} image - Imagem do obstáculo
   */
  constructor(ctx, x, y, width, height, image) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  /**
   * Atualiza a posição do obstáculo conforme a velocidade do jogo
   * @param {number} speed - Velocidade base do obstáculo
   * @param {number} gameSpeed - Velocidade do jogo
   * @param {number} frameTimeDelta - Delta de tempo do frame
   * @param {number} scaleRatio - Fator de escala
   */
  update(speed, gameSpeed, frameTimeDelta, scaleRatio) {
    // Move o obstáculo para a esquerda simulando movimento
    this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;
  }

  /**
   * Desenha o obstáculo no canvas
   */
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /**
   * Verifica colisão entre o obstáculo e outro sprite (ex: jogador)
   * @param {Object} sprite - Objeto com propriedades x, y, width, height
   * @returns {boolean} - true se houver colisão
   */
  collideWith(sprite) {
    const adjustBy = 1.4; // Ajuste para tornar a colisão mais justa
    if (
      sprite.x < this.x + this.width / adjustBy &&
      sprite.x + sprite.width / adjustBy > this.x &&
      sprite.y < this.y + this.height / adjustBy &&
      sprite.height + sprite.y / adjustBy > this.y
    ) {
      return true;
    } else {
      return false;
    }
  }
}
