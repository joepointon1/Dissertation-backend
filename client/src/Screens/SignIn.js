import React, {useState, useEffect} from 'react';
import {Text, TextInput, RadioButton, Button} from 'react-native-paper'
import {View} from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const SignInScreen = ({navigation, route}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [checked, setChecked] = useState("unchecked");
    
    async function signIn(){
        try{
            console.log(username,password)
            const response = await axios.post("http://localhost:8080/signin", {username:username, password:password});
            console.log(response.data.accessToken);
            await SecureStore.setItemAsync("token",response.data.accessToken);
            const token = await SecureStore.getItemAsync("token")
            console.log(token)
        }catch (err) {
            console.log(err)
        }
 
    }
    return (
        <View>
            <TextInput 
                mode = "outlined" 
                label = "Username"
                value = {username}
                onChangeText = {text => setUsername(text)}
                key="username" >
            </TextInput>
            <TextInput 
                mode = "outlined" 
                label = "Password"
                value = {password}
                onChangeText = {text => setPassword(text)}
                key="password" >
            </TextInput>
            <Text>Remember Me?</Text>
            <RadioButton
                value = "remember"
                status = {checked}
                onPress = {() => setChecked( checked == "checked"? "unchecked" : "checked")}
            />

            <Button
                mode="contained"
                onPress = { () => signIn()}>
            Log In 
            </Button>

            <Button
                mode="text">
            Forgot Your Password?
            </Button>

            <Text>Not Registered?</Text>

            <Button 
                mode="contained"
                onPress = {() =>navigation.push("SignUp")}>
            Sign Up
            </Button>
        </View>
    )
  }

export default SignInScreen;