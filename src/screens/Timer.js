import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components/native";
import styled from "styled-components/native";
import * as Progress from "react-native-progress";

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

const PieContainer = styled.TouchableOpacity``;
const Timer = () => {
  const theme = useContext(ThemeContext);
  const [progress, setProgress] = useState(0.3);
  const getAngle = (x, y) => {
    let angle = 0;
    if (x >= 0) {
      angle = 90 - Math.atan(y / x) * (180 / Math.PI);
    } else {
      angle = 270 - Math.atan(y / x) * (180 / Math.PI);
    }
    return angle;
  };

  const setTime = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    const x = locationX - 150;
    const y = 150 - locationY;

    const newProgress = getAngle(x, y) / 360;
    setProgress(newProgress);
  };

  return (
    <Container>
      <Title>Timer Page</Title>
      <PieContainer onPress={setTime}>
        <Progress.Pie progress={progress} size={300} color={theme.red} />
      </PieContainer>
    </Container>
  );
};

export default Timer;
