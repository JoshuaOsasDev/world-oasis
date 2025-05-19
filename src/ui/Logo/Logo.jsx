import styles from "./Logo.module.css";
// import styled from "styled-components";

// const StyledLogo = styled.div`
//   text-align: center;
// `;

// const Img = styled.img`
//   height: 9.6rem;
//   width: auto;
// `;

function Logo() {
  return (
    <div className={styles.logo}>
      <img src="/logo-light.png" alt="Logo" />
    </div>
  );
}

export default Logo;
