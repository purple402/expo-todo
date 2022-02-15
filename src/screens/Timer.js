import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components/native";
import styled from "styled-components/native";
const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.main};
  font-size: 40px;
  margin: 10px 0 30px 0;
`;

const Timer = () => {
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <Title>Timer Page</Title>
    </Container>
  );
};

export default Timer;
