import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type";
 
type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;
 
export default function WelcomeScreen({ navigation }: Props) {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={{ uri: "https://i.pinimg.com/736x/21/3a/d2/213ad2fdf181588fb8a65f90e6e53dab.jpg" }} style={styles.img}></ImageBackground>
            <View style={styles.center}>
                <Text style={styles.title}>Christoffel menu app.</Text>
                <Text style={styles.subtitle}>Click the button below to manage your menu.</Text>
                <TouchableOpacity style={styles.cta} onPress={() => navigation.replace("Home")}>
                    <Text style={styles.ctaText}>View menu</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
 
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f2e9d4" },
    img: { height: '60%', width: '100%' },
    center: { alignItems: "center", paddingLeft: 24, paddingRight: 24, marginTop: -150 },
    title: { color: "#571310", fontSize: 37, fontWeight: "800", paddingBottom: 20 },
    subtitle: { color: "#571310", fontSize: 17, fontWeight: "400", paddingBottom: 40 },
    cta: { backgroundColor: "#a72913", paddingVertical: 14, paddingHorizontal: 44, borderRadius: 28, elevation: 6 },
    ctaText: { color: "#f2e9d4", fontWeight: "900", fontSize: 18 }
});