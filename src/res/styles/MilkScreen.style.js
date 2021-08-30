import { StyleSheet } from "react-native";
import * as Colors from '../color';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 32,
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginBottom: 5,
        paddingHorizontal: 15
    },
    modal: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        minHeight: 400
    },
    modalHeading: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.LIGHT_GREEN,
        marginBottom: 5,
        paddingVertical: 20
    },
    modalLabel: {
        color: Colors.LIGHT_GREEN
    },
    pickerStyle: {
        borderWidth: 2,
        borderColor: Colors.LIGHT_GREEN,
        borderRadius: 5,
        marginBottom: 10,
    },
    pickerItem: {
        
    },
    date: {
        borderWidth: 2,
        borderColor: Colors.LIGHT_GREEN,
        borderRadius: 5,
        marginBottom: 10,
        height: 50,
        textAlignVertical: 'center',
        paddingLeft: 10
    },
    inputField: {
        borderWidth: 2,
        borderColor: Colors.LIGHT_GREEN,
        borderRadius: 5,
        marginBottom: 10
      },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 100
    },
    button: {
        flex: 1,
        height: 100
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
    labelStyle: {
        padding: 10,
        marginTop: 2,
        borderWidth: 1,
        borderRadius: 5,
        borderTopColor: Colors.LIGHT_GREEN,
        borderColor: Colors.WHITE
        
    }
});