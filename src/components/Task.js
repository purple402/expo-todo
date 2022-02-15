import React from 'react';
import styled from 'styled-components/native';
import propTypes from 'prop-types';

import IconButton from './IconButton';
import Input from './Input';
import { Icons } from '../Icons';

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  margin: 2px 0;
`;

const StyledText = styled.Text`
  color: ${({ theme, completed }) => (completed ? theme.gray : theme.black)};
  font-size: 19px;
  flex: 1;
  padding: 0 7px;
  font-family: ${({ theme }) => theme.fontSub};
`;

const Line = styled.View`
  position: absolute;
  width: 91%;
  height: 2px;
  top: 15px;
  left: 35px;
  background-color: ${({ theme }) => theme.red};
`;

const Task = ({ toggleTask, deleteTask, item }) => {
  return (
    <Container>
      <IconButton
        icon={item.completed ? Icons.checked : Icons.unchecked}
        onPress={toggleTask}
        item={item}
      />
      <StyledText completed={item.completed}>{item.text}</StyledText>
      {item.completed && <Line />}
      <IconButton icon={Icons.delete} item={item} onPress={deleteTask} />
    </Container>
  );
};

Task.propTypes = {
  toggleTask: propTypes.func.isRequired,
  deleteTask: propTypes.func.isRequired,
};

export default Task;
