//Astar
const aStar = async () => {
  let start =
    currentGrid[startNode.parentElement.getAttribute("data-y")][
      startNode.parentElement.getAttribute("data-x")
    ];
  let end =
    currentGrid[endNode.parentElement.getAttribute("data-y")][
      endNode.parentElement.getAttribute("data-x")
    ];

  openSet.push(start);
  while (openSet.length > 0) {
    await sleep(delay);
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    let current = openSet[winner];

    if (current == end) {
      let path = [];
      let temp = current;
      path.push(end);
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      let color = 100 / path.length;
      let tempColor = color;
      for (i = path.length - 1; i > 0; i--) {
        tempColor = tempColor + color;
        await sleep(delay);
        let p = path[i];
        document.querySelector(
          `.co-x${p.x}y${p.y}`
        ).style = `width: ${blockSize}px; height: ${blockSize}px; background-color: rgba(255, ${
          255 - tempColor
        }, ${100 - tempColor}); animation: path .6s ease`;
      }
      break;
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + 1;

        let newPath = false;

        if (openSet.includes(neighbor) && neighbor.weight == false) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else if (neighbor.up == true) {
          if (current.y > neighbor.y) {
            document.querySelector(
              `.co-x${neighbor.x}y${neighbor.y}`
            ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
        } else if (neighbor.down == true) {
          if (current.y < neighbor.y) {
            document.querySelector(
              `.co-x${neighbor.x}y${neighbor.y}`
            ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
        } else if (neighbor.left == true) {
          if (current.x > neighbor.x) {
            document.querySelector(
              `.co-x${neighbor.x}y${neighbor.y}`
            ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
        } else if (neighbor.right == true) {
          if (current.x < neighbor.x) {
            document.querySelector(
              `.co-x${neighbor.x}y${neighbor.y}`
            ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
        } else {
          document.querySelector(
            `.co-x${neighbor.x}y${neighbor.y}`
          ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
          neighbor.g = tempG;
          if (neighbor.weight == true) {
            neighbor.g = neighbor.g + 15;
          }
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  }
};

//Dijstra
const dijkstra = async () => {
  let start =
    currentGrid[startNode.parentElement.getAttribute("data-y")][
      startNode.parentElement.getAttribute("data-x")
    ];
  let end =
    currentGrid[endNode.parentElement.getAttribute("data-y")][
      endNode.parentElement.getAttribute("data-x")
    ];

  openSet.push(start);
  while (openSet.length > 0) {
    await sleep(delay);
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    let current = openSet[winner];

    if (current == end) {
      let path = [];
      let temp = current;
      path.push(end);
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      let color = 100 / path.length;
      let tempColor = color;
      for (i = path.length - 1; i > 0; i--) {
        tempColor = tempColor + color;
        await sleep(delay);
        let p = path[i];
        document.querySelector(
          `.co-x${p.x}y${p.y}`
        ).style = `width: ${blockSize}px; height: ${blockSize}px; background-color: rgba(255, ${
          255 - tempColor
        }, ${100 - tempColor}); animation: path .6s ease`;
      }
      break;
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + 1;

        let newPath = false;

        if (openSet.includes(neighbor)) {
          if (
            tempG < neighbor.g &&
            neighbor.weight == false &&
            neighbor.up == false
          ) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else if (neighbor.up == true) {
          if (current.y > neighbor.y) {
            document.querySelector(
              `.co-x${neighbor.x}y${neighbor.y}`
            ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
        } else if (neighbor.down == true) {
          if (current.y < neighbor.y) {
            document.querySelector(
              `.co-x${neighbor.x}y${neighbor.y}`
            ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
        } else if (neighbor.left == true) {
          if (current.x > neighbor.x) {
            document.querySelector(
              `.co-x${neighbor.x}y${neighbor.y}`
            ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
        } else if (neighbor.right == true) {
          if (current.x < neighbor.x) {
            document.querySelector(
              `.co-x${neighbor.x}y${neighbor.y}`
            ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
        } else {
          document.querySelector(
            `.co-x${neighbor.x}y${neighbor.y}`
          ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
          neighbor.g = tempG;
          if (neighbor.weight == true) {
            neighbor.g = neighbor.g + 15;
          }
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.f = neighbor.g;
          neighbor.previous = current;
        }
      }
    }
  }
};

//greedy first best
const greedyFirstSearch = async () => {
  let start =
    currentGrid[startNode.parentElement.getAttribute("data-y")][
      startNode.parentElement.getAttribute("data-x")
    ];
  let end =
    currentGrid[endNode.parentElement.getAttribute("data-y")][
      endNode.parentElement.getAttribute("data-x")
    ];

  openSet.push(start);
  while (openSet.length > 0) {
    await sleep(delay);
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    let current = openSet[winner];

    if (current == end) {
      let path = [];
      let temp = current;
      path.push(end);
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      let color = 100 / path.length;
      let tempColor = color;
      for (i = path.length - 1; i > 0; i--) {
        tempColor = tempColor + color;
        await sleep(delay);
        let p = path[i];
        document.querySelector(
          `.co-x${p.x}y${p.y}`
        ).style = `width: ${blockSize}px; height: ${blockSize}px; background-color: rgba(255, ${
          255 - tempColor
        }, ${100 - tempColor}); animation: path .6s ease`;
      }
      break;
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g;

        let newPath = false;

        if (openSet.includes(neighbor) && neighbor.weight == false) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else if (neighbor.up == true) {
          if (current.y > neighbor.y) {
            document.querySelector(
              `.co-x${neighbor.x}y${neighbor.y}`
            ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
        } else if (neighbor.down == true) {
          if (current.y < neighbor.y) {
            document.querySelector(
              `.co-x${neighbor.x}y${neighbor.y}`
            ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
        } else if (neighbor.left == true) {
          if (current.x > neighbor.x) {
            document.querySelector(
              `.co-x${neighbor.x}y${neighbor.y}`
            ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
        } else if (neighbor.right == true) {
          if (current.x < neighbor.x) {
            document.querySelector(
              `.co-x${neighbor.x}y${neighbor.y}`
            ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
        } else {
          document.querySelector(
            `.co-x${neighbor.x}y${neighbor.y}`
          ).style = `width: ${blockSize}px; height: ${blockSize}px;  background-color: cyan; ${animation}`;
          neighbor.g = tempG;
          if (neighbor.weight == true) {
            neighbor.g = neighbor.g + 15;
          }
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  }
};

//Depth First Search
const dfs = async (node) => {
  let start =
    currentGrid[startNode.parentElement.getAttribute("data-y")][
      startNode.parentElement.getAttribute("data-x")
    ];
  let end =
    currentGrid[endNode.parentElement.getAttribute("data-y")][
      endNode.parentElement.getAttribute("data-x")
    ];

  let current = start;

  while (current != end) {
    await sleep(delay);
    current.visit = true;
    document.querySelector(
      `.co-x${current.x}y${current.y}`
    ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
    let neighbors = current.neighbors;
    let path = false;
    for (i = 0; i < current.neighbors.length; i++) {
      if (neighbors[i].visit === false && neighbors[i].wall === false) {
        path = true;
        if (
          current.y < neighbors[i].y &&
          neighbors[i].up == false &&
          neighbors[i].left == false &&
          neighbors[i].right == false
        ) {
          neighbors[i].previous = current;
          current = neighbors[i];
          break;
        } else if (
          current.x < neighbors[i].x &&
          neighbors[i].up == false &&
          neighbors[i].left == false &&
          neighbors[i].down == false
        ) {
          neighbors[i].previous = current;
          current = neighbors[i];
          break;
        } else if (
          current.y > neighbors[i].y &&
          neighbors[i].down == false &&
          neighbors[i].left == false &&
          neighbors[i].right == false
        ) {
          neighbors[i].previous = current;
          current = neighbors[i];
          break;
        } else if (
          current.x > neighbors[i].x &&
          neighbors[i].up == false &&
          neighbors[i].down == false &&
          neighbors[i].right == false
        ) {
          neighbors[i].previous = current;
          current = neighbors[i];
          break;
        }
      }
    }
    if (path === false) {
      current = current.previous;
    }
    if (current == end) {
      let path = [];
      let temp = current;
      path.push(end);
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      let color = 100 / path.length;
      let tempColor = color;
      for (i = path.length - 1; i > 0; i--) {
        tempColor = tempColor + color;
        await sleep(delay);
        let p = path[i];
        document.querySelector(
          `.co-x${p.x}y${p.y}`
        ).style = `width: ${blockSize}px; height: ${blockSize}px; background-color: rgba(255, ${
          255 - tempColor
        }, ${100 - tempColor}); animation: path .6s ease`;
      }
    }
  }
};

//Breath First Search
const bfs = async (node) => {
  let start =
    currentGrid[startNode.parentElement.getAttribute("data-y")][
      startNode.parentElement.getAttribute("data-x")
    ];
  let end =
    currentGrid[endNode.parentElement.getAttribute("data-y")][
      endNode.parentElement.getAttribute("data-x")
    ];

  let current = start;
  let toSearch = [];

  while (current != end) {
    await sleep(delay);
    current.visit = true;
    document.querySelector(
      `.co-x${current.x}y${current.y}`
    ).style = `width: ${blockSize}px; height: ${blockSize}px;background-color: cyan; ${animation}`;
    let neighbors = current.neighbors;
    for (i = 0; i < current.neighbors.length; i++) {
      if (neighbors[i].visit === false && neighbors[i].wall === false) {
        if (neighbors[i].up == true) {
          if (current.y > neighbors[i].y) {
            neighbors[i].previous = current;
            toSearch.push(neighbors[i]);
          }
        } else if (neighbors[i].down == true) {
          if (current.y < neighbors[i].y) {
            neighbors[i].previous = current;
            toSearch.push(neighbors[i]);
          }
        } else if (neighbors[i].left == true) {
          if (current.x > neighbors[i].x) {
            neighbors[i].previous = current;
            toSearch.push(neighbors[i]);
          }
        } else if (neighbors[i].right == true) {
          if (current.x < neighbors[i].x) {
            neighbors[i].previous = current;
            toSearch.push(neighbors[i]);
          }
        } else {
          neighbors[i].previous = current;
          toSearch.push(neighbors[i]);
        }
      }
    }
    removeFromArray(toSearch, current);
    current = toSearch[0];
    if (current == end) {
      let path = [];
      let temp = current;
      path.push(end);
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
        if (temp === start) {
          break;
        }
      }
      let color = 100 / path.length;
      let tempColor = color;
      for (i = path.length - 1; i > 0; i--) {
        tempColor = tempColor + color;
        await sleep(delay);
        let p = path[i];
        document.querySelector(
          `.co-x${p.x}y${p.y}`
        ).style = `width: ${blockSize}px; height: ${blockSize}px; background-color: rgba(255, ${
          255 - tempColor
        }, ${100 - tempColor}); animation: path .6s ease`;
      }
    }
  }
};
