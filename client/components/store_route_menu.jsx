import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import menu_thumbnail from "../assets/icon.png";





const renderItem = ({ item }) => {


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection : "row"}}>
                <View>
                    <Text style={{ width:"30%", height:"30%" }}>메뉴썸네일 : {item.image}</Text>
                </View>
                <View>
                    <Text style={{textAlign:"center"}}>메뉴이름 : {item.name}</Text>
                </View>
                <View>
                    <Text style={{textAlign:"left"}}>메뉴소개 : {item.intro}</Text>
                </View>
                <View>
                    <Text style={{textAlign:"right"}}>메뉴가격 : {item.price}</Text>
                </View>
            </View>
        </View>

    )

}




function StoreMenuRoute() {


    return (
        <>
        </>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1
    },


})


export default StoreMenuRoute;