import { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { IField } from "store/interfaces";
import { IRootState } from "store/store";
import Canvas3D from "../Canvas3D/Canvas3D";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

interface IStateProps {
  field: IField;
}

interface IDispatchProps {}

interface IOwnProps {}

interface IFieldProps extends IStateProps, IDispatchProps, IOwnProps {}

const mapState = (state: IRootState) => ({
  field: state.field,
});

const mapActions = {
  toggleOn: () => ({ type: "TOGGLE_IS_ON" }),
};

function Field({ field }: IFieldProps) {
  const [width, height] = useWindowSize();
  return (
    <Canvas3D
      field={field}
      canvasWidth={width}
      canvasHeight={height}
    ></Canvas3D>
  );
}

export default connect(mapState, mapActions)(Field);
