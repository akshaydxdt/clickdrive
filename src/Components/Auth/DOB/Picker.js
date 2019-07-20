import React, { useState, useEffect } from "react";
import { Col, Text, Button, Tabs, Tab, Toast } from "native-base";
import { primaryText, primary, placeholderLight } from "../../../Res/Colors";
import { useNavigation } from "react-navigation-hooks";
import { useGlobal } from "../../../GlobalHooks";
import Day from "./Day";
import Month from "./Month";
import Year from "./Year";

export default () => {
  const [date, setDate] = useState(null);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(false);

  const { navigate } = useNavigation();
  const [state, actions] = useGlobal();

  // useEffect(() => {
  //   if (day != null || month != null || year != null) {
  //     setActive(true);
  //   }
  // }, [day, month, year]);

  const onNext = () => {
    console.log("page", page);

    switch (page) {
      case 0:
        day ? setPage(page => page + 1) : setPage(page);
        setActive(false);
        break;
      case 1:
        month ? setPage(page => page + 1) : setPage(page);
        setActive(false);
        break;
      case 2:
        year ? onDateChange() : setPage(page);
        setActive(false);
        break;
      default:
        break;
    }
  };

  const onDateChange = () => {
    console.log("date:", day, month, year);

    if (day && month && year) {
      var date = day + "-" + month + "-" + year;

      actions.setDOB(date);
      setDate(date);
      navigate("Personalinfo");
    } else {
      Toast.show({
        text: "Please select a complete date",
        duration: 2000,
        buttonText: "Okay"
      });
    }
  };

  return (
    <Col style={{ alignItems: "center" }}>
      <Text style={{ color: primaryText, marginBottom: 27 }}>
        Enter your date of birth
      </Text>
      <Tabs
        page={page}
        tabBarUnderlineStyle={{
          height: 1,
          backgroundColor: placeholderLight
        }}
        tabContainerStyle={{
          elevation: 0
        }}
      >
        <Tab
          tabStyle={{
            backgroundColor: primary
          }}
          activeTabStyle={{ backgroundColor: primary }}
          heading="DD"
        >
          <Day setDay={setDay} setActive={setActive} />
        </Tab>
        <Tab
          tabStyle={{
            backgroundColor: primary
          }}
          activeTabStyle={{ backgroundColor: primary }}
          heading="MM"
        >
          <Month setMonth={setMonth} setActive={setActive} />
        </Tab>
        <Tab
          tabStyle={{
            backgroundColor: primary
          }}
          activeTabStyle={{ backgroundColor: primary }}
          heading="YY"
        >
          <Year setYear={setYear} setActive={setActive} />
        </Tab>
      </Tabs>

      <Button
        light
        bordered
        style={{
          marginTop: 25,
          alignSelf: "stretch",
          justifyContent: "center",
          borderRadius: 15
        }}
        onPress={onNext}
      >
        <Text
          style={{
            color: active ? primaryText : placeholderLight,
            fontFamily: "Lato-Regular"
          }}
          uppercase={false}
        >
          Continue
        </Text>
      </Button>
    </Col>
  );
};
