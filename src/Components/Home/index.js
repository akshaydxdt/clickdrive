import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Title,
  Left,
  Right,
  Thumbnail,
  Spinner
} from "native-base";
import { View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { useGlobal } from "../../GlobalHooks";
import firebase from "react-native-firebase";
import { primary, primaryText } from "../../Res/Colors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import avatar from "../../Res/userW.png";
import Base from "../Base";
import { getMonthText } from "../../Utils/date";

export default () => {
  const { navigate } = useNavigation();
  const [state, actions] = useGlobal();
  const [text, setText] = useState(null);
  const [exp, setExp] = useState(0);
  const [fill, setFill] = useState(0);
  const [loading, setLoading] = useState(true);

  actions.fetchInstructors(db);

  //Profile lock is used for existing students onboarded by the instructors

  //const lock = state.userDetails.profileLock;
  const lock = "id";
  var nav = lock === false ? "InstructorList" : "InstProfile";

  useEffect(() => {
    const db = firebase.database().ref("users");
    if (state.user) {
      //fetching data for already existing users
      console.log("home");

      const id = state.user.uid;

      db.child(id).on("value", dataSnap => {
        if (dataSnap.exists()) {
          var data = dataSnap.val();
          var val = data.nextBooking;
          if (val) {
            const date = new Date(val.date);
            const dateText =
              date.getDate() + " " + getMonthText(date.getMonth());
            var text = dateText + " " + val.time;
          }
          console.log("value", data);

          var exp = data.exp;
          var fill = Math.round((exp / 25) * 100);
          console.log("fill", fill);

          setText(text);
          setExp(exp);
          setFill(fill);
          setLoading(false);
        }
      });
    }
    return () => db;
  }, []);

  //========If profile lock is active, function to fetch the details for the specific instructor=====

  // useEffect(() => {
  //   if (lock != false) {
  //     console.log("Lock True", lock);

  //     nav = "InstProfile";
  //     firebase
  //       .database()
  //       .ref("instructors")
  //       .child(lock)
  //       .once("value", snapShot => {
  //         if (snapShot) {
  //           var data = snapShot.val();
  //           data["key"] = snapShot.key;
  //           console.log("inst lock", data);
  //           actions.setInstDetails(data);
  //         }
  //       });
  //   } else {
  //   }
  // }, [state.userDetails]);

  const onBook = () => {
    navigate(nav);
  };

  const onSignOut = () => {
    firebase.auth().signOut();
    navigate("Auth");
  };

  const UpComing = () => (
    <View>
      <Text
        style={{
          fontSize: 22,
          color: primary,
          fontFamily: "Lato-Bold"
        }}
      >
        Upcoming Session
      </Text>

      {text ? (
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            paddingTop: 26,
            paddingLeft: 20
          }}
        >
          <Icon
            type="FontAwesome"
            style={{ color: primary, fontSize: 20 }}
            name="calendar"
          />
          <Text
            style={{
              fontWeight: "normal",
              fontSize: 20,
              color: primary,
              textAlign: "center",
              marginLeft: 15,
              fontFamily: "Lato-Light"
            }}
          >
            {text}
          </Text>
        </View>
      ) : (
        <Text
          style={{
            fontWeight: "normal",
            fontSize: 20,
            color: primary,
            textAlign: "center",
            paddingTop: 26,
            fontFamily: "Lato-Light"
          }}
        >
          You have no upcoming sessions
        </Text>
      )}
    </View>
  );

  const ExpPoints = () => (
    <View style={{ alignSelf: "center", paddingTop: 35 }}>
      <AnimatedCircularProgress
        rotation={0}
        size={200}
        width={3}
        fill={fill}
        tintColor={primary}
        onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor="#D3D3D3"
      >
        {fill => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 15
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 32, color: primary }}>
              {exp}
            </Text>
            <Text
              style={{
                fontWeight: "normal",
                fontSize: 22,
                color: primary,
                marginTop: 10,
                textAlign: "center",
                fontFamily: "Lato-Light"
              }}
            >
              Experience Points
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );

  if (!loading) {
    return (
      <Base footer={true}>
        <UpComing />
        <Text
          style={{
            fontSize: 22,
            color: primary,
            fontFamily: "Lato-Bold",
            marginTop: 28
          }}
        >
          Badges & XP
        </Text>
        <ExpPoints />
      </Base>
    );
  } else {
    return (
      <Base footer={true}>
        <Spinner color={primary} style={{ alignSelf: "center" }} />
      </Base>
    );
  }
};
