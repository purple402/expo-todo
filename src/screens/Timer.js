import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "styled-components/native";
import styled from "styled-components/native";
import * as Progress from "react-native-progress";
import { Alert, View } from "react-native";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.main};
  font-size: 40px;
  margin: 0 0 30px 0;
  font-family: ${({ theme }) => theme.fontSub};
`;

// 시간 설정 버튼
const TimerButtonContainer = styled.View`
  width: 340px;
  height: 340px;
  border-radius: 170px;
  /* border: 1px solid ${({ theme }) => theme.gray}; */
  background-color: ${({ theme }) => theme.paleWhite};
`;

const TimerButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.main : theme.transparent};
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`;

const StartButton = styled(TimerButton)`
  width: 84px;
  height: 84px;
  border-radius: 42px;
  background-color: ${({ theme }) => theme.red};
`;

const ButtonText = styled.Text`
  font-size: 23px;
  color: ${({ theme, selected }) => (selected ? theme.white : theme.main)};
  font-family: ${({ theme }) => theme.fontSub};
`;

const PieContainer = styled.View``;
const ClockContainer = styled.View``;

const ClockNumber = styled.Text`
  color: ${({ theme }) => theme.main};
  font-size: 50px;
  margin: 30px 0;
  font-family: ${({ theme }) => theme.fontSub};
`;

const Timer = ({ navigation, route }) => {
  const { id, text } = route.params;
  const settingTime = 25; // 처음 시간
  const theme = useContext(ThemeContext);
  const [progress, setProgress] = useState(1);
  const [time, setTime] = useState(settingTime * 60);
  const [initialTime, setInitialTime] = useState(settingTime * 60);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [usePie, setUsePie] = useState(false); // Pie사용 여부
  const [isCounting, setIsCounting] = useState(false); // 시계 시작 여부

  useEffect(() => {
    let interval = null;
    if (isCounting) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isCounting]);

  useEffect(() => {
    if (time > 0) {
      setMinute(parseInt(time / 60));
      setSecond(time % 60);
      const newProgress = time / initialTime;
      setProgress(newProgress);
    } else if (time === 0) {
      Alert.alert(null, "할일을 완료할까요?", [
        {
          text: "계속하기",
          onPress: () => {},
        },
        {
          text: "완료하기",
          onPress: () =>
            navigation.navigate("Main", { id: id, completed: true }),
        },
      ]);
    } else if (time < 0) {
      setProgress(1);
      setMinute(parseInt(-time / 60));
      setSecond(-time % 60);
    }
  }, [time]);

  // timerButtons 만들기
  const timerButtons = [];
  let i = 1;
  const r = 135;
  while (i < 13) {
    const number = i * 5;
    const angle = (i * 30 * Math.PI) / 180;
    const top = 145 - r * Math.cos(angle);
    const left = 145 + r * Math.sin(angle);
    const selected = number === minute ? true : false;
    timerButtons.push(
      <TimerButton
        onPress={() => {
          setTime(number * 60);
          setInitialTime(number * 60);
        }}
        top={top}
        left={left}
        selected={selected}
        key={number}
      >
        <ButtonText selected={selected}>{number}</ButtonText>
      </TimerButton>
    );
    i = i + 1;
  }

  };

  return (
    <Container>
      <Title>{text}</Title>
      {usePie ? (
        <PieContainer>
          <Progress.Pie progress={progress} size={340} color={theme.red} />
        </PieContainer>
      ) : (
        <View>
          <TimerButtonContainer>
            {timerButtons}
            <StartButton
              top={128}
              left={128}
              onPress={() => {
                setUsePie(true);
                setIsCounting(true);
              }}
            >
              <ButtonText style={{ color: "white" }}>시작</ButtonText>
            </StartButton>
          </TimerButtonContainer>
        </View>
      )}
      <ClockContainer>
        <ClockNumber>
          {time < 0 && "+"}
          {minute < 10 ? "0" + minute : minute}:
          {second < 10 ? "0" + second : second}
        </ClockNumber>
      </ClockContainer>
    </Container>
  );
};

export default Timer;
