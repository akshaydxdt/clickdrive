import React, { useEffect, useState } from "react";
import { Container, Content, Button, Text, Spinner } from "native-base";
import { View, Image } from "react-native";
import successImageUri from "../../Res/success.png";
import { primary } from "../../Res/Colors";
import { useGlobal } from "../../GlobalHooks";
import firebase from "react-native-firebase";
import { useNavigation } from "react-navigation-hooks";
export default () => {
  const [state, actions] = useGlobal();
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation();

  const db = firebase.database();
  actions.fetchInstructors(db);
  useEffect(() => {
    console.log("state", state);
    // console.log("reached");
    // db.ref("instructors").on("value", dataSnap => {
    //   var instList = [];
    //   dataSnap.forEach(item => {
    //     var data = item.val();
    //     data["key"] = item.key;
    //     instList.push(data);
    //   });
    //   console.log("inst", instList);
    //   actions.setInstList(instList);
    // });
    testData();
  }, []);

  const testData = () => {
    const { email, pass, first, last, place, dob, mobile } = state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(usercred => {
        var user = usercred.user;
        actions.setUser(user);
        console.log("Account linking success", user);
        var data = {
          avatar: null,
          credits: 0,
          exp: 19,
          dob,
          first,
          firstLesson: true,
          gender: "male",
          lang: "en",
          last,
          place,
          profileLock: false,
          email,
          mobile
        };
        db.ref("users")
          .child(user.uid)
          .set(data);
        setLoading(false);
        setTimeout(() => {
          navigate("Home");
        }, 3000);
      });
  };

  const fetchData = () => {
    const { email, pass, mobile, first, last, place, dob } = state;
    var credential = firebase.auth.EmailAuthProvider.credential(email, pass);
    firebase
      .auth()
      .currentUser.linkWithCredential(credential)
      .then(
        function(usercred) {
          var user = usercred.user;
          actions.setUser(user);
          console.log("Account linking success", user);
          var data = {
            avatar: null,
            credits: 0,
            exp: 19,
            dob,
            first,
            firstLesson: true,
            gender: "male",
            lang: "en",
            last,
            place,
            profileLock: false,
            email,
            mobile
          };
          firebase
            .database()
            .ref("users")
            .child(user.uid)
            .set(data);
          setLoading(false);
          setTimeout(() => {
            navigate("Matching");
          }, 3000);
        },
        function(error) {
          console.log("Account linking error", error);
        }
      );
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: primary
      }}
    >
      {loading ? (
        <Spinner color="white" />
      ) : (
        <View
          style={{
            flex: 1,
            padding: 15,
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: primary
          }}
        >
          <Image
            source={successImageUri}
            style={{ width: 100, height: 100, marginBottom: 25 }}
          />
          <Text
            style={{ fontSize: 25, color: "white", fontFamily: "Lato-Regular" }}
          >
            Registration Complete!
          </Text>
        </View>
      )}
    </View>
  );
};
