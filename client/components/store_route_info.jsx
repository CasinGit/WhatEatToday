import { ScrollView, StyleSheet, Text } from "react-native";

function StoreInfoRoute() {




    return ( 
        <ScrollView style={styles.container}>
            <Text style={styles.text}>info_address</Text>
            <Text style={styles.text}>info_tel</Text>
            <Text style={styles.text}>info_time</Text>
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


})

export default StoreInfoRoute;