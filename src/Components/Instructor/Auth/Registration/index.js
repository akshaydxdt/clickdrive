import React, { useState } from "react";
import { Container, Content, Input, Button, Text } from "native-base";
import firebase from "react-native-firebase";
import { useGlobal } from "./../../../../GlobalHooks/index";

export default ({ onDone, onPhone }) => {
  const [state, actions] = useGlobal();

  const [details, setDetails] = useState({
    email: "",
    pass: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    pass: "",
    language: "",
    city: ""
  });

  const onSignup = () => {
    const { email, pass } = details;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(user => {
        if (user) {
          actions.setInstructor(user.user);

          addDetails(user.user.uid);
          onDone("phone");
        }
      });
  };

  const addDetails = id => {
    const { firstName, lastName, email, mobile, language, city } = details;

    firebase
      .database()
      .ref("instructors")
      .child(id)
      .set({
        firstName,
        lastName,
        email,
        mobile,
        language,
        city,
        mobConfirmed: false
      });
  };
  return (
    <Container>
      <Content>
        <Input
          placeholder="First Name"
          onChangeText={firstName => {
            details["firstName"] = firstName;
            setDetails(details);
          }}
        />
        <Input
          placeholder="Last Name"
          onChangeText={lastName => {
            details["lastName"] = lastName;
            setDetails(details);
          }}
        />
        <Input
          placeholder="Email"
          onChangeText={email => {
            details["email"] = email;
            setDetails(details);
          }}
        />
        <Input
          placeholder="Mobile"
          onChangeText={mobile => {
            details["mobile"] = mobile;
            setDetails(details);
            onPhone(mobile);
          }}
        />
        <Input
          placeholder="Password"
          onChangeText={pass => {
            details["pass"] = pass;
            setDetails(details);
          }}
        />
        <Input
          placeholder="Language"
          onChangeText={language => {
            details["language"] = language;
            setDetails(details);
          }}
        />
        <Input
          placeholder="City"
          onChangeText={city => {
            details["city"] = city;
            setDetails(details);
          }}
        />
        <Button onPress={onSignup}>
          <Text>Signup</Text>
        </Button>
      </Content>
    </Container>
  );
};
