import firebase from "react-native-firebase";

export const authInstructorState = {};

export const authInstructorActions = {
  setInstructor: (store, user) => {
    const db = firebase.database().ref("instructors");
    const id = user.uid;
    store.setState({ user, mode: "instructor" }); //should be changed

    db.child(id).on("value", dataSnap => {
      console.log("inside");

      if (dataSnap.exists()) {
        store.setState({ instDetails: dataSnap.val() });
        console.log("data", dataSnap.val());
      }

      console.log("set state");
    });
  }
};
