import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        alignItems: 'center',
        padding: 1,
        borderRadius: 16,
        flexDirection: 'row'
    },
    contentContainer: {
        marginLeft: 5,
        flex: 1
    },
    heading: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20
    },
    content: {
        flex: 1
    }
});