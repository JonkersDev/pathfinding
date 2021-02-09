const gridContainer = document.querySelector(".grid");
const startAlg = document.querySelector(".start-alg");
const Li = document.querySelectorAll("li");
const alDis = document.querySelector(".al-dis");
const noWeight = document.querySelector(".weight-pre");

let w = window.innerWidth - window.innerWidth / 20;
let cols = Math.floor((window.innerWidth / 20) * 0.9);
if (cols % 2 == 0) {
  cols++;
}
let blockSize = w / cols;
let rows = Math.floor((window.innerHeight - 200) / blockSize);
if (rows % 2 == 0) {
  rows++;
}
let delay = 1;

let openSet = [];
let closedSet = [];

let mouseDown = false;
let startMove = false;
let endMove = false;
let addWeight = false;
let addUp = false;
let addDown = false;
let addRight = false;
let addLeft = false;

let activeAlg = "";
let weightedAlg = true;
let animation = "animation: search 1.5s ease;";

document.body.addEventListener("mousedown", () => {
  mouseDown = true;
});
document.body.addEventListener("mouseup", () => {
  mouseDown = false;
  startMove = false;
  endMove = false;
});
document.body.addEventListener("keydown", (e) => {
  if (e.key === "w") {
    addWeight = true;
  }
  if (e.key === "ArrowUp") {
    addUp = true;
  }
  if (e.key === "ArrowDown") {
    addDown = true;
  }
  if (e.key === "ArrowLeft") {
    addLeft = true;
  }
  if (e.key === "ArrowRight") {
    addRight = true;
  }
});
document.body.addEventListener("keyup", () => {
  addWeight = false;
  addUp = false;
  addLeft = false;
  addDown = false;
  addRight = false;
});

let startNode = document.createElement("div");
startNode.innerHTML = '<i class="fas fa-angle-right start"></i>';
startNode.addEventListener("mousedown", () => {
  startMove = true;
});

let endNode = document.createElement("div");
endNode.innerHTML = '<i class="fas fa-map-marker-alt end"></i>';
endNode.addEventListener("mousedown", () => {
  endMove = true;
});

const createGrid = () => {
  let grid = new Array(rows);

  function Spot(x, y) {
    (this.x = x), (this.y = y), (this.f = 0), (this.g = 0), (this.h = 0);
    this.neighbors = [];
    this.previous = undefined;
    this.visit = false;

    this.wall = false;
    this.weight = false;

    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;

    this.show = () => {
      let block = document.createElement("div");
      block.classList.add("spot", `co-x${x}y${y}`);
      block.style = `width: ${blockSize}px; height: ${blockSize}px;`;
      block.setAttribute("data-x", x);
      block.setAttribute("data-y", y);

      block.addEventListener("mouseenter", () => {
        if (startMove == true) {
          block.appendChild(startNode);
          start =
            grid[startNode.parentElement.getAttribute("data-y")][
              startNode.parentElement.getAttribute("data-x")
            ];
        }

        if (endMove == true) {
          block.appendChild(endNode);
          end =
            grid[endNode.parentElement.getAttribute("data-y")][
              startNode.parentElement.getAttribute("data-x")
            ];
        }

        if (
          mouseDown == true &&
          addWeight == true &&
          startMove == false &&
          endMove == false &&
          this.weight == false &&
          weightedAlg == true
        ) {
          block.innerHTML = '<i class="fas fa-dumbbell no-click weight"></i>';
          this.weight = true;
        } else if (
          mouseDown == true &&
          this.weight == true &&
          startMove == false &&
          endMove == false &&
          addWeight == true
        ) {
          block.innerHTML = "";
          this.weight = false;
        }

        if (
          mouseDown == true &&
          this.wall == false &&
          startMove == false &&
          endMove == false &&
          addWeight == false
        ) {
          if (
            this.up == true ||
            this.down == true ||
            this.left == true ||
            this.right == true ||
            this.weight == true
          ) {
            this.up = false;
            this.down = false;
            this.left = false;
            this.right = false;
            this.weight = false;
            block.innerHTML = "";
          }
          block.style = `background-color: black; border: none; transform: scale(1.2); width: ${blockSize}px; height: ${blockSize}px;`;
          setTimeout(() => {
            block.style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px;`;
          }, 100);
          this.wall = true;
        } else if (
          mouseDown == true &&
          this.wall == true &&
          startMove == false &&
          endMove == false &&
          addWeight == false
        ) {
          block.style = `background-color: white; transform: scale(1.2); width: ${blockSize}px; height: ${blockSize}px;`;
          setTimeout(() => {
            block.style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;`;
          }, 100);
          this.wall = false;
        }
      });
      block.addEventListener("mousedown", () => {
        if (
          startMove == false &&
          endMove == false &&
          this.wall == false &&
          addWeight == false &&
          addUp == false &&
          addDown == false &&
          addLeft == false &&
          addRight == false
        ) {
          block.innerHTML = "";
          block.style = `background-color: black; border: none; transform: scale(1.2); width: ${blockSize}px; height: ${blockSize}px;`;
          setTimeout(() => {
            block.style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px;`;
          }, 100);
          this.wall = true;
        } else if (
          startMove == false &&
          endMove == false &&
          this.wall == true &&
          addWeight == false &&
          addUp == false &&
          addDown == false &&
          addLeft == false &&
          addRight == false
        ) {
          block.style = `background-color: white; transform: scale(1.2); width: ${blockSize}px; height: ${blockSize}px;`;
          setTimeout(() => {
            block.style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;`;
          }, 100);
          this.wall = false;
        }

        if (addWeight == true && this.weight == false && weightedAlg == true) {
          block.innerHTML = '<i class="fas fa-dumbbell no-click weight"></i>';
          this.weight = true;
        } else if (this.weight == true && addWeight == true) {
          block.innerHTML = "";
          this.weight = false;
        }
      });

      block.addEventListener("click", () => {
        if (addUp == true && this.up == false) {
          block.innerHTML =
            '<i class="fas fa-arrow-circle-up direction-node"></i>';
          block.style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;`;
          this.up = true;
          this.right = false;
          this.left = false;
          this.down = false;
          this.wall = false;
        } else if (this.up == true && addUp == true) {
          block.innerHTML = "";
          this.up = false;
        }
        if (addDown == true && this.down == false) {
          block.innerHTML =
            '<i class="fas fa-arrow-circle-down direction-node"></i>';
          block.style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;`;
          this.wall = false;
          this.down = true;
          this.right = false;
          this.left = false;
          this.up = false;
        } else if (this.down == true && addDown == true) {
          block.innerHTML = "";
          this.down = false;
        }

        if (addLeft == true && this.left == false) {
          block.innerHTML =
            '<i class="fas fa-arrow-circle-left direction-node"></i>';
          block.style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;`;
          this.wall = false;
          this.left = true;
          this.right = false;
          this.up = false;
          this.down = false;
        } else if (this.left == true && addLeft == true) {
          block.innerHTML = "";
          this.left = false;
        }

        if (addRight == true && this.right == false) {
          block.innerHTML =
            '<i class="fas fa-arrow-circle-right direction-node"></i>';
          block.style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;`;
          this.wall = false;
          this.right = true;
          this.left = false;
          this.up = false;
          this.down = false;
        } else if (this.right == true && addRight == true) {
          block.innerHTML = "";
          this.right = false;
        }
      });

      gridContainer.appendChild(block);
    };

    this.addNeighbors = () => {
      let y = this.x;
      let x = this.y;
      if (x < rows - 1) {
        this.neighbors.push(grid[x + 1][y]);
      }
      if (y < cols - 1) {
        this.neighbors.push(grid[x][y + 1]);
      }
      if (x > 0) {
        this.neighbors.push(grid[x - 1][y]);
      }
      if (y > 0) {
        this.neighbors.push(grid[x][y - 1]);
      }
    };
  }

  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${blockSize}px)`;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new Spot(j, i);
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].show();
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].addNeighbors();
    }
  }

  document
    .querySelector(`.co-x1y${Math.floor(rows / 2)}`)
    .appendChild(startNode);
  document
    .querySelector(`.co-x${cols - 2}y${Math.floor(rows / 2)}`)
    .appendChild(endNode);

  return grid;
};

let currentGrid = createGrid();

const createBlockGrid = () => {
  let BGrid = [];
  let row = 0;
  let col = 0;
  for (i = 0; i < (currentGrid.length - 1) / 2; i++) {
    let blockRow = [];
    for (j = 0; j < (currentGrid[0].length - 1) / 2; j++) {
      let block = [
        currentGrid[row][col],
        currentGrid[row][col + 1],
        currentGrid[row + 1][col + 1],
        currentGrid[row + 1][col],
      ];
      block;
      col = col + 2;
      blockRow.push(block);
    }
    BGrid.push(blockRow);
    blockRow = [];
    col = 0;
    row = row + 2;
  }

  let arrIdx = 0;

  BGrid.forEach((arr) => {
    for (i = 0; i < arr.length; i++) {
      arr[i].x = i;
      arr[i].y = arrIdx;
      arr[i].visit = false;
      arr[i].sideBlocks = [];

      if (i > 0) {
        arr[i].sideBlocks.push(arr[i - 1]);
      } else {
        let side = {};
        side.visit = true;
        arr[i].sideBlocks.push(side);
      }
      if (i < arr.length - 1) {
        arr[i].sideBlocks.push(arr[i + 1]);
      } else {
        let side = {};
        side.visit = true;
        arr[i].sideBlocks.push(side);
      }
      if (arrIdx > 0) {
        arr[i].sideBlocks.push(BGrid[arrIdx - 1][i]);
      } else {
        let side = {};
        side.visit = true;
        arr[i].sideBlocks.push(side);
      }
      if (arrIdx < BGrid.length - 1) {
        arr[i].sideBlocks.push(BGrid[arrIdx + 1][i]);
      } else {
        let side = {};
        side.visit = true;
        arr[i].sideBlocks.push(side);
      }
    }
    arrIdx++;
  });
  return BGrid;
};

let blockGrid = createBlockGrid();

const run = () => {
  if (activeAlg == "") {
    startAlg.style.color = "red";
  }
  if (activeAlg != "") {
    startAlg.style = "";
    activeAlg();
  }
};

const heuristic = (a, b) => {
  let xAxes = 0;
  let yAxes = 0;
  if (a.x < b.x) {
    xAxes = b.x - a.x;
  } else if (a.x > b.x) {
    xAxes = a.x - b.x;
  }
  if (a.y < b.y) {
    yAxes = b.y - a.y;
  } else if (a.y > b.y) {
    yAxes = a.y - b.y;
  }

  let xSquare = xAxes * xAxes;
  let ySquare = yAxes * yAxes;
  let cSquare = xSquare + ySquare;
  let cAxes = Math.sqrt(cSquare);
  return cAxes;
};

const removeFromArray = async (arr, obj) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == obj) {
      arr.splice(i, 1);
    }
  }
};

let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const clearWeights = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (currentGrid[i][j].weight == true) {
        currentGrid[i][j].weight = false;
        document.querySelector(
          `.co-x${currentGrid[i][j].x}y${currentGrid[i][j].y}`
        ).innerHTML = "";
      }
    }
  }
};

const clearDirNodes = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (
        currentGrid[i][j].up == true ||
        currentGrid[i][j].down == true ||
        currentGrid[i][j].left == true ||
        currentGrid[i][j].right == true
      ) {
        currentGrid[i][j].up = false;
        currentGrid[i][j].right = false;
        currentGrid[i][j].left = false;
        currentGrid[i][j].down = false;
        document.querySelector(
          `.co-x${currentGrid[i][j].x}y${currentGrid[i][j].y}`
        ).innerHTML = "";
      }
    }
  }
};

const clearBoard = () => {
  openSet = [];
  closedSet = [];
  clearWeights();
  clearDirNodes();
  currentGrid.forEach((arr) => {
    arr.forEach((s) => {
      s.g = 0;
      s.h = 0;
      s.f = 0;
      s.previous = undefined;
      s.visit = false;
      s.wall = false;
      s.maze = false;
      document.querySelector(
        `.co-x${s.x}y${s.y}`
      ).style = `width: ${blockSize}px; height: ${blockSize}px;`;
    });
  });
};

const restart = () => {
  openSet = [];
  closedSet = [];
  currentGrid.forEach((arr) => {
    arr.forEach((s) => {
      if (s.wall == false) {
        s.visit = false;
        s.g = 0;
        s.h = 0;
        s.f = 0;
        s.previous = undefined;
        document.querySelector(
          `.co-x${s.x}y${s.y}`
        ).style = `width: ${blockSize}px; height: ${blockSize}px;`;
      }
    });
  });
};

startAlg.addEventListener("click", () => {
  restart();
  run();
});

document.body.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    restart();
    run();
  } else if (e.code === "Space") {
    restart();
  } else if (e.key === "c") {
    clearBoard();
  }
});

const clickLi = () => {
  Li.forEach(async (li) => {
    li.style.display = "none";
    await sleep(500);
    li.style.display = "";
  });
};

document.querySelector(".clear-walls").addEventListener("click", () => {
  clearBoard();
});

document.querySelector(".restart").addEventListener("click", () => {
  restart();
});

document.querySelector(".dijkstra").addEventListener("click", () => {
  clickLi();
  activeAlg = dijkstra;
  weightedAlg = true;
  noWeight.classList.remove("no-weight");
  Li.forEach((el) => {
    el.style = "";
  });
  document.querySelector(".dijkstra").style = "color: gold;";
  alDis.innerHTML =
    "The <strong>Dijkstra Algerithm</strong> chooses the node with the lowest <strong>F-score</strong>";
  startAlg.innerHTML = "Visualize Dijksta";
});

document.querySelector(".a-star").addEventListener("click", () => {
  clickLi();
  weightedAlg = true;
  noWeight.classList.remove("no-weight");
  activeAlg = aStar;
  Li.forEach((el) => {
    el.style = "";
  });
  document.querySelector(".a-star").style = "color: gold;";
  startAlg.innerHTML = "Visualize A*";
  alDis.innerHTML =
    "The <strong>A* Algerithm</strong> knows where the <strong>End Node</strong> is but does not see the <strong>walls</strong>.";
});

document.querySelector(".greedy").addEventListener("click", () => {
  clickLi();
  weightedAlg = true;
  noWeight.classList.remove("no-weight");
  activeAlg = greedyFirstSearch;
  Li.forEach((el) => {
    el.style = "";
  });
  document.querySelector(".greedy").style = "color: gold;";
  startAlg.innerHTML = "Visualize GFS";
  alDis.innerHTML =
    "The <strong>Greedt First Search Algerithm</strong>(GFS) knows where the <strong>End Node</strong> is and will always choose the <strong>closest node</strong> from the <strong>End Node</strong>.";
});

document.querySelector(".dfs").addEventListener("click", () => {
  clickLi();
  clearWeights();
  weightedAlg = false;
  noWeight.classList.add("no-weight");
  activeAlg = dfs;
  Li.forEach((el) => {
    el.style = "";
  });
  document.querySelector(".dfs").style = "color: gold;";
  startAlg.innerHTML = "Visualize DFS";
  alDis.innerHTML =
    "The <strong>Depth First Search Algerithm</strong>(DFS) chooses its next node <strong>by direction.</strong> It will go <strong>Down First</strong> followed by <strong>Right, Up and last Left</strong>.";
});

document.querySelector(".bfs").addEventListener("click", () => {
  clickLi();
  weightedAlg = false;
  noWeight.classList.add("no-weight");
  clearWeights();
  activeAlg = bfs;
  Li.forEach((el) => {
    el.style = "";
  });
  document.querySelector(".bfs").style = "color: gold;";
  startAlg.innerHTML = "Visualize BFS";
  alDis.innerHTML =
    "The <strong>Breath First Search Algerithm</strong>(DFS) chooses the <strong>Last Unchecked Neighbor</strong> It looks a lot like the <strong>Dijsktra Algorithm</strong> but doesn't check the <strong>F-score</strong>.";
});

document.querySelector(".prim").addEventListener("click", () => {
  clickLi();
  prim();
});

document.querySelector(".rec-back").addEventListener("click", () => {
  clickLi();
  recBacktack();
});

document.querySelector(".rec-div").addEventListener("click", () => {
  clickLi();
  recDivision();
});

document.querySelector(".hor-div").addEventListener("click", () => {
  clickLi();
  horRecDivision();
});

document.querySelector(".ver-div").addEventListener("click", () => {
  clickLi();
  verRecDivision();
});

document.querySelector("#speed").addEventListener("change", () => {
  if (document.querySelector("#speed").value == 0) {
    delay = 1000;
    animation = "animation: search 3s ease;";
    sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
  } else if (document.querySelector("#speed").value == 1) {
    delay = 100;
    animation = "animation: search 2s ease;";
    sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
  } else if (document.querySelector("#speed").value == 2) {
    delay = 1;
    animation = "animation: search 1.5s ease;";
    sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
  } else if (document.querySelector("#speed").value == 3) {
    delay = 0;
    animation = "";
    sleep = async () => {};
  }
});

let tutPage = 1;

const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");
const skipBtn = document.querySelector(".skip-tutorial");
const tutBtn = document.querySelector(".tut-btn");
const tutorial = document.querySelector(".tutorial");
const tutorialCard = document.querySelector(".tutorial-page");

skipBtn.addEventListener("click", () => {
  tutorial.style = "display: none;";
});

tutBtn.addEventListener("click", () => {
  tutorial.style = "display: flex;";
});

const showPage = () => {
  if (tutPage == 1) {
    tutorialCard.innerHTML = `<div class="tut-counter">1/7</div>
    <h1>Welcome to the Pathfinding Algorithm Visualizer</h1>
    <p>This short tutorial will walk you through all the features of this application.</p>
    <img src="./images/path-logo.png" alt="">`;
  } else if (tutPage == 2) {
    tutorialCard.innerHTML = `<div class="tut-counter">2/7</div>
    <h1>What is a Pathfinding Algorithm?</h1>
    <p>Basically, a Pathfinding Algoritm tries to find the shortest path from <strong>Point A <i class="fas fa-angle-right start"></i></strong> to <strong>Point B <i class="fas fa-map-marker-alt end"></i></strong>.<br>This Application will visualize how various algoritms try to find the best path.</p>
    <p>All algoritms are based on a 2D grid where each node has the same value. <br>You can click and drag the Start and End Node to the node you want.</p>
    <img src="./images/page2-gif.gif" alt="">`;
  } else if (tutPage == 3) {
    tutorialCard.innerHTML = `<div class="tut-counter">3/7</div>
    <h1>Choose an Algorithm</h1>
    <p>Hover over the "Choose Algorithm" drop down menu and select an algoritm you want to visualize. Every single one has an unique approach on how to find the end.</p>
    <strong>Note that not all algorithms guarantee the shortest path.</strong>
    <p>Click on a algorithm from the "Add Maze Algorithm" drop down menu to genarate a randomized maze for the Pathfinding algorithm to solve.</p>
    <img src="./images/page3-gif.gif" alt="">`;
  } else if (tutPage == 4) {
    tutorialCard.innerHTML = `<div class="tut-counter">4/7</div>
    <h1>Adding Walls and Special Nodes</h1>
    <p><strong>Click and drag over the grid to draw Wall Nodes.</strong><br>Wall Nodes are impenetrable, meaning that a path cannot cross through them.<br><br><strong>Click and drag while pressing "W" to draw Weight Nodes.</strong><br>Weight Nodes are not impenetrable but slow down the algorithm. <strong>This only works with "weighted algorithms".</strong><br><strong>Click on a node while pressing a "Arrow-Key<img src="https://static.thenounproject.com/png/302301-200.png" style="width: 40px; position: relative; top: 15px;">" in the desired direction to add a Direction Node.</strong><br>Direction Nodes let a path only go the way it is pointing.</p>
    <img src="./images/page4-gif.gif" alt="">`;
  } else if (tutPage == 5) {
    tutorialCard.innerHTML = `<div class="tut-counter">5/7</div>
    <h1>Let me introduce you to the Algorithms</h1>
    <p><strong style="color: darkslateblue;">Weighed Algorithms:</strong><br>Weighted Algorithms use scores to ditermine what node it will "explore" next.<br><br><strong>F-score = </strong>The amount of nodes it took te get to that node. One point for each.<br><strong>H-score = </strong> The raw lenght between the Current Node and the End Node.<br><strong>G-score = </strong>F-score + H-score.</p>
    <p><strong>Dijkstra:</strong> Chooses the next node by its <strong>lowest F-score</strong>, meaning, the closest "Unvisited Node" from the Start node. Dijkstra guarantees the shortest path.<br><strong>A-star:</strong> Chooses its next node by the <strong>G-score</strong>. It will find the End Node quicker because it knows where it is. A-star guarantees the shortest path.<br><strong>Greedy First Search:</strong> Chooses its next node by the <strong>H-score</strong>, meaning it chooses the closest "Unvisited Node" from the End Node. GFS does not guarantees the shortest path.</p>
    <p><strong style="color: darkslateblue;">Unweigted Algorithms:</strong><br>Unweigted Algorithms choose there Nodes by pattern and <strong>can't use the Weighted Node.</strong></p>
    <p><strong>Depth First Search:</strong> From its current Node it will try to go <strong>down first</strong>. If down is no option it will go <strong>right, then up, then left.</strong> If the path finds a dead-end it will retrace to find the first "Unvisited Node". DFS does not guarantees the shortest path.<br><strong>Breath First Search:</strong> Chooses the last "Unchecked Neighbor" resulting in a simular effect as the Dijsktr Algorithm. BFS guarantees the shortest path.</p>`;
  } else if (tutPage == 6) {
    tutorialCard.innerHTML = `<div class="tut-counter">6/7</div>
    <h1>The possibilities are Endless</h1>
    <p>In the nav-bar you will find all the tools to play around with.<br>Click "restart" to reset the algorithm or click "clear walls" to get rid of all Wall, Weighed and Direction Nodes to start over.<br><br>Slide the speed-slider to slow down the algorithm and watch it work or speed it up for an instant result.</p>
    <img src="./images/tut-bar.png" style="width: 100%; padding: 100px 0;">`;
  } else if (tutPage == 7) {
    tutorialCard.innerHTML = `<div class="tut-counter">7/7</div>
    <h1>Enjoy!</h1>
    <p>Go on and explore this application. I hope you have as much fun as I did making it! To see the tutorial again click on the <i class="far fa-question-circle" style="color: darkslateblue;"></i> in the top-right corner.</p>
    <p>If you want to see the source code, visit my <a href="https://github.com/JonkersDev" target="_blank">Github Acount.</a></p>`;
  }
};

nextBtn.addEventListener("click", () => {
  tutPage++;
  if (tutPage > 7) {
    tutPage = 1;
    tutorial.style = "display: none;";
  }
  showPage();
});

previousBtn.addEventListener("click", () => {
  tutPage--;
  if (tutPage < 1) {
    tutPage = 1;
  }
  showPage();
});
