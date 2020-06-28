# BloodConnect
[![CircleCI](https://circleci.com/gh/bloodwork-nus/bloodconnect.svg?style=svg)](https://circleci.com/gh/bloodwork-nus/bloodconnect)
[![React-Native](https://img.shields.io/badge/react--native-v0.61.4-blue?logo=react)](https://reactnative.dev)
[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/@purfectliterature/bloodconnect)

BloodConnect is a platform aiming to connect blood donors and donees.
> BloodConnect is a project for **[NUS Orbital 2020](https://orbital.comp.nus.edu.sg)** started by team [Bloodwork](https://github.com/bloodwork-nus). This project is being proposed for the highest achievement level, **Artemis**.

### Building and Developing
1. Clone the repository by invoking `$ git clone https://github.com/bloodwork-nus/bloodconnect.git`.
2. BloodConnect uses [Yarn](https://yarnpkg.com), so install all the dependencies by invoking `$ yarn install`.
3. BloodConnect is powered by [Firebase](https://firebase.google.com), [Google Maps SDK for Android](https://developers.google.com/maps/documentation/android-sdk/get-api-key), [Google Places API](https://developers.google.com/places/web-service/get-api-key), and [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/get-api-key). So, create Firebase and Google API projects, obtain your API keys, and create a `.env` file in the root project directory and structure it as follows:
```bash
API_KEY=<Your Firebase public API key>
PROJECT_ID=<Your Firebase project ID>
MAPS_API_KEY=<Your Google API key>
```
>This format is tentative and will always be updated if BloodConnect's code base changes. Remember to enable Realtime Database and Authentication on your [Firebase console](https://console.firebase.google.com/) and Maps SDK for Android, Places API, and Geocoding API on your [Google API console](https://console.developers.google.com/google/maps-apis/api-list).

>Kindly note that the API key in `android.package.config.googleMaps.apiKey` found in `app.json` is just a placeholder and is no longer functional.

4. If you want to **start the development environment**, simply invoke `$ yarn start`. **Ensure** that you have [`expo-cli`](https://github.com/expo/expo-cli) installed globally. If not, invoke `npm i -g expo-cli` or `yarn global add expo-cli`. An instance of Metro Bundler should start. You can use an iOS/Android device or simulators. Expo Client will automatically be installed by Expo CLI.
5. If you want to **build**, install [`turtle-cli`](https://github.com/expo/turtle) on a **Linux/Unix-based machine** (e.g. Linux, macOS, or Windows Subsystem for Linux). Simply invoke `npm i -g turtle-cli`. **Do not use Yarn**.
6. If you are building for Android, remember to install [JDK 8](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html). Then, follow the remaining two steps [found here](https://github.com/purfectliterature/expect#instructions) (links to Phillmont's build tool).
7. If you are building for iOS, you need to build on macOS. After installing Turtle CLI, invoke `$ turtle setup:ios --sdk-version 37.0.3` to setup your machine for building. Then, follow the remaining steps [found here](https://docs.expo.io/distribution/turtle-cli/?redirected#building-for-ios) (links to Expo's official documentation).

### Watch out
BloodConnect is going to upgrade to Expo SDK 38 and React Native 0.62 soon!
