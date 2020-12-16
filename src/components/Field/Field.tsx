import { connect } from "react-redux";
import { ICell } from "store/interfaces";
import { IRootState } from "store/store";
import Cell from "./Cell";

interface IStateProps {
  cells: ICell[][];
}

interface IDispatchProps {}

interface IOwnProps {
  zoom?: number;
}

interface IFieldProps extends IStateProps, IDispatchProps, IOwnProps {}

const mapState = (state: IRootState) => ({
  cells: state.field.cells,
});

const mapActions = {
  toggleOn: () => ({ type: "TOGGLE_IS_ON" }),
};

function Field({ cells, zoom = 1 }: IFieldProps) {
  const items = cells.map((column) => {
    const items = column.map((cell) => <Cell coords={cell.coords} />);
    return <div>{items}</div>;
  });

  return <div>{items}</div>;
}

export default connect(mapState, mapActions)(Field);
