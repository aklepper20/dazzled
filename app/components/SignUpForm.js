import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

import { doc, setDoc } from "firebase/firestore";
import auth from "../../firebase";
import { db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpForm = ({ navigation }) => {
  const SignUpFormSchema = Yup.object().shape({
    email: Yup.string().email().required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .min(6, "Password must have at least 8 characters"),
  });

  const addPostsArrFirebase = async () => {
    await setDoc(doc(db, "users", auth.currentUser.email), {
      postsArr: [],
    });
  };

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
      });
    } catch (err) {
      Alert.alert(`${email},`, err.message);
    }
    addPostsArrFirebase();
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
            {errors.password && touched.password && (
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
              <Text style={styles.buttonText}>Sign up!</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.signUpText}>Log in!</Text>
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
