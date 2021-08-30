
import React, {useState} from 'react';
import {
  Alert,
  Text,
  TextInput,
  View,
} from 'react-native';
import ActionButton from './shared/ActionButton';
import styles from '../res/styles/SignUp.style';
import * as Constants from '../res/strings';

const SignUp =  ({navigation}) =>  {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleClick(){
        if(name === "" ||email === "" || password === "" || confirmPassword === ""){
            Alert.alert("Error", "Field(s) is empty");
        }
        else{
            navigation.replace('Login');
        }
    }

    function gotoSignIn() {
        navigation.replace('Login');
    }

    return(
        <View style = {styles.container}>
            <Text style = {styles.signupHeading}>{Constants.SIGN_UP}</Text>
            <Text style = {styles.welcome}>{Constants.WELCOME_TEXT}</Text>
            <Text style = {styles.signupText}>{Constants.SIGN_UP_TEXT}</Text>
            <View>
                <Text>{Constants.NAME}</Text>
                <TextInput 
                style = {styles.inputField}
                defaultValue = {name}
                onChangeText = {text => {setName(text)}}
                />
            </View>
            <View>
                <Text>{Constants.EMAIL}</Text>
                <TextInput 
                style = {styles.inputField}
                defaultValue = {email}
                onChangeText = {text => {setEmail(text)}}
                />
            </View>
            <View>
                <Text>{Constants.PASSWORD}</Text>
                <TextInput 
                style = {styles.inputField}
                defaultValue = {password}
                onChangeText = {text => {setPassword(text)}}
                secureTextEntry = {true}
                />
            </View>
            <View>
                <Text>{Constants.CONFIRM_PASSWORD}</Text>
                <TextInput 
                style = {styles.inputField}
                defaultValue = {confirmPassword}
                onChangeText = {text => {setConfirmPassword(text)}}
                secureTextEntry = {true}
                />
            </View>
            <ActionButton 
                title={Constants.SIGN_UP}
                handlePress = {handleClick}
            />
            <Text style = {styles.question}>
                {Constants.ALREADY_HAVE_ACCOUNT}
                <Text 
                    style = {styles.questionSignIn}
                    onPress = {gotoSignIn}>
                        {Constants.SIGN_IN}
                </Text>
            </Text>
        </View>
    );
};


export default SignUp;
