import { FlatList, StyleSheet, Text, View } from "react-native";
import StoreTabviewMenuInfo from "./StoreTabviewMenuInfo";

function StoreMenuRoute({ data }) {
    let menuData;
    // console.log(data)
    if (!data?.datas[0]) {
        menuData = null
    } else {
        menuData = data.datas
        // console.log(menuData)
    }

    // console.log(...data.datas, "menu여기")
    return (
        <View style={styles.container}>
            {menuData == null ?
                <Text>매뉴준비중</Text>
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