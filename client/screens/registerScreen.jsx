import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import LoadingOverlay from "../components/loadingOverlay";
import { sendRegisterRequest } from "../util/accounts";
import globalStyles from "./stylesheet";

function RegisterScreen() {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            title: "회원가입"
        });
    }, []);

    const [loading, setLoading] = useState(false);

    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputPasswordConfirm, setInputPasswordConfirm] = useState("");


    const registerHandle = () => {
        console.log(inputEmail, inputPassword, inputPasswordConfirm);
        !async function () {
            setLoading(true);
            try {
                const recv = await sendRegisterRequest(inputEmail, inputPassword);
                console.log(recv);
            } catch (e) {
                Alert.alert("With°", "회원 가입이 처리되지 않았습니다.\n")
                console.log(e);
            }
            setLoading(false);
        }();
    }

    if (loading) {
        return (
            <LoadingOverlay />
        );
    }

    return (
        <View style={globalStyles.root}>
            <View style={{ marginBottom: 4 }}>
                <Text style={[globalStyles.font, styles.regular]}>오늘, 뭐먹지?</Text>
            </View>
            <View style={{ marginBottom: 4 }}>
                <Text style={[globalStyles.font, styles.small]}>사용할 이메일</Text>
                <TextInput
                    style={[globalStyles.font, styles.small, styles.textInput]}
                    value={inputEmail}
                    onChangeText={setInputEmail}
                />
            </View>
            <View style={{ marginBottom: 4 }}>
                <Text style={[globalStyles.font, styles.small]}>사용할 비밀번호</Text>
                <TextInput
                    secureTextEntry={true}
                    style={[globalStyles.font, styles.small, styles.textInput]}
                    value={inputPassword}
                    onChangeText={setInputPassword}
                />
            </View>
            <View style={{ marginBottom: 4 }}>
                <Text style={[globalStyles.font, styles.small]}>비밀번호 재확인</Text>
                <TextInput
                    secureTextEntry={true}
                    style={[globalStyles.font, styles.small, styles.textInput]}
                    value={inputPasswordConfirm}
                    onChangeText={setInputPasswordConfirm}
                />
            </View>
            <View style={{ marginBottom: 4, }}>
                <Button title="회원가입" onPress={registerHandle} />
            </View>
        </View >

    );
}

const styles = StyleSheet.create({
    small: {
        fontSize: 24,
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

export default RegisterScreen;