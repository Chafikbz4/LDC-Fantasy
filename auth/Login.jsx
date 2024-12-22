import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux"; 
import { GetuserDataRegister } from "../Store/Actions";
import { API_URL } from "@env";
const { width } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch(); 

  const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@estin\.dz$/;
    if (!emailRegex.test(input)) {
      setEmailError("Email must be in the format '...@estin.dz'");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async () => {
    if (emailError) {
      Alert.alert("Error", "Please fix the email format.");
      return;
    }
    if (!email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Dispatch the action to store user data in Redux
        dispatch(GetuserDataRegister(data));

        // Navigate to the app's main screen
        navigation.replace("App");
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Login failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Photo_1617886013895.png")}
        style={styles.image}
      />
      <TextInput
        style={[styles.input, emailError ? styles.errorInput : null]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity
        style={{
          marginRight: width * 0.2,
          width: width * 0.7,
          marginBottom: 10,
        }}
        onPress={() => {
          navigation.navigate("Regestration");
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Don't have an account?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6495ED",
    padding: 16,
    marginTop: -50,
  },
  image: {
    width: 200,
    height: 150,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 16,
    textAlign: "left",
    width: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
