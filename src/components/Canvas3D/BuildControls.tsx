import { useEffect, useState } from "react";
import { MeshProps } from "react-three-fiber";
import { IFieldCell, IFieldRouteKey } from "store/interfaces";
import { useSpring, a } from "@react-spring/three";
import BuildControl from "./BuildControl";
import { buildRoute } from "store/slices/fieldSlice";

import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { IRootState, useAppDispatch } from "store/store";
import { Cylinder } from "@react-three/drei";

interface IBuildControlsProps extends MeshProps {
  cell: IFieldCell;
}

function BuildControls(props: IBuildControlsProps) {
  const dispatch = useAppDispatch();
  const controlsCircleRadius = 1;
  const field = useSelector((state: IRootState) => state.field);

  useEffect(() => {
    setActive(1);
  }, []);

  const [active, setActive] = useState(0);
  const { spring } = useSpring({
    config: { mass: 2, tension: 1000, friction: 35, precision: 0.0001 },
    spring: active,
  });

  const scale = spring.to([0, 1.1], [0, 1.1]);
  const [hoveredRoutes, setHoveredRoutes] = useState([] as IFieldRouteKey[]);
  const [lastHoveredRoute, setLastHoveredRoute] = useState("");

  const onControlSelect = (routeKey: IFieldRouteKey) => {
    if (lastHoveredRoute !== "") {
      setHoveredRoutes([]);
      setLastHoveredRoute("");
      dispatch(buildRoute(routeKey));
    }
  };
  const onControlHover = (routeKey: IFieldRouteKey) => {
    setHoveredRoutes([...hoveredRoutes, routeKey]);
    setLastHoveredRoute(routeKey);
  };
  const onControlHoverOut = (routeKey: IFieldRouteKey) => {
    const newHovereRoutes = [...hoveredRoutes].filter((hoveredRouteKey) => {
      return hoveredRouteKey !== routeKey;
    });
    setHoveredRoutes(newHovereRoutes);
    setLastHoveredRoute(newHovereRoutes[newHovereRoutes.length - 1]);
  };

  const controlItems = props.cell.routes
    .filter((routeKey) => {
      const route = field.routes[routeKey];
      return !route.exists;
    })
    .map((routeKey) => {
      const route = field.routes[routeKey];
      const curve = field.curveTypes[route.curve];
      // debugger;
      // const cellFromCoords = field.cells[route.from].coords;
      const position: [x: number, y: number, z: number] = [
        curve.controlX * controlsCircleRadius,
        curve.controlY * controlsCircleRadius,
        0,
      ];
      // const route: IRoute = {
      //   from: props.cell.coords,
      //   to: [props.cell.coords[0] + item[3], props.cell.coords[1] + item[4]],
      //   curve: item[5],
      // };
      return (
        <BuildControl
          onHover={() => {
            onControlHover(route.key);
          }}
          onHoverOut={() => {
            onControlHoverOut(route.key);
          }}
          onSelect={() => {
            onControlSelect(route.key);
          }}
          isHovered={route.key === lastHoveredRoute}
          key={route.key}
          position={position}
          isActive={true}
          text={route.key}
        />
      );
    });

  return (
    <a.mesh position={props.position} scale-x={scale} scale-y={scale}>
      {controlItems}
      <Cylinder args={[0.15, 0.15, 0.15, 32]} rotation={[1.66, 0, 0]}>
        <meshStandardMaterial attach="material" color={"green"} />
      </Cylinder>
    </a.mesh>
  );
}
export default BuildControls;
