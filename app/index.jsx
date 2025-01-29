import React from "react";
import { Text, View, StyleSheet, Pressable, Image, ImageBackground } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// import LogoImg from "@/assets/images/app-logo.png";
import BackgroundApp from "@/assets/images/background-app.png";

export default function Index() {
  const [isPressed, setIsPressed] = React.useState(false);
  console.log(isPressed);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={BackgroundApp} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <Pressable style={styles.navbarSidebarBtn} onPress={() => console.log("Sidebar")}>
            <Image
              source={{ uri: "https://img.icons8.com/ios-filled/50/ffffff/menu--v1.png" }}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>
          <Text style={styles.navbarText}>Azimutree</Text>
        </View>

        {/* Logo */}
        <View style={styles.firstRow}>
          {/* <Image style={styles.LogoImg} source={LogoImg} /> */}
          <Text style={styles.title}>Menu</Text>
          <Text style={{ color: "white" }}>(Prototype version)</Text>
        </View>

        {/* Tombol Camera Example dan Menu Example */}
        <View style={styles.nextRow}>
          <Link href="/camera-example" style={styles.unPressed} asChild>
            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={() => console.log("Kamera")}
            >
              <Text style={{ textAlign: "center" }}>Camera Example</Text>
            </Pressable>
          </Link>
          <Link href="/" style={styles.unPressedDisabled} asChild>
            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={() => console.log("Kamera")}
              disabled
            >
              <Text style={{ textAlign: "center" }}>Menu Example</Text>
            </Pressable>
          </Link>
        </View>

        {/* Tombol Kamera dan Upload */}
        <View style={styles.nextRow}>
          {/* Tombol Kamera */}
          <Link href="/camera" style={styles.unPressed} asChild>
            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={() => console.log("Kamera")}
            >
              <Text style={{ textAlign: "center" }}>Kamera</Text>
            </Pressable>
          </Link>
          <Link href="/" style={styles.unPressedDisabled} asChild>
            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={() => console.log("Kamera")}
              disabled
            >
              <Text style={{ textAlign: "center" }}>Menu Example</Text>
            </Pressable>
          </Link>
        </View>

        {/* Manu */}
        <View style={styles.nextRow}>
          <Link href="/" style={styles.unPressedDisabled} asChild>
            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={() => console.log("Kamera")}
              disabled
            >
              <Text style={{ textAlign: "center" }}>Menu Example</Text>
            </Pressable>
          </Link>
          <Link href="/" style={styles.unPressedDisabled} asChild>
            <Pressable
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={() => console.log("Kamera")}
              disabled
            >
              <Text style={{ textAlign: "center" }}>Menu Example</Text>
            </Pressable>
          </Link>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={{ color: "white" }}>© 2025 Azimutree | Sidz</Text>
        </View>
      </ImageBackground>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: "auto",
    paddingVertical: 10,
    justifyContent: "flex-start",
    position: 'absolute',
    top: 0,
    flex: 1,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    position: 'absolute',
    bottom: 0,
    flex: 1,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
  },
  navbarSidebarBtn: {
    marginLeft: 20,
  },
  navbarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  Pressed: {
    flexDirection: "column",
    paddingVertical: 20,
    backgroundColor: "green",
    borderRadius: 20,
    width: 150,
  },
  unPressed: {
    flexDirection: "column",
    paddingVertical: 10,
    backgroundColor: "rgb(7, 193, 181)",
    borderRadius: 20,
    width: 150,
  },
  unPressedDisabled: {
    flexDirection: "column",
    paddingVertical: 10,
    backgroundColor: "darkgrey",
    borderRadius: 20,
    width: 150,
  },
  firstRow: {
    paddingTop: 20,
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    top: -60,
  },
  nextRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    marginVertical: 10,
    bottom: -80,
  },
  LogoImg: {
    width: 75,
    height: 75,
    borderRadius: 10,
    // borderColor: "rgba(0, 0, 0, 0.5)",
    // borderWidth: 4,
  },
});
