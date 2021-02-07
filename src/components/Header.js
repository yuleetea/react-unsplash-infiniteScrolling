import React from "react";
import styled from "styled-components";

const HeaderStyle = styled.header`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 2rem;
  margin: 2rem;
`;

const Header = () => {
  return (
    <div>
      <HeaderStyle>
        <h1> Unsplash Image Search with Infinite Scrolling </h1>
        <br />
        <h3> The internet's source of freely-usable images </h3>
      </HeaderStyle>
    </div>
  );
};

export default Header;
