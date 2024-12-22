import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const Registration = () => {
  const [fullname, setFullname] = useState(""); // Updated
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [total_points, settotalpoint] = useState(0);

  const validateEmail = (input) => /^[^\s@]+@estin\.dz$/.test(input);

  const handleRegister = async () => {
    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError("Email must be in the format 'something@estin.dz'");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!hasError) {
      try {
        const response = await fetch(
          `${API_URL}/users/CreateUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullname: fullname,
              username: username,
              email: email,
              total_points: total_points,
              password: password,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          navigation.goBack();
        } else {
          const errorData = await response.json();
          console.log(errorData);
          Alert.alert("Error", errorData.message || "Registration failed.");
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong. Please try again later.");
        console.error(error);
      }
    }
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Photo_1617886013895.png")}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullname} // Updated
        onChangeText={(text) => setFullname(text)} // Updated
      />
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Email (e.g., name@estin.dz)"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (validateEmail(text)) setEmailError("");
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>
          Already have an account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#6495ED", // Cornflower Blue
  },
  image: {
    width: 200,
    height: 150,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
