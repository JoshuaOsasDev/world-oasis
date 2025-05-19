import styles from "./Form.module.css";
function Form({ type = "default", children, onSubmit, ...props }) {
  // const formClass =
  //   styles.baseForm +
  //   " " +
  //   (type === "modal" ? styles.modalForm : styles.defaultForm);

  return (
    <form
      onSubmit={onSubmit}
      className={`${styles.baseForm} ${
        type === "modal" ? styles.modalForm : styles.defaultForm
      }`}
      {...props}
    >
      {children}
    </form>
  );
}

export default Form;
// import styled, { css } from "styled-components";

// const Form = styled.form`
//   ${(props) =>
//     props.type !== "modal" &&
//     css`
//       padding: 2.4rem 4rem;

//       /* Box */
//       background-color: var(--color-grey-0);
//       border: 1px solid var(--color-grey-100);
//       border-radius: var(--border-radius-md);
//     `}

//   ${(props) =>
//     props.type === "modal" &&
//     css`
//       width: 80rem;
//     `}

//   overflow: hidden;
//   font-size: 1.4rem;
// `;

// export default Form;
