import React, { useState } from "react";
import { Container, Content, Text, Button } from "native-base";
import { useGlobal } from "./../../../GlobalHooks/index";
import { Share } from "react-native";

export default () => {
  const [state] = useGlobal();
  // const uid = state.user.uid;
  const uniqueLink = "https://steer.page.link/book/" + "abcdefghijklmnopqrstuv"; //replace this part with the UID of the instructor

  const onShare = async () => {
    //Sharing functionality
    try {
      const result = await Share.share({
        message: uniqueLink
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Content>
        <Text>Add a new student</Text>
        <Button onPress={onShare}>
          <Text>Add</Text>
        </Button>
      </Content>
    </Container>
  );
};
