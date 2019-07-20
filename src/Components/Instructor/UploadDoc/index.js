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
      //firebase.storage().ref('')
  };

  render() {
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
              <Image
                source={this.state.bank}
                style={{ width: 50, height: 50 }}
              />
            </ListItem>
            <ListItem>
              <Left>
                <Text>Instructor license -Front</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Passport,ID Card -Front</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Passport,ID Card -Back</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Profile Photo</Text>
              </Left>
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
