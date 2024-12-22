import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { API_URL } from "@env";
const { width, height } = Dimensions.get("window");

const Page3 = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [weekpoint, setweek] = useState(0);
  const [totale, setotal] = useState(0);
  const userData = useSelector((state) => state.userData);
  const username = useSelector((state) => state.userData.username);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/users/GetUser`, {
          method: "POST", // Use POST if your API requires a body
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`, // Add the token in the Authorization header
          },
          body: JSON.stringify({ username: userData.username }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setweek(data.lineup.lineup_points);
        setotal(data.total_points);
        setEmail(data.email);
      } catch (error) {
        alert("Failed to fetch user details:", error);
      }
    };

    if (userData?.username && userData?.token) {
      fetchUserDetails();
    }
  }, [userData]);

  return (
    <View style={{ backgroundColor: "#6495ED", height: height }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcons name="arrow-left" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.container}>
          <Text style={styles.Texst}>Name</Text>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>{username} </Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.Texst}>Eamail</Text>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>{email} </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.Texst}>Totale Points</Text>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>{totale}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.Texst}>Week Point</Text>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>{weekpoint}</Text>
        </View>
      </View>
    </View>
  );
};

export default Page3;

const styles = StyleSheet.create({
  Texst: {
    color: "gray",
    fontSize: 18,
  },
  container: {
    width: width * 0.9,
    height: "auto",
    margin: width * 0.05,
    marginBottom: width * 0.02,
    backgroundColor: "white",
    elevation: 3,
    borderRadius: width * 0.02,
    padding: 10,
  },
});
