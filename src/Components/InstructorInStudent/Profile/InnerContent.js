import React, { useState, useEffect } from "react";
import { View, Text, Icon, Content, Container, Button } from "native-base";
import { primary, primaryText } from "../../../Res/Colors";
import { getCurrentWeek, getDayName, getMonthText } from "../../../Utils/date";
import Slots from "./Slots";
import { useNavigation } from "react-navigation-hooks";
import firebase from "react-native-firebase";
import { useGlobal } from "../../../GlobalHooks";

//For the user to select avialable slots fromthe instructor

export default () => {
  const availability = {
    Fri: [
      "08:00",
      "09:00",
      "10:00",

      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00"
    ],
    Mon: [
      "08:00",
      "09:00",
      "10:00",

      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00"
    ],
    Sat: [
      "08:00",
      "09:00",
      "10:00",

      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00"
    ],
    Thu: [
      "08:00",
      "09:00",
      "10:00",

      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00"
    ],
    Tue: [
      "08:00",
      "09:00",
      "10:00",

      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00"
    ],
    Wed: [
      "08:00",
      "09:00",
      "10:00",

      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00"
    ]
  };
  const [selected, setSelected] = useState({
    date: null,
    time: null
  });

  const [state, actions] = useGlobal();

  const { navigate } = useNavigation();

  useEffect(() => {
    generateData();
  }, []);
  //Fn to generate current week and time slots based on the instructor
  const generateData = () => {
    const currentWeek = getCurrentWeek();

    return currentWeek.map(item => {
      const day = getDayName(new Date(item).getDay());
      const date = new Date(item);
      const dateText = date.getDate() + " " + getMonthText(date.getMonth());

      const timeSlots = availability[day];

      return timeSlots ? (
        <Slots
          date={item}
          key={dateText}
          dateText={dateText}
          timeSlots={timeSlots}
          selected={selected}
          setSelected={setSelected}
        />
      ) : (
        <View />
      );
    });
  };

  const onConfirm = () => {
    const id = state.user.uid;

    const db = firebase
      .database()
      .ref("users")
      .child(id);
    //add dynamic exp addition
    db.child("nextBooking").set(selected);
    db.child("exp").set(25);
    navigate("BookingComplete");
  };

  return (
    <Container>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 22,
          color: primary
        }}
      >
        Available Session
      </Text>
      <Content
        style={{
          flex: 1
        }}
      >
        {generateData()}
      </Content>
      {selected.time && selected.date ? (
        <Button
          style={{
            backgroundColor: primary,
            borderRadius: 14,
            height: 35,
            alignSelf: "stretch",
            justifyContent: "center",
            marginTop: 20,
            shadowColor: null,
            elevation: 0
          }}
          onPress={onConfirm}
        >
          <Text style={{ color: primaryText }} uppercase={false}>
            Confirm
          </Text>
        </Button>
      ) : null}
    </Container>
  );
};
