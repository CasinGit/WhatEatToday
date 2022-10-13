import { useContext } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import test_check_image from "../assets/test_Check_green_circle.png";
import { AppContext } from "../context/app-context";

function ReservationConfirmScreen({route}) {
    const date = route.params.date;
    const time = route.params.time;
    const person = route.params.person;
    const text = route.params.text;
    const store = route.params.store;
    const storeType = route.params.storeType;

    console.log(date, time, person, text, "이걸봐라");

    const ctx = useContext(AppContext);
    const userNumber = ctx.auth.ph.slice(-4);
    // console.log(number)

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <Image style={styles.container_check} source={test_check_image}/>        
            </View>
            <View style={styles.aa}>
                <Text style={styles.textContainer}>{`예약번호(${userNumber}) 예약성공!`}</Text>
                <Text style={styles.textContainer}>{store}
                    <Text>{"["+storeType+"]"}</Text>
                </Text>
                <Text style={styles.textContainer}>예약일시</Text>
                <Text style={styles.textContainer}>{date}{"("+time+")"}</Text>
                <Text style={styles.textContainer}>인원 : {person}</Text>
                <Text style={styles.textContainer}>요청사항 </Text>
                {text ? 
                    <Text>{text}</Text>
                    :
                    <Text>없음</Text>
                }
            </View>
            <View style={styles.buttonContainer}>
                <Button title="홈으로"/>
                <Button title="예약내역"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container_check : { 
        width : 300,
        height : 300,
        marginTop : 10,
    },
    textContainer : {
        marginTop : 10,
        fontSize : 35
    },
    layer: {
        flex: 1,
    },
    image: {
        margin: 4.5,
        height: 140,
        width: 140
    },
    aa: {
        marginTop : 15,
        justifyContent: "flex-start",
        flex: 1
    },
    outerContainer: {
        borderRadius: 5,
        margin: 8,
        elevation: 1,
        flex: 1,
        overflow: "hidden",
        height: 150,
        backgroundColor: "white"
    },
    innerContainer: {
        flex: 1,
        flexDirection : "column",
        alignItems : "center"
    },
    buttonContainer : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        marginBottom : 20
    }
});

export default ReservationConfirmScreen;