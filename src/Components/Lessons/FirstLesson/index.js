import React from "react";
import { Content, Text, Button } from "native-base";
import firebase from "react-native-firebase";
import { useGlobal } from "../../../GlobalHooks";

export default () => {
  const [state] = useGlobal();
  const onBook = () => {
    firebase
      .database()
      .ref("users")
      .child(state.user.uid)
      .child("firstLesson")
      .set(false);
  };

  return (
    <Content>
      <Text>First Lesson</Text>
      <Button onPress={onBook}>
        <Text>Book</Text>
      </Button>
    </Content>
  );
};
