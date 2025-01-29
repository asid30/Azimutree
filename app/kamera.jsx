import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Kamera() {

    return (
        <SafeAreaView style={{ backgroundColor: "black" }}>
            {/* Logo */}
            <View style={styles.firstRow}>
                <Text style={styles.title}>Test</Text>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 20,
        textAlign: "center",
    },
});
