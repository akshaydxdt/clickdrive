import React, { useState } from "react";
import { View, Text } from "react-native";
import { Content, Button } from "native-base";
import { primary, borderColor } from "../../../Res/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default ({ timeSlots, selected, onAdd, date, dateText, len }) => {
  const SlotButton = ({ time, added, onAdd }) => {
    return (
      <Button
        bordered
        warning
        style={{
          maxWidth: 50,
          width: wp("14%"),
          height: 40,
          margin: 3,
          padding: 0,
          borderColor: added ? primary : borderColor,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => {
          onAdd(time);
        }}
      >
        <Text
          style={{
            color: primary,
            fontSize: wp("3%"),
            fontFamily: "Lato-Light"
          }}
        >
          {time}
        </Text>
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
      rows.push(renderRow(timeSlots.splice(0, 5), rows.length));
    }
    return rows;
  };

  return (
    <Content
      style={{ marginTop: 5, marginLeft: 10 }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {renderGrid()}
    </Content>
  );
};
