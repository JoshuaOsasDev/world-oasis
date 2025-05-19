// import styled from "styled-components";

// const LoginLayout = styled.main`
//   min-height: 100vh;
//   display: grid;
//   grid-template-columns: 48rem;
//   align-content: center;
//   justify-content: center;
//   gap: 3.2rem;
//   background-color: var(--color-grey-50);
// `;

// function Login() {
//   return <LoginLayout>Login</LoginLayout>;
// }

// export default Login;
import styles from "./Loginn.module.css";
function Login() {
  return <main className={styles.main}>Login</main>;
}

export default Login;
