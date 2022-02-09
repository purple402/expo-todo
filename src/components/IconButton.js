import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import propTypes from 'prop-types';
import { Icons } from '../Icons';

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${({ theme, completed }) =>
    completed ? theme.gray : theme.black};
`;

const IconButton = ({ icon, onPress, item }) => {
  const _onPress = () => {
    onPress(item.id);
  };
  return (
    <TouchableOpacity onPress={_onPress}>
      <View>
        <Icon source={icon} completed={item.completed}></Icon>
      </View>
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  icon: propTypes.oneOf(Object.values(Icons)).isRequired,
  onPress: propTypes.func.isRequired,
  id: propTypes.string,
};

export default IconButton;
