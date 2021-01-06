// CURVES

export enum CURVE {
  LEFT,
  RIGHT,
  STRIGHT,
}

export enum CURVE_TYPE_KEY {
  T = "T", // TOP
  TTR = "TTR", // TOP-TOP-RIGHT
  RRT = "RRT", // RIGHT-RIGHT-TOP
  R = "R", // RIGHT
  RRB = "RRB", // RIGHT-RIGHT-BOTTOM
  BBR = "BBR", // BOTTOM-BOTTOM-RIGHT
  B = "B", // BOTTOM
  BBL = "BBL", // BOTTOM-BOTTOM-LEFT
  LLB = "LLB", // LEFT-LEFT-BOTTOM
  L = "L", // LEFT
  LLT = "LLT", // LEFT-LEFT-TOP
  TTL = "TTL", // TOP-TOP-LEFT
}

export type ICurveTypeKey = CURVE_TYPE_KEY;

export interface ICurveType {
  key: ICurveTypeKey;
  backwardKey: ICurveTypeKey;
  controlX: number;
  controlY: number;
  cellDiffX: number;
  cellDiffY: number;
  curve: CURVE;
}

export interface ICurveTypes {
  [key: string]: ICurveType;
}

// TRAINS

export enum TRAIN_STATES {
  READY,
  MOVING,
}

export interface IFieldTrain {
  state: TRAIN_STATES;
  speed: number;
  target: IFieldCellKey[];
}

// CELLS

export type IFieldCellCoords = [x: number, y: number];

export type IFieldCellKey = `${number},${number}`;
export type IFieldRouteKey = `${IFieldCellKey},${IFieldCellKey},${ICurveTypeKey}`;

export interface IFieldCell {
  key: IFieldCellKey;
  coords: IFieldCellCoords;
  routes: IFieldRouteKey[];
}

// ROUTES

export interface IFieldRoute {
  key: IFieldRouteKey;
  backward: IFieldRouteKey;
  from: IFieldCellKey;
  to: IFieldCellKey;
  curve: ICurveTypeKey;
  exists: Boolean;
}

// FIELD

export interface IField {
  width: number;
  height: number;
  curveTypes: ICurveTypes;
  // cells: IFieldCell[];
  cells: { [key: string]: IFieldCell };
  routes: { [key: string]: IFieldRoute };
}
