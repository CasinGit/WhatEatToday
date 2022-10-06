import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

function ConsumerRoute() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPssword] = useState();
    const [ph, setPh] = useState();

    const pressHandle = () => {
        console.log(email, password, confirmPassword, ph);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 4 }}>
                <Text >오늘, 뭐먹지?</Text>
            </View>
            <View style={{ marginBottom: 4 }}>
                <Text >사용할 이메일</Text>
                <TextInput onChangeText={setEmail}
                />
            </View>
            <View style={{ marginBottom: 4 }}>
                <Text>사용할 비밀번호</Text>
                <TextInput onChangeText={setPassword}
                    secureTextEntry={true}
                />
            </View>
            <View style={{ marginBottom: 4 }}>
                <Text >비밀번호 재확인</Text>
                <TextInput onChangeText={setConfirmPssword}
                    secureTextEntry={true}
                />
            </View>
            <View style={{ marginBottom: 4 }}>
                <Text>전화번호</Text>
                <TextInput onChangeText={setPh}
                />
            </View>
            <View style={{ marginBottom: 4, }}>
                <Button title="회원가입" onPress={pressHandle} />
            </View>
        </View >
    );
}

export default ConsumerRoute;