import React, { useState, useEffect } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

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
  align-items: center;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.main};
  font-size: 25px;
  font-weight: 600;
  margin: 0 10px;
  font-family: ${({ theme }) => theme.fontMain};
`;

const Border = styled.View`
  height: ${({ height }) => height - 50}px;
  width: ${({ width }) => width - 30}px;
  border: 2px solid ${({ theme }) => theme.main};
  position: absolute;
  left: 15px;
  top: 30px;
  padding: 20px 10px 10px 10px;
  align-items: center;
`;

const List = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin-top: 8px;
`;

const ClearButton = styled.TouchableOpacity``;
const ButtonText = styled.Text`
  font-size: 17px;
  color: ${({ theme }) => theme.red};
  padding: 5px;
  font-family: ${({ theme }) => theme.fontMain};
`;

const Main = () => {
  const { height, width } = useWindowDimensions();
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({});
  const [isReady, setIsReady] = useState(false);

  const getReady = async () => {
    await getFonts();
    await getData();
  };

  const getFonts = async () => {
    await Font.loadAsync({
      Cafe24Dangdanghae: require('../../assets/fonts/Cafe24Dangdanghae.ttf'),
      VitroPride: require('../../assets/fonts/VitroPride.ttf'),
    });
  };

  const storeData = async (tasks) => {
    try {
      // 'tasks'라는 항목에 tasks 저장
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {}
  };

  const getData = async () => {
    try {
      // 'tasks' 항목에서 저장되어 있는 자료 불러오기
      const loadedData = await AsyncStorage.getItem('tasks');
      // 아무것도 없으면 빈 객체 저장
      setTasks(JSON.parse(loadedData) || {});
    } catch (e) {}
  };

  // 새 할일 추가
  const addNewTask = () => {
    if (newTask.length < 1) return;
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask('');
    storeData({ ...tasks, ...newTaskObject });
  };

  // 할일 완료 toggle
  const toggleTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    setTasks(currentTasks);
  };

  // 할일 삭제
  const deleteTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    setTasks(currentTasks);
  };

  // 완료된 할일 삭제
  const clearCompleted = () => {
    const currentTasks = Object.assign({}, tasks);
    for (let key in currentTasks) {
      if (currentTasks[key]['completed']) {
        delete currentTasks[key];
      }
    }
    storeData(currentTasks);
  };

  const updateTask = (item) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    storeData(currentTasks);
  }

  return isReady ? (
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
                updateTask={updateTask}
              />
            ))}
        </List>
        <ClearButton onPress={clearCompleted}>
          <ButtonText>Clear Completed</ButtonText>
        </ClearButton>
      </Border>
      <TitleView>
        <Title>HOTEL TODO</Title>
      </TitleView>
    </Container>
  ) : (
    <AppLoading
      startAsync={getReady}
      onFinish={() => setIsReady(true)}
      onError={() => {}}
    />
  );
};

export default Main;
