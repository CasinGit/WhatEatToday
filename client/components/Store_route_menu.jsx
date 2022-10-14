import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import StoreTabviewMenuInfo from "./StoreTabviewMenuInfo";

function StoreMenuRoute({ data }) {
    let menuData;
    // console.log(data)
    if (!data?.datas[0]) {
        menuData = null
    } else {
        menuData = data.datas
    }

    // console.log(...data.datas, "menu여기")
    return (
        <View style={styles.container}>
            {menuData == null ?
                <Image style={{height:"90%", width:"90%", margin:"5%"}} source={require("../assets/menuDefault.png")}/>
                :
                <FlatList data={menuData} renderItem={({ index, item }) => {
                    return <StoreTabviewMenuInfo item={item} />
                }} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default StoreMenuRoute;