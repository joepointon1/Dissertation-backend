import React, {useState, useEffect} from 'react';
import {Text, TextInput, RadioButton, Button} from 'react-native-paper'
import {View} from 'react-native';

const SignInScreen = ({navigation, route}) => {
    const [userInputs, setUserInputs] = useState({});
    const [checked, setChecked] = useState("first");
    const fields = [{
        label: "First Name", value: "firstName"
    }, {
        label: "Last Name", value: "lastName"
    },{
        label: "Email", value: "email"
    },{
        label: "username", value: "passowrd"
    },{
        label: "Password", value: "password"
    }, {
        label: "Repeat Password", value: "repeatPassword"
    }]

    const inputs = []
    for (const field of fields) {
        inputs.push(<TextInput 
                        mode = "outlined" 
                        label = {field.label}
                        value = {userInputs[field.value]}
                        onChangeText = {data => setUserInputs((prevState) => {
                            return {[field.value]:data, ...prevState}
                        })}
                        key={field.value} >
                    </TextInput>)
    }
    
    return (
        <View flexDirection="column">
            {inputs}
            <View flexDirection="row">
                <Text >Are you a:</Text>
                <Text >Patient</Text>
                <RadioButton
                    style = {{flex:1}}
                    value = "first"
                    status = { checked === 'first' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('first')}
                />
                <Text >Therapist</Text>
                <RadioButton
                    style = {{flex:1}}
                    value = "second"
                    status = { checked === 'second' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('second')}
                />
            </View>
            <Button
                mode="contained"
                >
            Sign Up
            </Button>
        </View>

    )
  }

export default SignInScreen;