import React, { useState, useEffect } from "react";
import { View, Text, Button, Content } from "native-base";
import { primary, primaryText, placeholderLight } from "../../../Res/Colors";

//generate the past 18 years
const getArray = () => {
  const getYears = startYear => {
    var currentYear = new Date().getFullYear() - 17,
      years = [];
    startYear = startYear || 1979;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years.reverse();
  };
  return getYears();
};

export default ({ setYear, setActive }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value) {
      setYear(value);
    }
  }, [value]);

  const years = getArray();

  //Individual component for Years
  const Square = ({ item, setValue, active }) => {
    var value = item + 1;
    const onSelect = () => {
      setValue(value);
      setActive(true);
    };
    return (
      <Button transparent light onPress={onSelect}>
        <Text
          style={{
            color: active === value ? primaryText : placeholderLight,
            fontSize: 15
          }}
        >
          {value}
        </Text>
      </Button>
    );
  };

  // this function generates each row for the grid
  const renderRow = (slicedArray, id) => {
    const items = slicedArray.map(item => (
      <Square
        key={item}
        active={value}
        item={item}
        setValue={val => setValue(val)}
      />
    ));
    return (
      <View
        style={{
          marginTop: 7,
          marginBottom: 7,
          flexDirection: "row",
          justifyContent: "space-around"
        }}
        key={id}
      >
        {items}
      </View>
    );
  };

  const renderGrid = () => {
    const rows = [];
    while (years.length) {
      //slices the row with 3 years in each
      rows.push(renderRow(years.splice(0, 3), rows.length));
    }
    return rows;
  };

  //render main grid
  return (
    <Content
      style={{ flex: 1 }}
      contentContainerStyle={{
        backgroundColor: primary,
        paddingTop: 28
      }}
    >
      {renderGrid()}
    </Content>
  );
};
