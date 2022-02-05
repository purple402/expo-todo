import React from 'react';
import styled from 'styled-components/native';
import propTypes from 'prop-types';

import IconButton from './IconButton';
import Input from './Input';
import { Icons } from '../Icons';

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  border: 1px solid black;
  align-items: center;
  padding: 5px;
  margin: 2px 0;
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.black};
  font-size: 20px;
  flex: 1;
  padding: 0 7px;
`;

const Task = ({ toggleTask, deleteTask }) => {
  return (
    <Container>
      <IconButton icon={Icons.unchecked} onPress={toggleTask} />
      <StyledText>Tasks</StyledText>
      <IconButton icon={Icons.delete} onPress={deleteTask} />
    </Container>
  );
};

Task.propTypes = {
  toggleTask: propTypes.func.isRequired,
  deleteTask: propTypes.func.isRequired,
};

export default Task;
