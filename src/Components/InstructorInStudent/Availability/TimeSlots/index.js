import React, { useState } from "react";
import { View } from "react-native";
import { Content, Button, Text } from "native-base";

export default ({ day, startTime, endTime, slots, setslots }) => {
  //console.log("slots", slots);

  if (slots[day] == null || slots == null) {
    slots[day] = [];
    console.log("slots", slots);
  }

  var arr = [],
    i,
    j;

  if (startTime < endTime) {
    for (i = startTime; i < endTime; i++) {
      for (j = 0; j < 2; j++) {
        arr.push(
          (i < 10 ? "0" + i : i) +
            ":" +
            (j === 0 ? "00" : 30 * j > 59 ? i++ : 30 * j)
        );
      }
    }
  }

  const onAddSlots = time => {
    if (!slots[day].includes(time)) {
      slots[day].push(time);
      setslots(slots);
    }
  };

  const removeSlots = time => {
    //    console.log("remove", time);

    slots[day] = slots[day].filter(value => value != time);
    setslots(slots);
  };

  return (
    <Content>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          margin: 2,
          justifyContent: "space-around",
          "&::after": {
            content: "",
            flex: "auto"
          }
        }}
      >
        {arr.map(item => (
          <SlotButton
            key={item}
            time={item}
            onAddSlots={onAddSlots}
            slot={slots[day].includes(item) ? true : false}
            removeSlots={removeSlots}
          />
        ))}
      </View>
    </Content>
  );
};

const SlotButton = ({ time, onAddSlots, slot, removeSlots }) => {
  const [bordered, setbordered] = useState(true);
  //console.log("slo", slot);
  //setbordered(slot);
  var added = slot;
  return (
    <Button
      bordered={added ? false : bordered}
      warning
      style={{ minWidth: 70, margin: 4 }}
      onPress={() => {
        if (bordered) {
          onAddSlots(time);
        } else {
          removeSlots(time);
        }

        setbordered(!bordered);
      }}
    >
      <Text>{time}</Text>
    </Button>
  );
};
