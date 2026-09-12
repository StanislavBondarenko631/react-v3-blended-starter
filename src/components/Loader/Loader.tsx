import style from "./Loader.module.css";
import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={style.backdrop}>
      <ClipLoader color="#ffffff" size={50} />
    </div>
  );
}
