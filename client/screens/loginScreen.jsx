import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import LoadingOverlay from "../components/loadingOverlay";
import { AppContext } from "../context/app-context";
import { sendLoginRequest } from "../util/accounts";
import globalStyles from "./stylesheet";

function LoginScreen() {

    console.log("LoginScreen");
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [inputValues, setInputValues] = useState({ email: "", password: "" });

    const ctx = useContext(AppContext);

    useEffect(() => {
        navigation.setOptions({
            title: "로그인"
        });
    }, []);

    const moveRegisterHandle = () => {
        navigation.navigate("register");
    }

    const loginHandle = async () => {
        setLoading(true);
        try {
            const recv = await sendLoginRequest(inputValues.email, inputValues.password);
            ctx.dispatch({ type: "login", payload: recv });
            AsyncStorage.setItem("authentication", JSON.stringify(recv));
            navigation.navigate("home");
        } catch (e) {
            console.log(e);
            Alert.alert("With°", "아이디 또는 비밀번호가 유효하지 않습니다.\n")
        }
        setLoading(false);
    }


    if (loading) {
        return (
            <LoadingOverlay />
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.root}>
                <View style={{ marginBottom: 4 }}>
                    <Text style={[globalStyles.font, styles.large]}>WITH°</Text>
                </View>
                <ScrollView>
                    <View style={{ marginBottom: 4 }}>
                        <Text style={[globalStyles.font, styles.regular]}>이메일</Text>
                        <TextInput
                            style={[globalStyles.font, styles.regular, styles.textInput]}
                            value={inputValues.email}
                            onChangeText={
                                (text) => setInputValues({ ...inputValues, email: text })
                            }
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={{ marginBottom: 4 }}>
                        <Text style={[globalStyles.font, styles.regular]}>비밀번호</Text>
                        <TextInput
                            value={inputValues.password}
                            secureTextEntry={true}
                            onChangeText={
                                function (text) {
                                    setInputValues({ ...inputValues, password: text })
                                }
                            }
                            style={[globalStyles.font, styles.regular, styles.textInput]}
                            autoCapitalize="none"
                        />

                    </View>

                    <View style={{ marginBottom: 4 }}>
                        <View style={{ marginBottom: 20, }}>
                            <Button title="로그인" onPress={loginHandle} />
                        </View>
                        <Pressable onPress={moveRegisterHandle}>
                            <Text style={
                                [globalStyles.font, styles.small, { textAlign: "center" }]}>새로운 계정이 필요하십니까?</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View >

        </TouchableWithoutFeedback>

    );
}
const styles = StyleSheet.create({
    small: {
        fontSize: 20,
    },
    large: {
        fontSize: 90,
    },
    regular: {
        fontSize: 32
    },
    textInput: {
        padding: 4,
        borderBottomColor: "#121212",
        borderBottomWidth: 2,
    }
});
export default LoginScreen;