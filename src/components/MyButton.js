import {StyleSheet, View, Text, Pressable} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    button: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 50,
    },
    buttonText: {
        color: 'black',
        fontSize: 'xx-large',
},
});

function MyButton({text, onPress}){
    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>{text}</Text>
            </Pressable>
        </View>
    );
}

export default MyButton