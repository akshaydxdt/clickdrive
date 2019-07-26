import React from "react";
import useGlobalHook from "use-global-hook";

const initialState = {
  years: null
};

const actions = {
  setYears: (store, years) => {
    store.setState({ years });
  }
};

export const useStore = useGlobalHook(React, initialState, actions);
