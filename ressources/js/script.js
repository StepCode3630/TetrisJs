console.log("TetrisJS by Stepan");

const grid = document.getElementById("grid");
const largeur = 10;
const hauteur = 20;

let form = new Array();

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

//Nombre random entre 0 et 10
let numRandomv2 = Math.floor(Math.random() * (largeur - 2)) + 1;

let positionX = numRandomv2;
let positionY = 0;

//Nombre random entre 0 et le nombre de formes disponibles
let numRandom = Math.floor(Math.random() * form.length);

const cells = document.querySelectorAll(".cell");

const restartButton = document.querySelector(".restart");
let gameInterval = null;

function restart() {
  if (gameInterval) clearInterval(gameInterval);
  numRotation = 0;
  numRandom = Math.floor(Math.random() * 5);
  numRandomv2 = Math.floor(Math.random() * (8 - 1)) + 1;
  positionX = numRandomv2;
  positionY = -1;
  logicGrid = new Array(hauteur);
  score.textContent = "0";

  for (let i = 0; i < hauteur; i++) {
    logicGrid[i] = new Array(largeur).fill(0);
  }

  clearGrid();
  draw();
  gameInterval = setInterval(moveDown, 600);
  overlay.classList.remove("show");
  overlay.addEventListener(
    "transitionend",
    () => {
      overlay.classList.add("hidden");
    },
    { once: true },
  );
}

restartButton.addEventListener("click", () => {
  restartButton.disabled = true;
  restart();
  setTimeout(() => {
    restartButton.disabled = false;
  }, 150);
});

/// Dessiner la forme
function draw() {
  checkLines();
  canMoveDown();
  canMoveDown();
  canRotate();
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
        }
      }
    }
  }
}
function clearGrid() {
  cells.forEach((cell) => {
    cell.style.backgroundColor = "#ffffffff";
  });
}

function canMoveDown() {
  const carré = form[numRandom][numRotation];
  for (let i = 0; i < carré.length; i++) {
    for (let j = 0; j < carré[i].length; j++) {
      if (carré[i][j] === 1) {
        if (positionY + i + 1 >= hauteur) return false;
        if (
          positionY + i + 1 >= 0 &&
          logicGrid[positionY + i + 1][positionX + j] !== 0
        )
          return false;
      }
    }
  }
  return true;
}

//Augmente la position verticale ce qui fait descendre
function moveDown() {
  if (canMoveDown()) {
    positionY++;
    clearGrid();
    draw();
  } else {
    fixPiece();
    gameOver();

    numRandom = Math.floor(Math.random() * 5);
    numRandomv2 = Math.floor(Math.random() * (largeur - 2)) + 1;
    positionX = numRandomv2;
    positionY = -1;
    numRotation = 0;
    clearGrid();
    draw();
  }
}
1;

function fixPiece() {
  const shape = form[numRandom][numRotation]; // matrice de la pièce active
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 1) {
        const x = positionX + col;
        const y = positionY + row;
        if (y >= 0 && y < hauteur && x >= 0 && x < largeur)
          logicGrid[y][x] = numRandom; // couleur de la pièce
      }
    }
  }
}

// Gestion des colisions sur l'axe horizentale
function canMove(dx) {
  const carré = form[numRandom][numRotation];
  //Ligne
  for (let i = 0; i < carré.length; i++) {
    //Colonne
    for (let j = 0; j < carré[i].length; j++) {
      if (carré[i][j] === 1) {
        if (positionX + j + dx >= largeur || positionX + j + dx < 0)
          return false;
      }
    }
  }
  return true;
}

function canRotate(futurRrotation) {
  const carré = form[numRandom][numRotation];
  //Ligne
  for (let i = 0; i < carré.length; i++) {
    //Colonne
    for (let j = 0; j < carré[i].length; j++) {
      if (carré[i][j] === 1) {
        if (positionX + j >= largeur || positionX + j < 0) return false;
        if (positionY + i >= hauteur || positionY + i < 0) return false;
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
      lignesSupprimees++;

      logicGrid.splice(i, 1);

      logicGrid.unshift(new Array(largeur).fill(0));

      i++;

      //Score
      const score = document.getElementById("score");
      score.textContent = parseInt(score.textContent) + 100 * lignesSupprimees;
    }
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
          // Game over condition
          clearInterval(gameInterval);
          gameInterval = null;
          const overlay = document.getElementById("gameOver");
          overlay.classList.add("show");
        }
      }
    }
  }
}

//Gestion des touches
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      if (canMove(-1)) {
        clearGrid();
        draw();
        positionX--;
        break;
      }

    case "ArrowRight":
      if (canMove(1)) {
        clearGrid();
        draw();
        positionX++;
        break;
      }
    case "ArrowUp":
      rotation();
      clearGrid();
      draw();
      break;

    case "ArrowDown":
      if (canMoveDown(1)) {
        positionY++;
        clearGrid();
        draw();
      }
      break;

    case "Escape":
      restart();
      setTimeout(() => {
        restartButton.disabled = false;
      }, 150);
      break;
    case "Enter":
      positionX = numRandomv2;
      positionY = -1;
      numRotation = 0;
      numRandom = Math.floor(Math.random() * 5);
      numRandomv2 = Math.floor(Math.random() * (8 - 1)) + 1;
      break;
  }
});
