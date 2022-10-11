import { Image, StyleSheet, Text, View } from "react-native";
import menu_defaultImage from "../assets/menu_defaultImage.png";

function StoreTabviewMenuInfo({ item }) {
    // console.log(item)
    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <Image resizeMode="contain" style={styles.image} source={menu_defaultImage}/>
                <View style={styles.aa}>
                    <Text style={{fontSize : 35, color : "black", flexWrap :"wrap"}}>{item.MENU_NM}</Text>
                    <Text style={{fontSize : 30, color : "black"}}>{item.MENU_PRICE}원</Text>
                </View>
            </View>
    </View>
    );
}

const styles = StyleSheet.create({
    layer: {
        flex: 1,
    },

    image : {
        margin : 4.5,
        height : 140,
        width : 140
    },

    aa : {
        justifyContent : "center",
        flex : 1
    },

    outerContainer: {
        borderRadius: 5,
        margin: 8,
        elevation: 1,
        flex: 1,
        overflow: "hidden",
        alignItems: "flex-start",
        height: 150,
        backgroundColor : "white"
    },

    innerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent : "flex-start"
    }
})

export default StoreTabviewMenuInfo;