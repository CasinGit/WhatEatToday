import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import {TabView, SceneMap} from "react-native-tab-view"
import test_store_info__top_image from "../assets/test_image.png";
import Store_Route_Menu from "../components/store_route_menu";
import Store_Route_Info from "../components/store_route_info";
import Store_Route_Review from "../components/store_route_review";
import { useNavigation } from "@react-navigation/native";




const renderScene = SceneMap({
    menu : Store_Route_Menu,
    info : Store_Route_Info,
    review : Store_Route_Review
})



function StoreInfoScreen() {
    
    // console.log("StoreInfoScreen!!");
    // const navigation = useNavigation();



    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key:"menu", title:"메뉴" },
        { key:"info", title:"정보" },
        { key:"review", title:"리뷰", }
    ]);


    return (
        <View style={styles.container}>
            <View style={styles.a1}>
                <Image source={{test_store_info__top_image}} />
            </View>
            <View style={styles.a2}>
                <Text style={{fontSize : 30, textAlign:"center"}}>식당명</Text>
            </View>
            <View style={styles.a3}>
                <Text style={{fontSize : 20, textAlign:'center'}}>별점</Text>
            </View>
            <View style={styles.a4}>
                <TabView
                    navigationState={{ index,routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View>
        </View>
        
    );
}


const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    a1: {
        backgroundColor : "#72C2FC",
        height : "36%"
    },
    a2: {
        backgroundColor : "#34FDCD",
        height : "8%"
    },
    a3: {
        backgroundColor : "#EF9CE2",
        height : "6%"
    },
    a4: {
        backgroundColor : "#f2f2f2",
        height : "6%"
    }
})



export default StoreInfoScreen;