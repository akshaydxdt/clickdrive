import React, { useState } from "react";
import { Text, View } from "react-native";
import { Container, Content, Picker, Button } from "native-base";
import firebase from "react-native-firebase";
import { useGlobal } from "../../../GlobalHooks";
import { useNavigation } from "react-navigation-hooks";

export default () => {
  const [gender, setGender] = useState("male");
  const [lang, setLang] = useState("en");
  const [state, actions] = useGlobal();
  const { navigate } = useNavigation();

  const onGenderChange = value => {
    setGender(value);
  };
  const onLanguageChange = value => {
    setLang(value);
  };
  const onSave = () => {
    const id = state.user.uid;
    firebase
      .database()
      .ref("users")
      .child(id)
      .child("pref")
      .set({ gender, lang });
    navigate("Lessons");
  };

  return (
    <Container>
      <Content>
        <Text>Gender</Text>
        <Picker selectedValue={gender} onValueChange={onGenderChange}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
        <Text>Language</Text>
        <Picker selectedValue={lang} onValueChange={onLanguageChange}>
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Dutch" value="nl" />
        </Picker>
        <Button onPress={onSave}>
          <Text>Save</Text>
        </Button>
      </Content>
    </Container>
  );
};
