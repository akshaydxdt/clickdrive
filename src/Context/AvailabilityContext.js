import React, { useState, useEffect } from "react";
import firebase from "react-native-firebase";
export default (AvailabilityContext = React.createContext());

export const AvailabilityContextProvider = ({ children }) => {
  const [startTime, setstartTime] = useState(8);
  const [endTime, setendTime] = useState(18);
  const [slots, setslots] = useState({});

  return (
    <AvailabilityContext.Provider
      value={[
        { startTime, endTime, slots },
        { setstartTime, setendTime, setslots }
      ]}
    >
      {children}
    </AvailabilityContext.Provider>
  );
};
