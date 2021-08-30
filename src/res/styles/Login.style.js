import { StyleSheet } from "react-native";
import * as Colors from '../color';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 32,
        paddingHorizontal: 24,
    },
    loginHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginBottom: 30
    },
    welcome: {
        color: Colors.LIGHT_GREEN,
        fontSize: 35,
        fontWeight: 'bold'
    },
    loginText: {
        marginBottom: 50
    },

    inputField: {
        borderWidth: 1,
        borderColor: Colors.LIGHT_GREEN,
        borderRadius: 5,
        marginBottom: 10
    },
    question: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
    },
    questionSignUp: {
        color: Colors.LIGHT_GREEN
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
});