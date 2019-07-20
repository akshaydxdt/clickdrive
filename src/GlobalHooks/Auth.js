import firebase from "react-native-firebase";
import { useEffect } from "react";

export const authState = {
  user: null,
  userDetails: null,
  loading_login: null
};
export const authActions = {
  setUser: async (store, user) => {
    const id = user.uid;
    const db = firebase
      .database()
      .ref("users")
      .child(id);

    store.setState({ loading_login: true });

    var snap = await db.on("value", snapShot => {
      return snapShot.val();
    });
    console.log("just passed");
    store.setState({ user, loading_login: false });

    if (snap) {
      store.setState({ userDetails: snap });
    }
    console.log("authjs,snap", snap);
  },
  checkUser: (store, auth) => {
    useEffect(() => {
      store.setState({ loading_login: true });
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          const db = firebase.database().ref("users");
          const id = user.uid;
          db.child(id).on("value", dataSnap => {
            store.setState({ user, loading_login: false });
            if (dataSnap) {
              console.log("snap", dataSnap.val());

              store.setState({ userDetails: dataSnap.val() });
            }
          });
        }
      });
      return unsubscribe;
    }, [auth]);
  },
  logoutUser: (store, auth) => {
    auth.signOut();
    store.setState({ user: null });
  }
};
