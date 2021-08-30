
// import React, {useState} from 'react';
// import {
//   Alert,
//   Text,
//   TextInput,
//   View,
//   ActivityIndicator
// } from 'react-native';
// import { connect } from 'react-redux';
// import ActionButton from './shared/ActionButton';
// import styles from '../res/styles/Login.style';
// import * as Constants from '../res/strings';
// import { login } from '../redux/actions/LoginServiceAction';
// import { LIGHT_GREEN } from '../res/color';

// const Login =  (props) =>  {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleClick = async () => {
//       if(username === "" || password === ""){
//           Alert.alert("Error", "Field(s) is empty");
//       }
//       else{
//         console.log("Before call",props);
//         await props.loginUser({username: username, password: password});
//         console.log("After call",props);
//         if(Object.keys(props.data).length !== 0){
//           props.navigation.replace('Home');
//         }
//         else {
//           Alert.alert("Error", "Invalid username/password");
//         }
        
//       }
//   }

//   function gotoSignUp() {
//     navigation.replace('Sign Up');
//   }

//   return(
//     <View style = {styles.container}>
//       {/* <Text style = {styles.loginHeading}>{Constants.LOGIN}</Text> */}
//       <Text style = {styles.welcome}>{Constants.WELCOME_TEXT}</Text>
//       <Text style = {styles.loginText}>{Constants.SIGN_IN_TEXT}</Text>
//       <View>
//         <Text>{Constants.USERNAME}</Text>
//         <TextInput 
//           style = {styles.inputField}
//           defaultValue = {username}
//           onChangeText = {text => {setUsername(text)}}
//         />
//       </View>
//       <View>
//         <Text>{Constants.PASSWORD}</Text>
//         <TextInput 
//           style = {styles.inputField}
//           defaultValue = {password}
//           onChangeText = {text => {setPassword(text)}}
//           secureTextEntry = {true}
//         />
//       </View>
//       <ActionButton 
//         title={Constants.SIGN_IN}
//         handlePress = {handleClick}
//       />
//       {/* <Text style = {styles.question}>
//           {Constants.DONT_HAVE_ACCOUNT}
//           <Text 
//             style = {styles.questionSignUp}
//             onPress = {gotoSignUp}>
//               {Constants.SIGN_UP}
//           </Text>
//       </Text> */}
//       {props.loading &&
//           <View style = {styles.loading}>
//               <ActivityIndicator size="large" color={LIGHT_GREEN}/>
//           </View>
//       }
//     </View>
//   );
// };

// const mapStateToProps = (state) => ({
//   loading: state.LoginReducer.loading,
//   error: state.LoginReducer.error,
//   data: state.LoginReducer.data,
// });

// const mapDispatchToProps = (dispatch) => ({
//   loginUser: (user) => dispatch(login(user)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);


import React, { Component } from 'react';
import {
  Alert,
  Text,
  TextInput,
  View,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import ActionButton from './shared/ActionButton';
import styles from '../res/styles/Login.style';
import * as Constants from '../res/strings';
import { login } from '../redux/actions/LoginServiceAction';
import { LIGHT_GREEN } from '../res/color';

class Login extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.gotoSignUp = this.gotoSignUp.bind(this);
  }
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  async handleClick(){
      if(this.state.username === "" || this.state.password === ""){
          Alert.alert("Error", "Field(s) is empty");
      }
      else{
        await this.props.loginUser({username: this.state.username, password: this.state.password});
        if(Object.keys(this.props.data).length !== 0){
          this.props.navigation.replace('Home');
        }
        else {
          Alert.alert("Error", "Invalid username/password");
        }
        
      }
  }

  gotoSignUp() {
    this.navigation.replace('Sign Up');
  }

  render() {
    return(
      <View style = {styles.container}>
        {/* <Text style = {styles.loginHeading}>{Constants.LOGIN}</Text> */}
        <Text style = {styles.welcome}>{Constants.WELCOME_TEXT}</Text>
        <Text style = {styles.loginText}>{Constants.SIGN_IN_TEXT}</Text>
        <View>
          <Text>{Constants.USERNAME}</Text>
          <TextInput 
            style = {styles.inputField}
            defaultValue = {this.state.username}
            onChangeText = {text => {
              this.setState(() => ({
                username: text
              }));
            }}
          />
        </View>
        <View>
          <Text>{Constants.PASSWORD}</Text>
          <TextInput 
            style = {styles.inputField}
            defaultValue = {this.state.password}
            onChangeText = {text => {
              this.setState(() => ({
                password: text
              }));
            }}
            secureTextEntry = {true}
          />
        </View>
        <ActionButton 
          title={Constants.SIGN_IN}
          handlePress = {this.handleClick}
        />
        {/* <Text style = {styles.question}>
            {Constants.DONT_HAVE_ACCOUNT}
            <Text 
              style = {styles.questionSignUp}
              onPress = {gotoSignUp}>
                {Constants.SIGN_UP}
            </Text>
        </Text> */}
        {this.props.loading &&
            <View style = {styles.loading}>
                <ActivityIndicator size="large" color={LIGHT_GREEN}/>
            </View>
        }
      </View>
    );
  }
  
};

const mapStateToProps = (state) => ({
  loading: state.LoginReducer.loading,
  error: state.LoginReducer.error,
  data: state.LoginReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
