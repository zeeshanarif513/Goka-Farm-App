import React from 'react';
import { View, Image, Text, TouchableOpacity,} from 'react-native';
import styles from '../../res/styles/NavigationButton.style';

const NavigationButton = (props) => {
    return (
        <TouchableOpacity style= {styles.container} onPress = {props.handleClick}>
        <View  style= {styles.container}>
                <Image 
                    source={{uri: props.data.image}}
                    style = {{/*flex: 1, alignSelf : 'stretch', */height: 50, width: 50, margin: 5}}
                />
                <View style = {styles.contentContainer}>
                    <Text style= {styles.heading}>{props.data.title}</Text>
                    <Text style = {styles.contentContainer}>{props.data.content}</Text>
                </View>

        </View>
        </TouchableOpacity>
    );

}


export default NavigationButton;