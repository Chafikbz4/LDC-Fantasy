import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { API_URL } from "@env";

const { width, height } = Dimensions.get("window");

const Bitch = () => {
  const navigation = useNavigation();
  const { updatedPlayers } = useRoute().params || {}; // Get updated players array from params
  const [players, setPlayers] = useState([null, null, null, null, null, null]);
  const userData = useSelector((state) => state.userData);
  const [week, setWeek] = useState(null); // State to store gameweek points
  const [captine_id, setcaptine] = useState(null);
  const [confirm, setconfirme] = useState(true);
  const [lineup_id, setlineupid] = useState("");
  const [modifier, setmmodify] = useState(true);
  useEffect(() => {
    if (updatedPlayers) {
      setPlayers(updatedPlayers); // Update players array when new data is passed
    }
  }, [updatedPlayers]);

  // Fetch user data with the token
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/users/GetUser`, {
          method: "POST", // Use POST if your API requires a body
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`, // Add the token in the Authorization header
          },
          body: JSON.stringify({ username: userData.username }), // Send username in the body if needed
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.lineup.players !== null) {
          setPlayers(data.lineup.players);
          setmmodify(false);
          setconfirme(false);
          setcaptine(data.lineup.captain_id);
        }

        setlineupid(data.lineup_id);
      } catch (error) {
        alert(error.message);
      }
    };

    if (userData?.token) {
      fetchUserDetails();
    }
  }, [userData.token, userData.username]); // Dependencies to trigger the effect when token or username changes

  const handlePlayerPress = (index) => {
    // Navigate to the PLayers screen and pass the players array and index
    navigation.replace("PLayers", { players, index });
  };

  const handleSetCaptain = (index) => {
    if (players[index] !== null) {
      setconfirme(true);
      setcaptine(players[index].id); // Set captain if player is not null and captain is empty
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`${API_URL}/lineups/UpdateLineUp`, {
        method: "PUT", // PUT request
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`, // Pass token in headers
        },
        body: JSON.stringify({
          captine_id,
          players,
          lineup_points: 0,
          lineup_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setconfirme(false);
      const data = await response.json();

      // Optional: You can add logic here to navigate or display a success message
    } catch (error) {
      alert(error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              color: "black",
              marginRight: 50,
            }}
          >
            Your Team
          </Text>
        </View>
      </View>
      <ImageBackground
        source={require("../assets/fantasy.png")}
        style={styles.backgroundImage}
      >
        <View
          style={{
            justifyContent: "space-around",
            flex: 1,
            alignItems: "center",
            top: width * -0.2,
            paddingVertical: height * 0.11,
          }}
        >
          {/* Player at Index 0 */}
          <TouchableOpacity
            onPress={() => handlePlayerPress(0)}
            disabled={!modifier}
          >
            {players[0] ? (
              <>
                <MaterialCommunityIcons
                  name="tshirt-crew"
                  size={60}
                  color="black"
                />
                {captine_id === players[0].id && (
                  <MaterialCommunityIcons
                    name="crown"
                    size={24}
                    color="black"
                  />
                )}
                <Text style={styles.playerName}>{players[0].FullName}</Text>
                {players[0].Available === false && (
                  <View style={{ backgroundColor: "red" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Not Available
                    </Text>
                  </View>
                )}
                {players.every((player) => player !== null) && (
                  <TouchableOpacity
                    style={styles.setCaptainButton}
                    onPress={() => handleSetCaptain(0)}
                  >
                    <Text style={styles.setCaptainText}>Set as Captain</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <MaterialCommunityIcons
                name="tshirt-crew"
                size={60}
                color="gray"
              />
            )}
          </TouchableOpacity>

          {/* Players at Index 1 and 2 */}
          <View style={styles.row}>
            {[1, 2].map((index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePlayerPress(index)}
                disabled={!modifier}
              >
                {players[index] ? (
                  <>
                    <MaterialCommunityIcons
                      name="tshirt-crew"
                      size={60}
                      color="red"
                    />
                    {captine_id === players[index].id && (
                      <MaterialCommunityIcons
                        name="crown"
                        size={24}
                        color="black"
                      />
                    )}
                    <Text style={styles.playerName}>
                      {players[index].FullName}
                    </Text>
                    {players[index].Available === false && (
                      <View style={{ backgroundColor: "red" }}>
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          Not Available
                        </Text>
                      </View>
                    )}
                    {players.every((player) => player !== null) && (
                      <TouchableOpacity
                        style={styles.setCaptainButton}
                        onPress={() => handleSetCaptain(index)}
                      >
                        <Text style={styles.setCaptainText}>
                          Set as Captain
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  <MaterialCommunityIcons
                    name="tshirt-crew"
                    size={60}
                    color="gray"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Players at Index 3 and 4 */}
          <View style={styles.row}>
            {[3, 4].map((index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePlayerPress(index)}
                disabled={!modifier}
              >
                {players[index] ? (
                  <>
                    <MaterialCommunityIcons
                      name="tshirt-crew"
                      size={60}
                      color="blue"
                    />
                    {captine_id === players[index].id && (
                      <MaterialCommunityIcons
                        name="crown"
                        size={24}
                        color="black"
                      />
                    )}
                    <Text style={styles.playerName}>
                      {players[index].FullName}
                    </Text>
                    {players[index].Available === false && (
                      <View style={{ backgroundColor: "red" }}>
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          Not Available
                        </Text>
                      </View>
                    )}
                    {players.every((player) => player !== null) && (
                      <TouchableOpacity
                        style={styles.setCaptainButton}
                        onPress={() => handleSetCaptain(index)}
                      >
                        <Text style={styles.setCaptainText}>
                          Set as Captain
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  <MaterialCommunityIcons
                    name="tshirt-crew"
                    size={60}
                    color="gray"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Player at Index 5 */}
          <TouchableOpacity
            onPress={() => handlePlayerPress(5)}
            disabled={!modifier}
          >
            {players[5] ? (
              <>
                <MaterialCommunityIcons
                  name="tshirt-crew"
                  size={60}
                  color="yellow"
                />
                {captine_id === players[5].id && (
                  <MaterialCommunityIcons
                    name="crown"
                    size={24}
                    color="black"
                  />
                )}
                <Text style={styles.playerName}>{players[5].FullName}</Text>
                {players[5].Available === false && (
                  <View style={{ backgroundColor: "red" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Not Available
                    </Text>
                  </View>
                )}
                {players.every((player) => player !== null) && (
                  <TouchableOpacity
                    style={styles.setCaptainButton}
                    onPress={() => handleSetCaptain(5)}
                  >
                    <Text style={styles.setCaptainText}>Set as Captain</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <MaterialCommunityIcons
                name="tshirt-crew"
                size={60}
                color="gray"
              />
            )}
          </TouchableOpacity>
        </View>
        {captine_id !== null &&
          players.every((player) => player !== null) &&
          confirm && (
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmText}>Confirmed</Text>
            </TouchableOpacity>
          )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  playerName: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  setCaptainText: {
    fontSize: 14,
    color: "blue",
    textAlign: "center",
  },
  setCaptainButton: {
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: width * 0.9,
  },
  confirmButton: {
    backgroundColor: "green",
    width: width * 0.5,
    borderRadius: 10,
    padding: 10,
    marginBottom: height * 0.05,
  },
  confirmText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});

export default Bitch;
