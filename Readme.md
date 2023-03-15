# Area-Mapper

A React Native App that enables the respondents to place markers of the a shape of their compounds, then computes and displays the area of the marked shape. Based in react-native-maps library

## Running the application

Pull this repository then install the necessary dependencies by running the **npm install** command in the project dir. 
The command will read the package.json file in the root of the project and install all the required packages and their dependencies.

## About the application

This is a basic app that enabes the user to mark an area of a compound on the the map provided and that they can compute the erea of the of the marked compund in square meters.

### Features of the app

#### Respondent Register. 
The user is asked to register the first time they access the app. The data that is required includes;
1. Do you consent to be registered on our program? -(Bolean, required) if true, the user registers continues to 2,3,4,5,6, and then 7. Else, the user continues to home to start mapping the compound. 
2. Registration date -(Date, required). This is auto generated using the JavaScript Date Function when the function to submit data is invoked submit.
3. Respondent Name -(String/Free Text, required). This is picked from the user input and validated on submit.
4. Respondent picture (Image, required). This is picked either by uploading the the image file from the phone storage or by taking a photo using the phone camera. The user is requested to allow the app to use the camera. The API used to achieve this is [Expo ImagePicker](https://docs.expo.dev/versions/v48.0.0/sdk/imagepicker/) 
5. Respondent Location. (Geo-Location, required). The user is asked to allow the app access the location using [Expo Location](https://docs.expo.dev/versions/v48.0.0/sdk/location/). The devive geo-location is picked if the user grants permission. GPS is set to save the coordinates when accuracy is less or equal to 10 m
6. Respondent compound shape and size. (Area-Mapping, required). The user is able to mark the compound and the compute its area. The user places Markers of the a shape of the compound then they compute and display the area of the marked shape. [react-native-maps](https://github.com/react-native-maps/react-native-maps) libray is used to display the map and [Turf](https://turfjs.org/docs/#setup) libray used to compute the area using its ```turf.area(polygon);``` Function

### Data storage
Data is stored on the phone storage using the [AsyncStorage API](https://react-native-async-storage.github.io/async-storage/docs/usage/) 
