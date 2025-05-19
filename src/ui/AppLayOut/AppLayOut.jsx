import styles from "./AppLayOut.module.css";
import { Outlet } from "react-router-dom";
import Headers from "../Header/Headers";
import Sidebar from "../Sildebar/Sidebar";

function AppLayOut() {
  return (
    <div className={styles.appDiv}>
      <Headers />
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayOut;
