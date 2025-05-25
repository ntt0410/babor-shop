import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function TabLayout() {
  const router = useRouter();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          animation: 'shift',
          tabBarStyle: {
            position: "absolute",
            height: 60,
            borderTopWidth: 0,
            backgroundColor: "#fff",
            elevation: 0,
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Shop"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="cart-outline" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="History"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="alarm-outline" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={30} color={color} />
            ),
          }}
        />
      </Tabs>

      <TouchableOpacity
        onPress={() => router.push("/Booking")}
        style={styles.fab}
      >
        <Ionicons name="calendar-outline" size={26} color="#fff" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
});
