import React, { Component, useState, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import {
  Container,
  Content,
  Tab,
  Tabs,
  ScrollableTab,
  Button,
  Input,
  Toast
} from "native-base";
import TimeSlots from "./TimeSlots";
import AvailabilityContext, {
  AvailabilityContextProvider
} from "../../../Context/AvailabilityContext";
import firebase from "react-native-firebase";
import { useGlobal } from "../../../GlobalHooks";
import { primaryText } from "../../../Res/Colors";

// export const = (props) => (
//   <AvailabilityContextProvider>
//     <Availability {...props} />
//   </AvailabilityContextProvider>
// );

export default () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [state, actions] = useGlobal();

  const details = state.instDetails;
  const id = "id" || state.user.uid;
  const [startTime, setstartTime] = useState(8);
  const [endTime, setendTime] = useState(18);
  const [slots, setslots] = useState({});

  if (details) {
    if (details.availability != null) {
      setslots(details.availability);
    }
    if (details.customTime != null) {
      setstartTime(details.customTime.startTime);
      setendTime(details.customTime.endTime);
    }
  }

  // const [
  //   { startTime, endTime, slots },
  //   { setstartTime, setendTime, setslots }
  // ] = useContext(AvailabilityContext);

  // function fetchData() {
  //   var val = [];
  //   firebase
  //     .database()
  //     .ref("instructors")
  //     .child("id")
  //     .child("availability")
  //     .on(
  //       "value",
  //       dataSnapshot => {
  //         val = dataSnapshot.val();
  //         setslots(val);
  //       },
  //       err => console.log("err", err)
  //     );
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   var val = [];
  //   const unsub = firebase
  //     .database()
  //     .ref("instructors")
  //     .child("id")
  //     .child("availability")
  //     .on(
  //       "value",
  //       dataSnapshot => {
  //         val = dataSnapshot.val();
  //         setslots(dataSnapshot.val());
  //       },
  //       err => console.log("err", err)
  //     );
  //   return () => {
  //     unsub();
  //   };
  // }, []);

  const onSave = () => {
    var oneHour = 0;

    //Sort the entries
    const entries = Object.entries(slots);

    for (const [day, time] of entries) {
      var sortedTime = time.sort((a, b) => {
        return new Date("1970/01/01 " + a) - new Date("1970/01/01 " + b);
      });
      slots[day] = sortedTime;
    }

    console.log("slots", slots);

    //checking continuity for atleast  1 hour
    for (const [day, time] of entries) {
      time.map((item, index) => {
        console.log("item", item);

        var currentItem = new Date("1970/01/01 " + item);
        var hourMod = currentItem.getHours() + 1;
        currentItem.setHours(hourMod);
        var comapreable = new Date("1970/01/01 " + time[index + 2]);
        //currentModified.setHours(comapreable.getTime() + 1 * 60000);
        console.log("current", currentItem, "compareable", comapreable);

        if (currentItem.getTime() === comapreable.getTime()) {
          console.log("current", currentItem, "compareable", comapreable);
          oneHour = oneHour + 1;
        }
      });
    }

    console.log("oneHour", oneHour);
    if (oneHour >= 1) {
      //forward
    } else {
      Toast.show({
        text: "There should be atleast 1 hour of continuity ",
        duration: 4000,
        buttonText: "Okay"
      });
    }

    // firebase
    //   .database()
    //   .ref("instructors")
    //   .child(id)
    //   .child("availability")
    //   .set(slots);
    // firebase
    //   .database()
    //   .ref("instructors")
    //   .child(id)
    //   .child("customTime")
    //   .set({ startTime, endTime });
    //fetchData();
  };
  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1, justifyContent: "center" }}>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          {days.map(item => (
            <Tab heading={item} key={item}>
              <TimeSlots
                day={item}
                startTime={startTime}
                endTime={endTime}
                slots={slots}
                setslots={setslots}
              />
            </Tab>
          ))}
        </Tabs>
      </Content>
      <Content>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <Input
            value={"" + startTime}
            onChangeText={val => {
              setstartTime(val);
            }}
          />
          <Input
            value={"" + endTime}
            onChangeText={val => {
              setendTime(val);
            }}
          />
        </View>
        <Button
          onPress={onSave}
          style={{
            alignSelf: "stretch",
            flex: 1,
            justifyContent: "center",
            margin: 15
          }}
        >
          <Text style={{ color: primaryText }}>Save</Text>
        </Button>
      </Content>
    </Container>
  );
};
