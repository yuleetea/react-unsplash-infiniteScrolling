import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Unsplash = (props) => {
  const { url, key } = props;
  return (
    <>
      <Img src={url} key={key} alt="" />
    </>
  );
};

// please remember images require src / source in order for it to render to the screen

export default Unsplash;
