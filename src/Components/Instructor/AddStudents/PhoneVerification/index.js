import React, { useState, useEffect, useReducer } from "react";
import { TextInput } from "react-native";
import { Text, StyleSheet, View, Button, Image } from "react-native";
import firebase from "react-native-firebase";
import { useGlobal } from "./../../../../GlobalHooks/index";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";

const successImageUri =
  "https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png";

const initialState = {
  user: null,
  message: null,
  codeInput: "",
  phoneNumber: "+91",
  confirmResult: {},
  changeNumber: false,
  verificationId: ""
};

//reducer for handling multiple actions, refer useReducer from react docs
const reducer = (state, action) => {
  switch (action.type) {
    case "phInput":
      return { ...state, phoneNumber: action.data };
    case "codeInput":
      return { ...state, codeInput: action.data };
    case "setMsg":
      return { ...state, message: action.data };
    case "setResult":
      return { ...state, confirmResult: action.data };
    case "setUser":
      return { ...state, user: action.data };
    default:
      throw new Error();
  }
};

export default () => {
  const [data, setData] = useState({
    user: null,
    message: "",
    codeInput: "",
    phoneNumber: "",
    confirmResult: null,
    changeNumber: false,
    verificationId: "",
    timer: 60
  }); //remove later

  const { navigate } = useNavigation();

  const [mode, setMode] = useState("input");
  const [timer, setTimer] = useState(0);
  const [active, activateTimer] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [statea, actions] = useGlobal();
  const linkId = useNavigationParam("user");

  useEffect(() => {
    var t = null;
    if (timer > 0) {
      t = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 500);
    } else if (timer === 0) {
      clearInterval(t);
    }

    return () => clearInterval(t);
  }, [timer]);

  const signIn = () => {
    const { phoneNumber } = state;
    console.log("ph", phoneNumber);
    dispatch({ type: "setMsg", data: "Sending code ..." });
    actions.addStudentMode();
    actions.setLinkID(linkId);
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => {
        dispatch({ type: "setResult", data: confirmResult });
        console.log("confirm", confirmResult);

        dispatch({ type: "setMsg", data: "Code has been sent!" });
        setMode("codeInput");
        setTimer(60);
        // /countdownTimer(); //might need to be added as a callback
      })
      .catch(error =>
        dispatch({
          type: "setMsg",
          data: `Sign In With Phone Number Error: ${error.message}`
        })
      );
  };

  const confirmCode = () => {
    const { codeInput, confirmResult, changeNumber } = state;

    console.log("state", state);

    // const credential = firebase.auth.PhoneAuthProvider.credential(
    //     verificationId,
    //     codeInput
    // );

    if (confirmResult && codeInput.length) {
      if (!changeNumber) {
        confirmResult
          .confirm(codeInput)
          .then(user => {
            console.log("user", user);
            actions.addStudentUser(user);
            dispatch({ type: "setMsg", data: "Code Confirmed!" });
            navigate("Personalinfo");
            //setMode("success");
          })
          .catch(error =>
            dispatch({
              type: "set",
              data: `Code Confirm Error: ${error.message}`
            })
          );
      } else {
      }
    }
  };

  const countdownTimer = () => {
    console.log("countdown");

    // var t = setInterval(() => {
    //   if (timer >= 0) {
    //     setTimer(timer => timer - 1);
    //   } else {
    //     clearInterval(t);
    //   }
    // }, 1000);
  };

  const signOut = () => {
    firebase.auth().signOut();
    setMode("input");
  };

  const onChangePhoneNumber = () => {
    const { user, phoneNumber } = data;

    firebase
      .auth()
      .verifyPhoneNumber(phoneNumber)
      .on(
        "state_changed",
        phoneAuthSnapshot => {
          switch (phoneAuthSnapshot.state) {
            case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
              console.log("code sent");
              setData(data => {
                data.confirmResult = true;
                data.verificationId = phoneAuthSnapshot.verificationId;
                data.user = null;
                data.message = "Code has been sent!";
                return data;
              });

              break;
            case firebase.auth.PhoneAuthState.ERROR: // or 'error'
              setData(data => {
                data.message = "Verification Error";
                return data;
              });
              console.log("verification error");
              console.log(phoneAuthSnapshot.error);
              break;
          }
        },
        error => {
          console.log(error);
          // verificationId is attached to error if required
          console.log(error.verificationId);
        },
        phoneAuthSnapshot => {
          console.log(phoneAuthSnapshot);
        }
      );
  };

  updatePhoneNumber = (verificationId, verificationCode) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );

    // user.updatePhoneNumber(credential);
    firebase.auth().currentUser.updatePhoneNumber(credential);
  };

  const renderPhoneNumberInput = () => {
    const { phoneNumber } = state;

    return (
      <View style={{ padding: 25 }}>
        <Text>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => dispatch({ type: "phInput", data: value })}
          placeholder={"Phone number ... "}
          value={phoneNumber}
        />
        <Button title="Sign In" color="green" onPress={signIn} />
      </View>
    );
  };

  const renderMessage = () => {
    const { message } = state;

    return message == null ? null : (
      <Text style={{ padding: 5, backgroundColor: "#000", color: "#fff" }}>
        {message}
      </Text>
    );
  };

  const renderVerificationCodeInput = () => {
    const { codeInput } = state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => dispatch({ type: "codeInput", data: value })}
          placeholder={"Code ... "}
          value={codeInput}
        />
        <Text>Wait: {timer} </Text>
        <Button
          disabled={timer === 0 ? false : true}
          title="Resend Code"
          color="#841584"
          onPress={signIn}
        />
        <Button title="Confirm Code" color="#841584" onPress={confirmCode} />
      </View>
    );
  };

  renderOnSuccess = user => {
    return (
      <View
        style={{
          padding: 15,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#77dd77",
          flex: 1
        }}
      >
        <Image
          source={{ uri: successImageUri }}
          style={{ width: 100, height: 100, marginBottom: 25 }}
        />
        <Text style={{ fontSize: 25 }}>Signed In!</Text>
        <Button title="Sign Out" color="red" onPress={signOut} />
        <Button
          title="Change Number"
          color="blue"
          onPress={() => {
            setData(data => {
              data.changeNumber = true;
              return data;
            });
          }}
        />
      </View>
    );
  };

  renderChangeNumber = () => {
    const { phoneNumber } = data;
    return (
      <View style={{ padding: 25 }}>
        <Text>Enter phone number:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value =>
            setData(data => {
              data.phoneNumber = value;
              return data;
            })
          }
          placeholder={"Phone number ... "}
          value={phoneNumber}
        />
        <View>
          <Button title="Change" color="green" onPress={onChangePhoneNumber} />
          <Button
            title="Cancel"
            color="red"
            onPress={() =>
              setData(data => {
                data.changeNumber = false;
                return data;
              })
            }
          />
        </View>
      </View>
    );
  };

  mainRender = () => {
    switch (mode) {
      case "input":
        return renderPhoneNumberInput();

      case "codeInput":
        return renderVerificationCodeInput();

      case "success":
        return renderOnSuccess();

      case "changeNum":
        return renderChangeNumber();
    }
  };

  const { user, confirmResult, changeNumber } = data;
  return (
    <View style={{ flex: 1 }}>
      {renderMessage()}
      {mainRender()}
    </View>
  );
};
