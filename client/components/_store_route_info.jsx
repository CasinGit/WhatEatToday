import { ScrollView, StyleSheet, Text, View } from "react-native";

function StoreInfoRoute({ data, place, places, ph }) {
    let storeInfo;

    if (!data?.datas) {
        storeInfo = null
    } else {
        storeInfo = data.datas[0]
    }

    return (
        <ScrollView style={styles.container}>
            {storeInfo !== null ?
                <View>
                    <Text style={styles.text1}>주소 : {place + "(" + places + ")"}</Text>
                    <Text style={styles.text2}>연락처 : {ph ? ph : "정보준비중"}</Text>
                    <Text style={styles.text3}>영업시간 : {storeInfo.BSNS_TM_CN ? storeInfo.BSNS_TM_CN : "정보준비중"}</Text>
                </View>
                :
                <Text>준비중</Text>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        marginHorizontal: 10,
        marginTop: 20
    },
    text1: {
        fontSize: 25,
        textAlign: "center",
        marginTop: 20
    },
    text2: {
        fontSize: 25,
        textAlign: "center",
        marginTop: 20
    },
    text3: {
        fontSize: 25,
        textAlign: "center",
        marginTop: 20
    }
});

export default StoreInfoRoute;