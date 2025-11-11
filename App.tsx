/*CODE ATTRIBUTION*/
/*TITLE: IIE MAST5112 Module Manual 2025*/
/*AUTHOR: The Independent Institute of Education (Pty) Ltd*/
/*DATE: 07/03/2025*/
/*VERSION: 1.0*/
/*AVAILABLE: https://advtechonline.sharepoint.com/:w:/r/sites/TertiaryStudents/_layouts/15/Doc.aspx?sourcedoc=%7BC4AAF478-96AC-4469-8005-F7CDC4A15EBB%7D&file=MAST5112MM.docx&action=default&mobileredirect=true*/

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuItem, Course, RootStackParamList } from "./type";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import AddItemScreen from "./screens/AddItemScreen";
import FilterScreen from "./screens/FilterScreen";
  
const Stack = createNativeStackNavigator<RootStackParamList>();
  
{/* predefined menu items */}
const predefined: MenuItem[] = [
  { 
    id: '1',
    dishName: "Focaccia",
    description: "Wood-fired pizza base with garlic & herbs.",
    course: "Starter",
    price: 65,
  },
  { 
    id: '2',
    dishName: "Caprese salad",
    description: "Fresh sliced mozzarella, cherry tomato halves and fresh basil leaves drizzled with balsamic vinegar and olive oil.",
    course: "Starter",
    price: 78,
  },
  
  { 
    id: '3',
    dishName: "Veg pizza",
    description: "A mozzarella pizza topped with onions, mushrooms, peppers and feta.",
    course: "Main",
    price: 145,
  },
  { 
    id: '4',
    dishName: "Fettuccine Bolognese",
    description: "Fettuccine pasta with a tender beef mince slow cooked in a tomato & veg base.",
    course: "Main",
    price: 130,
  },
  
  { 
    id: '5',
    dishName: "Crème brûlée",
    description: "Baked vanilla bean custard with a caramelised sugar top.",
    course: "Dessert",
    price: 65,
  },
  { 
    id: '6',
    dishName: "Tiramisu",
    description: "Layers of espresso-soaked ladyfingers and mascarpone cream, topped with a sprinkling of cocoa powder.",
    course: "Dessert",
    price: 85,
  },
];
 
export default function App() {
  const [items, setItems] = useState<MenuItem[]>(predefined);
  
  {/* add item to menu list */}
  const addItem = (item: MenuItem) => setItems(prev => [...prev, item]);
  
  {/* remove item from menu list */}
  const removeItem = (id: string) => setItems(prev => prev.filter(item => item.id !== id));
  
  {/* calculate average course price */}
  const avg = (course: Course) => {
    const list = items.filter(i => i.course === course);
    if (!list.length) return "0.00";
    const total = list.reduce((s, i) => s + i.price, 0);
    return (total / list.length).toFixed(2);
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#f2e9d4" },
          headerTintColor: "#571310",
          headerTitleStyle: { fontWeight: "800" }
        }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        {/* home screen */}
        <Stack.Screen name="Home" options={{ title: "Christoffel Menu App" }}>
          {props => (
            <HomeScreen
              {...props}
              items={items}
              removeItem={removeItem}
              averages={{
                Starter: avg("Starter"),
                Main: avg("Main"),
                Dessert: avg("Dessert")
              }}
            />
          )}
        </Stack.Screen>

        {/* add item screen */}
        <Stack.Screen name="AddItem" options={{ title: "Add New Item" }}>
          {props => <AddItemScreen {...props} addItem={addItem} />}
        </Stack.Screen>
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{ title: "Filter Menu" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
