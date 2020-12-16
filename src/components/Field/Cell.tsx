import { ICellCoords } from "store/interfaces";

interface ICellProps {
  coords: ICellCoords;
}

function Cell({ coords }: ICellProps) {
  return (
    <div>
      {coords[0]};{coords[1]}
    </div>
  );
}

export default Cell;
