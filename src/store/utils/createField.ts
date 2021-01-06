import {
  CURVE,
  CURVE_TYPE_KEY,
  ICurveTypes,
  ICurveTypeKey,
  IField,
  IFieldCell,
  IFieldCellCoords,
  IFieldCellKey,
  IFieldRoute,
  IFieldRouteKey,
} from "store/interfaces";

const SIN30 = Math.sin(Math.PI / 6);
const SIN60 = Math.sin(Math.PI / 3);
const LEG = 0.5;
const LEG30 = SIN30 * LEG;
const LEG60 = SIN60 * LEG;

const S = CURVE.STRIGHT;
const L = CURVE.LEFT;
const R = CURVE.RIGHT;

export const curveTypes: ICurveTypes = {
  // TOP
  [CURVE_TYPE_KEY.T]: {
    key: CURVE_TYPE_KEY.T,
    backwardKey: CURVE_TYPE_KEY.B,
    controlX: 0,
    controlY: LEG,
    cellDiffX: 0,
    cellDiffY: 1,
    curve: S,
  },
  // TOP-TOP-RIGHT
  [CURVE_TYPE_KEY.TTR]: {
    key: CURVE_TYPE_KEY.TTR,
    backwardKey: CURVE_TYPE_KEY.LLB,
    controlX: LEG30,
    controlY: LEG60,
    cellDiffX: 1,
    cellDiffY: 1,
    curve: R,
  },
  // RIGHT-RIGHT-TOP
  [CURVE_TYPE_KEY.RRT]: {
    key: CURVE_TYPE_KEY.RRT,
    backwardKey: CURVE_TYPE_KEY.BBL,
    controlX: LEG60,
    controlY: LEG30,
    cellDiffX: 1,
    cellDiffY: 1,
    curve: L,
  },
  // RIGHT
  [CURVE_TYPE_KEY.R]: {
    key: CURVE_TYPE_KEY.R,
    backwardKey: CURVE_TYPE_KEY.L,
    controlX: LEG,
    controlY: 0,
    cellDiffX: 1,
    cellDiffY: 0,
    curve: S,
  },
  // RIGHT-RIGHT-BOTTOM
  [CURVE_TYPE_KEY.RRB]: {
    key: CURVE_TYPE_KEY.RRB,
    backwardKey: CURVE_TYPE_KEY.TTL,
    controlX: LEG60,
    controlY: -LEG30,
    cellDiffX: 1,
    cellDiffY: -1,
    curve: R,
  },
  // BOTTOM-BOTTOM-RIGHT
  [CURVE_TYPE_KEY.BBR]: {
    key: CURVE_TYPE_KEY.BBR,
    backwardKey: CURVE_TYPE_KEY.LLT,
    controlX: LEG30,
    controlY: -LEG60,
    cellDiffX: 1,
    cellDiffY: -1,
    curve: L,
  },
  // BOTTOM
  [CURVE_TYPE_KEY.B]: {
    key: CURVE_TYPE_KEY.B,
    backwardKey: CURVE_TYPE_KEY.T,
    controlX: 0,
    controlY: -LEG,
    cellDiffX: 0,
    cellDiffY: -1,
    curve: S,
  },
  // BOTTOM-BOTTOM-LEFT
  [CURVE_TYPE_KEY.BBL]: {
    key: CURVE_TYPE_KEY.BBL,
    backwardKey: CURVE_TYPE_KEY.RRT,
    controlX: -LEG30,
    controlY: -LEG60,
    cellDiffX: -1,
    cellDiffY: -1,
    curve: R,
  },
  // LEFT-LEFT-BOTTOM
  [CURVE_TYPE_KEY.LLB]: {
    key: CURVE_TYPE_KEY.LLB,
    backwardKey: CURVE_TYPE_KEY.TTR,
    controlX: -LEG60,
    controlY: -LEG30,
    cellDiffX: -1,
    cellDiffY: -1,
    curve: L,
  },
  // LEFT
  [CURVE_TYPE_KEY.L]: {
    key: CURVE_TYPE_KEY.L,
    backwardKey: CURVE_TYPE_KEY.R,
    controlX: -LEG,
    controlY: 0,
    cellDiffX: -1,
    cellDiffY: 0,
    curve: S,
  },
  // LEFT-LEFT-TOP
  [CURVE_TYPE_KEY.LLT]: {
    key: CURVE_TYPE_KEY.LLT,
    backwardKey: CURVE_TYPE_KEY.BBR,
    controlX: -LEG60,
    controlY: LEG30,
    cellDiffX: -1,
    cellDiffY: 1,
    curve: R,
  },
  // TOP-TOP-LEFT
  [CURVE_TYPE_KEY.TTL]: {
    key: CURVE_TYPE_KEY.TTL,
    backwardKey: CURVE_TYPE_KEY.RRB,
    controlX: -LEG30,
    controlY: LEG60,
    cellDiffX: -1,
    cellDiffY: 1,
    curve: L,
  },
};

function getCellKeyByCoords(coords: IFieldCellCoords) {
  return `${coords[0]},${coords[1]}` as IFieldCellKey;
}

function getRouteKey(
  fromCellKey: IFieldCellKey,
  toCellKey: IFieldCellKey,
  curveTypeKey: ICurveTypeKey
) {
  return `${fromCellKey},${toCellKey},${curveTypeKey}` as IFieldRouteKey;
}

function getCurveKeysByCoords(
  fromCoords: IFieldCellCoords,
  toCoords: IFieldCellCoords
) {
  const cellDiffX = toCoords[0] - fromCoords[0];
  const cellDiffY = toCoords[1] - fromCoords[1];
  const curveKeys: ICurveTypeKey[] = [];

  Object.entries(curveTypes).forEach(([key, curveType]) => {
    if (
      curveType.cellDiffX === cellDiffX &&
      curveType.cellDiffY === cellDiffY
    ) {
      curveKeys.push(curveType.key);
    }
  });
  return curveKeys;
}

function getNeighborsCoords(x = 0, y = 0, maxX = Infinity, maxY = Infinity) {
  const neighbors: IFieldCellCoords[] = [];
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

function getCellRoutes(cell: IFieldCell, maxX = Infinity, maxY = Infinity) {
  const routes: IFieldRoute[] = [];
  const [cellX, cellY] = cell.coords;
  const neighborsCoords = getNeighborsCoords(cellX, cellY, maxX, maxY);
  neighborsCoords.forEach((neighborCoords, index) => {
    // if (index > 0) {
    //   return;
    // }
    const neighborCurves = getCurveKeysByCoords(cell.coords, neighborCoords);
    const neighborKey = getCellKeyByCoords(neighborCoords);

    neighborCurves.forEach((curveKey, index) => {
      // if (index > 0) {
      //   return;
      // }
      const newRoute: IFieldRoute = {
        key: getRouteKey(cell.key, neighborKey, curveKey),
        from: cell.key,
        to: neighborKey,
        backward: getRouteKey(
          neighborKey,
          cell.key,
          curveTypes[curveKey].backwardKey
        ),
        curve: curveKey,
        exists: false,
      };
      routes.push(newRoute);
    });
  });
  return routes;
}

// function getRoutes(cell: IFieldCell, maxX = Infinity, maxY = Infinity) {
//   const routes: IFieldRoute[] = [];
//   const [cellX, cellY] = cell.coords;
//   const neighbors = getNeighbors(cellX, cellY, maxX, maxY);
//   neighbors.forEach((neighbor) => {
//     const key = `${neighbor.keys},`;
//     const newRoute: IFieldRoute = {
//       key,
//     };
//     routes.push();
//   });
//   return routes;
// }

function createField({ width = 8, height = 4 }) {
  const field: IField = {
    width,
    height,
    curveTypes,
    cells: {},
    routes: {},
  };
  for (let xIndex = 0; xIndex < width; xIndex++) {
    for (let yIndex = 0; yIndex < height; yIndex++) {
      const coords: IFieldCellCoords = [xIndex, yIndex];
      const key = getCellKeyByCoords(coords);
      let newCell: IFieldCell = {
        key,
        coords,
        routes: [],
      };
      getCellRoutes(newCell, width - 1, height - 1).forEach((route) => {
        newCell.routes.push(route.key);
        field.routes[route.key] = route;
      });
      // field.cells.push(newCell);
      field.cells[key] = newCell;
    }
  }
  return field;
}

export default createField;
