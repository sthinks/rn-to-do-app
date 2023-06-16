import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux';

const LogoTitle = () => {
    const user = useSelector((state) => state.user);
    return (
        <View style={styles.userContainer}>
            <Image source={require('../assets/user.png')} style={styles.userIcon} />
            <View>
                <Text style={styles.hello}>Hello!</Text>
                <Text style={styles.userTitle}>{user.user.fullName}!</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    userContainer: {
        flexDirection: "row",
        paddingHorizontal: 16
    },
    userIcon: {
        height: 48,
        width: 48,
        marginRight: 10
    },
    userTitle: {
        fontSize: 24,
        fontWeight: 600
    },
    hello: {
        color: "#5F33E1",
        fontSize: 10,
        fontWeight: 400
    }

})

export default LogoTitle