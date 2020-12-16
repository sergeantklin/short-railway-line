import { IField, ICell, ICellCoords } from "store/interfaces";

function getNeighbors(x = 0, y = 0, maxX = Infinity, maxY = Infinity) {
  const neighbors: ICellCoords[] = [];
  const xDiffs: number[] = [];
  if (x > 0) {
    xDiffs.push(-1);
  }
  xDiffs.push(0);
  if (x < maxX) {
    xDiffs.push(1);
  }
  if (y > 0) {
    xDiffs.forEach((idx) => {
      neighbors.push([x + idx, y - 1]);
    });
  }
  xDiffs.forEach((idx) => {
    if (idx !== 0) {
      neighbors.push([x + idx, y]);
    }
  });

  if (y < maxY) {
    xDiffs.forEach((idx) => {
      neighbors.push([x + idx, y + 1]);
    });
  }
  return neighbors;
}

function createField({ width = 6, height = 4 }) {
  const field: IField = {
    cells: [],
    width,
    height,
  };
  for (let xIdx = 0; xIdx < width; xIdx++) {
    field.cells.push([]);
    for (let yIdx = 0; yIdx < height; yIdx++) {
      let newCell: ICell = {
        coords: [xIdx, yIdx],
        neighbors: getNeighbors(xIdx, yIdx, width - 1, height - 1),
        routes: [],
      };
      field.cells[xIdx][yIdx] = newCell;
    }
  }
  return field;
}

export default createField;
