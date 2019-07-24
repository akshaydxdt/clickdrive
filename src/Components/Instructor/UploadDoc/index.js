import React, { Component } from "react";

import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Text,
  Button
} from "native-base";
import { Image } from "react-native";
import ImagePicker from "react-native-image-picker";
import firebase from "react-native-firebase";

const options = {
  title: "Select Image",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank: null,
      liscense: null,
      passportFront: null,
      passportBack: null,
      profilePhoto: null
    };
  }

  onImagePick = type => {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          [type]: source
        });
      }
    });
  };

  onUpload = () => {
    const {
      bank,
      liscense,
      passportFront,
      passportBack,
      profilePhoto
    } = this.state;

    var uid = "uid"; //add id of the instructor
    //uploading the docs
    firebase
      .database()
      .ref("instructors")
      .child(uid)
      .set({
        doc: {
          bank,
          liscense,
          passportFront,
          passportBack,
          profilePhoto
        }
      });
  };

  render() {
    const {
      bank,
      liscense,
      passportFront,
      passportBack,
      profilePhoto
    } = this.state;
    return (
      <Container>
        <Content>
          <Text>Upload your required documents</Text>
          <List>
            <ListItem
              onPress={() => {
                this.onImagePick("bank");
              }}
            >
              <Left>
                <Text>Bank Statement or Bank Card</Text>
              </Left>
              <Image source={bank} style={{ width: 50, height: 50 }} />
            </ListItem>
            <ListItem
              onPress={() => {
                this.onImagePick("liscense");
              }}
            >
              <Left>
                <Text>Instructor license -Front</Text>
              </Left>
              <Image source={liscense} style={{ width: 50, height: 50 }} />
            </ListItem>
            <ListItem
              onPress={() => {
                this.onImagePick("passportFront");
              }}
            >
              <Left>
                <Text>Passport,ID Card -Front</Text>
              </Left>
              <Image source={passportFront} style={{ width: 50, height: 50 }} />
            </ListItem>
            <ListItem
              onPress={() => {
                this.onImagePick("passportBack");
              }}
            >
              <Left>
                <Text>Passport,ID Card -Back</Text>
              </Left>
              <Image source={passportBack} style={{ width: 50, height: 50 }} />
            </ListItem>
            <ListItem
              onPress={() => {
                this.onImagePick("profilePhoto");
              }}
            >
              <Left>
                <Text>Profile Photo</Text>
              </Left>
              <Image source={profilePhoto} style={{ width: 50, height: 50 }} />
            </ListItem>
          </List>
          <Button onPress={this.onUpload}>
            <Text>Upload</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
