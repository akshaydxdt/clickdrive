import React from "react";
import { View, Icon, Text } from "native-base";
import { primary } from "../../../Res/Colors";
import TimeButtons from "./TimeButtons";

export default ({ date, timeSlots, selected, setSelected, dateText }) => {
  const onAdd = time => {
    console.log("time", time, "dateText", dateText);

    setSelected({ date, time });
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingTop: 20,
          paddingLeft: 30
        }}
      >
        <Icon
          type="FontAwesome"
          style={{ color: primary, fontSize: 16 }}
          name="calendar"
        />
        <Text
          style={{
            fontWeight: "normal",
            fontSize: 16,
            color: primary,
            textAlign: "center",
            marginLeft: 5,
            fontFamily: "Lato-Light"
          }}
        >
          {dateText}
        </Text>
      </View>
      <TimeButtons
        date={date}
        timeSlots={timeSlots}
        selected={selected}
        onAdd={onAdd}
        dateText={dateText}
        len={timeSlots.length}
      />
    </View>
  );
};
