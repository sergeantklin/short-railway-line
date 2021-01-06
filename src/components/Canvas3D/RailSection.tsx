import { MeshProps } from "react-three-fiber";
function RailSection(props: MeshProps) {
  return (
    <mesh {...props}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"gray"} />
    </mesh>
  );
}
export default RailSection;
