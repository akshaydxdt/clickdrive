import React, { useEffect } from "react";
import { Content, Container, Text, Button, Root } from "native-base";
import Google from "./Google";
import Facebook from "./Facebook";
import PhoneVerification from "./PhoneVerification";
import { useGlobal } from "../../GlobalHooks";
import firebase from "react-native-firebase";
import Personalinfo from "../UserDetails/Personalinfo";
import { useNavigation } from "react-navigation-hooks";
import Login from "./Login";

export default () => {
  const [state, actions] = useGlobal();
  const { user, userDetails, loading_login } = state;
  const auth = firebase.auth();
  actions.checkUser(auth);
  const { navigate } = useNavigation();

  actions.fetchInstructors();

  // useEffect(() => {
  //   console.log("changed");
  //   if (loading_login != null && !loading_login) {
  //     if (userDetails) {
  //       navigate("Home");
  //     } else {
  //       navigate("DOB");
  //     }
  //   }
  // }, [userDetails]);

  const onSignOut = () => {
    auth.signOut();
  };

  return <Login />;

  // return (
  //   <Content>
  //     <Google />
  //     <Facebook />
  //     <PhoneVerification />
  //     <Button onPress={onSignOut}>
  //       <Text>Sign Out</Text>
  //     </Button>
  //   </Content>
  // );
};
