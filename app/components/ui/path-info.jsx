import { Link } from "react-router-dom";
import "../../css/path-info.css";

export default function PathInfo({ current }) {
  return (
    <div className="path-info">
      <Link to="/" className="path-info__home">Home</Link>
      <span className="path-info__divider">/</span>
      <span className="path-info__current">{current}</span>
    </div>
  );
}
