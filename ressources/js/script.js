console.log("TetrisJS by Stepan");

const grid = document.getElementById("grid");
const largeur = 10;
const hauteur = 20;

const form = [];

let score = 0;

let numRotation = 0;

const couleurList = ["red", "blue", "green", "yellow", "purple"];

for (let i = 0; i < largeur * hauteur; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}

let logicGrid = new Array(hauteur);

for (let i = 0; i < hauteur; i++) {
  logicGrid[i] = new Array(largeur).fill(0);
}

//Carré
form[0] = [
  [
    [1, 1],
    [1, 1],
  ],
];
//Ligne
form[1] = [
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
];
//L Forme
form[2] = [
  [
    [1, 1, 1],
    [1, 0, 0],
    [0, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
];
//Z Forme
form[3] = [
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
];

//T Forme
form[4] = [
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
];
//L Forme inversé
form[5] = [
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
];

//Nombre random entre 0 et le nombre de formes disponibles
let numRandom = Math.floor(Math.random() * form.length);

const cells = document.querySelectorAll(".cell");

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", restart);
let gameInterval = null;

const shape = form[numRandom][numRotation];
const pieceWidth = shape[0].length;

//Nombre random entre 1 inclus et largeur - piece largeur + 1
let numRandomv2 = Math.floor(Math.random() * (largeur - pieceWidth + 1));

let positionX = numRandomv2;
let positionY = -1;

function restart() {
  if (gameInterval) clearInterval(gameInterval);
  numRotation = 0;
  numRandom = Math.floor(Math.random() * 5);
  numRandomv2 = Math.floor(Math.random() * (largeur - pieceWidth + 1));
  positionX = numRandomv2;
  positionY = -1;
  logicGrid = new Array(hauteur);
  score.textContent = "0";

  for (let i = 0; i < hauteur; i++) {
    logicGrid[i] = new Array(largeur).fill(0);
  }

  render;
  gameInterval = setInterval(moveDown, 600);
}

// restartButton.addEventListener("click", () => {
//   restartButton.disabled = true;
//   restart();
//   setTimeout(() => {
//     restartButton.disabled = false;
//   }, 150);
// });

/// Dessiner la forme
function draw() {
  clearGrid();

  for (let i = 0; i < hauteur; i++) {
    for (let j = 0; j < largeur; j++) {
      if (logicGrid[i][j] != 0) {
        const cellIndex = i * largeur + j;
        cells[cellIndex].style.backgroundColor =
          couleurList[logicGrid[i][j] - 1];
      }
    }
  }
  const carré = form[numRandom][numRotation];
  for (let i = 0; i < carré.length; i++) {
    for (let j = 0; j < carré[i].length; j++) {
      if (carré[i][j] === 1) {
        const x = positionX + j;
        const y = positionY + i;
        if (x >= 0 && x < largeur && y >= 0 && y < hauteur) {
          const cellIndex = y * largeur + x;
          cells[cellIndex].style.backgroundColor = couleurList[numRandom - 1];
          cells[cellIndex].style.boxShadow = "0 0 10px white";
        }
      }
    }
  }
}
function clearGrid() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = "#fff";
  }
}

function canMoveDown() {
  const carré = form[numRandom][numRotation];

  for (let i = 0; i < carré.length; i++) {
    for (let j = 0; j < carré[i].length; j++) {
      if (carré[i][j] === 1) {
        const newY = positionY + i + 1;
        const x = positionX + j;

        // Collision bas
        if (newY >= hauteur) return false;

        // Collision avec autre pièce
        if (
          newY >= 0 &&
          newY < hauteur &&
          x >= 0 &&
          x < largeur &&
          logicGrid[newY][x] !== 0
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

//Augmente la position verticale ce qui fait descendre
function moveDown() {
  if (canMoveDown()) {
    positionY++;
    render();
    grid.style.transform = "translateY(2px)";
    setTimeout(() => (grid.style.transform = "translate>(0px)"), 50);
  } else {
    fixPiece();
    gameOver();
    checkLines();

    numRandom = Math.floor(Math.random() * form.length);
    numRandomv2 = Math.floor(Math.random() * (largeur - pieceWidth + 1));
    positionX = numRandomv2;
    positionY = -1;
    numRotation = 0;
    render();
  }
}
1;

function fixPiece() {
  const carré = form[numRandom][numRotation];
  for (let row = 0; row < carré.length; row++) {
    for (let col = 0; col < carré[row].length; col++) {
      if (carré[row][col] === 1) {
        const x = positionX + col;
        const y = positionY + row;
        if (y >= 0 && y < hauteur && x >= 0 && x < largeur)
          logicGrid[y][x] = numRandom; // couleur de la pièce
        const cellIndex = y * largeur + x;
        cells[cellIndex].classList.add("fix-animation");
      }
    }
  }
}

// Gestion des colisions sur l'axe horizentale
function canMove(dx) {
  const carré = form[numRandom][numRotation];

  for (let i = 0; i < carré.length; i++) {
    for (let j = 0; j < carré[i].length; j++) {
      if (carré[i][j] === 1) {
        const newX = positionX + j + dx;
        const y = positionY + i;

        if (newX < 0 || newX >= largeur) return false;

        if (y >= 0 && y < hauteur && logicGrid[y][newX] !== 0) {
          return false;
          grid.classList.add("shake");
          setTimeout(() => grid.classList.remove("shake"), 200);
        }
      }
    }
  }

  return true;
}

function canRotate() {
  const carré = form[numRandom][numRotation];
  //Ligne
  for (let i = 0; i < carré.length; i++) {
    //Colonne
    for (let j = 0; j < carré[i].length; j++) {
      if (carré[i][j] === 1) {
        if (positionX + j >= largeur || positionX + j < 0) return false;
        if (positionY + i >= hauteur || positionY + i < 0) return false;
        if (logicGrid[positionY + i][positionX + j] !== 0) return false;
      }
    }
  }
  return true;
}

function rotation() {
  if (canRotate((numRotation + 1) % form[numRandom].length)) {
    numRotation = (numRotation + 1) % form[numRandom].length;
  }
}

//Chaque interval de 0.6sec, appel de la fonction moveDown ce qui fait descendre
if (!gameInterval) gameInterval = setInterval(moveDown, 600);

function checkLines() {
  let lignesSupprimees = 0;

  for (let i = hauteur - 1; i >= 0; i--) {
    if (logicGrid[i].every((cell) => cell !== 0)) {
      const rowCells = document.querySelectorAll(
        `.cell:nth-child(n + ${i * largeur + 1}):nth-child(-n + ${(i + 1) * largeur})`,
      );
      logicGrid.splice(i, 1);
      logicGrid.unshift(new Array(largeur).fill(0));

      lignesSupprimees++;
      i++;
    }
  }

  if (lignesSupprimees > 0) {
    score += 100 * lignesSupprimees;
    document.getElementById("score").textContent = score;
  }
  if (score % 1000 === 0) {
    grid.style.filter = "hue-rotate(90deg)";
  }
}

function gameOver() {
  const shape = form[numRandom][numRotation];

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 1) {
        const x = positionX + col;
        const y = positionY + row;

        if (y < 0) {
          clearInterval(gameInterval);
          gameInterval = null;

          alert("Game over");
          restart();
        }
      }
    }
  }

  return false;
}

function render() {
  clearGrid();
  draw();
}

//Gestion des touches
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      if (canMove(-1)) {
        positionX--;
      }
      render;
      break;

    case "ArrowRight":
      if (canMove(1)) {
        positionX++;
      }
      render;
      break;
    case "ArrowUp":
      rotation();
      render();
      break;

    case "ArrowDown":
      if (canMoveDown(1)) {
        positionY++;
      }
      render;
      break;

    case "Escape":
      restart();
      // setTimeout(() => {
      //   restartButton.disabled = true;
      // }, 150);
      break;
    case "Enter":
      positionX = numRandomv2;
      positionY = -1;
      numRotation = 0;
      numRandom = Math.floor(Math.random() * 5);
      numRandomv2 = Math.floor(Math.random() * (largeur - pieceWidth + 1));
      break;
  }
});
