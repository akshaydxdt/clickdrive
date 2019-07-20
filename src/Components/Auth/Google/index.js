import React from "react";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
import firebase from "react-native-firebase";
import { useGlobal } from "../../../GlobalHooks";

GoogleSignin.configure({
  webClientId:
    "978584337675-2kghfqt9nbfe87jtj08ftrgsrknlh62f.apps.googleusercontent.com",
  offlineAccess: true
});

export default () => {
  const [state, actions] = useGlobal();
  onSignIn = async () => {
    try {
      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );
      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      actions.setUser(firebaseUserCredential.user);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={this.onSignIn}
    />
  );
};
