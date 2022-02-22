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

const TimerLineContainer = styled.View`
  height: 324px;
  width: 3px;
  position: absolute;
  top: 60px;
  left: 170px;
`;

const TimerLine = styled.View`
  height: 70px;
  width: 3px;
  background-color: ${({ theme }) => theme.main};
  position: absolute;
  top: 0
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

const ControlButtonContainer = styled.View`
  flex-direction: row;
`;

const ControlButton = styled.TouchableOpacity`
  /* border: 1px solid ${({ theme }) => theme.main}; */
  padding: 10px;
  margin: 0 5px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.main};
`;

const ControlText = styled.Text`
  font-size: 23px;
  font-family: ${({ theme }) => theme.fontSub};
  color: white;
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

  const handleCancelBtn = () => {
    Alert.alert(null, "하던 일을 취소하고 이전으로 돌아갈까요?", [
      {
        text: "계속하기",
        onPress: () => {},
      },
      {
        text: "돌아가기",
        onPress: () => navigation.navigate("Main"),
      },
    ]);
  };

  const handleCompleteBtn = () => {
    if (!usePie) {
      Alert.alert(
        null,
        `${text}을(를) 아직 시작하지 않았습니다. ${text}을(를) 완료로 처리할까요?`,
        [
          {
            text: "수행하기",
            onPress: () => {},
          },
          {
            text: "완료하기",
            onPress: () =>
              navigation.navigate("Main", { id: id, completed: true }),
          },
        ]
      );
    } else if (time < 0) {
      navigation.navigate("Main", { id: id, completed: true });
    } else {
      Alert.alert(
        null,
        `타이머가 아직 실행중입니다. ${text}을(를) 모두 마치셨나요?`,
        [
          {
            text: "계속하기",
            onPress: () => {},
          },
          {
            text: "완료하기",
            onPress: () =>
              navigation.navigate("Main", { id: id, completed: true }),
          },
        ]
      );
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
          <TimerLineContainer
            style={{ transform: [{ rotate: `${time / 10}deg` }] }}
          >
            <TimerLine />
          </TimerLineContainer>
            {timerButtons}
            {/* <TimerLine
              style={{
                transform: [{ rotate: `${time / 10}deg` }],
              }}
            /> */}
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
      <ControlButtonContainer>
        <ControlButton onPress={handleCancelBtn}>
          <ControlText>취소</ControlText>
        </ControlButton>
        <ControlButton
          onPress={() => {
            setIsCounting(!isCounting);
            setUsePie(true);
          }}
        >
          <ControlText>
            {isCounting ? "일시정지" : usePie ? "다시시작" : "시작"}
          </ControlText>
        </ControlButton>
        <ControlButton onPress={handleCompleteBtn}>
          <ControlText>완료</ControlText>
        </ControlButton>
      </ControlButtonContainer>
    </Container>
  );
};

export default Timer;
