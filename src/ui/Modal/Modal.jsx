import styles from "./Modal.module.css";
import { HiXMark } from "react-icons/hi2";
import CreateCabinForm from "../../features/cabins/CreateCabinForm";
import { createContext, useContext, useState } from "react";
import { cloneElement } from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({ children }) {
  const [isOpenModal, setIsOpenModal] = useState("");

  const close = () => setIsOpenModal("");
  const open = setIsOpenModal;

  return (
    <ModalContext.Provider value={{ isOpenModal, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

const Open = ({ children, opens }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
};

function Window({ children, name }) {
  const { isOpenModal, close: onClose } = useContext(ModalContext);
  // const ref = useRef();
  // console.log(close(), "close");

  // useEffect(() => {
  //   document.addEventListener('click', handleClick)
  // }, []);
  if (name !== isOpenModal) return null;

  return createPortal(
    <div className={styles.overlay} onClick={() => onClose()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {cloneElement(children, { onClose })}
        <button className={styles.modalButton} onClick={() => onClose()}>
          <HiXMark />
        </button>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;

// import styled from "styled-components";

// const StyledModal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-lg);
//   box-shadow: var(--shadow-lg);
//   padding: 3.2rem 4rem;
//   transition: all 0.5s;
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   background-color: var(--backdrop-color);
//   backdrop-filter: blur(4px);
//   z-index: 1000;
//   transition: all 0.5s;
// `;

// const Button = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;
//   position: absolute;
//   top: 1.2rem;
//   right: 1.9rem;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     /* Sometimes we need both */
//     /* fill: var(--color-grey-500);
//     stroke: var(--color-grey-500); */
//     color: var(--color-grey-500);
//   }
// `;
