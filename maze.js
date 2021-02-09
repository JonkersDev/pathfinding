//Prims Maze
let options = [];
const backtrace = async (loc) => {
  await sleep(delay);
  loc.sideBlocks.forEach((block) => {
    if (block.visit === false) {
      block.previous = loc;
      options.push(block);
    }
  });
  if (options.length > 0) {
    let pick = options[Math.floor(Math.random() * options.length)];

    removeFromArray(options, pick);
    return pick;
  } else if (options == 0) {
    loc = loc.previous;
    backtrace(loc);
  }
};

const prim = async () => {
  clearBoard();
  let blockGrid = [];
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
    blockGrid.push(blockRow);
    blockRow = [];
    col = 0;
    row = row + 2;
  }

  let arrIdx = 0;

  blockGrid.forEach((arr) => {
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
        arr[i].sideBlocks.push(blockGrid[arrIdx - 1][i]);
      } else {
        let side = {};
        side.visit = true;
        arr[i].sideBlocks.push(side);
      }
      if (arrIdx < blockGrid.length - 1) {
        arr[i].sideBlocks.push(blockGrid[arrIdx + 1][i]);
      } else {
        let side = {};
        side.visit = true;
        arr[i].sideBlocks.push(side);
      }
    }
    arrIdx++;
  });

  currentGrid.forEach((row) => {
    row.forEach((s) => {
      s.wall = true;
      document.querySelector(
        `.co-x${s.x}y${s.y}`
      ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px;`;
    });
  });

  let visitArr = [];

  blockGrid.forEach((arr) => {
    arr.forEach((block) => {
      visitArr.push(block);
    });
  });

  let current = blockGrid[0][0];
  current[2].wall = false;
  document.querySelector(
    `.co-x${current[2].x}y${current[2].y}`
  ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;  animation: enlarge 1.5s ease;`;
  current.visit = true;
  removeFromArray(visitArr, current);

  let currentMaze;

  while (visitArr.length > 0) {
    current = await backtrace(current);
    current.visit = true;
    removeFromArray(visitArr, current);

    if (current == current.previous.sideBlocks[3]) {
      currentMaze = current[1];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;  animation: disapair 1.5s ease;`;
      currentMaze = current[2];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;  animation: disapair 1.5s ease;`;
    } else if (current == current.previous.sideBlocks[2]) {
      currentMaze = current.previous[1];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;  animation: disapair 1.5s ease;`;
      currentMaze = current[2];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;  animation: disapair 1.5s ease;`;
    } else if (current == current.previous.sideBlocks[1]) {
      currentMaze = current[3];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;  animation: disapair 1.5s ease;`;
      currentMaze = current[2];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;  animation: disapair 1.5s ease;`;
    } else if (current == current.previous.sideBlocks[0]) {
      currentMaze = current.previous[3];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;  animation: disapair 1.5s ease;`;
      currentMaze = current[2];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;  animation: disapair 1.5s ease;`;
    }
  }
};

//Recursive Backtracker
let previousPath = [];
let option = [];
const pathtrace = async (loc) => {
  option = [];
  await sleep(delay);
  loc.sideBlocks.forEach((block) => {
    if (block.visit === false) {
      block.previous = loc;
      option.push(block);
    }
  });
  if (option.length > 0) {
    let pick = option[Math.floor(Math.random() * option.length)];

    removeFromArray(option, pick);
    pick.visit = true;
    previousPath.push(pick);
    return pick;
  } else if (option == 0) {
    loc = pathtrace(loc.previous);
    return loc;
  }
};

const recBacktack = async () => {
  clearBoard();
  let blockGrid = [];
  let row = 0;
  let col = 0;
  //divide grid in blocks of 4
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
    blockGrid.push(blockRow);
    blockRow = [];
    col = 0;
    row = row + 2;
  }

  let arrIdx = 0;

  blockGrid.forEach((arr) => {
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
        arr[i].sideBlocks.push(blockGrid[arrIdx - 1][i]);
      } else {
        let side = {};
        side.visit = true;
        arr[i].sideBlocks.push(side);
      }
      if (arrIdx < blockGrid.length - 1) {
        arr[i].sideBlocks.push(blockGrid[arrIdx + 1][i]);
      } else {
        let side = {};
        side.visit = true;
        arr[i].sideBlocks.push(side);
      }
    }
    arrIdx++;
  });

  currentGrid.forEach((row) => {
    row.forEach((s) => {
      s.wall = true;
      document.querySelector(
        `.co-x${s.x}y${s.y}`
      ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px;`;
    });
  });

  let visitArr = [];

  blockGrid.forEach((arr) => {
    arr.forEach((block) => {
      visitArr.push(block);
    });
  });

  let current = blockGrid[0][0];
  current[2].wall = false;
  document.querySelector(
    `.co-x${current[2].x}y${current[2].y}`
  ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;animation: disapair 1.5s ease;`;
  current.visit = true;
  removeFromArray(visitArr, current);

  let currentMaze;

  while (visitArr.length > 0) {
    current = await pathtrace(current);
    removeFromArray(visitArr, current);
    if (current == current.previous.sideBlocks[3]) {
      currentMaze = current[1];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px; animation: disapair 1.5s ease;`;
      currentMaze = current[2];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px; animation: disapair 1.5s ease;`;
    } else if (current == current.previous.sideBlocks[2]) {
      currentMaze = current.previous[1];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px; animation: disapair 1.5s ease;`;
      currentMaze = current[2];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px; animation: disapair 1.5s ease;`;
    } else if (current == current.previous.sideBlocks[1]) {
      currentMaze = current[3];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px; animation: disapair 1.5s ease;`;
      currentMaze = current[2];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px; animation: disapair 1.5s ease;`;
    } else if (current == current.previous.sideBlocks[0]) {
      currentMaze = current.previous[3];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px; animation: disapair 1.5s ease;`;
      currentMaze = current[2];
      currentMaze.wall = false;
      document.querySelector(
        `.co-x${currentMaze.x}y${currentMaze.y}`
      ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px; animation: disapair 1.5s ease;`;
    }
  }
};

//Recursive Division
const recDivision = async () => {
  clearBoard();

  blockGrid[0].forEach((block) => {
    block[0].wall = true;
    block[1].wall = true;
    document.querySelector(
      `.co-x${block[0].x}y${block[0].y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
    document.querySelector(
      `.co-x${block[1].x}y${block[1].y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  });

  for (i = 0; i < currentGrid.length; i++) {
    currentGrid[i][0].wall = true;
    document.querySelector(
      `.co-x${currentGrid[i][0].x}y${currentGrid[i][0].y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  }

  for (i = 0; i < currentGrid.length; i++) {
    currentGrid[i][currentGrid[0].length - 1].wall = true;
    document.querySelector(
      `.co-x${currentGrid[i][currentGrid[0].length - 1].x}y${
        currentGrid[i][currentGrid[0].length - 1].y
      }`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  }

  currentGrid[rows - 1].forEach((cell) => {
    cell.wall = true;
    document.querySelector(
      `.co-x${cell.x}y${cell.y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  });

  division(
    blockGrid[0][0],
    blockGrid[blockGrid.length - 1][blockGrid[0].length - 1]
  );
};
let direction = 0;
const division = async (a, b) => {
  await sleep(delay);

  // let direction = Math.floor(Math.random() * 2)

  if (direction == 0) {
    direction = 1;
    let divide = Math.floor(Math.random() * (b.y - a.y - 1) + (a.y + 1));

    let line = b.x - a.x;

    for (i = a.x; i < b.x + 1; i++) {
      let divideLine = blockGrid[divide][i];
      divideLine[0].wall = true;
      divideLine[1].wall = true;
      document.querySelector(
        `.co-x${divideLine[0].x}y${divideLine[0].y}`
      ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
      document.querySelector(
        `.co-x${divideLine[1].x}y${divideLine[1].y}`
      ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
    }

    let pass = Math.floor(Math.random() * (line + 1));

    let passage = blockGrid[divide][a.x + pass];
    passage[1].wall = false;
    document.querySelector(
      `.co-x${passage[1].x}y${passage[1].y}`
    ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;`;

    if (a.y < divide - 1) {
      await division(a, blockGrid[divide - 1][b.x]);
    }
    if (b.y > divide) {
      await division(blockGrid[divide][a.x], b);
    }
  } else if (direction == 1) {
    direction = 0;
    let divide = Math.floor(Math.random() * (b.x - a.x - 1) + (a.x + 1));

    let line = b.y - a.y;

    for (i = a.y; i < b.y + 1; i++) {
      let divideLine = blockGrid[i][divide];
      divideLine[0].wall = true;
      divideLine[3].wall = true;
      document.querySelector(
        `.co-x${divideLine[0].x}y${divideLine[0].y}`
      ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
      document.querySelector(
        `.co-x${divideLine[3].x}y${divideLine[3].y}`
      ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
    }

    let pass = Math.floor(Math.random() * (line + 1));

    let passage = blockGrid[a.y + pass][divide];
    passage[3].wall = false;
    document.querySelector(
      `.co-x${passage[3].x}y${passage[3].y}`
    ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;`;

    if (a.x < divide - 1) {
      await division(a, blockGrid[b.y][divide - 1]);
    }
    if (b.x > divide) {
      await division(blockGrid[a.y][divide], b);
    }
  }
  return;
};

//Horizontal Division
const horRecDivision = async () => {
  clearBoard();

  blockGrid[0].forEach((block) => {
    block[0].wall = true;
    block[1].wall = true;
    document.querySelector(
      `.co-x${block[0].x}y${block[0].y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
    document.querySelector(
      `.co-x${block[1].x}y${block[1].y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  });

  for (i = 0; i < currentGrid.length; i++) {
    currentGrid[i][0].wall = true;
    document.querySelector(
      `.co-x${currentGrid[i][0].x}y${currentGrid[i][0].y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  }

  for (i = 0; i < currentGrid.length; i++) {
    currentGrid[i][currentGrid[0].length - 1].wall = true;
    document.querySelector(
      `.co-x${currentGrid[i][currentGrid[0].length - 1].x}y${
        currentGrid[i][currentGrid[0].length - 1].y
      }`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  }

  currentGrid[rows - 1].forEach((cell) => {
    cell.wall = true;
    document.querySelector(
      `.co-x${cell.x}y${cell.y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  });

  horDivision(
    blockGrid[0][0],
    blockGrid[blockGrid.length - 1][blockGrid[0].length - 1]
  );
};
const horDivision = async (a, b) => {
  await sleep(delay);

  let divide = Math.floor(Math.random() * (b.y - a.y - 1) + (a.y + 1));

  let line = b.x - a.x;

  for (i = a.x; i < b.x + 1; i++) {
    let divideLine = blockGrid[divide][i];
    divideLine[0].wall = true;
    divideLine[1].wall = true;
    document.querySelector(
      `.co-x${divideLine[0].x}y${divideLine[0].y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
    document.querySelector(
      `.co-x${divideLine[1].x}y${divideLine[1].y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  }

  let pass = Math.floor(Math.random() * (line + 1));

  let passage = blockGrid[divide][a.x + pass];
  passage[1].wall = false;
  document.querySelector(
    `.co-x${passage[1].x}y${passage[1].y}`
  ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;`;

  pass = Math.floor(Math.random() * (line + 1));

  passage = blockGrid[divide][a.x + pass];
  passage[1].wall = false;
  document.querySelector(
    `.co-x${passage[1].x}y${passage[1].y}`
  ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;`;

  if (a.y < divide - 1) {
    await horDivision(a, blockGrid[divide - 1][b.x]);
  }
  if (b.y > divide) {
    await horDivision(blockGrid[divide][a.x], b);
  }
};

//Vertical Division
const verRecDivision = async () => {
  clearBoard();

  blockGrid[0].forEach((block) => {
    block[0].wall = true;
    block[1].wall = true;
    document.querySelector(
      `.co-x${block[0].x}y${block[0].y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
    document.querySelector(
      `.co-x${block[1].x}y${block[1].y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  });

  for (i = 0; i < currentGrid.length; i++) {
    currentGrid[i][0].wall = true;
    document.querySelector(
      `.co-x${currentGrid[i][0].x}y${currentGrid[i][0].y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  }

  for (i = 0; i < currentGrid.length; i++) {
    currentGrid[i][currentGrid[0].length - 1].wall = true;
    document.querySelector(
      `.co-x${currentGrid[i][currentGrid[0].length - 1].x}y${
        currentGrid[i][currentGrid[0].length - 1].y
      }`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  }

  currentGrid[rows - 1].forEach((cell) => {
    cell.wall = true;
    document.querySelector(
      `.co-x${cell.x}y${cell.y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  });

  verDivision(
    blockGrid[0][0],
    blockGrid[blockGrid.length - 1][blockGrid[0].length - 1]
  );
};
const verDivision = async (a, b) => {
  await sleep(delay);
  let divide = Math.floor(Math.random() * (b.x - a.x - 1) + (a.x + 1));

  let line = b.y - a.y;

  for (i = a.y; i < b.y + 1; i++) {
    let divideLine = blockGrid[i][divide];
    divideLine[0].wall = true;
    divideLine[3].wall = true;
    document.querySelector(
      `.co-x${divideLine[0].x}y${divideLine[0].y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
    document.querySelector(
      `.co-x${divideLine[3].x}y${divideLine[3].y}`
    ).style = `background-color: black; border: none; width: ${blockSize}px; height: ${blockSize}px; animation: path 1.5s ease;`;
  }

  let pass = Math.floor(Math.random() * (line + 1));

  let passage = blockGrid[a.y + pass][divide];
  passage[3].wall = false;
  document.querySelector(
    `.co-x${passage[3].x}y${passage[3].y}`
  ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;`;

  pass = Math.floor(Math.random() * (line + 1));

  passage = blockGrid[a.y + pass][divide];
  passage[3].wall = false;
  document.querySelector(
    `.co-x${passage[3].x}y${passage[3].y}`
  ).style = `background-color: white; width: ${blockSize}px; height: ${blockSize}px;`;

  if (a.x < divide - 1) {
    await verDivision(a, blockGrid[b.y][divide - 1]);
  }
  if (b.x > divide) {
    await verDivision(blockGrid[a.y][divide], b);
  }
};
