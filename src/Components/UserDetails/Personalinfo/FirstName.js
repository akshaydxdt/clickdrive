import React, { useState } from "react";
import { Item, Input, Button, Col, Text } from "native-base";
import { placeholderLight, primaryText } from "../../../Res/Colors";

export default ({ state, actions, setMode }) => {
  return (
    <Col>
      <Item>
        <Input
          style={{ color: "white", fontFamily: "Lato-Regular" }}
          placeholderTextColor={placeholderLight}
          placeholder={"First Name"}
          onChangeText={value => actions.setFirst(value)}
        />
      </Item>

      <Button
        light
        disabled={state.first ? false : true}
        bordered
        style={{
          marginTop: 35,
          alignSelf: "stretch",
          justifyContent: "center",
          borderRadius: 15
        }}
        onPress={() => {
          setMode("last");
        }}
      >
        <Text
          style={{
            color: state.first ? primaryText : placeholderLight,
            fontFamily: "Lato-Regular"
          }}
        >
          Continue
        </Text>
      </Button>
    </Col>
  );
};
