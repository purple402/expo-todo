import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import propTypes from 'prop-types';
import { Icons } from '../Icons';

const Icon = styled.Image`
  width: 25px;
  height: 25px;
  tint-color: ${({ theme }) => theme.red};
`;

const IconButton = ({ icon, onPress, id }) => {
  const _onPress = () => {
    onPress(id);
  };
  return (
    <TouchableOpacity onPress={_onPress}>
      <View>
        <Icon source={icon}></Icon>
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
