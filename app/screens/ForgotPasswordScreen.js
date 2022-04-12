import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

import { sendPasswordResetEmail, getAuth } from "firebase/auth";

const ForgotPasswordScreen = ({ navigation }) => {
  const [authSuccessful, setAuthSuccessful] = useState(false);

  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
  });

  const handleForgotPassword = async (email) => {
    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setAuthSuccessful(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const handleBacktoLogin = () => {
    setAuthSuccessful(false);
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          handleForgotPassword(values.email);
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
          touched,
        }) => (
          <>
            <Text style={styles.header}>Password Reset</Text>
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
                placeholder="Enter Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            {errors.email && touched.email && (
              <Text style={{ fontSize: 10, marginBottom: 4, color: "red" }}>
                {errors.email}
              </Text>
            )}
            {errors.password && touched.password && (
              <Text style={{ fontSize: 10, marginBottom: 4, color: "red" }}>
                {errors.password}
              </Text>
            )}

            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Send to Reset Password</Text>
            </Pressable>
          </>
        )}
      </Formik>
      {authSuccessful && (
        <Text style={styles.resetConfirm}>
          Please check your email for a reset link...
        </Text>
      )}
      <View style={styles.signupContainer}>
        <TouchableOpacity onPress={handleBacktoLogin}>
          <Text style={styles.signUpText}>Back to Login Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

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
    marginVertical: 50,
  },
  header: {
    fontSize: 26,
    fontWeight: "800",
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
  resetConfirm: {
    color: "royalblue",
    marginTop: 10,
    fontWeight: "700",
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
