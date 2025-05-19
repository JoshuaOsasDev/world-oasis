import styles from "./Sidebar.module.css";
import Logo from "../Logo/Logo";
import MainNav from "../MainNav/MainNav";
function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
