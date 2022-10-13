import { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Pressable, Button, ScrollView } from "react-native";
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js"
import { Calendar } from 'react-native-calendars';
import { TextInput } from "react-native-paper";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from "@react-navigation/native";

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

function ReservationScreen({route}) {
    // const [selectedStartDate, setSelectedStartDate] = useState(null);
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

    const pressHandle = () => {
        const dates = format(new Date(selectedDate), "PPP", { locale: ko });
        const times = format(new Date(date), "p", { locale: ko });
        navigation.navigate("Test_ReservationConfirm", {date : dates, time : times, person : person, store : RSTR_NM, storeType : BSNS_STATM_BZCND_NM, text: texts});
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, backgroundColor:"white" }}>
            <View>
                <View style={{alignItems:"center", backgroundColor : "white"}}>
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
                    <Text style={{ padding: 5, fontSize:35 }}>예약일시 :
                        <Text style={{fontSize:25}}> {format(new Date(selectedDate), "PPP", { locale: ko })}</Text>
                        <Text style={{fontSize:25}}>{"("+format(new Date(date), "p", { locale: ko })+")"}</Text>
                    </Text>
                </View>
                <View>
                    <TextInput  style={{backgroundColor:"white"}} placeholder="예약인원(Click!)" keyboardType="number-pad" onChangeText={setPerson}/>
                </View>
                <View>
                    <Text style={styles.text_global}>요청사항</Text>
                    <TextInput style={styles.input_req} multiline={true} maxLength={600} onChangeText={setTexts} />
                </View>
            </View>
            <View style={{marginTop : 20}}>
                <Button title="예약하기" onPress={pressHandle}/>
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    calendar: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    text_global: {
        padding: 5,
        fontSize : 30
    },
    container_store_name: {
        fontSize: 30,
        padding: 10,
    },
    input_req: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        padding: 2,
        fontSize: 13,
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