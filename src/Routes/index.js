import React from "react";

import { createStackNavigator, createAppContainer } from "react-navigation";

import Facebook from "../Components/Auth/Facebook";
import Auth from "../Components/Auth";
import PhoneVerification from "../Components/Auth/PhoneVerification";
import InstructorList from "../Components/InstructorInStudent/InstructorList";
import AfterReview from "../Components/Lessons/AfterReview";
import Availability from "../Components/InstructorInStudent/Availability";
import Personalinfo from "../Components/UserDetails/Personalinfo";
import Preference from "../Components/UserDetails/Preference";
import InstructorAuth from "../Components/Instructor/Auth";
import Lessons from "../Components/Lessons";
import InstProfile from "../Components/InstructorInStudent/Profile";
import BookLessons from "../Components/Lessons/BookLessons";
import AddStudents from "../Components/Instructor/AddStudents";
import AddStdPhone from "../Components/Instructor/AddStudents/PhoneVerification";
import Home from "../Components/Home";
import { primary, primaryText } from "../Res/Colors";
import EmailVerification from "../Components/Auth/EmailVerification";
import DOB from "../Components/Auth/DOB";
import Password from "../Components/Auth/Password";
import Complete from "../Components/Auth/Complete";
import Success from "../Components/InstructorInStudent/Profile/Success";
import Terms from "../Components/Auth/Terms";
import Matching from "../Components/Matching";
import MatchSuccess from "../Components/Matching/MatchSuccess";
import SelectSuccess from "../Components/InstructorInStudent/InstructorList/SelectSuccess";
import Calendar from "../Calendar";

// navigationOptions: {
//   headerStyle: {
//     backgroundColor: primary
//   },
//   headerTintColor: primaryText
// }

const AppNavigator = createStackNavigator(
  {
    Auth: {
      screen: Auth,
      navigationOptions: {
        header: null
      }
    },
    Terms: {
      screen: Terms,
      navigationOptions: {
        header: null
      }
    },
    PhoneVerification: {
      screen: PhoneVerification,
      navigationOptions: {
        header: null
      }
    },
    EmailVerification: {
      screen: EmailVerification,
      navigationOptions: {
        header: null
      }
    },
    DOB: {
      screen: DOB,
      navigationOptions: {
        header: null
      }
    },
    Pass: {
      screen: Password,
      navigationOptions: {
        header: null
      }
    },
    RegComplete: {
      screen: Complete,
      navigationOptions: {
        header: null
      }
    },
    Matching: {
      screen: Matching,
      navigationOptions: {
        header: null
      }
    },
    MatchSuccess: {
      screen: MatchSuccess,
      navigationOptions: {
        header: null
      }
    },
    InstructorList: {
      screen: InstructorList,
      navigationOptions: {
        header: null
      }
    },
    SelectSuccess: {
      screen: SelectSuccess,
      navigationOptions: {
        header: null
      }
    },
    AfterReview,
    Availability,
    Personalinfo: {
      screen: Personalinfo,
      navigationOptions: {
        header: null
      }
    },
    Preference,
    InstructorAuth,
    Lessons,
    InstProfile: {
      screen: InstProfile,
      navigationOptions: {
        header: null
      }
    },
    BookingComplete: {
      screen: Success,
      navigationOptions: {
        header: null
      }
    },
    AddStd: {
      screen: AddStdPhone,
      path: "steer.page.link/book/:user"
    },
    AddStudents,
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Calendar: {
      screen: Calendar,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Calendar"
  }
);

export default (RouterApp = createAppContainer(AppNavigator));
