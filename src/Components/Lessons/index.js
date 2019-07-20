import React, { useState, useEffect } from "react";
import { useGlobal } from "../../GlobalHooks";
import firebase from "react-native-firebase";
import { Container, Content } from "native-base";
import FirstLesson from "./FirstLesson";
import BookLessons from "./BookLessons";

export default () => {
  const [state, actions] = useGlobal();
  const [firstLesson, setFirstLesson] = useState(false);
  const lock = actions.userDetails.profileLock;

  useEffect(() => {
    console.log("lesson", state.userDetails.firstLesson);

    setFirstLesson(state.userDetails.firstLesson);
  }, [state.userDetails]);

  return lock == false ? (
    <Container>
      <Content>{firstLesson ? <FirstLesson /> : <BookLessons />}</Content>
    </Container>
  ) : (
    <Container>
      <Content>
        <BookLessons />
      </Content>
    </Container>
  );
};
