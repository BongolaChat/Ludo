class Game {
  get colors() {
    return ["green", "red", "blue", "yellow"];
  }

  playingColors(playerLength = 2) {
    if (playerLength === 2) {
      return ["red", "yellow"];
    } else if (playerLength === 3) {
      return ["red", "blue", "yellow"];
    }
    return this.colors;
  }

  colorCases(color, caseWidth){
      if (color === "green"){
        return [
            [caseWidth, caseWidth * 6],
            [caseWidth, caseWidth * 7],
            [caseWidth * 2, caseWidth * 7],
            [caseWidth * 3, caseWidth * 7],
            [caseWidth * 4, caseWidth * 7],
            [caseWidth * 5, caseWidth * 7],
          ];
      } else if ( color === "red") {
        return [
            [caseWidth * 8, caseWidth],
            [caseWidth * 7, caseWidth],
            [caseWidth * 7, caseWidth * 2],
            [caseWidth * 7, caseWidth * 3 ],
            [caseWidth * 7, caseWidth * 4],
            [caseWidth * 7, caseWidth * 5],
          ];
      } else if ( color === "blue") {
          return [
            [caseWidth * 13, caseWidth * 8],
            [caseWidth * 13, caseWidth * 7],
            [caseWidth * 12, caseWidth * 7],
            [caseWidth * 11, caseWidth * 7],
            [caseWidth * 10, caseWidth * 7],
            [caseWidth * 9, caseWidth * 7],
          ];
      } else if ( color === "yellow") {
        return [
            [caseWidth * 6, caseWidth * 13],
            [caseWidth * 7, caseWidth * 13],
            [caseWidth * 7, caseWidth * 12],
            [caseWidth * 7, caseWidth * 11],
            [caseWidth * 7, caseWidth * 10],
            [caseWidth * 7, caseWidth * 9],
          ];
      }
  }

  pieceCase(color, length){

  }

  constructor(playerLength = 2) {
    this.pieces = [];

    var gameColors = this.playingColors(playerLength);

    for (let i = 0; i < gameColors.length; i++) {
      const color = gameColors[i];
      let colorPieces = [
        new Piece(color),
        new Piece(color),
        new Piece(color),
        new Piece(color),
      ];
      this.pieces.push(...colorPieces);
    }
  }
}

class Piece {
    constructor(color) {
      this.length = -1;
      this.color = color;
    }
  
    toJson() {
      return {
        length: this.length,
        color: this.color,
      };
    }
  
    add(len) {
      // si la longueur est de 50, càd que la pièce est
      // à la porte prêt à monter.
      if (this.length >= 50) {
        if (
          /* la pièce est à la porte */
          (this.length == 50 && len == 1) ||
          /* la pièce est à la première case et ainsi de suite */
          (this.length == 51 && len == 2) ||
          (this.length == 52 && len == 3) ||
          (this.length == 53 && len == 4) ||
          (this.length == 54 && len == 5) ||
          (this.length == 55 && len == 6)
        ) {
          this.length += 1;
        }
      } else {
        this.length += len;
      }
    }
  
    eaten() {
      this.length = -1;
    }
  }

document.addEventListener("DOMContentLoaded", function () {
  /** @type {HTMLCanvasElement} */
  var canvas = document.getElementById("canvas");
  /** @type {CanvasRenderingContext2D} */
  var ctx = canvas.getContext("2d");

  var game = new Game();

  let caseWidth = canvas.width / 15;

  let houseSize = caseWidth * 6;

  var intervalleSize = caseWidth * 3;

  canvas.addEventListener("mousedown", (event ) => {
    let x = Math.floor(event.offsetX / (canvas.width / 10));
    let y = Math.floor(event.offsetY / (canvas.width / 10));

    console.log(x, " et ", y);
  });

  render();

  function render() {
    // je designe 225 cases dans le canvas
    for (var x = 0; x < 15; x++) {
      for (var y = 0; y < 15; y++) {
        ctx.strokeRect(caseWidth * x, caseWidth * y, caseWidth, caseWidth);
      }
    }

    // on va mettre un carré rouge au centre avec une image
    ctx.fillStyle = "red";
    ctx.fillRect(houseSize, houseSize, intervalleSize, intervalleSize);
    var image = new Image();
    image.src = "shaurya-sagar-5cwvT0BSgIY-unsplash.jpg";
    ctx.drawImage(image, houseSize, houseSize, intervalleSize, intervalleSize);


    // premier maison avec la couleur vert
    renderHouse(ctx, "green", 0, 0, houseSize);

    // deuxième maison avec la couleur jaune
    renderHouse(ctx, "yellow", 0, canvas.height - houseSize, houseSize);

    // troisième maison avec la couleur rouge
    renderHouse(ctx, "red", canvas.width - houseSize, 0, houseSize);

    // quatrième maison avec la couleur bleu
    renderHouse(
      ctx,
      "blue",
      canvas.width - houseSize,
      canvas.height - houseSize,
      houseSize
    );
  }

  function renderHouse(
    /** @type {CanvasRenderingContext2D} */ ctx,
    color,
    x,
    y,
    houseSize
  ) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, houseSize, houseSize);
    // pieces container
    roundRect(
      ctx,
      x + (houseSize / 2) - (canvas.width * 0.25 / 2),
      y + (houseSize / 2) - (canvas.width * 0.25 / 2),
      canvas.width * 0.25,
      canvas.width * 0.25,
      30,
      false,
      true
    );
    // draw pieces
    // ctx.fillStyle = "black";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 15;
    ctx.fill();
    let colorPieces = game.pieces.filter((p) => p.color === color);
    // console.log(colorPieces);
    if (colorPieces.length > 0)
      roundRect(
        ctx,
        x +
        (houseSize / 2) - (canvas.width * 0.25 / 2) +
          (canvas.width * 0.25) / 4 -
          (canvas.width * 0.25) / 8,
        y +
        (houseSize / 2) - (canvas.width * 0.25 / 2) +
          (canvas.width * 0.25) / 4 -
          (canvas.width * 0.25) / 8,
        (canvas.width * 0.25) / 4,
        (canvas.width * 0.25) / 4,
        (canvas.width * 0.25) / 7,
        true,
        false
      );
    if (colorPieces.length > 1)
      roundRect(
        ctx,
        x +
          (houseSize / 2) - (canvas.width * 0.25 / 2) +
          3 * ((canvas.width * 0.25) / 4) -
          (canvas.width * 0.25) / 8,
        y +
          (houseSize / 2) - (canvas.width * 0.25 / 2) +
          (canvas.width * 0.25) / 4 -
          (canvas.width * 0.25) / 8,
        (canvas.width * 0.25) / 4,
        (canvas.width * 0.25) / 4,
        (canvas.width * 0.25) / 7,
        true,
        false
      );
    if (colorPieces.length > 2)
      roundRect(
        ctx,
        x +
          (houseSize / 2) - (canvas.width * 0.25 / 2) +
          (canvas.width * 0.25) / 4 -
          (canvas.width * 0.25) / 8,
        y +
          (houseSize / 2) - (canvas.width * 0.25 / 2) +
          3 * ((canvas.width * 0.25) / 4) -
          (canvas.width * 0.25) / 8,
        (canvas.width * 0.25) / 4,
        (canvas.width * 0.25) / 4,
        (canvas.width * 0.25) / 7,
        true,
        false
      );
    if (colorPieces.length > 3)
      roundRect(
        ctx,
        x +
          (houseSize / 2) - (canvas.width * 0.25 / 2) +
          3 * ((canvas.width * 0.25) / 4) -
          (canvas.width * 0.25) / 8,
        y +
          (houseSize / 2) - (canvas.width * 0.25 / 2) +
          3 * ((canvas.width * 0.25) / 4) -
          (canvas.width * 0.25) / 8,
        (canvas.width * 0.25) / 4,
        (canvas.width * 0.25) / 4,
        (canvas.width * 0.25) / 7,
        true,
        false
      );
    ctx.shadowColor = 0;
    ctx.shadowBlur = 0;

    // draw color round to champions
    let greens = game.colorCases(color, caseWidth);
    for (let i = 0; i < greens.length; i++) {
        const green = greens[i];
        ctx.fillStyle = color;
        ctx.fillRect(green[0], green[1], caseWidth, caseWidth);
    }
  }
});

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === "undefined") {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  if (typeof radius === "number") {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}
