import React, { useEffect, useState } from "react";
import { Canvas, MeshProps } from "react-three-fiber";
import { IField, IFieldCell } from "store/interfaces";
import { PerspectiveCamera } from "@react-three/drei";
import BuildControls from "./BuildControls";
import FieldCell from "./FieldCell";
import { Provider, ReactReduxContext } from "react-redux";

interface ICanvasProps extends MeshProps {
  field: IField;
  canvasWidth: number;
  canvasHeight: number;
}

// function Box(props: MeshProps) {
//   // This reference will give us direct access to the mesh
//   const mesh = useRef<Mesh>();

//   // Set up state for the hovered and active state
//   const [hovered, setHover] = useState(false);
//   const [active, setActive] = useState(false);

//   // Rotate mesh every frame, this is outside of React without overhead
//   useFrame(() => {
//     // if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
//   });

//   const onClick = () => {};

//   return (
//     <mesh
//       {...props}
//       ref={mesh}
//       scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
//       onClick={onClick}
//       onPointerOver={(event) => setHover(true)}
//       onPointerOut={(event) => setHover(false)}
//     >
//       <boxBufferGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
//     </mesh>
//   );
// }

function Canvas3D(props: ICanvasProps) {
  const xCorrection = (props.field.width - 1) / 2;
  const yCorrection = (props.field.height - 1) / 2;
  const [zoom, setZoom] = useState(1);
  const [buildControlsPosition, setBuildControlsPosition] = useState([
    0,
    0,
    0,
  ] as [number, number, number]);
  const onCellSelect = (cell: IFieldCell) => {
    setActiveCellKey(cell.key);
    setBuildControlsPosition([
      cell.coords[0] - xCorrection,
      cell.coords[1] - yCorrection,
      0,
    ]);
    console.log(buildControlsPosition);
    // debugger;
  };
  // Object.entries(props.field.cells).map.   forEach(([key, curveType]) => {
  const cells = Object.entries(props.field.cells).map(([key, cell]) => (
    <FieldCell
      isBuilding={false}
      cell={cell}
      onSelect={onCellSelect}
      key={key}
      position={[cell.coords[0] - xCorrection, cell.coords[1] - yCorrection, 0]}
    />
  ));

  const [activeCellKey, setActiveCellKey] = useState("");
  useEffect(() => {
    const cellWidth = props.canvasWidth / props.field.width;
    const cellHeight = props.canvasHeight / props.field.height;
    setZoom(Math.min(cellHeight, cellWidth) / 17);
  }, [
    props.canvasHeight,
    props.canvasWidth,
    props.field.width,
    props.field.height,
  ]);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Canvas>
          <PerspectiveCamera
            makeDefault
            zoom={zoom}
            position={[0, -13, 50]}
            rotation={[0.256, 0, 0]}
          />
          <ambientLight />
          <pointLight position={[-10, 10, 5]} />
          <Provider store={store}>
            {activeCellKey !== "" && (
              <BuildControls
                key={props.field.cells[activeCellKey].key}
                cell={props.field.cells[activeCellKey]}
                position={buildControlsPosition}
              />
            )}
            {cells}
          </Provider>
        </Canvas>
      )}
    </ReactReduxContext.Consumer>
  );
}

export default Canvas3D;
