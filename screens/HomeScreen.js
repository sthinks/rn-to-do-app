import React from 'react'
import { View, Text, StyleSheet, ImageBackground, FlatList, Dimensions, SafeAreaView, ScrollView } from 'react-native'
import { ProgressItem } from '../components/ProgressItem';
import { TaskItem } from '../components/TaskItem';

const data = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d71',
        title: 'Third item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d82',
        title: 'Third item',
    },
];

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safe}>
            <ImageBackground source={require('../assets/bg_blur_elips.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.inProgressContainer}>
                        <Text style={styles.title}>In Progress</Text>
                        <FlatList
                            style={styles.progressSlider}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={data}
                            renderItem={({ item }) => <ProgressItem title={item.title} />}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={{ height: 500 }}>
                        <Text style={styles.title}>Task Groups</Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={data}
                            renderItem={({ item }) => <TaskItem title={item.title} />}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Arka plan resmi boyutunu ayarlar (cover, contain, stretch vb.)
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    inProgressContainer: {
        width: Dimensions.get('window').width,
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 25
    },
    progressSlider: {
        paddingBottom: 25
    },
})
export default HomeScreen