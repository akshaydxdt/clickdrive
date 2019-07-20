import React from "react";
import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";
import firebase from "react-native-firebase";
import { Button, Icon, Text } from "native-base";
import { useGlobal } from "../../../GlobalHooks";
import { useNavigation } from "react-navigation-hooks";

export default () => {
  const [state, actions] = useGlobal();
  const { navigate } = useNavigation();

  onLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions([
        "public_profile",
        "email"
      ]);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error("User cancelled request");
      }

      console.log(
        `Login success with permissions: ${result.grantedPermissions.toString()}`
      );

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        throw new Error(
          "Something went wrong obtaining the users access token"
        );
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);
      const user = firebaseUserCredential.user;

      actions.setUser(user);
      navigate("PhoneVerification", { from: "fb" });
    } catch (e) {
      console.error(e);
    }
  };

  onLogout = () => {
    // dispatch({
    //   type: "userActive",
    //   user: null
    // });
  };
  return (
    <Button
      iconLeft
      light
      bordered
      style={{
        marginTop: 18,
        alignSelf: "stretch",
        justifyContent: "center",
        borderRadius: 15
      }}
      onPress={onLogin}
    >
      <Icon type="FontAwesome" name="facebook" />
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontFamily: "Lato-Regular"
        }}
        uppercase={false}
      >
        Login with Facebook
      </Text>
    </Button>
  );

  // return <LoginButton onLoginFinished={onLogin} onLogoutFinished={onLogout} />;
};
