import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import StoreTabviewMenuInfo from "./StoreTabviewMenuInfo";

function StoreMenuRoute({ data }) {
    let menuData;

    if (!data?.datas) {
        menuData = null
    } else {
        menuData = data.datas
    }

    // console.log(...data.datas, "menu여기")
    return (
        <View style={styles.container}>
            {!menuData ?
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