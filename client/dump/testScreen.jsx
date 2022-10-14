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
    <View style={{display : 'flex' , flexDirection : 'column', paddingTop:15}}>
       <View style={{backgroundColor:"white", width:"95%", height: 150 }}>
            <Text>리뷰 이미지</Text>
       </View>
       <View style={{flexDirection:"row", justifyContent : "space-between"}}>
            <Text style={{textAlign:'left'}}>별점</Text>
            <Text style={{textAlign:'right'}}>리뷰ID</Text>
       </View>
       <View>
            <Text>리뷰내용</Text>
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


    
});

export default TestScreen;
