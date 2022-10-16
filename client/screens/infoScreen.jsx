import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, Pressable, Image } from "react-native";
import { Title, Card } from 'react-native-paper';
import { AppContext } from "../context/app-context";
import { RegisterContext } from "../context/register-context";
import { getStoreInfoRequest } from "../util/store";

function sellerInfoPage(data) {
    console.log(data, "이걸봐라")
    const navigation = useNavigation();
    const [datas, setDatas] = useState();

    useEffect(() => {
        !async function () {
            const storeData = await getStoreInfoRequest();
            storeData.datas.filter((one) => {
                if (one.RSTR_ID == data.RSTR_ID) {
                    return setDatas(one);
                }
            })
        }()
    }, [])

    const sellerStorePressHandle = () => {
        navigation.navigate("storeInfo", { datas: datas, place: datas.RSTR_RDNMADR, places: datas.RSTR_LNNO_ADRES, ph: datas.RSTR_TELNO });
    };
    const sellerCalenderPressHandle = () => {
        navigation.navigate("sellerCalender", { RSTR_ID: datas.RSTR_ID });
    };

    return (
        <View>
            <Text style={{ alignSelf: "center", marginBottom: 20 }}>반가워요! {data.email} 점주님!</Text>
            <View style={{ flexDirection: "row", margin: 10 }}>
                <Pressable style={({ pressed }) => pressed ? { opacity: 0.8 } : null}
                    onPress={sellerStorePressHandle}>
                    <Card style={{ margin: 5 }}>
                        <Card.Cover source={require("../assets/store.png")} style={{ width: 100, height: 100 }} resizeMode="contain" />
                        <Title style={{ alignSelf: "center" }}>내가게</Title>
                    </Card>
                </Pressable>

                <Pressable style={({ pressed }) => pressed ? { opacity: 0.8 } : null}
                    onPress={sellerCalenderPressHandle} >
                    <Card style={{ margin: 5 }}>
                        <Card.Cover source={require("../assets/calender.png")} style={{ width: 100, height: 100 }} resizeMode="contain" />
                        <Title style={{ alignSelf: "center" }}>캘린더</Title>
                    </Card>
                </Pressable>
            </View>
        </View>
    )
}

function consumerInfoPage(data) {
    const navigation = useNavigation();

    const consumerHistoryPressHandle = () => {
        navigation.navigate("history", data.email);
    };
    const consumerCalenderPressHandle = () => {
        navigation.navigate("consumerCalender", { email: data.email });


    };
    const consumerFavoritesPressHandle = () => {
        navigation.navigate("favorites");
    };

    return (
        <View>
            <Text style={{ alignSelf: "center", marginBottom: 20, fontSize: 25 }}>반가워요! {data.email.split("@")[0]}님!</Text>
            <View style={{ flexDirection: "row", margin: 10 }}>
                <Pressable style={({ pressed }) => pressed ? { opacity: 0.8 } : null} onPress={consumerHistoryPressHandle}>
                    <Card style={{ margin: 5 }}>
                        <Card.Cover source={require("../assets/usageHistory.png")} style={{ width: 100, height: 100 }} resizeMode="contain" />
                        <Title style={{ alignSelf: "center" }}>이용내역</Title>
                    </Card>
                </Pressable>

                <Pressable style={({ pressed }) => pressed ? { opacity: 0.8 } : null} onPress={consumerCalenderPressHandle}>
                    <Card style={{ margin: 5 }}>
                        <Card.Cover source={require("../assets/calender.png")} style={{ width: 100, height: 100 }} resizeMode="contain" />
                        <Title style={{ alignSelf: "center" }}>캘린더</Title>
                    </Card>
                </Pressable>

                <Pressable style={({ pressed }) => pressed ? { opacity: 0.8 } : null} onPress={consumerFavoritesPressHandle}>
                    <Card style={{ margin: 5 }}>
                        <Card.Cover source={require("../assets/favorites.png")} style={{ width: 100, height: 100 }} resizeMode="contain" />
                        <Title style={{ alignSelf: "center" }}>즐겨찾기</Title>
                    </Card>
                </Pressable>
            </View>
        </View>
    )
}

function InfoScreen() {
    const ctx = useContext(AppContext);
    const ctxR = useContext(RegisterContext);
    const navigation = useNavigation();
    let confirm;
    // console.log(ctx.auth, "info")
    if (!ctx.auth.RSTR_ID) {
        confirm = undefined;
    } else {
        confirm = ctx.auth.RSTR_ID
    }

    const logoutHandle = () => {
        ctx.dispatch({ type: "logout" });
        ctxR.dispatch({ type: "logoutSellerRegister" });
        AsyncStorage.removeItem("authentication");
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={require('../assets/title_logo_black.png')} />
                </View>
                {!confirm ?
                    consumerInfoPage(ctx.auth)
                    :
                    sellerInfoPage(ctx.auth)
                }
            </View>
            <View style={{ alignSelf: "auto" }}>
                <Button title="로그아웃" onPress={logoutHandle} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    logo: {
        // flexDirection: "column",
        // justifyContent: "center",
        alignItems: 'center',
        marginBottom: 50
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "white"
    },
    inputContainer: {
        marginBottom: 5,
    },
});

export default InfoScreen;