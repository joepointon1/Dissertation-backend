import React from 'react';
import {View }from 'react-native'; 
import { Button, Text } from 'react-native-paper';
import MenuButton from "../Components/Button"


const MainMenuScreen = ({navigation, route}) => {
    return (
        
        <View style={{backgroundColor: 'powderblue', alignItems: "center", alignSelf: "center"}}>
        <MenuButton
            icon="book-plus"
            screen="Screen2"
            text="New Diary Entry">
        </MenuButton>
        <MenuButton
            icon="plus-circle-outline"
            screen="Screen2"
            text="Check In">
        </MenuButton>
        <MenuButton
            icon="book-multiple"
            screen="Screen2"
            text="View Diary Entries">
        </MenuButton>
        <MenuButton
            icon="information-outline"
            screen="Screen2"
            text="View Statistics">
        </MenuButton>
        <MenuButton
            icon="school"
            screen="Screen2"
            text="Learn About Cognitive Errors">
        </MenuButton>
        </View>
      
  
    
    )
  }

export default MainMenuScreen;