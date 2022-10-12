import { useState } from "react";
import { format } from "date-fns";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useEffect } from "react";


function ReservationScreen() {

    const [selectedStartDate, setSelectedStartDate] = useState(null);

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


    const markedDates = posts.reduce((acc, current) => {
        const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
        acc[formattedDate] = { marked: true };
        return acc;
    }, {});

    const [selectedTime,setSelectedTime] = useState();
    const handleTime = (event, date) =>{
        console.log("event",date);
        setSelectedTime(event.nativeEvent.timestamp);
    }
    const [selectedDate, setSelectedDate] = useState(
        format(new Date(), "yyyy-MM-dd"),
    );
    const markedSelectedDates = {
        ...markedDates,
        [selectedDate]: {
            selected: false,
            marked: markedDates[selectedDate]?.marked,
        }
    }
    
    useEffect(()=>{
        console.log(selectedDate);
        console.log(selectedTime);
    },[selectedDate,selectedTime])

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month + '-' + day;

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <View>
                <View>
                    <Text style={styles.container_store_name}>식당 이름</Text>
                </View>
                <View>
                    <Calendar 
                    style={styles.calendar}
                    initialDate={"2022-10-12"}
                        markedDates={markedSelectedDates}
                        minDate={dateString}
                        theme={{
                            selectedDayBackgroundColor: '#009688',
                            arrowColor: '#009688',
                            dotColor: '#009688',
                            todayTextColor: '#009688',
                        }}
                        onDayPress={(day) => {
                            setSelectedDate(day.dateString)
                        }}

                    //minDate = {date}
                    />
                </View>
                <View>
                    <Text style={{padding:5, textAlign:"center"}}>선택된 예약날짜 및 시간 </Text>
                    <RNDateTimePicker 
                        mode="time"
                        is24Hour={true}
                        display="default"
                        minuteInterval={10}
                        value={selectedTime}
                        positiveButtonLabel="예약"
                        negativeButtonLabel="취소"
                        // onChange={handleTime}
                    />
                    <Text>{selectedDate}{selectedTime}</Text>
                </View>
                <View>
                    <TextInput placeholder="예약인원을 입력해주세요" keyboardType="number-pad" />
                </View>
                <View>
                    <Text style={styles.text_global}>요청사항</Text>
                    <TextInput style={styles.input_req} multiline={true} maxLength={600} />
                </View>
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
        padding: 5
    },
    container_store_name: {
        fontSize: 25,
        padding: 10,

    },
    input_req: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        padding: 2,
        fontSize: 13,

    }
})

export default ReservationScreen;