import React, { Component } from "react";
import { useState } from "react";
import {
  Content,
  Container,
  Button,
  Text,
  Picker,
  ListItem,
  Left,
  Right,
  Radio
} from "native-base";

export default () => {
  const [satisfied, setsatisfied] = useState(true);
  const [reason, setReason] = useState("");

  const onNo = () => {
    setsatisfied(false);
    //handle route and db if not satisfied
  };
  const onYes = () => {
    //handle route and if stisfied
  };

  const onHandleReason = val => {
    setReason(val);
  };

  const renderSatisfyBox = () => {
    return (
      <Content>
        <Text>Satisfied?</Text>
        <Button>
          <Text>yes</Text>
        </Button>
        <Button onPress={onNo}>
          <Text>no</Text>
        </Button>
      </Content>
    );
  };

  const rednerNotSatisfied = () => {
    return (
      <Content>
        <Picker
          note
          mode="dropdown"
          style={{ width: 120 }}
          selectedValue={reason}
          onValueChange={onHandleReason}
        >
          <Picker.Item label="Not Interested" value="Not Interested" />
          <Picker.Item label="Not Comfortable" value="Not Comfortable" />
          <Picker.Item label="Bad Behaviour" value="Bad Behaviour" />
          <Picker.Item
            label="Break/Coffee/Smoking"
            value="Break/Coffee/Smoking"
          />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <Text>Change Instructor?</Text>
        <ListItem>
          <Left>
            <Text>Yes</Text>
          </Left>
          <Right>
            <Radio selected={false} />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Text>No</Text>
          </Left>
          <Right>
            <Radio selected={true} />
          </Right>
        </ListItem>
      </Content>
    );
  };

  return (
    <Container>
      {satisfied ? renderSatisfyBox() : rednerNotSatisfied()}
    </Container>
  );
};
