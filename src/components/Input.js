import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import propTypes from "prop-types";

const StyledInput = styled.TextInput`
  border: 1px solid ${({ theme }) => theme.gray};
  border-radius: 10px;
  width: ${({ width }) => width - 55}px;
  height: 40px;
  font-size: 18px;
  padding: 5px 10px;
  font-family: ${({ theme }) => theme.fontSub};
`;

const Input = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
  autoFocus,
}) => {
  const width = useWindowDimensions().width;
  return (
    <StyledInput
      width={width}
      placeholder={placeholder}
      value={value}
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={false}
      onBlur={onBlur}
      autoFocus={autoFocus}
    />
  );
};

Input.defaultProps = {
  autoFocus: false,
};

Input.propTypes = {
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  onChangeText: propTypes.func.isRequired,
  onSubmitEditing: propTypes.func.isRequired,
  onBlur: propTypes.func.isRequired,
  autoFocus: propTypes.bool,
};

export default Input;
