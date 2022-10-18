import { useContext, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Button, ScrollView, Alert } from "react-native";
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js"
import { Calendar } from 'react-native-calendars';
import { TextInput } from "react-native-paper";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from "@react-navigation/native";
import { createReservationRequest } from "../util/reservation";
import { AppContext } from "../context/app-context";

const posts = [
    {
        id: 1,
        title: "제목입니다.",
        contents: "내용입니다.",
        date: "2022-02-26",
    },
    {
        id: 2,
        title: "제목입니다.",
        contents: "내용입니다.",
        date: "2022-02-27",
    }
];

function ReservationScreen({ route }) {
    // const [selectedStartDate, setSelectedStartDate] = useState(null);
    const storeId = route.params.datas.RSTR_ID
    const RSTR_NM = route.params.datas.RSTR_NM;
    const BSNS_STATM_BZCND_NM = route.params.datas.BSNS_STATM_BZCND_NM;
    //#region 달력 날짜 선택 섹션
    const markedDates = posts.reduce((acc, current) => {
        const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
        acc[formattedDate] = { marked: true };
        return acc;
    }, {});
    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), "yyyy-MM-dd"),
    );
    const markedSelectedDates = {
        ...markedDates,
        [selectedDate]: {
            selected: true,
            marked: markedDates[selectedDate]?.marked,
        }
    }

    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let dateString = year + '-' + month + '-' + day;
    //#endregion

    //#region 시간 선택 섹션 (날짜 선택도 가능)
    const [date, setDate] = useState(new Date()); // 선택 날짜
    const [mode, setMode] = useState('date') // 모달 유형
    const [visible, setVisible] = useState(false); // 모달 노출 여부

    // 날짜 선택 버튼 클릭시 실행
    // const onPressDate = () => {
    //     setMode("date"); // 모달 유형 date로 변경
    //     setVisible(true); // modal open
    // }

    // 시간 선택 버튼 클릭시 실행
    const onPressTime = () => {
        setMode("time"); // 모달 유형 time으로 변경
        setVisible(true); // modal open
    };

    const onConfirm = (selectedDate) => { // 날짜 또는 시간 선택시
        setVisible(false); // modal close
        setDate(selectedDate); // 선택한 날짜 변경
    }

    const onCancel = () => { // 취소
        setVisible(false); // modal close
    }
    //#endregion
    const navigation = useNavigation();
    const [person, setPerson] = useState();
    const [texts, setTexts] = useState();

    const ctx = useContext(AppContext);

    const pressHandle = async () => {
        const dates = format(new Date(selectedDate), "PPP", { locale: ko });
        const dateDb = new Date(selectedDate).toISOString().split("T")[0];
        const times = format(new Date(date), "p", { locale: ko });
        if (person === 0 || person === undefined || person === null) {
            Alert.alert("예약인원을 입력해주세요");
        } else {
            await createReservationRequest(storeId, ctx.auth.email, dateDb, times, person, texts);
            navigation.navigate("reservationConfirm", { date: dates, time: times, person: person, store: RSTR_NM, storeType: BSNS_STATM_BZCND_NM, text: texts });
        }
    };

    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <View>
                <View style={{ alignItems: "center", backgroundColor: "white" }}>
                    <Text style={styles.container_store_name}>{RSTR_NM}
                        <Text style={{ fontSize: 20, textAlign: "center", flexWrap: "wrap" }}>{"[" + BSNS_STATM_BZCND_NM + "]"}</Text>
                    </Text>
                </View>
                <View>
                    <Calendar
                        style={styles.calendar}
                        initialDate={dateString}
                        markedDates={markedSelectedDates}
                        minDate={dateString}
                        theme={{
                            selectedDayBackgroundColor: '#009688',
                            arrowColor: '#009688',
                            dotColor: '#009688',
                            todayTextColor: '#009688',
                        }}
                        onDayPress={(day) => {
                            setSelectedDate(day.dateString);
                            onPressTime()
                            console.log(day)
                        }} />
                </View>
                {/* 날짜 선택 영역 (현재 사용 안함) */}
                {/* <Pressable onPress={onPressDate}>
                    <Text>{format(new Date(date), "PPP", { locale: ko })}</Text>
                </Pressable> */}
                {/* 시간 선택 영역 */}
                <DateTimePickerModal
                    isVisible={visible}
                    mode={mode}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                    date={date} />
                <View style={{}}>
                    <Text style={{ padding: 5, fontSize: 35 }}>예약일시 :
                        <Text style={{ fontSize: 25 }}> {format(new Date(selectedDate), "PPP", { locale: ko })}</Text>
                        <Text style={{ fontSize: 25 }}>{"(" + format(new Date(date), "p", { locale: ko }) + ")"}</Text>
                    </Text>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, backgroundColor: "white", flexDirection: "row" }}>
                    <Text style={{ fontSize: 35, padding: 5, }}>예약인원 : </Text>
                    <TextInput style={{ fontSize: 35, backgroundColor: "white", borderColor: "black", borderWidth: 1, height: 45 }} multiline={false} placeholder="0" keyboardType="number-pad" onChangeText={setPerson} />
                    <Text style={{ fontSize: 35, padding: 5, }}> 명</Text>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, backgroundColor: "white" }}>
                    <Text style={styles.text_global}>요청사항 :</Text>
                    <TextInput style={styles.input_req} multiline={false} maxLength={600} onChangeText={setTexts} />
                </KeyboardAvoidingView>
            </View>
            <View style={{ marginTop: 20, marginBottom: 50 }}>
                <Button title="예약하기" onPress={pressHandle} />
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    calendar: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    text_global: {
        padding: 5,
        fontSize: 35
    },
    container_store_name: {
        fontSize: 40,
        marginTop: 10
    },
    input_req: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        fontSize: 25,
        marginHorizontal: 5
    },
    center: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
        flexDirection: 'row',
    },
    separator: {
        width: 3,
    },
})

export default ReservationScreen;