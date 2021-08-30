import { StyleSheet } from "react-native";
import * as Colors from '../color';

export default StyleSheet.create({
    container: { 
        flex: 1,
        padding: 16,
        paddingTop: 10,
        backgroundColor: Colors.WHITE
    },
    header: {
        height: 50,
        backgroundColor: Colors.LIGHT_GREEN
    },
    headerBorder: {
        borderWidth: 1, 
        borderColor: Colors.ECRU_WHITE
    },
    bodyBorder: {
        borderWidth: 1, 
        borderColor: Colors.LIGHT_GREEN
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    text: {
        textAlign: 'center',
        fontWeight: '100'
    },
    dataWrapper: {
         marginTop: -1
    },
    row: {
        height: 40,
        backgroundColor: Colors.CARARRA
    }
});