import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { Icons } from '../Icons';

const Container = styled.View`
  width: 100%;
  margin: 5px 0;
`;

const SubContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.main};
  font-weight: 600;
  font-size: 20px;
  font-family: ${({ theme }) => theme.fontMain};
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.black};
  font-size: 18px;
  font-family: ${({ theme }) => theme.fontSub};
`;

const DayContainer = styled.View`
  align-items: center;
  /* border: 1px solid red; */
  flex: 1;
`;

const DayTitle = styled(Title)`
  color: ${({ theme, index }) =>
    index === 0 ? theme.red : index === 6 ? theme.gray : theme.main};
  font-size: 19px;
`;

const DateInfo = () => {
  // 날짜 표시
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  // 요일 표시
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  // const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const week = today.getDay();
  const todayCheck = weekdays.map((day, index) => {
    return (
      <DayContainer key={index}>
        <DayTitle index={index}>{day}</DayTitle>
        <Image
          source={index === week ? Icons.checked : Icons.unchecked}
          style={{ width: 18, height: 18, marginTop: 5 }}
        />
      </DayContainer>
    );
  });

  return (
    <Container>
      <SubContainer>
        <Title style={{ marginRight: 8, marginLeft: 4 }}>Date</Title>
        <StyledText>
          {year}-{month}-{day}
        </StyledText>
      </SubContainer>
      <SubContainer>{todayCheck}</SubContainer>
    </Container>
  );
};

export default DateInfo;
