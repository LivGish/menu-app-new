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
}