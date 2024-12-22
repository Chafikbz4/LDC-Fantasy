import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { GetLastteam, Getcaptine, Getlastpoint } from "../Store/Actions";
import { API_URL } from "@env";

const { width, height } = Dimensions.get("window");

const Pag2 = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigation();
  const userData = useSelector((state) => state.userData);
  const username = useSelector((state) => state.userData.username);
  const lastpoits = useSelector((state) => state.lastPoints); // Corrected to match the reducer key
  const [weekpoint, setweek] = useState(0);
  const [currnetRank, setRank] = useState(NaN);
  const [day, setday] = useState(0);
  const [hour, sethour] = useState(0);
  const [minut, setminut] = useState(0);
  const [showdead, setdead] = useState(true);
  const [pointbool, setbool] = useState(false);
  const lastTeam = useSelector((state) => state.lastTeam);
  useEffect(() => {
    const fetchDeadline = async () => {
      const url = `${API_URL}/cups/GetAllCupTournament`;
      const token = userData.token;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userData.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const startTime = new Date(data[0].start_time);
        const currentTime = new Date();
        const timeDifference = startTime - currentTime;

        if (timeDifference > 0) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
          setday(days);
          sethour(hours);
          setminut(minutes);
        } else {
          setdead(false);
          const endtime = new Date(data[0].end_time);
          const kwada = endtime - currentTime;
          if (kwada < 0) {
            setbool(true);
          }
        }
      } catch (error) {
        alert(error.message);
      }
    };

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
        dispatch(GetLastteam(data.lineup.players));
        dispatch(Getcaptine(data.lineup.captain_id));
        dispatch(Getlastpoint(data.lineup.lineup_points));
        const gameweekPoints = data.lineup.lineup_points;
        setweek(gameweekPoints);
      } catch (error) {
        alert(error);
      }
    };

    const fetchLeagueDetails = async () => {
      try {
        const response = await fetch(
          `${API_URL}/leagues/GetLeaguesWithRankedUsers`  ,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        data.forEach((league) => {
          if (league.users) {
            league.users.forEach((user, index) => {
              if (user.username === username) {
                setRank(index + 1);
              }
            });
          }
        });
      } catch (error) {
        alert(error);
      }
    };

    if (userData?.username && userData?.token) {
      fetchUserDetails();
      fetchLeagueDetails();
      fetchDeadline();
    }
  }, [userData]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#6495ED" }}>
      <View
        style={{
          backgroundColor: "#4CAF50",
          marginTop: width * 0.05,
          marginHorizontal: width * 0.02,
          height: height * 0.07,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: width * 0.01,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/Photo_1617886013895.png")}
          style={{ width: "100", height: "90" }}
        />
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
          Fantasy
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#e4e1e1",
          marginTop: width * 0.05,
          marginHorizontal: width * 0.02,
          height: height * 0.04,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: width * 0.01,
        }}
        onPress={() => {
          Navigate.push("Home");
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
          {username}
          <MaterialCommunityIcons name="arrow-right" size={20} color="black" />
        </Text>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(169, 169, 169, 0.5)",
          marginTop: height * 0.01,
          marginHorizontal: width * 0.02,
          borderRadius: width * 0.01,
        }}
      >
        <View
          style={{
            backgroundColor: "#4CAF50",
            width: width * 0.4,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            marginBottom: height * 0.03,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Gameweek
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: width * 0.95,
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              width: width * 0.3,
              borderRadius: 5,
              padding: 5,
            }}
            onPress={() => {
              Navigate.navigate("Points", { pointbool });
            }}
            disabled={showdead}
          >
            <Text style={{ fontSize: 50, fontWeight: "bold" }}>
              {weekpoint}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>Points</Text>
              <MaterialCommunityIcons
                name="arrow-right"
                size={20}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginVertical: height * 0.03,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            backgroundColor: "#0EAD69",
            width: width * 0.47,
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => {
            Navigate.push("Bitch");
          }}
          disabled={!showdead}
        >
          <MaterialCommunityIcons name="tshirt-crew" size={32} color="black" />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 16,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Pick Team
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
            backgroundColor: "#0EAD69",
            width: width * 0.47,
            justifyContent: "center",
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => {
            Navigate.navigate("Transfer");
          }}
          disabled={!showdead}
        >
          <MaterialCommunityIcons
            name="swap-horizontal"
            size={32}
            color="black"
          />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 16,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Transfers
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: -height * 0.01,
          height: height * 0.05,
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: "white",
          width: width * 0.95,
          marginLeft: width * 0.025,
          borderRadius: 5,
        }}
      >
        {!showdead && (
          <Text
            style={{
              fontSize: 20,
              color: "Red",
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            DeadLine Over
          </Text>
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "row", // Change this to "row"
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginLeft: width * 0.05,
              fontSize: 20,
              fontWeight: "bold",
              padding: 5,
            }}
          >
            {day} DAY
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", padding: 5 }}>
            {hour} HOUR
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", padding: 5 }}>
            {minut} MINUT
          </Text>
        </View>
      </View>
      <View
        style={{
          margin: 10,
          backgroundColor: "rgba(169, 169, 169, 0.3)",
          width: width * 0.95,
          height: height,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", margin: 10 }}>
          League
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 0,
            justifyContent: "space-around",
            marginRight: width * 0.1,
            marginBottom: height * 0.02,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Rank </Text>
          <Text style={{ marginLeft: 8, fontSize: 20, fontWeight: "bold" }}>
            League Name
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 0,
            justifyContent: "space-around",
          }}
          onPress={() => {
            Navigate.push("Classement");
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {currnetRank}
          </Text>
          <Text style={{ marginLeft: 8, fontSize: 20, fontWeight: "bold" }}>
            ESTIN
          </Text>
          <MaterialCommunityIcons name="arrow-right" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Pag2;
