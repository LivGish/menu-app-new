/*CODE ATTRIBUTION*/
/*TITLE: IIE MAST5112 Module Manual 2025*/
/*AUTHOR: The Independent Institute of Education (Pty) Ltd*/
/*DATE: 07/03/2025*/
/*VERSION: 1.0*/
/*AVAILABLE: https://advtechonline.sharepoint.com/:w:/r/sites/TertiaryStudents/_layouts/15/Doc.aspx?sourcedoc=%7BC4AAF478-96AC-4469-8005-F7CDC4A15EBB%7D&file=MAST5112MM.docx&action=default&mobileredirect=true*/

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, MenuItem } from "./type";
import * as PickerModule from "@react-native-picker/picker";
const Picker = PickerModule.Picker;

function MenuScreen(props: NativeStackScreenProps<RootStackParamList, "MenuScreen">) {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState<string>("");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    if (dishName && description && course && price) {
      const priceValue = parseFloat(price);
      if (priceValue > 0) {
        const newItem: MenuItem = {
          dishName,
          description,
          course,
          price: priceValue,
        };
        props.route.params.setItems([...props.route.params.items, newItem]);
        props.navigation.goBack();
      } else {
        Alert.alert("Invalid price", "Price value must be greater than 0.");
      }
    } else {
      Alert.alert("Missing fields", "Please fill out any missing details before saving.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.formHeader}>Add a new menu item</Text>

          <TextInput
            style={styles.input}
            placeholder="Dish name"
            value={dishName}
            onChangeText={setDishName}
          />

          <TextInput
            style={styles.input}
            placeholder="Dish description"
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Course</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={course}
                onValueChange={(value) => setCourse(value)}
                mode="dropdown"
                dropdownIconColor="#a72913"
                style={styles.pickerStyle}
              >
                <Picker.Item label="Select a course" value="" color="#999" />
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main" value="Main" />
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save dish</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => props.navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

function HomeScreen(props: NativeStackScreenProps<RootStackParamList, "HomeScreen">) {
  const [items, setItems] = useState<MenuItem[]>([]);

  const removeItem = (index: number) => {
    Alert.alert("Remove dish", "Are you sure you want to remove this dish?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => setItems(items.filter((_, i) => i !== index)) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Menu</Text>
      <Text style={styles.itemCountText}>
        {items.length === 0
          ? "No items on the menu yet."
          : `You currently have ${items.length} item${items.length > 1 ? "s" : ""} on your menu.`}
      </Text>

      <FlatList
        data={items}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.dishName}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text style={styles.cardCourse}>{item.course}</Text>
              <Text style={styles.cardPrice}>R{item.price}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(index)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => props.navigation.navigate("MenuScreen", { items, setItems })}
      >
        <Text style={styles.addText}>+ Add new item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2e9d4", padding: 15 },
  mainTitle: { fontSize: 28, fontWeight: "800", color: "#571310", textAlign: "center" },
  itemCountText: { fontSize: 16, color: "#571310", textAlign: "center", marginBottom: 10 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginVertical: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 20, fontWeight: "700", color: "#571310" },
  cardDesc: { color: "#571310", fontSize: 14, marginVertical: 5 },
  cardCourse: { color: "#a72913", fontSize: 14, fontWeight: "600" },
  cardPrice: { color: "#571310", fontSize: 13 },

  removeButton: {
    backgroundColor: "#a72913",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  removeText: { color: "#fff", fontWeight: "bold" },

  addButton: {
    backgroundColor: "#a72913",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    elevation: 4,
  },
  addText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  formContainer: { backgroundColor: "#f2e9d4", padding: 20 },
  formHeader: { fontSize: 24, color: "#571310", fontWeight: "bold", textAlign: "center", marginBottom: 20 },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#a72913",
    paddingHorizontal: 14,
    height: 50,
    marginVertical: 8,
    fontSize: 16,
    color: "#571310",
  },

  pickerWrapper: { marginVertical: 10 },
  label: { fontSize: 15, fontWeight: "600", color: "#571310", marginBottom: 6, marginLeft: 4 },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#a72913",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: Platform.OS === "ios" ? 120 : 55,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  pickerStyle: {
    color: "#571310",
    fontSize: 16,
    width: "100%",
  },

  saveButton: { backgroundColor: "#a72913", padding: 15, borderRadius: 10, marginTop: 15, alignItems: "center" },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  cancelButton: { backgroundColor: "#a72913", alignItems: "center", marginTop: 10, padding: 10, borderRadius: 10 },
  cancelButtonText: { color: "#fff", fontWeight: "bold" },
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ title: "Add Menu Item" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}