/*CODE ATTRIBUTION*/
/*TITLE: IIE MAST5112 Module Manual 2025*/
/*AUTHOR: The Independent Institute of Education (Pty) Ltd*/
/*DATE: 07/03/2025*/
/*VERSION: 1.0*/
/*AVAILABLE: https://advtechonline.sharepoint.com/:w:/r/sites/TertiaryStudents/_layouts/15/Doc.aspx?sourcedoc=%7BC4AAF478-96AC-4469-8005-F7CDC4A15EBB%7D&file=MAST5112MM.docx&action=default&mobileredirect=true*/

import React, { useMemo, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MenuItem, Course, RootStackParamList } from "../type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Filter">;

/* filters menu items by course */
export default function FilterScreen({ route }: Props) {
    const items: MenuItem[] = route.params?.items || [];
    const [selected, setSelected] = useState<Course>("Starter");
    const filtered = useMemo(() => items.filter(i => i.course === selected), [items, selected]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.pickerWrap}>
                <View style={styles.pickerBox}>
                    /* picker for menu filter */
                    <Picker
                    selectedValue={selected}
                    onValueChange={v => setSelected(v as Course)}
                    mode="dropdown"
                    dropdownIconColor="#571310"
                    style={styles.picker}
                    itemStyle={{ height: 44 }}
                    >
                        /* picker items */
                        <Picker.Item label="Starter" value="Starter" color="#571310"/>
                        <Picker.Item label="Main" value="Main" color="#571310"/>
                        <Picker.Item label="Dessert" value="Dessert" color="#571310"/>
                    </Picker>
                </View>
            </View>

            <Text style={styles.heading}>{selected}s</Text>

            /* menu items card */
            <FlatList
                data={filtered}
                keyExtractor={i => i.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.body}>
                            <Text style={styles.title}>{item.dishName}</Text>
                            <Text style={styles.desc}>{item.description}</Text>
                            <Text style={styles.meta}>{item.course} R{item.price}</Text>
                        </View>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
}

/* standard colours for styling */
const c = { bg: "#f2e9d4", card: "#faf4e6ff", text: "#571310", meta: "#571310", accent: "#a72913", chip: "#a72913", input: "#faf4e6ff", border: "#faf4e6ff" };

/* general styling */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: c.bg, padding: 16 },
    pickerWrap: { marginBottom: 12 },
    pickerBox: { backgroundColor: c.input, borderRadius: 12, borderWidth: 1, borderColor: c.border, overflow: "hidden", height: 50, justifyContent: "center" },
    picker: {color: c.text, height: 50, width: "100%" },
    heading: { color: c.text, fontSize: 20, fontWeight: "900", textAlign: "center", marginBottom: 8 },
    card: { backgroundColor: c.card, borderRadius: 16, overflow: "hidden", marginVertical: 8, elevation: 4 },
    image: { width: "100%", height: 170 },
    body: {padding: 12 },
    desc: { color: c.meta, marginVertical: 6 },
    title: {color: c.text, fontSize: 18, fontWeight: "800", },
    meta: { color: c.meta, marginTop: 4 },

});