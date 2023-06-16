import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ProgressBar from './ProgressBar';

export const TaskItem = ({ title }) => {
    return (
        <View style={styles.item}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <View>
                    <Text>Personel Project</Text>
                </View>
            </View>
            <ProgressBar progress={0.75} />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 25,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderRadius: 20,
        shadowColor: '#008FFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 23,
        fontWeight: 500,
        marginBottom: 20,
    },
})