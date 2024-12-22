import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux"; // Make sure to import useSelector
import { API_URL } from "@env";

const Classement = () => {
  const [users, setUsers] = useState([]); // Initial state is an empty array
  const userData = useSelector((state) => state.userData);
  const username = useSelector((state) => state.userData.username);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${API_URL}/leagues/GetLeaguesWithRankedUsers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData.token}`, // Use userdata.token for authorization
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming users are in the 'users' array inside the response
        let allUsers = [];

        // Loop through the leagues to extract users
        data.forEach((league) => {
          if (league.users) {
            allUsers = [...allUsers, ...league.users]; // Collect users from all leagues
          }
        });

        setUsers(allUsers); // Set the fetched users to the state
      } catch (error) {
        alert(error);
      }
    };

    fetchUsers(); // Call fetchUsers when the component mounts
  }, [userData.token]); // Dependency array includes token so it refetches if token changes

  return (
    <View style={{ padding: 20 }}>
      <View
        style={{
          flexDirection: "row", // Ensures the icon and text are placed horizontally
          alignItems: "center", // Vertically centers both the icon and the text
          marginBottom: 20, // Optional margin for spacing
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcons name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 10 }}>
          ESTIN
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text>Pos</Text>
        <Text>Team</Text>
        <Text>Total</Text>
        <Text>GW</Text>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()} // Use index as the key
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>{index + 1}</Text>
            <Text
              style={{
                fontSize: 18,
                marginRight: 10,
                width: 100,
                textAlign: "right",
                marginLeft: 20,
              }}
            >
              {item.username}
            </Text>

            <Text
              style={{
                fontSize: 18,
                marginRight: 10,
                textAlign: "right",
                width: 100,
              }}
            >
              {item.total_points}
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginRight: 10,
                width: 100,
                textAlign: "center",
                paddingRight: 10,
                marginLeft: 15,
              }}
            >
              {item.lineup.lineup_points}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Classement;

const styles = StyleSheet.create({});
