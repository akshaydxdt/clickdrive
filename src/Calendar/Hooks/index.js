import React from "react";
import useGlobalHook from "use-global-hook";

const initialState = {
  years: null
};

const actions = {
  setYears: (store, years) => {
    store.setState({ years });
  },
  generateYears: store => {
    var currentYears = store.years;
    var currentYear = new Date().getFullYear(),
      years = [],
      startYear;
    console.log("current", currentYears);
    if (currentYears != null) {
      console.log("inside");

      currentYear = currentYears[currentYears.length - 1];
      years = currentYears;
    }
    startYear = currentYear - 18;
    while (startYear < currentYear) {
      years.push(startYear++);
    }
    console.log("years", years);

    store.setState(years);
  }
};

export const useStore = useGlobalHook(React, initialState, actions);
