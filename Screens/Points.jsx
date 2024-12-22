import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { API_URL } from "@env";

const { width, height } = Dimensions.get("window");

const Points = () => {
  const navigation = useNavigation();
  const { pointbool } = useRoute().params || {};
  const [players, setPlayers] = useState([null, null, null, null, null, null]);
  const userData = useSelector((state) => state.userData);
  const [confirm, setConfirme] = useState(true);
  const [lineupId, setLineupId] = useState("");
  const [modifier, setModifier] = useState(true);
  const lastTeam = useSelector((state) => state.lastTeam);
  const realcaptine = useSelector((state) => state.captine);
  const [captainId, setCaptainId] = useState(0);

  useEffect(() => {
    if (pointbool === true) {
      if (lastTeam.length !== 0) {
        setPlayers(lastTeam);
        setCaptainId(realcaptine);
      }
    } else {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`${API_URL}/users/GetUser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData.token}`,
            },
            body: JSON.stringify({ username: userData.username }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data.lineup.players !== null) {
            setPlayers(data.lineup.players);
            setModifier(false);
            setConfirme(false);
            setCaptainId(data.lineup.captain_id);
          }

          setLineupId(data.lineup_id);
        } catch (error) {
          alert(error);
        }
      };

      if (userData?.token) {
        fetchUserDetails();
      }
    }
  }, [userData.token, userData.username, pointbool]);

  const handleConfirm = async () => {
    try {
      const response = await fetch(`${API_URL}/lineups/UpdateLineUp`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          captine_id: captainId,
          players,
          lineup_points: 0,
          lineup_id: lineupId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setConfirme(false);
      const data = await response.json();
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
              color: "black",
              fontSize: 20,
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
          <View>
            {players[0] ? (
              <>
                <MaterialCommunityIcons
                  name="tshirt-crew"
                  size={60}
                  color="black"
                />
                {captainId === players[0].id && (
                  <MaterialCommunityIcons
                    name="crown"
                    size={24}
                    color="black"
                  />
                )}
                <Text style={styles.playerName}>
                  {players[0]?.FullName || "Player Name"}
                </Text>
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

                <Text style={{ fontSize: 20 }}>
                  {players[0]?.GameweekPoints || 0}
                </Text>
              </>
            ) : (
              <MaterialCommunityIcons
                name="tshirt-crew"
                size={60}
                color="gray"
              />
            )}
          </View>

          {/* Players at Index 1 and 2 */}
          <View style={styles.row}>
            {[1, 2].map((index) => (
              <View key={index}>
                {players[index] ? (
                  <>
                    <MaterialCommunityIcons
                      name="tshirt-crew"
                      size={60}
                      color="red"
                    />
                    {captainId === players[index].id && (
                      <MaterialCommunityIcons
                        name="crown"
                        size={24}
                        color="black"
                      />
                    )}
                    <Text style={styles.playerName}>
                      {players[index]?.FullName || "Player Name"}
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
                    <Text style={{ fontSize: 20 }}>
                      {players[index]?.GameweekPoints || 0}
                    </Text>
                  </>
                ) : (
                  <MaterialCommunityIcons
                    name="tshirt-crew"
                    size={60}
                    color="gray"
                  />
                )}
              </View>
            ))}
          </View>

          {/* Players at Index 3 and 4 */}
          <View style={styles.row}>
            {[3, 4].map((index) => (
              <View key={index}>
                {players[index] ? (
                  <>
                    <MaterialCommunityIcons
                      name="tshirt-crew"
                      size={60}
                      color="blue"
                    />
                    {captainId === players[index].id && (
                      <MaterialCommunityIcons
                        name="crown"
                        size={24}
                        color="black"
                      />
                    )}
                    <Text style={styles.playerName}>
                      {players[index]?.FullName || "Player Name"}
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
                    <Text style={{ fontSize: 20 }}>
                      {players[index]?.GameweekPoints || 0}
                    </Text>
                  </>
                ) : (
                  <MaterialCommunityIcons
                    name="tshirt-crew"
                    size={60}
                    color="gray"
                  />
                )}
              </View>
            ))}
          </View>

          {/* Player at Index 5 */}
          <View>
            {players[5] ? (
              <>
                <MaterialCommunityIcons
                  name="tshirt-crew"
                  size={60}
                  color="yellow"
                />
                {captainId === players[5].id && (
                  <MaterialCommunityIcons
                    name="crown"
                    size={24}
                    color="black"
                  />
                )}
                <Text style={styles.playerName}>
                  {players[5]?.FullName || "Player Name"}
                </Text>
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
                <Text style={{ fontSize: 20 }}>
                  {players[5]?.GameweekPoints || 0}
                </Text>
              </>
            ) : (
              <MaterialCommunityIcons
                name="tshirt-crew"
                size={60}
                color="gray"
              />
            )}
          </View>
        </View>
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

export default Points;
