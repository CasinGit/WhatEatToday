import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { Card, Searchbar, Title, Paragraph, Chip, Modal, Portal, Provider, Button } from 'react-native-paper';
import HistoryCard from "../components/HistoryCard.jsx";
import { getReservationHistory } from '../util/reservation.js';

function ReservationHistoryScreen({ route, navigation }) {
    // console.log(route.params)
    const [history, setHistory] = useState();

    useEffect(() => {
        getReservationHistory(route.params).then((received) => {
            // console.log(received);
            setHistory(received.datas);
        }).catch((err) => {
            console.error(err);
        })
    }, [])

    return (
        <View style={styles.container}>
            <FlatList data={history} renderItem={({ item }) => {
                return <HistoryCard data={item} />
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        flexDirection: "row",
        margin: 5
        // justifyContent: "center",
    },
});

export default ReservationHistoryScreen;