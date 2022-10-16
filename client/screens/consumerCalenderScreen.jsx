import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { getReservationHistory } from '../util/reservation';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

function ConsumerCalenderScreen({ route }) {
    console.log("CalendarAgendaScreen route", route.params);
    const [items, setItems] = useState({});
    const [reservation, setReservation] = useState();

    useEffect(() => {
        getReservationHistory(route.params.email).then((received) => {
            // console.log(received);
            setReservation(received.datas);
        })
    }, [])

    const loadItems = (day) => {
        const obj = reservation;

        const daySet = new Set();
        obj.forEach(one => daySet.add(one.date));
        console.log("daySet", daySet);

        // daySet 기준으로 배열 생성
        const oneDay = Array.from(daySet);
        console.log("oneDay", oneDay);

        // 여기서 며칠까지 데이터를 만들지 결정
        for (let i = 0; i < daySet.size; i++) {
            // const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            // const strTime = timeToString(time);
            const strTime = oneDay[i];

            if (!items[strTime] && daySet.has(strTime)) {
                items[strTime] = [];

                let numItems = 0; // 일별 예약 갯수
                obj.forEach(elm => {
                    // console.log(elm.date, strTime)
                    // if (elm.date == strTime) numItems++
                    numItems++
                });

                for (let j = 0; j < numItems; j++) {
                    if (obj[j].date !== strTime) continue;
                    items[strTime].push({
                        store: `${obj[j].getRstr.RSTR_NM}`,
                        date: `예약 시간: ${obj[j].date} ${obj[j].time}`,
                        email: `예약자: ${obj[j].email}`,
                        visitor: `방문인원: ${obj[j].num}명`,
                        request: `요청사항: ${obj[j].message}`,
                        height: Math.max(10, Math.floor(Math.random() * 150)),
                        day: strTime
                    });
                }
            }
        }
        const newItems = {};
        Object.keys(items).forEach(key => {
            newItems[key] = items[key];
        });
        setItems(newItems);
    }


    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let dateString = year + '-' + month + '-' + day;


    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item}>
                <Card>
                    <Card.Content>
                        <View>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.store}</Text>
                            <Text>{item.date}</Text>
                            <Text>{item.email}</Text>
                            <Text>{item.visitor}</Text>
                            <Text>{item.request}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            {reservation &&
                <Agenda
                    items={items}
                    loadItemsForMonth={loadItems}
                    selected={dateString}
                    refreshControl={null}
                    showClosingKnob={true}
                    refreshing={false}
                    renderItem={renderItem}
                />
            }
            <StatusBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
        marginTop: 15,
    },
});

export default ConsumerCalenderScreen;