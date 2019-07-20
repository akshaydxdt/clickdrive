import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Button, TextInput, Image } from "react-native";
import firebase from "react-native-firebase";
import { useGlobal } from "./../../../../GlobalHooks/index";

const successImageUri =
  "https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png";

export default ({ phone }) => {
  const [data, setData] = useState({
    user: null,
    message: "",
    codeInput: "",
    phoneNumber: "+91" + phone,
    confirmResult: null,
    changeNumber: false,
    verificationId: "",
    timer: 60
  });

  const [state, actions] = useGlobal();

  // componentDidMount() {
  //   this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.setState({ user: user.toJSON() });
  //     } else {
  //       // User has been signed out, reset the state
  //       this.setState({
  //         user: null,
  //         message: "",
  //         codeInput: "",
  //         phoneNumber: "+91",
  //         confirmResult: null
  //       });
  //     }
  //   });
  // }

  // componentWillUnmount() {
  //   if (this.unsubscribe) this.unsubscribe();
  // }

  const signIn = () => {
    const { phoneNumber } = data;

    setData(data => {
      data.message = "Sending code ...";
      data.timer = 60;
      return data;
    });
    console.log("data", data);
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => {
        setData(data => {
          data.confirmResult = confirmResult;
          data.message = "Code has been sent!";
          return data;
        });
        countdownTimer(); //might need to be added as a callback
      })
      .catch(error =>
        setData(data => {
          data.message = `Sign In With Phone Number Error: ${error.message}`;
          return data;
        })
      );
  };

  const confirmCode = () => {
    const { codeInput, confirmResult, changeNumber, verificationId } = data;

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

            actions.setUser(user);
            setData(data => {
              data.message = "Code Confirmed!";
              return data;
            });
          })
          .catch(error =>
            setData(data => {
              data.message = `Code Confirm Error: ${error.message}`;
              return data;
            })
          );
      } else {
      }
    }
  };

  const countdownTimer = () => {
    var t = setInterval(() => {
      var timer = data.timer - 1;
      if (timer >= 0) {
        setData(data => {
          data.timer = timer;
          return data;
        });
      } else {
        clearInterval(t);
      }
    }, 1000);
  };

  const signOut = () => {
    firebase.auth().signOut();
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
            // ------------------------
            //  IOS AND ANDROID EVENTS
            // ------------------------
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

            //   // ---------------------
            //   // ANDROID ONLY EVENTS
            //   // ---------------------
            //   case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
            //     console.log('auto verify on android timed out');
            //     // proceed with your manual code input flow, same as you would do in
            //     // CODE_SENT if you were on IOS
            //     break;
            //   case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
            //     // auto verified means the code has also been automatically confirmed as correct/received
            //     // phoneAuthSnapshot.code will contain the auto verified sms code - no need to ask the user for input.
            //     console.log('auto verified on android');
            //     console.log(phoneAuthSnapshot);
            //     // Example usage if handling here and not in optionalCompleteCb:
            //     // const { verificationId, code } = phoneAuthSnapshot;
            //     // const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);

            //     // Do something with your new credential, e.g.:
            //     // firebase.auth().signInWithCredential(credential);
            //     // firebase.auth().currentUser.linkWithCredential(credential);
            //     // etc ...
            //     break;
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
        <Button title="Sign In" color="green" onPress={signIn} />
      </View>
    );
  };

  const renderMessage = () => {
    const { message } = data;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: "#000", color: "#fff" }}>
        {message}
      </Text>
    );
  };

  const renderVerificationCodeInput = () => {
    const { codeInput, timer } = data;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value =>
            setData(data => {
              data.codeInput = value;
              return data;
            })
          }
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

  const { user, confirmResult, changeNumber } = data;
  return (
    <View style={{ flex: 1 }}>
      {!user && !confirmResult && renderPhoneNumberInput()}

      {renderMessage()}

      {!user && confirmResult && renderVerificationCodeInput()}

      {user && !changeNumber && renderOnSuccess(user)}

      {user && changeNumber && renderChangeNumber()}
    </View>
  );
};
