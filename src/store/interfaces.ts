export enum TRAIN_STATES {
  READY,
  MOVING,
}

export interface ICellCoords {
  [index: number]: number;
}

export interface ITrain {
  state: TRAIN_STATES;
  targetCoords: ICellCoords[];
}

export interface ICell {
  coords: ICellCoords;
  neighbors: ICellCoords[];
  routes: ICellCoords[];
}

export interface IField {
  width: number;
  height: number;
  cells: ICell[][];
}
