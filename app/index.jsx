import React from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import LogoImg from "@/assets/images/app-logo.png";

export default function Index() {
  const [isPressed, setIsPressed] = React.useState(false);
  console.log(isPressed);

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.firstRow}>
        <Image style={styles.LogoImg} source={LogoImg} />
        <Text style={styles.title}>Azimutree</Text>
        <Text style={{ color: "black" }}>(Prototype version)</Text>
      </View>

      {/* Tombol Kamera dan Upload */}
      <View style={styles.secondRow}>
        {/* Tombol Kamera */}
        <Link href="/kamera" style={styles.unPressed} asChild>
          <Pressable
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={() => console.log("Kamera")}
          >
            <Text style={{ textAlign: "center" }}>Kamera</Text>
          </Pressable>
        </Link>

        {/* Tombol Upload */}
        <Link href="/upload" style={styles.unPressed} asChild>
          <Pressable
            style={({ pressed }) => [pressed ? styles.Pressed : styles.unPressed]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={() => console.log("Upload")}
          >
            <Text style={{ textAlign: "center" }}>Upload</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  Pressed: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "green",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20
  },
  unPressed: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "lime",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 20
  },
  firstRow: {
    flex: 1,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "brown"
  },
  secondRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    // backgroundColor: "yellow",
  },
  LogoImg: {
    width: 225,
    height: 225,
    borderRadius: 60,
  },
});
