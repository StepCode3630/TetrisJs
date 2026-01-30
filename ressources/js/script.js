const grid = document.getElementById("grid");
const largeur = 10;
const hauteur = 20;

//Nombre random entre 0 et 10
let numRandomv2 = Math.floor(Math.random() * (8 - 1)) + 1;

let positionX = numRandomv2;
let positionY = -1;

//Nombre random entre 0 et 4
let numRandom = Math.floor(Math.random() * 5);

let numRotation = 0;

const couleurList = ["red", "blue", "green", "yellow", "purple"];

for (let i = 0; i < largeur * hauteur; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}

let form = new Array();
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
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
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

const cells = document.querySelectorAll(".cell");

const restartButton = document.getElementById("restart");
let gameInterval = null;

function restart() {
  if (gameInterval) clearInterval(gameInterval);
  numRotation = 0;
  numRandom = Math.floor(Math.random() * 5);
  numRandomv2 = Math.floor(Math.random() * (8 - 1)) + 1;
  positionX = numRandomv2;
  positionY = -1;
  clearGrid();
  draw();
  gameInterval = setInterval(moveDown, 600);
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
  for (
    let index = 0;
    index < form[numRandom][numRotation].length;
    index++ //Lignes
  ) {
    for (
      let jindex = 0;
      jindex < form[numRandom][numRotation][index].length;
      jindex++ //Colonnes
    ) {
      if (form[numRandom][numRotation][index][jindex] === 1) {
        const cellIndex = (positionY + index) * largeur + (positionX + jindex);
        if (cellIndex >= 0 && cellIndex < cells.length) {
          cells[cellIndex].style.backgroundColor = couleurList[numRandom];
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

//Augmente la position verticale ce qui fait descendre
function moveDown() {
  positionY++;
  clearGrid();
  draw();
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
    clearGrid();
    draw();
  }
}

//Chaque interval de 0.6sec, appel de la fonction moveDown ce qui fait descendre
// Utiliser `gameInterval` pour pouvoir le contrôler depuis `restart()`
if (!gameInterval) gameInterval = setInterval(moveDown, 600);

//Gestion des touches
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      if (canMove(-1)) {
        clearGrid();
        positionX--;
        break;
      }

    case "ArrowRight":
      if (canMove(1)) {
        clearGrid();
        positionX++;
        break;
      }
    case "ArrowUp":
      rotation();
      break;
  }
});
