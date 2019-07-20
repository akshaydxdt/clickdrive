export const authDetailsState = {
  email: null,
  mobile: null,
  dob: null,
  pass: null,
  first: null,
  last: null,
  place: null
};

export const authDetailsActions = {
  setMobile: (store, mobile) => {
    // var regDetails = store.regDetails;
    // regDetails["mobile"] = mobile;
    // store.setState({ regDetails });
    store.setState({ mobile });
  },
  setEmail: (store, email) => {
    // var regDetails = store.regDetails;
    // regDetails["email"] = email;
    // store.setState({ regDetails });
    store.setState({ email });
  },
  setDOB: (store, dob) => {
    console.log("dob", dob);
    //store.regDetails.dob = dob
    // var regDetails = store.regDetails;
    // regDetails["dob"] = dob;
    store.setState({ dob });
  },
  setPass: (store, pass) => {
    store.setState({ pass });
  },
  setFirst: (store, first) => {
    store.setState({ first });
  },
  setLast: (store, last) => {
    store.setState({ last });
  },
  setPlace: (store, place) => {
    store.setState({ place });
  }
};
