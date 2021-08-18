import React, {useEffect} from 'react';
import { Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MenuButton = (props) => {
    const navigation = useNavigation();
  
  
    return (
        <Button 
            icon = {props.icon}
            mode = "contained" 
            onPress = {() => navigation.push(props.screen, {paramA: "Hello!"})}
            style = {styles}
            theme = {{colors: {primary: "#E9DCBD"}}}
            contentStyle = {{justifyContent:"center" }}>
        {props.text}
        </Button>
    )
}


const styles = {
    width: 200, 
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 5,
    marginBottom: 5
}
    
export default MenuButton;