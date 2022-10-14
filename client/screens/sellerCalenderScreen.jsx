import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { getReservationList } from '../util/reservation';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

function SellerCalenderScreen({ route }) {
    console.log("CalendarAgendaScreen route", route.params);
    const [items, setItems] = useState({});
    const [reservation, setReservation] = useState();

    useEffect(() => {
        getReservationList(route.params.RSTR_ID).then((received) => {
            // console.log(received);
            setReservation(received.datas);
        })
    }, [])

    const loadItems = (day) => {

        setTimeout(() => {
            console.log(reservation);

            // 여기서 며칠까지 데이터를 만들지 결정
            for (let i = 0; i < 5; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];

                    const numItems = 10; // 일별 예약 갯수
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
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
        }, 100);
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
                            <Text>{item.name}</Text>
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
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
});

export default SellerCalenderScreen;