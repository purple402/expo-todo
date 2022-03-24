import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import * as Progress from "react-native-progress";
import propTypes from "prop-types";

const Container = styled.View`
  width: 100%;
  padding: 15px 5px 8px 5px;
  flex-direction: row;
`;

const BarContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const BarText = styled.Text`
  width: 40px;
  text-align: right;
  font-size: 15px;
  font-family: ${({ theme }) => theme.fontSub};
  padding: 3px 0 0 3px;
`;

const ProgressBar = ({ tasks }) => {
  const theme = useContext(ThemeContext);

  // 완료 비율 구하기
  const tasksValue = Object.values(tasks);
  const total = tasksValue.length;
  const completed = tasksValue.filter((task) => task.completed === true).length;

  let progress = 0;
  if (total !== 0) {
    progress = completed / total;
  }

  return (
    <Container>
      <BarContainer>
        <Progress.Bar
          progress={progress}
          width={null}
          height={8}
          color={theme.main}
        />
      </BarContainer>
      <BarText>
        {completed}/{total}
      </BarText>
    </Container>
  );
};

ProgressBar.propTypes = {
  tasks: propTypes.object.isRequired,
};

export default ProgressBar;
