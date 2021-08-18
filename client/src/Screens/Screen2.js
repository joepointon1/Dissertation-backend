import React from 'react';
import {Text} from 'react-native-paper'
const Screen2 = ({navigation, route}) => {
    return <Text>text:{route.params.paramA}</Text>
  }

export default Screen2;