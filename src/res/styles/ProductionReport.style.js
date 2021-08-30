import { StyleSheet } from "react-native";
import * as Colors from '../color';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 32,
    },
    filter: {
        zIndex: 2,
        flexDirection: 'row',
    },
    report: {
        zIndex: 1,
        flex: 4
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginBottom: 5,
        paddingHorizontal: 15
    },
    noFocusButton: {
        borderColor: Colors.LIGHT_GREEN,
        borderWidth: 2,
        borderRadius: 10,
        width: 90,
        margin: 5
    },
    noFocusText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        padding: 10,
        textAlign: 'center',
    },
    focusButton: {
        borderColor: Colors.LIGHT_GREEN,
        backgroundColor: Colors.LIGHT_GREEN,
        borderWidth: 2,
        borderRadius: 10,
        width: 90,
        margin: 5
    },
    clearFilterButton: {
        borderColor: Colors.LIGHT_GREEN,
        backgroundColor: Colors.LIGHT_GREEN,
        borderWidth: 2,
        borderRadius: 10,
        width: 90,
        margin: 5,
        marginTop: 20
    },
    clearFilterText: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        padding: 10,
        textAlign: 'center',
    },
    focusText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        padding: 10,
        textAlign: 'center',
    },
    pickerStyle: {
        flex: 2,
        borderWidth: 2,
        borderColor: Colors.LIGHT_GREEN,
        borderRadius: 5,
        margin: 5,
        backgroundColor: Colors.WHITE,
        minHeight: 5
    },
    pickerItem: {
        backgroundColor: Colors.WHITE
    },
    date: {
        flex:1,
        borderWidth: 2,
        borderColor: Colors.LIGHT_GREEN,
        borderRadius: 5,
        margin: 5,
        height: 60,
        textAlignVertical: 'center',
        textAlign: 'center',
        padding: 10,
        color: Colors.BLACK
    },
    disabledDate: {
        backgroundColor: '#cccccc',
        borderColor: '#999999',
        color: '#666666'
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