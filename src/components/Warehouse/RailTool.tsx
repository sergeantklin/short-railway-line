import { connect } from "react-redux";
import { mapFieldActions } from "store/slices/fieldSlice";

function RailTool(_props: any, _state: any) {
  function onClick() {
    _props.buildRoute();
  }
  return <div onClick={onClick}>test</div>;
}

export default connect(null, mapFieldActions)(RailTool);
