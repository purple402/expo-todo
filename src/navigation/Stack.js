import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Main, Timer } from "../screens";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator initialRouteName="Main">
      {/* Stack.Navigatior 안에 Screen이 있어야한다 */}
      {/* 필수 props는 name, component */}
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Timer"
        component={Timer}
        options={{
            title: "",
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerShadowVisible: false,
            headerTintColor: theme.main,
            headerBackTitleVisible: false,
            // statusBarHidden: true,
          }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
