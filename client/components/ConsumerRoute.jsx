import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet, Alert, Button, View, Image } from "react-native";
import { TextInput } from 'react-native-paper';
import { AppContext } from "../context/app-context";
import { sendConsumerRegisterRequest } from "../util/account";

function ConsumerRoute() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [ph, setPh] = useState();
    const [secureView, setSecureView] = useState(true);
    const [_secureView, _setSecureView] = useState(true);
    const ctx = useContext(AppContext);
    const navigation = useNavigation();

    const pressHandle = () => {
        console.log(email, password, confirmPassword, ph);
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const regex = /^[A-Za-z0-9]{6,12}$/;
        if (regExp.test(email)) {
            if (regex.test(password)) {
                if (password == confirmPassword) {
                    !async function () {
                        try {
                            const recv = await sendConsumerRegisterRequest(email, password, ph);
                            console.log(recv);
                            ctx.dispatch({ type: "login", payload: recv.datas });
                            AsyncStorage.setItem("authentication", JSON.stringify(recv.datas));
                            navigation.navigate("homeStack");
                            Alert.alert("회원가입 성공\n")
                        } catch (e) {
                            Alert.alert("회원가입 실패\n")
                            console.log(e.message);
                        }
                    }()
                } else {
                    Alert.alert("비밀번호 확인 불일치\n")
                }
            } else {
                Alert.alert("비밀번호 문자, 숫자 포함 6자리 이상  작성해주세요\n")
            }
        } else {
            Alert.alert("이메일 형식이 아님\n")
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 10 }}>
                <Image source={require('../assets/title_logo_black.png')} />
                {/* <Image source={require('../assets/title_logo_gray.png')} /> */}
            </View>
            <View style={{ width: "60%" }}>
                <View style={styles.inputContainer}>
                    <TextInput style={{ fontSize: email ? 16 : 12 }}
                        mode="outlined"
                        label="이메일"
                        placeholder="이메일을 입력해주세요"
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={{ fontSize: password ? 16 : 12 }}
                        mode="outlined"
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요"
                        right={<TextInput.Icon icon="eye"
                            onPressIn={() => setSecureView(false)}
                            onPressOut={() => setSecureView(true)} />}
                        secureTextEntry={secureView}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={{ fontSize: confirmPassword ? 16 : 12 }}
                        mode="outlined"
                        label="비밀번호 확인"
                        placeholder="비밀번호를 다시 입력해주세요"
                        right={<TextInput.Icon icon="eye"
                            onPressIn={() => _setSecureView(false)}
                            onPressOut={() => _setSecureView(true)} />}
                        secureTextEntry={_secureView}
                        onChangeText={setConfirmPassword}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={{ fontSize: ph ? 16 : 12 }}
                        mode="outlined"
                        label="연락처"
                        placeholder="연락처를 입력해주세요"
                        onChangeText={setPh}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Button title="회원가입" onPress={pressHandle} />
                </View>
            </View>
        </View >
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
        marginBottom: 5,
    },
});

export default ConsumerRoute;