### Getting Started

> This project uses [`react-native-firebase`](https://github.com/invertase/react-native-firebase) and [`use-global-hook`](https://github.com/andregardi/use-global-hook) packages as a core requirement. The entire project is architected on [`React Hooks`](https://reactjs.org/docs/hooks-intro.html). The below integrations are only done for Android. Please follow the guidelines below for integration of the libraries used in the project to iOS.

#### 1) Clone & Install Dependencies

- 1.3) Install NPM packages with your package manager of choice - i.e run `yarn` or `npm install`
- 1.4) **[iOS]** `cd ios` and run `pod install` - if you don't have CocoaPods you can follow [these instructions](https://guides.cocoapods.org/using/getting-started.html#getting-started) to install it.
- 1.5) **[Android]** No additional steps for android here.

#### 2) Rename Project

**You will need to be running Node version 7.6 or greater for the rename functionality to work**

- 2.0) **[iOS]** `cd ..` to return to the root directory of the project
- 2.1) `npm run rename` - you'll be prompted to enter a project name and company name
- 2.2) Note down the package name value - you'll need this when setting up your Firebase project

#### 3) Add `Google Services` files (plist & JSON) [Added for android]

- 3.1) **[iOS]** Follow the `add firebase to your app` instructions [here](https://firebase.google.com/docs/ios/setup#add_firebase_to_your_app) to generate your `GoogleService-Info.plist` file if you haven't done so already - use the package name generated previously as your `iOS bundle ID`.
- 3.2) **[iOS]** Place this file in the `ios/` directory of your project.
  - Once added to the directory, add the file to your Xcode project using 'File > Add Files to "[YOUR APP NAME]"…' and selecting the plist file.
- 3.3) **[Android]** Follow the `manually add firebase` to your app instructions [here](https://firebase.google.com/docs/android/setup#manually_add_firebase) to generate your `google-services.json` file if you haven't done so already - use the package name generated previously as your `Android package name`.
- 3.4) **[Android]** Place this file in the `android/app/` directory of your project.

#### 4) Start your app

- 4.1) Start the react native packager, run `yarn run start` or `npm start` from the root of your project.
- 4.2) **[iOS]** Build and run the iOS app, run `npm run ios` or `yarn run ios` from the root of your project. The first build will take some time. This will automatically start up a simulator also for you on a successful build if one wasn't already started.
- 4.3) **[Android]** If you haven't already got an android device attached/emulator running then you'll need to get one running (make sure the emulator is with Google Play / APIs). When ready run `npm run android` or `yarn run android` from the root of your project.

## Linking dependencies

> The app uses the below listed libraries which have to be linked for iOS [already integrated with Android]

#### [`react-native-image-picker`](https://github.com/react-native-community/react-native-image-picker)

- Used for choosing images from the phone storage **[ iOS integration required ]**

#### [`native-base`](https://docs.nativebase.io/docs/GetStarted.html)

- UI framework used for the whole App

#### [`react-navigation`](https://github.com/react-navigation/react-navigation)

- App navigation, route handling and deep linking **[ iOS integration required ]**

#### [`react-navigation-hooks`](https://github.com/react-navigation/hooks)

- Navigation hooks provided by React navigation for easy navigation

#### [`react-native-splash-screen`](https://github.com/crazycodeboy/react-native-splash-screen)

- Splash Screen **[ iOS integration required ]**

#### [`react-native-circular-progress`](https://github.com/bartgryszko/react-native-circular-progress)

- Circular progress bar used in for many components.

#### [`react-native-fbsdk`](https://github.com/facebook/react-native-fbsdk)

- Facebook SDK for facebook login **[ iOS integration required ]**

## App features

This app serves two kinds of usecases : For students and instructors

#### Functionalities for students :

> Students can register through the app and can book a lesson with an instructor that is matched with them through a series of questions. They can track their progress, and also take in mock tests for the exam. A student can only book 1 session at a time. The app runs on a credit system, in which the user can buy credits and then use then to book sessions. However the first lesson will be free and after each lesson, the student will be asked to provide a rating about the instructor. If they are not satisfied with the lesson, they will be given back the credit for that lesson.

- Authentication
  - Mobile verification and auth using firebase
  - Facebook Login **[Alternate auth method]**
  - Email registraion & verification using OTP
  - User details
- Home page
  - Upcomming sessions
  - Progress tracking with badges
- Booking lessons
  - User will have to select a series of images to find a matching instructor
  - Intructor selection from the matched list of instructors happens in a similar way to tinder
  - On selection of instrcutor, there is an availability screen which displays the instructor's available time slots.
- Credits
  - First lesson is free for the user
  - For further lessons, the user will have to buy credits through the app which in turn can be used to book lessons
- Review
  - After every lesson, the user is supposed to rate the lesson
  - If the user is not satisfied, then the credits are reinstated.

#### Functionalities for instructors :

> Instructors can register through the app and create a profile. They can set their available time slots for each day. They have the provision to add their exisiting students to the app and those students will have unlimited credits and can only book lessons from the instructor that onboarded them.

- Authentication
  - Email login
  - Mobile verification
  - User details also includes documents like Bank Statement, License, ID etc.
- Profile
  - Instructor can set their availability for each day and also provide a description.
- Review
  - Every Instructor starts from a base rating of 4.5 . It changes based on the reviews given by the students
- Onboarding students
  - Students who are already enrolled with the instructor can be onboarded into the app with unlimited credits and those students can only book lessons from the instrutor that onboarded them.
  - The instructor can share a unique link to the students through Whatsapp and onboard them to the app.

## Architecture

The app is purely architected with React Hooks. So all the components are functional. And the global state mangement is implemented in a minimum and effective way. Global state mangement has been implemented in almost a similar pattern to redux. You can find the global states and actions associated with it in `src/GlobalHooks`. Each file contains an associated group of actions and it's individual states.

You can access the state from any component by calling `useGlobal()` from `src/GlobalHooks`. It works with array destructuring and returns two objects: state and actions. `const [state,actions] = useGlobal()`. You can access the global state variables through the `state` object and actions through `actions` object

## Navigation

The app uses `react-navigation` for in-app navigation and deeplinking. Also, `react-navigation` provides it's own hooks for easier access to navigation from stateless components. You can use it this way

> `const {navigate} = useNavigation()`\
> You can use this navigation object to navigate to anywhere in the app \
> `navigate('routeName')`
