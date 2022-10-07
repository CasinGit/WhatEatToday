import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
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

    const loginHandle = async() => {
        try {
            const recv = await sendLoginRequest(email, password);
            ctx.dispatch({ type: "login", payload: recv });
            AsyncStorage.setItem("authentication", JSON.stringify(recv));
            navigation.navigate("homeStack");
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
            <View >
                <View style={{ marginBottom: 4 }}>
                    <Text>오늘, 뭐먹지?</Text>
                </View>
                <ScrollView>
                    <View style={{ marginBottom: 4 }}>
                        <Text>이메일</Text>
                        <TextInput
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={{ marginBottom: 4 }}>
                        <Text >비밀번호</Text>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={{ marginBottom: 4 }}>
                        <View style={{ marginBottom: 20, }}>
                            <Button title="로그인" onPress={loginHandle} />
                        </View>
                        <Pressable onPress={moveRegisterHandle}>
                            <Text >새로운 계정이 필요하십니까?</Text>
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