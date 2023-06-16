import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/userSlice';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoTitle = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const logoutHandler = () => {
        AsyncStorage.removeItem('userData'); // Kullanıcı verilerini silme
        dispatch(logoutUser());
    }

    return (
        <View style={styles.userContainer}>
            <Ionicons name='log-out' onPress={logoutHandler} size={40} color="black" />
        </View>
    )
}
const styles = StyleSheet.create({
    userContainer: {
        flexDirection: "row",
        paddingHorizontal: 16
    },
})

export default LogoTitle