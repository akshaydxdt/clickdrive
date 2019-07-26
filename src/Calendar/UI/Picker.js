import React, { useState, useEffect } from "react";
import { Col, Text, Button, Tabs, Tab, Toast } from "native-base";
import { primaryText, primary, placeholderLight } from "../Utils/Colors";
import Day from "./Day";
import Month from "./Month";
import Year from "./Year";

export default ({ onChange, onError }) => {
  const [date, setDate] = useState(null);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [page, setPage] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (date) {
      onChange(date);
    }
  }, [date]);

  //used for handling the page change and accordingly change the color of the button from inactive to active and vice-versa
  const onNext = () => {
    console.log("page", page);

    switch (page) {
      case 0:
        year ? setPage(page => page + 1) : setPage(page);
        setActive(false);
        break;
      case 1:
        month ? setPage(page => page + 1) : setPage(page);
        setActive(false);
        break;
      case 2:
        day ? onDateChange() : setPage(page);
        setActive(false);
        break;
      default:
        break;
    }
  };

  const onDateChange = () => {
    if (day && month && year) {
      var date = day + "-" + month + "-" + year;
      setDate(date);
    } else {
      onError();
    }
  };

  return (
    <Col
      style={{
        alignItems: "center",
        flex: 1
      }}
    >
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
          heading="YY"
        >
          <Year setYear={setYear} setActive={setActive} />
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
          heading="DD"
        >
          <Day setDay={setDay} setActive={setActive} month={month} />
        </Tab>
      </Tabs>

      <Button
        light
        bordered
        style={{
          marginBottom: 20,
          width: "100%",
          alignSelf: "flex-end",
          justifyContent: "center",
          borderRadius: 15
        }}
        onPress={onNext}
      >
        <Text
          style={{
            fontSize: 18,
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
