import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet, Button, Text, View, Pressable, Image } from "react-native";
import { Title, Card } from 'react-native-paper';
import { AppContext } from "../context/app-context";
import { RegisterContext } from "../context/register-context";

function sellerInfoPage(data) {

    return (
        <View>
            <Text style={{ alignSelf: "center", marginBottom: 20 }}>안녕~ {data.email} (판매자)</Text>

            <View style={{ flexDirection: "row", margin: 10 }}>
                <Pressable style={({ pressed }) => pressed ? { opacity: 0.8 } : null}>
                    <Card style={{ margin: 5 }}>
                        <Card.Cover source={require("../assets/title_logo_gray.png")} style={{ width: 100, height: 100 }} resizeMode="contain" />
                        <Title style={{ alignSelf: "center" }}>내가게</Title>
                    </Card>
                </Pressable>

                <Pressable style={({ pressed }) => pressed ? { opacity: 0.8 } : null}>
                    <Card style={{ margin: 5 }}>
                        <Card.Cover source={require("../assets/title_logo_gray.png")} style={{ width: 100, height: 100 }} resizeMode="contain" />
                        <Title style={{ alignSelf: "center" }}>캘린더</Title>
                    </Card>
                </Pressable>
            </View>
        </View>
    )
}

function consumerInfoPage(data) {

    return (
        <View>
            <Text style={{ alignSelf: "center", marginBottom: 20 }}>안녕~ {data.email} (소비자)</Text>

            <View style={{ flexDirection: "row", margin: 10 }}>
                <Pressable style={({ pressed }) => pressed ? { opacity: 0.8 } : null}>
                    <Card style={{ margin: 5 }}>
                        <Card.Cover source={require("../assets/title_logo_gray.png")} style={{ width: 100, height: 100 }} resizeMode="contain" />
                        <Title style={{ alignSelf: "center" }}>이용내역</Title>
                    </Card>
                </Pressable>

                <Pressable style={({ pressed }) => pressed ? { opacity: 0.8 } : null}>
                    <Card style={{ margin: 5 }}>
                        <Card.Cover source={require("../assets/title_logo_gray.png")} style={{ width: 100, height: 100 }} resizeMode="contain" />
                        <Title style={{ alignSelf: "center" }}>캘린더</Title>
                    </Card>
                </Pressable>

                <Pressable style={({ pressed }) => pressed ? { opacity: 0.8 } : null}>
                    <Card style={{ margin: 5 }}>
                        <Card.Cover source={require("../assets/title_logo_gray.png")} style={{ width: 100, height: 100 }} resizeMode="contain" />
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
    console.log(ctx.auth)
    if (!ctx.auth.datas.RSTR_ID) {
        confirm = undefined;
    } else {
        confirm = ctx.auth.data.RSTR_ID
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
                    consumerInfoPage(ctx.auth.datas)
                    :
                    sellerInfoPage(ctx.auth.datas)
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
    },
    inputContainer: {
        marginBottom: 5,
    },
});

export default InfoScreen;