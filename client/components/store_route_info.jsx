import { ScrollView, StyleSheet, Text, View } from "react-native";

function StoreInfoRoute({data, place, places, ph}) {
    let storeInfo;

    if (!data?.datas) {
        storeInfo = null
    } else {
        storeInfo = data.datas[0]
    }

    return (
        <ScrollView style={styles.container}>
            { storeInfo !== null? 
                <View>                    
                    <Text style={styles.text}>주소 : {place+"(" + places + ")"}</Text>
                    <Text style={styles.text}>연락처 : {ph}</Text>
                    <Text style={styles.text}>영업시간 : {storeInfo.BSNS_TM_CN}</Text>
                </View>
                :
                <Text>준비중</Text>
            }
        </ScrollView>
     );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : "#99ffcc",
        marginHorizontal : 10
    },
    text : {
        fontSize : 15,
        textAlign : "center"
    }
});

export default StoreInfoRoute;