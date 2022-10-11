import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const Item = ({ item }) => (
    <View style={{display : 'flex' , flexDirection : 'row'}}>
        <View style={{backgroundColor : 'blue' , marginRight : 10, marginTop: 5 , width : 150,}}>
            <Text style={styles.title}>사진 영역</Text>
        </View>
        <View style={{flexDirection : 'column' , backgroundColor : 'green', marginTop : 5, width : "59%"}}>
            <Text style={{fontSize : 30, textAlign:'center'}}>국밥</Text>
            <Text style={{fontSize : 23, }}>60년 전통의 국밥</Text>
            <Text style={{fontSize : 22, textAlign:'right',}}>8000원</Text>
        </View>
    </View>
);

function TestScreen() {
    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 30,
    },
});

export default TestScreen;
