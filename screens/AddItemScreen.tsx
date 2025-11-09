import React, { useState } from "react";
import { 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    Alert 
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MenuItem, Course, RootStackParamList } from "../type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "AddItem"> & { addItem: (item: MenuItem) => void; };

const c = { 
    bg: "#f2e9d4", 
    card: "#f2e9d4", 
    text: "#571310", 
    meta: "#571310", 
    accent: "#a72913", 
    input: "#ffffff",
    border: "#ffffff" 
};

function uid() {  
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function AddItemScreen({ navigation, addItem }: Props) {
    const [dishName, setDishName] = useState("");
    const [description, setDescription] = useState("");
    const [course, setCourse] = useState<Course>("Starter");
    const [price, setPrice] = useState("");

    const onSave = () => {
        if (!dishName || !description || !price) {
            Alert.alert("Missing fields.", "Please fill in all fields.");
            return;
        }
        const p = parseFloat(price);
        if (isNaN(p) || p <= 0) {
            Alert.alert("Invalid Price", "Please enter a valid number.");
            return;
        }
        const payload: MenuItem = { id: uid(), dishName, description, course, price: p};
        addItem(payload);
        navigation.goBack();
    };
        
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.form}>
                    <Text style={styles.label}>Add new item</Text>

                    <TextInput style={styles.input} placeholder="Item Name" placeholderTextColor={c.meta} value={dishName} onChangeText={setDishName} />
                    <TextInput style={styles.input} placeholder="Description" placeholderTextColor={c.meta} value={description} onChangeText={setDescription} />

                    <View style={styles.pickerWrap}>
                        <Text style={styles.label}>Category</Text>
                        <View style={styles.pickerBox}>
                            <Picker
                                selectedValue={course}
                                onValueChange={v => setCourse(v as Course)}
                                mode="dropdown"
                                dropdownIconColor="#571310"
                                style={styles.picker}
                                itemStyle={{ height: 44}}
                            >
                                <Picker.Item label="Beverage" value="Starter" color="#571310"/>
                                <Picker.Item label="Pastry" value="Main" color="#571310"/>
                                <Picker.Item label="Dessert" value="Dessert" color="#571310"/>
                            </Picker>
                        </View>
                    </View>

                    <TextInput style={styles.input} placeholder="Price" placeholderTextColor={c.meta} keyboardType="numeric" value={price} onChangeText={setPrice} />

                    <TouchableOpacity style={styles.save} onPress={onSave}>
                        <Text style={styles.saveText}>Save Item</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancel} onPress={() => navigation.goBack()}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    form: { backgroundColor: c.bg, padding: 20 },
    header: { color: c.text, fontSize: 22, fontWeight: "900", textAlign: "center", marginBottom: 16 },
    input: { backgroundColor: c.input, color: c.text, borderRadius: 12, borderWidth: 1, borderColor: c.border, height: 50, paddingHorizontal: 12, marginVertical: 8 },
    pickerWrap: { marginVertical: 8 },
    label: { color: c.meta, marginLeft: 4, marginBottom: 6, fontWeight: "700" },
    pickerBox: { backgroundColor: c.input, borderRadius: 12, borderWidth: 1, borderColor: c.border, overflow: "hidden", height: 50, justifyContent: "center" },
    picker: { color: c.text, height: 50, width: "100%" },
    preview: { width: "100%", height: 200, borderRadius: 12, marginTop: 12 },
    save: { backgroundColor: c.accent, padding: 14, borderRadius: 12, marginTop: 16, alignItems: "center" },
    saveText: { color: "#1b1513", fontWeight: "900" },
    cancel: { alignItems: "center", marginTop: 10 },
    cancelText: { color: c.meta, fontWeight: "800" }
});