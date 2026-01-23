const grid = document.getElementById("grid");
const largeur = 10;
const hauteur = 20;

let positionX = 4;
let positionY = 1;

//Nombre random entre 0 et 4
const numRandom = Math.floor(Math.random() * 5);

const numRotation = 0;

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
    [0, 0, 0],
    [0, 0, 1],
    [1, 1, 1],
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

var couleur;

const cells = document.querySelectorAll(".cell");

/// Dessiner la forme
function draw() {
  for (
    let index = 0;
    index < form[numForm][numRotation].length;
    index++ //Lignes
  ) {
    for (
      let jindex = 0;
      jindex < form[numForm][numRotation][index].length;
      jindex++ //Colonnes
    ) {
      if (form[numForm][numRotation][index][jindex] === 1) {
        const cellIndex = (positionY + index) * largeur + (positionX + jindex);
        cells[cellIndex].style.backgroundColor = couleurList[numForm];
      }
    }
  }
}
function clearGrid() {
  cells.forEach((cell) => {
    cell.style.backgroundColor = "#ffffffff";
  });
}
clearGrid();
draw();
