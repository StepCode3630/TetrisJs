console.log("TetrisJS by Stepan");

const grid = document.getElementById("grid");
const largeur = 10;
const hauteur = 20;

const form = [];

let score = 0;

let numRotation = 0;

const couleurList = ["red", "blue", "green", "yellow", "purple", "orange"];

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
    [0, 0, 0, 0],
    [1, 1, 1, 1],
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

document.addEventListener("DOMContentLoaded", () => {
  const restartButton = document.querySelector(".key.esc");
  restartButton.addEventListener("click", restart);

  const enterButton = document.getElementsByClassName("key enter")[0];
  enterButton.addEventListener("click", () => {
    positionX = numRandomv2;
    positionY = -1;
    numRotation = 0;
    numRandom = Math.floor(Math.random() * form.length);
    numRandomv2 = Math.floor(Math.random() * (largeur - pieceWidth + 1));
    render();
  });

  const upArrowButton = document.getElementById("upArrow");
  upArrowButton.addEventListener("click", () => {
    rotation();
    render();
  });

  const downArrowButton = document.getElementById("downArrow");
  downArrowButton.addEventListener("click", () => {
    if (canMoveDown(1)) {
      positionY++;
    }
    render();
  });

  const leftArrowButton = document.getElementById("leftArrow");
  leftArrowButton.addEventListener("click", () => {
    if (canMove(-1)) {
      positionX--;
    }
    render();
  });

  const rightArrowButton = document.getElementById("rightArrow");
  rightArrowButton.addEventListener("click", () => {
    if (canMove(1)) {
      positionX++;
    }
    render();
  });
});

let gameInterval = null;

let shape = form[numRandom][numRotation];
let pieceWidth = shape[0].length;

//Nombre random entre 1 inclus et largeur - piece largeur
let numRandomv2 = Math.floor(Math.random() * (largeur - pieceWidth + 2));

let positionX = numRandomv2;
let positionY = -1;

function restart() {
  if (gameInterval) clearInterval(gameInterval);
  numRotation = 0;
  score = 0;
  numRandom = Math.floor(Math.random() * form.length);
  numRandomv2 = Math.floor(Math.random() * (largeur - pieceWidth + 1));
  positionX = numRandomv2;
  positionY = -1;
  logicGrid = new Array(hauteur);
  score.textContent = "0";

  for (let i = 0; i < hauteur; i++) {
    logicGrid[i] = new Array(largeur).fill(0);
  }

  render;
  gameInterval = setInterval(
    moveDown,
    600 * 0.9 ** (Math.floor(score / 10) + 4),
  );
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
          // cells[cellIndex].style.boxShadow = "0 0 10px white";
        }
      }
    }
  }
}
function clearGrid() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = "";
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
    render(); // Afficher l'état après suppression des lignes

    // Générer une nouvelle pièce
    numRandom = Math.floor(Math.random() * form.length);
    const newShape = form[numRandom][0];
    pieceWidth = newShape[0].length;
    numRandomv2 = Math.floor(Math.random() * (largeur - pieceWidth + 1));
    positionX = numRandomv2;
    positionY = -1;
    numRotation = 0;

    // Vérifier si la nouvelle pièce peut être placée (sinon, game over)
    if (!canMoveDown()) {
      clearInterval(gameInterval);
      gameInterval = null;
      alert("Game Over - Impossible de placer la pièce !");
      restart();
      return;
    }

    // Faire descendre immédiatement si possible pour éviter le délai
    if (canMoveDown()) {
      positionY++;
    }

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
        if (cellIndex >= hauteur)
          cells[cellIndex].classList.add("fix-animation"); // Ajoute une classe pour l'animation de fixation
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

function canRotate(nextRotation) {
  const nextShape = form[numRandom][nextRotation];

  for (let i = 0; i < nextShape.length; i++) {
    for (let j = 0; j < nextShape[i].length; j++) {
      if (nextShape[i][j] === 1) {
        const x = positionX + j;
        const y = positionY + i;

        // Vérifier les limites horizontales
        if (x < 0 || x >= largeur) return false;

        // Vérifier les limites verticales (autoriser y < 0 pour pièces partiellement au-dessus)
        if (y >= hauteur) return false;

        // Vérifier les collisions avec les pièces posées (seulement si y >= 0)
        if (y >= 0 && logicGrid[y][x] !== 0) return false;
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
  const newGrid = [];

  // Parcourir de bas en haut et copier seulement les lignes non pleines
  for (let i = hauteur - 1; i >= 0; i--) {
    if (!logicGrid[i].every((cell) => cell !== 0)) {
      newGrid.unshift(logicGrid[i]); // Ajouter au début de la nouvelle grille
    } else {
      lignesSupprimees++;
    }
  }

  // Remplir le haut avec des lignes vides si nécessaire
  while (newGrid.length < hauteur) {
    newGrid.unshift(new Array(largeur).fill(0));
  }

  // Remplacer la grille logique
  logicGrid = newGrid;

  if (lignesSupprimees > 0) {
    score += 1 * lignesSupprimees;
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
      render();
      break;

    case "ArrowRight":
      if (canMove(1)) {
        positionX++;
      }
      render();
      break;
    case "ArrowUp":
      rotation();
      render();
      break;

    case "ArrowDown":
      if (canMoveDown(1)) {
        positionY++;
      }
      render();
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
      numRandom = Math.floor(Math.random() * form.length);
      numRandomv2 = Math.floor(Math.random() * (largeur - pieceWidth + 1));
      break;
  }
});

let startX = 0;
let startY = 0;

document.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", function (e) {
  let endX = e.changedTouches[0].clientX;
  let endY = e.changedTouches[0].clientY;

  let diffX = endX - startX;
  let diffY = endY - startY;

  // distance minimum pour considérer un swipe
  const seuil = 50; // augmenté pour éviter les faux swipes

  // Déterminer la direction principale du swipe
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Swipe horizontal
    if (Math.abs(diffX) > seuil) {
      if (diffX > 0) {
        // swipe droite
        if (canMove(1)) {
          positionX++;
          render();
        }
      } else {
        // swipe gauche
        if (canMove(-1)) {
          positionX--;
          render();
        }
      }
    }
  } else {
    // Swipe vertical
    if (Math.abs(diffY) > seuil) {
      if (diffY > 0) {
        // swipe bas : descendre rapidement
        moveDown();
      } else {
        // swipe haut : rotation
        rotation();
        render();
      }
    }
  }
});
