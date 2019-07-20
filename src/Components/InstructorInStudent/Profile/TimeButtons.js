import React, { useState } from "react";
import { View } from "react-native";
import { Content, Button, Text } from "native-base";
import { primary, borderColor } from "../../../Res/Colors";

export default ({ timeSlots, selected, onAdd, date, dateText }) => {
  const SlotButton = ({ time, added, onAdd }) => {
    return (
      <Button
        bordered
        warning
        style={{
          width: 70,
          height: 40,
          margin: 2,
          borderColor: added ? primary : borderColor
        }}
        onPress={() => {
          onAdd(time);
        }}
      >
        <Text style={{ color: primary, fontSize: 10 }}>{time}</Text>
      </Button>
    );
  };
  const renderRow = (slicedArray, id) => {
    const items = slicedArray.map(item => (
      <SlotButton
        key={item}
        time={item}
        onAdd={onAdd}
        added={item === selected.time && date === selected.date ? true : false}
      />
    ));
    return (
      <View
        style={{
          marginTop: 3,
          marginBottom: 3,
          flexDirection: "row",
          alignSelf: "stretch",
          justifyContent: "flex-start"
        }}
        key={id}
      >
        {items}
      </View>
    );
  };

  const renderGrid = () => {
    const rows = [];
    while (timeSlots.length) {
      rows.push(renderRow(timeSlots.splice(0, 4), rows.length));
    }
    return rows;
  };

  return (
    <Content
      style={{ marginTop: 5 }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {renderGrid()}
    </Content>
  );
};
