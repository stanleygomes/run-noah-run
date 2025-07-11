// Classe responsável por gerenciar e desenhar a pontuação do jogador
export default class Score {
  // Pontuação atual
  score = 0;
  // Chave para armazenar o recorde no localStorage
  HIGH_SCORE_KEY = "highScore";

  /**
   * @param {CanvasRenderingContext2D} ctx - Contexto do canvas
   * @param {number} scaleRatio - Fator de escala para adaptação do canvas
   */
  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  /**
   * Atualiza a pontuação do jogador conforme o tempo de jogo
   * @param {number} frameTimeDelta - Delta de tempo do frame
   */
  update(frameTimeDelta) {
    this.score += frameTimeDelta * 0.01;
  }

  /**
   * Reseta a pontuação para zero
   */
  reset() {
    this.score = 0;
  }

  /**
   * Atualiza o recorde no localStorage se a pontuação atual for maior
   */
  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  /**
   * Desenha a pontuação e o recorde no canvas
   */
  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = "#525250";
    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    // Formata a pontuação e o recorde com zeros à esquerda
    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    // Desenha a pontuação atual
    this.ctx.fillText(scorePadded, scoreX, y);
    // Desenha o recorde
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}
