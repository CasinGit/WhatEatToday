import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { TextInput } from 'react-native-paper';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { AppContext } from "../context/app-context";
import { sendLoginRequest } from "../util/account";

function LoginScreen() {
    console.log("LoginScreen");
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const ctx = useContext(AppContext);

    useEffect(() => {
        navigation.setOptions({
            title: "로그인"
        });
    }, []);

    const loginHandle = async () => {
        try {
            const recv = await sendLoginRequest(email, password);
            ctx.dispatch({ type: "login", payload: recv });
            AsyncStorage.setItem("authentication", JSON.stringify(recv));
            // navigation.navigate("homeStack");
        } catch (e) {
            console.log(e);
            Alert.alert("아이디 또는 비밀번호가 유효하지 않습니다.\n")
        }
    }

    const moveRegisterHandle = () => {
        navigation.navigate("register");
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={{ marginBottom: 20 }}>
                    <Image source={require('../assets/title_logo_black.png')} />
                    {/* <Image source={require('../assets/title_logo_gray.png')} /> */}
                </View>
                <View style={{ width: "60%" }}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.textInput}
                            mode="outlined"
                            label="이메일"
                            placeholder="이메일을 입력해주세요"
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.textInput}
                            mode="outlined"
                            label="비밀번호"
                            placeholder="비밀번호를 입력해주세요"
                            right={<TextInput.Icon icon="eye" />}
                            secureTextEntry
                            onChangeText={setPassword}
                            autoCapitalize="none"
                        />
                    </View>
                    <View>
                        <View style={{ marginBottom: 10 }}>
                            <Button title="로그인" onPress={loginHandle} />
                        </View>
                        <Pressable onPress={moveRegisterHandle}>
                            <Text style={{ color: "blue" }}>새로운 계정이 필요하십니까?</Text>
                        </Pressable>
                    </View>
                </View>
            </View >
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 10
    },
    textInput: {
        // padding: 5,
        // borderBottomColor: "#121212",
        // borderBottomWidth: 2,
    },
});

export default LoginScreen;