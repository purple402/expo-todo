import React, { useState, useEffect } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import * as Font from 'expo-font';

import { Input, DateInfo, Task } from '../components';

const Container = styled.View`
  background: ${({ theme }) => theme.background};
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
`;

const TitleView = styled.View`
  background: ${({ theme }) => theme.background};
  /* margin-top: 10px; */
  align-items: center;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.main};
  font-size: 25px;
  font-weight: 600;
  margin: 0 10px;
`;

const Border = styled.View`
  height: ${({ height }) => height - 60}px;
  width: ${({ width }) => width - 30}px;
  border: 2px solid ${({ theme }) => theme.main};
  position: absolute;
  left: 15px;
  top: 40px;
  padding: 20px 10px 10px 10px;
  align-items: center;
`;

const List = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const Main = () => {
  const { height, width } = useWindowDimensions();

  const testTasks = {
    1: {
      id: '1',
      text: 'react native',
      completed: false,
    },
    2: {
      id: '2',
      text: 'expo',
      completed: true,
    },
    3: {
      id: '3',
      text: 'app',
      completed: false,
    },
  };
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState(testTasks);

  const getFonts = async () => {
    await Font.loadAsync({
      Cafe24Dangdanghae: require('../../assets/fonts/Cafe24Dangdanghae.ttf'),
      VitroPride: require('../../assets/fonts/VitroPride.ttf'),
    });
  };

  const addNewTask = () => {
    if (newTask.length < 1) return;
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask('');
    setTasks({ ...tasks, ...newTaskObject });
  };

  const toggleTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    setTasks(currentTasks);
  };

  const deleteTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    setTasks(currentTasks);
  };

  return (
    <Container>
      <StatusBar backgroundColor="transparent" translucent hidden />
      <Border height={height} width={width}>
        <DateInfo />
        <Input
          placeholder="... 할 일을 입력해주세요"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          onSubmitEditing={addNewTask}
        />
        <List>
          {Object.values(tasks)
            .reverse()
            .map((item) => (
              <Task
                key={item.id}
                item={item}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            ))}
        </List>
      </Border>
      <TitleView>
        <Title>HOTEL TODO</Title>
      </TitleView>
    </Container>
  );
};

export default Main;
