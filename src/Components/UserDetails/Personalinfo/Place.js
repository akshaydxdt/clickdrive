import React from "react";
import { Item, Input, Button, Col, Text } from "native-base";
import { useNavigation } from "react-navigation-hooks";
import { placeholderLight, primaryText } from "../../../Res/Colors";

export default ({ actions, setMode, state }) => {
  const { navigate } = useNavigation();

  return (
    <Col>
      <Item>
        <Input
          style={{ color: primaryText, fontFamily: "Lato-Regular" }}
          placeholderTextColor={placeholderLight}
          placeholder={"Place"}
          onChangeText={value => actions.setPlace(value)}
        />
      </Item>

      <Button
        light
        bordered
        disabled={state.place ? false : true}
        style={{
          marginTop: 35,
          alignSelf: "stretch",
          justifyContent: "center",
          borderRadius: 15
        }}
        onPress={() => {
          navigate("Terms");
        }}
      >
        <Text
          style={{
            color: state.place ? primaryText : placeholderLight,
            fontFamily: "Lato-Regular"
          }}
        >
          Continue
        </Text>
      </Button>
    </Col>
  );
};
