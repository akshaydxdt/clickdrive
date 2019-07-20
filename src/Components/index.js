import React, { Component } from "react";
import { StateProvider } from "../Context/DataContext";
import firebase from "react-native-firebase";
import RouterApp from "./../Routes";
import { Root, StyleProvider } from "native-base";
import SplashScreen from "react-native-splash-screen";
import getTheme from "../../native-base-theme/components";

const prefix = "https://";

// export default () => (
//   <Root>
//     <RouterApp uriPrefix={prefix} />
//   </Root>
// );
export default class extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <StyleProvider style={getTheme()}>
        <Root>
          <RouterApp uriPrefix={prefix} />
        </Root>
      </StyleProvider>
    );
  }
}
