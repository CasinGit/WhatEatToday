import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Searchbar } from 'react-native-paper';

function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="가게 검색"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 10
    },
});

export default SearchScreen;