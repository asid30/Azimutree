import React from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LogoImg from "@/assets/images/app-logo.png";

export default function Index() {
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.firstRow}>
        <Image style={styles.LogoImg} source={LogoImg} />
        <Text style={styles.title}>Azimutree</Text>
        <Text style={{ color: "white" }}>(Prototype version)</Text>
      </View>

      {/* Tombol Kamera dan Upload */}
      <View style={styles.secondRow}>

        <Pressable
          style={({ pressed }) => [pressed ? styles.Pressed : styles.unPressed]}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={() => console.log("Kamera")}
        >
          <Text>Kamera</Text>
        </Pressable>

        <View style={styles.separatorBtn}>|
        </View>

        <Pressable
          style={({ pressed }) => [pressed ? styles.Pressed : styles.unPressed]}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={() => console.log("Upload")}
        >
          <Text>Upload</Text>
        </Pressable>

      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  title: {
    color: "white",
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
    borderRadius: 20
  },
  unPressed: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "lime",
    justifyContent: "space-between",
    borderRadius: 20
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
  SeparatorBtn: {
    backgroundColor: "black",
    addingHorizontal: 20
  }
});
