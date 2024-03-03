import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectionScreen from "./Screens/Selection";
import TasksScreen from "./Screens/Tasks";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Selection"
          component={SelectionScreen}
          options={{
            headerStyle: {
              backgroundColor: "#2A777D",
            },
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Tasks"
          component={TasksScreen}
          options={{
            headerStyle: {
              backgroundColor: "#2A777D",
            },
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
