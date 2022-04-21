import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

import { doc, setDoc } from "firebase/firestore";
import auth from "../../firebase";
import { db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import colors from "../config/colors";

const SignUpForm = () => {
  const [gif, setGif] = useState("");

  const navigation = useNavigation();

  const SignUpFormSchema = Yup.object().shape({
    email: Yup.string().email().required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .min(6, "Password must have at least 6 characters"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password Confirmation Required"),
  });

  useEffect(() => {
    let random = (Math.random() + 1).toString(36).substring(7);
    setGif(`https://robohash.org/${random}`);
  }, []);

  const onSignUp = async (email, password) => {
    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", authUser.user.email), {
        owner_uid: authUser.user.uid,
        email: authUser.user.email,
        avatar: gif,
      });
    } catch (err) {
      Alert.alert(`${email},`, err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onSignUp(values.email, values.password);
        }}
        validationSchema={SignUpFormSchema}
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
                placeholder="Enter your email"
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
            <View>
              <TextInput
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      1 > values.password.length || values.password.length >= 6
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
            {errors.password && touched.password && (
              <Text style={{ fontSize: 10, marginBottom: 4, color: "red" }}>
                {errors.password}
              </Text>
            )}

            <View>
              <TextInput
                style={[
                  styles.inputField,
                  {
                    borderColor:
                      1 >= values.password.length || values.password.length >= 6
                        ? "#ccc"
                        : "red",
                  },
                ]}
                placeholderTextColor="#444"
                placeholder="Confirm Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("passwordConfirmation")}
                onBlur={handleBlur("passwordConfirmation")}
                value={values.passwordConfirmation}
              />
            </View>
            {errors.passwordConfirmation && touched.passwordConfirmation && (
              <Text style={{ fontSize: 10, marginBottom: 4, color: "red" }}>
                {errors.passwordConfirmation}
              </Text>
            )}

            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Sign up!</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.signUpText}> Log in!</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  button: (isValid) => ({
    backgroundColor: isValid ? colors.pink : colors.lightgrey,
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 42,
  }),
  container: {
    marginBottom: 80,
    padding: 12,
  },
  inputField: {
    borderRadius: 8,
    padding: 12,
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
    color: colors.black,
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
  signUpText: {
    color: colors.black,
  },
});
