import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {extendTheme, NativeBaseProvider} from "native-base";
import {Provider } from "react-redux";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {
  NavigationContainer
} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from './screens/Home';
// import { store } from './store/store';
import { registerRootComponent } from 'expo';
import Welcome from './screens/Welcome';
import ObjectDetection from './screens/ObjectDetection';
import SelectionScreen from './screens/Selection';
import TypingText from './screens/Tasks';

const Stack = createNativeStackNavigator();

function Main() {
  
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
               
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                <Stack.Screen
                    name="ObjectDetection"
                    component={ObjectDetection}
                />
                <Stack.Screen
                    name="Selection"
                    component={SelectionScreen}
                />
                <Stack.Screen
                    name="Tasks"
                    component={TypingText}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    const theme = extendTheme({
      colors: {
          app: {
              orange: "#F19811",
              lime: "#D7E251",
              dark: "#888A87",
              blue: "#"
          },
          orange: {
              100: "#F19811"
          },
          black: {
              600: "#000000"
          }
      }
  });

  return (
        <>
            <StatusBar style="dark" />
            <NativeBaseProvider
                theme={theme}
                isSSR={false}
            >
                <BottomSheetModalProvider>
                    <Main />
                </BottomSheetModalProvider>
            </NativeBaseProvider>
        </>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
