import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { TextInput } from 'react-native-paper';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { AppContext } from "../context/app-context";
import { sendLoginRequest } from "../util/account";
import ImagePicker from "../components/imagePicker";
import { writeStoreReview } from "../util/review";
import { writeReviewData } from "../util/reservation";

function WriteStoreReview({ route, navigation }) {
    console.log(route.params.RSTR_ID);
    console.log(route.params._ID);

    const ctx = useContext(AppContext);

    const [reviewScore, setReviewScore] = useState();
    const [reviewComment, setReviewComment] = useState("");
    const [reviewImage, setReviewImage] = useState(null);
    const [reviewImageBase64, setReviewImageBase64] = useState(null);

    const imagePickedHandle = (uri, base64) => {
        setReviewImage(uri);
        setReviewImageBase64(base64);
    }

    const confirm = () => {
        const data = {
            RSTR_ID: route.params.RSTR_ID,
            email: ctx.auth.email,
            score: reviewScore,
            comment: reviewComment
        }
        console.log(reviewImage)

        const file = {
            name: `reviewImg.jpg`,
            uri: reviewImage,
            type: 'image/jpg',
        }
        // console.log(file);

        const formData = new FormData();
        if (file.uri) formData.append("file", file);
        formData.append("data", JSON.stringify(data))

        writeStoreReview(formData).then((received) => {
            console.log(received);
            if (received.result) {
                writeReviewData(route.params._ID).then((received) => {
                    console.log(received)
                })
                navigation.goBack();
            }
        })

        // sendAddPlaceRequest(data, placeImageBase64, placeImage, ctx.auth.idToken)
        //     .then(() => {
        //         // navigation.navigate("chooseLocation");
        //         navigation.goBack();

        //     }).finally(() => {
        //         setLoading(false);
        //     })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <ImagePicker onPicked={imagePickedHandle} />
                <View>
                    <Text>별점:</Text>
                    <TextInput keyboardType="numeric" placeholder="숫자만 입력가능" value={reviewScore} onChangeText={setReviewScore} />

                    <Text style={{ marginTop: 10 }}>후기:</Text>
                    <TextInput style={{
                        borderBottomColor: "#111111",
                        borderBottomWidth: 1,
                        height: 40,
                    }}
                        placeholder={"후기를 입력해주세요"}
                        value={reviewComment} onChangeText={setReviewComment} />
                </View>
                <View style={{ marginTop: 50 }}>
                    <Button title="리뷰 등록" onPress={confirm} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        // justifyContent: "center",
        // alignItems: 'center',
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

export default WriteStoreReview;