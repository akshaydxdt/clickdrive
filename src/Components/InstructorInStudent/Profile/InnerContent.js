import React, { useState, useEffect } from "react";
import { View, Text, Icon, Content, Container, Button } from "native-base";
import { primary, primaryText } from "../../../Res/Colors";
import { getCurrentWeek, getDayName, getMonthText } from "../../../Utils/date";
import Slots from "./Slots";
import { useNavigation } from "react-navigation-hooks";
import firebase from "react-native-firebase";
import { useGlobal } from "../../../GlobalHooks";

export default () => {
  const availability = {
    Fri: ["08:30", "09:00", "09:30"],
    Mon: ["10:30", "11:00", "11:30"],
    Sat: ["08:00", "08:30", "09:00", "09:30", "10:00"],
    Thu: ["11:00", "11:30", "12:00"],
    Tue: ["12:30", "01:00", "01:30"],
    Wed: ["11:00", "13:00", "13:30"]
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
