import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import propTypes from "prop-types";

import IconButton from "./IconButton";
import Input from "./Input";
import { Icons } from "../Icons";

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
  padding: 0 10px;
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

const ContentView = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
`;

const Task = ({ toggleTask, deleteTask, updateTask, item }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const _onSubmit = () => {
    if (isEditing) {
      const updatedItem = Object.assign({}, item);
      updatedItem["text"] = text;
      setIsEditing(false);
      updateTask(updatedItem);
    }
  };

  return isEditing ? (
    <Container>
      <Input
        placeholder={item.text}
        value={text}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={_onSubmit}
      />
    </Container>
  ) : (
    <Container>
      <IconButton
        icon={item.completed ? Icons.checked : Icons.unchecked}
        onPress={toggleTask}
        item={item}
      />
      <ContentView onPress={() => item.completed || setIsEditing(true)}>
        <StyledText completed={item.completed}>{item.text}</StyledText>
      </ContentView>
      {item.completed && <Line />}
      <IconButton icon={Icons.delete} item={item} onPress={deleteTask} />
    </Container>
  );
};

Task.propTypes = {
  toggleTask: propTypes.func.isRequired,
  deleteTask: propTypes.func.isRequired,
  updateTask: propTypes.func.isRequired,
  item: propTypes.object.isRequired,
};

export default Task;
