import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { API_URL } from "@env";

const Players2 = () => {
  const [playersList, setPlayersList] = useState([]); // State to store fetched players
  const navigation = useNavigation();
  const { players, index } = useRoute().params; // Get players array and index from params
  const userData = useSelector((state) => state.userData); // Access user data from Redux

  useEffect(() => {
    const token = userData?.token; // Get token from Redux store

    if (token) {
      // Fetch data from the provided URL with the token
      fetch(`${API_URL}/players/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          "Content-Type": "application/json", // Set content type to JSON
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Map fetched data to create a player list with required properties
          const formattedPlayers = data.map((player) => ({
            id: player.id,
            fullname: player.FullName, // Use FullName as the player's name
          }));

          setPlayersList(formattedPlayers); // Set the formatted player list to state
        })
        .catch((error) => {
          alert(error); // Handle any errors
        });
    } else {
      console.log("Token not found");
    }
  }, [userData]); // Run effect when userData changes

  const handleSelectPlayer = (player) => {
    // Update the players array at the given index
    const updatedPlayers = [...players];
    updatedPlayers[index] = player;

    // Return to the Bitch screen with the updated players array
    navigation.replace("Transfer", { updatedPlayers });
  };

  const isPlayerSelected = (player) => {
    // Check if the player exists in the players array
    return players.some((p) => p?.id === player.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Football Players</Text>
      <FlatList
        data={playersList} // Use the fetched players list
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const disabled = isPlayerSelected(item);
          return (
            <TouchableOpacity
              style={[
                styles.playerContainer,
                disabled && styles.disabledPlayer,
              ]}
              onPress={() => !disabled && handleSelectPlayer(item)}
              disabled={disabled} // Disable TouchableOpacity if the player is already selected
            >
              <Text style={styles.playerName}>{item.fullname}</Text>
              {item.Available === false && (
                <Text style={{ fontSize: 17, color: "red" }}>
                  Not Available
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  playerContainer: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  disabledPlayer: {
    backgroundColor: "gray",
  },
  playerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
});

export default Players2;
