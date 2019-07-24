import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Content, Container, Button, Input } from "native-base";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";
import { AirbnbRating } from "react-native-ratings";

//Profile editing page

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
      id: "id",
      data: [],
      desc: "",
      pics: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("instructors")
      .child(this.state.id)
      .once("value", dataSnap => {
        console.log("data", dataSnap);

        this.setState({ data: dataSnap.val() });
      });
  }
  addPics = () => {
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
        const pics = this.state.pics;
        pics.push(source);
        this.setState({
          pics
        });
      }
    });
  };

  onAddDescription = () => {
    const { id, desc } = this.state;
    //Currently only adding description, add as an object to set all data
    firebase
      .database()
      .ref("instructors")
      .child(id)
      .child("description")
      .set(desc);
  };

  render() {
    const { firstName, lastName, rating } = this.state.data;
    return (
      <Container>
        <Content>
          <Text>Profile</Text>
          <Text>
            Name:{firstName} {lastName}
          </Text>
          <AirbnbRating
            defaultRating={rating}
            showRating
            count={5}
            reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
          />
          <Button onPress={this.addPics}>
            <Text>Add Photos</Text>
          </Button>
          <Input
            placeholder="Add description"
            onChangeText={desc => {
              this.setState({ desc });
            }}
          />
          <Button onPress={this.onAddDescription}>
            <Text>Add</Text>
          </Button>
          {this.state.pics.map(item => (
            <Image source={item} style={{ width: 50, height: 50 }} />
          ))}
        </Content>
      </Container>
    );
  }
}
