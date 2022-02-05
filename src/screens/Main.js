import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

import { Input, Date } from '../components';

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

export default function Main() {
  const { height, width } = useWindowDimensions();
  return (
    <Container>
      <StatusBar backgroundColor="transparent" translucent hidden />
      <Border height={height} width={width}>
        <Date />
        <Input placeholder="... 할 일을 입력해주세요" />
      </Border>
      <TitleView>
        <Title>HOTEL the Dreaming</Title>
        {/* <Title>the Dreaming</Title> */}
      </TitleView>
    </Container>
  );
}
