import React, {useState, useEffect} from 'react'
import { View, StyleSheet, TextInput, Button } from 'react-native'
import {Provider as PaperProvider, Text, DefaultTheme} from 'react-native-paper';
import axios from 'axios';
import MenuButton from "./src/Components/Button"
import MainMenuScreen from './src/Screens/MainMenu';
import TherapistMainMenuScreen from './src/Screens/TherapistMainMenu';
import SignInScreen from './src/Screens/SignIn';
import SignUpScreen from './src/Screens/SignUp';
import Screen2 from './src/Screens/Screen2';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Root = createStackNavigator();

export default function App(){
  const isSignedIn = false;
  const isTherapist = true;
  return (
    <PaperProvider>
      <NavigationContainer>
        <Root.Navigator>
          {isSignedIn ? (
            isTherapist ? (
              <>
              <Root.Screen name="TherapistHome" component={TherapistMainMenuScreen} />
              <Root.Screen name="Screen2" component={Screen2} />
              </>
            ) : (
              <>
            <Root.Screen name="Home" component={MainMenuScreen} />
            <Root.Screen name="Screen2" component={Screen2} />
            </>
            )
          ) : (
            <>
            <Root.Screen name="SignIn" component={SignInScreen} options={{title:"Sign In"}}/>
            <Root.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
            

          
        </Root.Navigator>
      </NavigationContainer>
    </PaperProvider>
  
    
    
  )
}

// export default function App() {
//   return (
//     <PaperProvider theme={theme}>
//       <View>
//       <Text>Hi</Text>
//       <MenuButton icon="eject" text="Press me"></MenuButton>
//       </View>
//     </PaperProvider>
//   )
// }



const theme = {
  ...DefaultTheme,
  colors: {
    primary:"#00B4D8",
    accent:"#90E0EF",
    surface:"#CAF0F8"
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#3B6CD4',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
  },
})