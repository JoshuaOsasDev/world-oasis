import styles from "./Menus.module.css";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";

const MenusContext = createContext();

function Menus({ children }) {
  const [isOpenId, setIsOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const open = setIsOpenId;
  const close = () => setIsOpenId("");

  return (
    <MenusContext.Provider
      value={{ isOpenId, open, close, setPosition, position }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function List({ id, children }) {
  const { isOpenId, position } = useContext(MenusContext);
  if (isOpenId !== id) return null;
  const { x, y } = position;
  // console.log(x, y);
  return createPortal(
    <ul className={styles.styledList} style={{ top: x, left: y }}>
      {children}
    </ul>,
    document.body
  );
}

function Toggle({ id }) {
  const { isOpenId, open, close, setPosition } = useContext(MenusContext);

  const handleClick = (e) => {
    const react = e.target.closest("button").getBoundingClientRect();
    // console.log(react);

    setPosition({
      x: react.bottom + window.scrollX,
      y: react.left + window.scrollY,
    });

    // setPosition();

    isOpenId === "" || isOpenId !== id ? open(id) : close();
  };

  return (
    <button className={styles.styledToggle} onClick={handleClick}>
      <HiEllipsisVertical />
    </button>
  );
}

function Button({ children, onClick, icon, disabled }) {
  const { close } = useContext(MenusContext);
  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <button
      className={styles.styledButton}
      onClick={handleClick}
      disabled={disabled}
    >
      <span>{icon}</span> {children}
    </button>
  );
}

Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;

export default Menus;
