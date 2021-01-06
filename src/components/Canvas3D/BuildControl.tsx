import { Cylinder, Text } from "@react-three/drei";
import { MeshProps, MouseEvent } from "react-three-fiber";

interface IBuildControlProps extends MeshProps {
  isActive: boolean;
  isHovered: boolean;
  text?: string;
  onSelect: () => void;
  onHover: () => void;
  onHoverOut: () => void;
}

function BuildControl(props: IBuildControlProps) {
  const onClick = (event: MouseEvent) => {
    event.stopPropagation();
    props.onSelect();
  };
  const onPointerOver = () => {
    props.onHover();
  };
  const onPointerOut = () => {
    props.onHoverOut();
  };

  return (
    <group>
      <Text
        position={[1, 0, 2]}
        color="black" // default
      >
        {props.text}
      </Text>
      <Cylinder
        {...props}
        args={[0.15, 0.15, 0.15, 32]}
        rotation={[1.66, 0, 0]}
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <meshStandardMaterial
          attach="material"
          color={props.isHovered ? "blue" : "red"}
        />
      </Cylinder>
    </group>
  );
}
export default BuildControl;
