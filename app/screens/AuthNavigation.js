import React, { useEffect, useState } from "react";
import auth from "../../firebase";
import { SignedOutStack, SignedInStack } from "./navigation";
import { useDispatch, useSelector } from "react-redux";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // const dispatch = useDispatch();
  // const userData = useSelector((state) => state.userData.value);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => userHandler(user));
  }, []);

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
