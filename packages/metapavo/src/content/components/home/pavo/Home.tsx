import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Pavo from "./index"

const Container = styled.div`
    position: absolute;
    width: 303px;
    height: 100%;
    right: 0;
    background-color: #fff;
`

const Home = () => {
  return (
    <Container>
        <Pavo />
    </Container>
  );
};

export default Home;
