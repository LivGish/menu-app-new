/*CODE ATTRIBUTION*/
/*TITLE: IIE MAST5112 Module Manual 2025*/
/*AUTHOR: The Independent Institute of Education (Pty) Ltd*/
/*DATE: 07/03/2025*/
/*VERSION: 1.0*/
/*AVAILABLE: https://advtechonline.sharepoint.com/:w:/r/sites/TertiaryStudents/_layouts/15/Doc.aspx?sourcedoc=%7BC4AAF478-96AC-4469-8005-F7CDC4A15EBB%7D&file=MAST5112MM.docx&action=default&mobileredirect=true*/

import React from "react";
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MenuItem, RootStackParamList } from "../type";

type Props= NativeStackScreenProps<RootStackParamList, "Home"> & {
    items: MenuItem[];
    removeItem: (id: string) => void;
    averages: { Starter: string; Main: string; Dessert: string };
};

{/* remove item button */}
export default function HomeScreen({ navigation, items, removeItem, averages }: Props) {
    const confirmRemove = (id: string) => {
        Alert.alert("Remove Item", "Are you sure you want to remove this item from the menu?", [
            { text: "Cancel", style: "cancel" },
            { text: "Remove", style: "destructive", onPress: () => removeItem(id) }
        ]);
    };

    {/* menu item counter */}
    return (
        <SafeAreaView style={styles.container}>
                <Text style={styles.mainTitle}>Menu</Text>
                <Text style={styles.itemCountText}>
                    {items.length === 0
                    ? "No items on the menu yet."
                    : `You currently have ${items.length} item${items.length > 1 ? "s" : ""} on your menu.`}
                </Text>

            {/* display sprice average for each course */}
            <View style={styles.statsRow}>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Starters</Text>
                    <Text style={styles.statValue}>R {averages.Starter}</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Mains</Text>
                    <Text style={styles.statValue}>R {averages.Main}</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Desserts</Text>
                    <Text style={styles.statValue}>R {averages.Dessert}</Text>
                </View>
            </View>

{/* display seach menu item */}
            <FlatList
            data={items}
            keyExtractor={i => i.id}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <View style={styles.body}>
                        <Text style={styles.title}>{item.dishName}</Text>
                        <Text style={styles.desc}>{item.description}</Text>
                        <Text style={styles.meta}>{item.course} R{item.price}</Text>
                        <TouchableOpacity style={styles.remove} onPress={() => confirmRemove(item.id)}>
                            <Text style={styles.removeText}>Remove</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            )}
            contentContainerStyle={{ paddingBottom: 120}}
            />

{/* buttons for additem and fiter screens */}
            <View style={styles.fabs}>
                <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AddItem")}>
                    <Text style={styles.fabText}>Edit menu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.fab, styles.fabAlt]} onPress={() => navigation.navigate("Filter", { items })}>
                    <Text style={styles.fabText}>filter menu</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );
};

{/* standard colours for styling */}
const c = { bg: "#f2e9d4", card: "#faf4e6ff", text: "#571310", meta: "#571310", accent: "#a72913", chip: "#a72913" };

{/* general styling */}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: c.bg, padding: 16 },
    mainTitle: { fontSize: 28, fontWeight: "800", color: "#571310", textAlign: "center", paddingTop: 20 }, 
    itemCountText: { fontSize: 16, color: "#571310", textAlign: "center", marginBottom: 10, paddingBottom: 20 },   
    statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12, paddingBottom: 20 },
    stat: { backgroundColor: c.card, width: "32%", borderRadius: 14, paddingVertical: 10, alignItems: "center", elevation: 3 },
    statLabel: { color: c.meta, fontSize: 12 },
    statValue: { color: c.text, fontSize: 16, fontWeight: "800" },
    card: { backgroundColor: c.card, borderRadius: 16, overflow: "hidden", marginVertical: 8, elevation: 4, marginBottom: 10 },
    image: { width: "100%", height: 200 },
    body: { padding: 12 },
    title: { color: c.text, fontSize: 18, fontWeight: "800" },
    desc: { color: c.meta, marginVertical: 6 },
    meta: { color: c.text, fontSize: 12, opacity: 0.7 },
    remove: { backgroundColor: c.chip, paddingVertical: 10, borderRadius: 10, alignItems: "center", marginTop: 10 },
    removeText: { color: "#f2e9d4", fontWeight: "800" },
    fabs: { position: "absolute", right: 20, bottom: 20, flexDirection: "row", gap: 12 },
    fab: { backgroundColor: c.accent, paddingVertical: 14, paddingHorizontal: 22, borderRadius: 30, elevation: 6 },
    fabAlt: { backgroundColor: c.accent },
    fabText: { color: c.bg, fontWeight: "900" }
});