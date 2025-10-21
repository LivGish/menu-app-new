import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
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

//adds the menu screen to the app
function MenuScreen(props: NativeStackScreenProps<RootStackParamList, "MenuScreen">) {

  //state variables so that they can store user input for the menu items
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState<string>("");
  const [price, setPrice] = useState("");

  //validates input, creates a new item & adds it to the menu
  const handleSubmit = () => {

    //makes sure all fields have a value
    if (dishName && description && course && price) {
      //converts price from string to a floating-point number
      const priceValue = parseFloat(price);

      //makes sure that the price value is a positive number
      if (priceValue > 0) {

        //makes a new menu option from the user's entered data
        const newItem: MenuItem = {
          dishName,
          description,
          course,
          price: priceValue,
        };

        //adds the new menu item to the menu list
        props.route.params.setItems([...props.route.params.items, newItem]);

        //takes the user back to the previous screen after the menu item has been added to the menu list
        props.navigation.goBack();

      } else {
        //displays a pop up alert if the menu price isn't greater than 0
        Alert.alert("Invalid price", "Price value must be greater than 0.");
      }

    } else {
      //displays a pop up alert if any fields are left empty
      Alert.alert("Missing fields", "Please fill out any missing details before saving.");
    }
  };

  return (
    //makes the view shift up when the keyboard appears
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}>

      {/* dismisses keyboard when the user taps outside the input fields */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        {/* allows the user to scroll through the form */}
        <ScrollView contentContainerStyle={styles.formContainer}>

          <Text style={styles.formHeader}>Add a new menu item</Text>

          {/* input field for dish name */}
          <TextInput
            style={styles.input}
            placeholder="Dish name"
            value={dishName}
            onChangeText={setDishName}
          />

          {/* input field for dish description */}
          <TextInput
            style={styles.input}
            placeholder="Dish description"
            value={description}
            onChangeText={setDescription}
          />

          {/* picker for menu course item */}
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Course</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={course}
                onValueChange={(value) => setCourse(value)}
                mode="dropdown"
                dropdownIconColor="#000000"
                style={styles.pickerStyle}
              >

                <Picker.Item label="Select a course" value="" color="#999" />
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main" value="Main" />
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker>
            </View>
          </View>

          {/* input field for dish price */}
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          {/* Button to save dish */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save dish</Text>
          </TouchableOpacity>

          {/* button to exit new menu item page */}
          <TouchableOpacity style={styles.cancelButton} onPress={() => props.navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Back</Text>
          </TouchableOpacity>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}