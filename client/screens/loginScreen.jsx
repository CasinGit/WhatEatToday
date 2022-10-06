import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Button, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

function LoginScreen() {
    console.log("LoginScreen");
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: "로그인"
        });
    }, []);

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
                            
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={{ marginBottom: 4 }}>
                        <Text >비밀번호</Text>
                        <TextInput
                            secureTextEntry={true}
                            
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={{ marginBottom: 4 }}>
                        <View style={{ marginBottom: 20, }}>
                            <Button title="로그인" />
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