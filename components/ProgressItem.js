import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const ProgressItem = ({ title }) => {
    return (
        <View style={styles.item}>
            <View>
                <Text>Personel Project</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#E7F4FF',
        paddingVertical: 25,
        paddingHorizontal: 15,
        width: 210,
        marginRight: 20,
        borderRadius: 20,
        shadowColor: '#A9BCC6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 23,
        fontWeight: 500,
        marginTop: 20,
    },
})