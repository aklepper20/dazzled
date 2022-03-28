import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const LoginForm = ({ navigation }) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "Password must have at least 8 characters"),
  });

  const onLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("🔥 firebase login success ", password);
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
        }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone number, email or usename"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            {errors.email && (
              <Text style={{ fontSize: 10, marginBottom: 4, color: "red" }}>
                {errors.email}
              </Text>
            )}
            <View>
              <TextInput
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      1 > values.password.length || values.password.length > 6
                        ? "#ccc"
                        : "red",
                  },
                ]}
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            {errors.password && (
              <Text style={{ fontSize: 10, marginBottom: 4, color: "red" }}>
                {errors.password}
              </Text>
            )}
            <View style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
                <Text style={styles.signUpText}>Sign Up!</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  button: (isValid) => ({
    backgroundColor: isValid ? "yellow" : "blue",
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 42,
  }),
  container: {
    marginBottom: 80,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
  },
  inputField: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: "white",
    marginBottom: 10,
    borderWidth: 1,
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: "blue",
  },
  buttonText: {
    fontWeight: "600",
    color: "black",
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
  signUpText: {
    color: "black",
  },
});
