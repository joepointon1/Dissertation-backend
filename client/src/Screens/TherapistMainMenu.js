import React from 'react';
import {View }from 'react-native'; 
import { Button, Text } from 'react-native-paper';
import MenuButton from "../Components/Button"


const TherapistMainMenuScreen = ({navigation, route}) => {
    return (
        
        <View style={{backgroundColor: 'powderblue', alignItems: "center", alignSelf: "center"}}>
            <MenuButton
                icon="plus-circle-outline"
                screen="Screen2"
                text="Add Patient">
            </MenuButton>
            <MenuButton
                icon="minus-circle-outline"
                screen="Screen2"
                text="Remove Patient">
            </MenuButton>
            <MenuButton
                icon="eye"
                screen="Screen2"
                text="View Patients">
            </MenuButton>
        </View>
      
  
    
    )
  }

export default TherapistMainMenuScreen;