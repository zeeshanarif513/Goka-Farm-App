import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../../res/styles/ActionButton.style';

const ActionButton = (props) => {
    return (
        <TouchableOpacity 
            style = {styles.button}
            onPress = {props.handlePress}>
            <Text style = {styles.title}>{props.title}</Text>
        </TouchableOpacity>
    );
}



export default ActionButton;