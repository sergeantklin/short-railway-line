import { useState } from "react";
import { MeshProps, MouseEvent } from "react-three-fiber";
import { IFieldCell } from "store/interfaces";

interface IFieldCellProps extends MeshProps {
  cell: IFieldCell;
  onSelect: (cell: IFieldCell) => void;
  isBuilding: boolean;
}

function FieldCell(props: IFieldCellProps) {
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const onClick = (event: MouseEvent) => {
    props.onSelect(props.cell);
  };

  return (
    <mesh
      position={props.position}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onClick={onClick}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial color={hovered ? "yellow" : "orange"} />
    </mesh>
  );
}

export default FieldCell;
