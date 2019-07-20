import React, { Component, useState, useEffect } from "react";
import {
  DatePicker,
  Input,
  Button,
  Container,
  Content,
  Text,
  Item,
  Grid,
  Col,
  Row,
  Thumbnail,
  Picker
} from "native-base";
import { Image, View } from "react-native";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";
import { useGlobal } from "../../../GlobalHooks";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import { primary, primaryText } from "../../../Res/Colors";
import success from "../../../Res/user.png";
import { TouchableOpacity } from "react-native-gesture-handler";
const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

export default () => {
  const [state, actions] = useGlobal();
  // const [first, setFirst] = useState("");
  // const [last, setLast] = useState("");
  // const [place, setPlace] = useState("");
  // const [dob, setDob] = useState("");
  // const [avatarSource, setAvatarSource] = useState(null);
  // const [gender, setGender] = useState("male");
  // const [lang, setLang] = useState("en");

  // const mode = state.mode;

  // const { navigate } = useNavigation();
  // const linkId = state.linkId;

  // useEffect(() => {
  //   const { dob } = state;
  //   console.log("reg", state);
  //   setDob(dob);
  // }, []);

  // // if (state.userDetails) {
  // //   console.log("reached");

  // //   navigate("AfterReview");
  // // }

  // const onGenderChange = value => {
  //   setGender(value);
  // };
  // const onLanguageChange = value => {
  //   setLang(value);
  // };
  // const uploadAvatar = () => {
  //   ImagePicker.showImagePicker(options, response => {
  //     console.log("Response = ", response);

  //     if (response.didCancel) {
  //       console.log("User cancelled image picker");
  //     } else if (response.error) {
  //       console.log("ImagePicker Error: ", response.error);
  //     } else if (response.customButton) {
  //       console.log("User tapped custom button: ", response.customButton);
  //     } else {
  //       //const source = { uri: response.uri };

  //       // You can also display the image using data:
  //       const source = { uri: "data:image/jpeg;base64," + response.data };

  //       setAvatarSource(source);
  //     }
  //   });
  // };

  // // const saveAvatar = () => {
  // //   var ref = firebase
  // //     .storage()
  // //     .ref("users")

  // //     .putFile(avatarSource);
  // //   ref.on(
  // //     "state_changed",
  // //     () => {},
  // //     error => {
  // //       console.log("error", error);
  // //     },
  // //     () => {
  // //       console.log("completed upload");

  // //       ref.snapshot.getDownloadURL().then(url => {
  // //         console.log("url", url);
  // //         onSave(url);
  // //       });
  // //     }
  // //   );
  // // };
  // const onSave = () => {
  //   //console.log("user", state.user.uid);
  //   //.child(state.user.uid)
  //   // firebase
  //   //   .database()
  //   //   .ref("users")
  //   //   .child(state.user.uid)
  //   //   .set({
  //   //     avatar: avatarSource,
  //   //     first,
  //   //     last,
  //   //     place,
  //   //     dob,
  //   //     gender,
  //   //     lang,
  //   //     firstLesson: mode === "addStudent" ? false : true,
  //   //     credits: mode === "addStudent" ? "infy" : 0,
  //   //     profileLock: mode === "addStudent" ? linkId : false
  //   //   });
  //   // navigate("Home");
  //   // if (mode === "addStudent") {
  //   //   navigate("Home");
  //   // } else {
  //   //   navigate("Preference");
  //   // }
  //   navigate("RegComplete");
  // };
  return (
    <Container style={{ backgroundColor: primary }}>
      <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 15 }}>
        <Grid style={{ alignItems: "center" }}>
          <Col>
            <TouchableOpacity onPress={uploadAvatar}>
              {avatarSource === null ? null : (
                <Thumbnail
                  style={{ alignSelf: "center" }}
                  large
                  circular
                  source={avatarSource}
                />
              )}
              {/* <Text
                style={{
                  color: primaryText,
                  fontSize: 8,
                  alignSelf: "center",
                  fontFamily: "Lato-Regular"
                }}
              >
                Tap to change avatar
              </Text> */}
            </TouchableOpacity>
            <Item style={{ marginTop: 22 }}>
              <Input
                style={{ color: primaryText, fontFamily: "Lato-Regular" }}
                placeholderTextColor="white"
                placeholder={"First Name"}
                onChangeText={text => setFirst(text)}
              />
            </Item>
            <Item style={{ marginTop: 22 }}>
              <Input
                style={{ color: primaryText, fontFamily: "Lato-Regular" }}
                placeholderTextColor="white"
                placeholder={"Last Name"}
                onChangeText={text => setLast(text)}
              />
            </Item>

            {/* <DatePicker
          locale={"en"}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText="Date of Birth"
          onDateChange={date => {
            setDob(date);
          }}
          disabled={false}
        /> */}

            <Item style={{ marginTop: 22 }}>
              <Input
                style={{ color: primaryText, fontFamily: "Lato-Regular" }}
                placeholderTextColor="white"
                placeholder={"Place"}
                onChangeText={text => setPlace(text)}
              />
            </Item>
            {/* <Item>
              <Picker
                mode="dropdown"
                placeholder="Gender"
                textStyle={{ color: primaryText, fontFamily: "Lato-Regular" }}
                itemTextStyle={{
                  color: primaryText,
                  fontFamily: "Lato-Regular"
                }}
                itemStyle={{
                  backgroundColor: primary
                }}
                placeholderStyle={{
                  color: primaryText,
                  fontFamily: "Lato-Regular"
                }}
                selectedValue={gender}
                onValueChange={onGenderChange}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </Item>
            <Item>
              <Picker
                placeholder="Language"
                placeholderStyle={{
                  color: primaryText,
                  fontFamily: "Lato-Regular"
                }}
                selectedValue={lang}
                onValueChange={onLanguageChange}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Dutch" value="nl" />
              </Picker>
            </Item> */}

            <Button
              light
              bordered
              style={{
                marginTop: 42,
                alignSelf: "stretch",
                justifyContent: "center",
                borderRadius: 15
              }}
              onPress={onSave}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Lato-Regular"
                }}
                uppercase={false}
              >
                Save
              </Text>
            </Button>
          </Col>
        </Grid>
      </Content>
    </Container>
  );
};
