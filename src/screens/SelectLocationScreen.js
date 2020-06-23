import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, KeyboardAvoidingView, Text, Keyboard } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete as AutoComplete } from "react-native-google-places-autocomplete";
// import Geocoder from "react-native-geocoding";

import Colors from '../constants/colors';
import Dimens from "../constants/dimens";
import Strings from "../constants/strings";

import GenericSubScreen from "./GenericSubScreen";
import FontText from "../components/FontText";
import TextBox from "../components/TextBox";
import RoundWhiteButton from "../components/RoundWhiteButton";

import { MAPS_API_KEY } from "react-native-dotenv";

// Geocoder.init(MAPS_API_KEY);

const regionOf = (latitude, longitude) => ({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.002
});

export default (props) => {
    const {
        locationName,
        locationAddress,
        latitudeLongitude
    } = props.values;

    const [hasPermission, setHasPermission] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    const setCurrentRegion = (latitude, longitude) => props.handleChange("latitudeLongitude")({ latitude, longitude });

    let mapViewRef = useRef(null);

    const askForPermission = async () => {
        // TODO: Handle the case when permission is not granted
        const { status } = await Location.requestPermissionsAsync();
        setHasPermission(status === "granted");
    }

    const getCurrentLocation = async () => {
        setLoadingLocation(true);

        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
        const region = regionOf(location.coords.latitude, location.coords.longitude);

        mapViewRef.current.animateToRegion(region);
        setCurrentRegion(location.coords.latitude, location.coords.longitude);
        setLoadingLocation(false);
    }

    useEffect(() => { askForPermission(); });

    return (
        <GenericSubScreen>
            <View style={styles.mapContainer}>
                <MapView
                    {...latitudeLongitude ? { initialRegion: regionOf(latitudeLongitude.latitude, latitudeLongitude.longitude) } : null}
                    ref={mapViewRef}
                    style={styles.map}
                    showsCompass={false}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    // onPanDrag={({ nativeEvent: { coordinate: { latitude, longitude } }}) => {
                    //     setCurrentRegion(latitude, longitude);
                    //     Geocoder.from(latitude, longitude).then(json => {
                    //         props.handleChange("locationName")(json.results[0].formatted_address);
                    //         props.handleChange("locationAddress")("");
                    //     });
                    // }}
                    scrollEnabled={false}
                >
                    {latitudeLongitude ? 
                        <Marker coordinate={latitudeLongitude}>
                            <MaterialIcon name="location-on" color={Colors.blue} size={Dimens.glyphSize} />
                        </Marker>
                    : null}
                </MapView>

                {/* <MaterialIcon name="location-on" color={Colors.blue} size={Dimens.glyphSize} style={{
                    position: "absolute",
                    alignSelf: "center",
                    bottom: "50%"
                }} /> */}

                {/* <View style={styles.mapOverlay}>
                    <RoundWhiteButton
                        image={
                            loadingLocation
                            ? <ActivityIndicator size={Dimens.glyphSize} color={Colors.blue} />
                            : <MaterialIcon name="my-location" color={Colors.darkBlue} size={Dimens.glyphSize} />
                        }
                        onPress={getCurrentLocation}
                    />
                </View> */}
            </View>
            
            <KeyboardAvoidingView behavior="padding" style={styles.content}>
                <FontText
                    flavor="semibold"
                    color={Colors.darkBlue}
                    size={22}
                    style={{ marginBottom: 10 }}
                >{Strings.pickYourLocation}</FontText>

                <AutoComplete
                    placeholder={Strings.searchHere}
                    placeholderTextColor={Colors.grey2}
                    multiline={false}
                    returnKeyType="search"
                    textInputProps={{
                        selectionColor: Colors.grey1
                    }}
                    suppressDefaultStyles={true}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    isRowScrollable={false}
                    styles={{
                        textInput: {
                            fontFamily: "inter-medium",
                            fontSize: Dimens.textBoxTextSize,
                            color: Colors.darkBlue,
                            backgroundColor: Colors.offGrey2,
                            paddingVertical: Dimens.textBoxPaddingVertical,
                            paddingHorizontal: Dimens.textBoxPaddingHorizontal,
                            borderRadius: Dimens.textBoxBorderRadius
                        },

                        listView: {
                            height: 200,
                            paddingTop: 10
                        },

                        separator: {
                            backgroundColor: Colors.grey3,
                            width: "100%",
                            height: 1
                        }
                    }}
                    query={{
                        key: MAPS_API_KEY,
                        language: "en"
                    }}
                    onPress={(data, details = null) => {
                        const { geometry, formatted_address, name } = details;
                        const region = regionOf(geometry.location.lat, geometry.location.lng);
                        mapViewRef.current.animateToRegion(region);

                        setCurrentRegion(geometry.location.lat, geometry.location.lng);

                        props.handleChange("locationName")(name);
                        props.handleChange("locationAddress")(formatted_address);
                    }}
                    onFail={error => console.error(error)}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    renderRow={({ structured_formatting: { main_text, secondary_text } }) => (
                        <View style={styles.locationListItem}>
                            <FontText flavor="medium" size={16} color={Colors.darkBlue}>{main_text}</FontText>
                            <FontText size={13} color={Colors.grey2}>{secondary_text}</FontText>
                        </View>
                    )}
                    // predefinedPlacesAlwaysVisible={true}
                    // predefinedPlaces={[
                    //     { "structured_formatting":  { "main_text": "Kent Ridge", "secondary_text": "Singapore" } },
                    //     { "structured_formatting":  { "main_text": "Kent Ridge", "secondary_text": "Singapore" } },
                    //     { "structured_formatting":  { "main_text": "Kent Ridge", "secondary_text": "Singapore" } },
                    //     { "structured_formatting":  { "main_text": "Kent Ridge", "secondary_text": "Singapore" } },
                    //     { "structured_formatting":  { "main_text": "Kent Ridge", "secondary_text": "Singapore" } },
                    //     { "structured_formatting":  { "main_text": "Kent Ridge", "secondary_text": "Singapore" } },
                    //     { "structured_formatting":  { "main_text": "Kent Ridge", "secondary_text": "Singapore" } },
                    //     { "structured_formatting":  { "main_text": "Kent Ridge", "secondary_text": "Singapore" } },
                    //     { "structured_formatting":  { "main_text": "Kent Ridge", "secondary_text": "Singapore" } },
                    //     { "structured_formatting":  { "main_text": "Kent Ridge", "secondary_text": "Singapore" } },
                    //     { "structured_formatting":  { "main_text": "Kent Ridge", "secondary_text": "Singapore" } },
                    //     { "structured_formatting":  { "main_text": "The End", "secondary_text": "Singapore" } },
                    // ]}
                />                
                {locationName !== "" || locationAddress !== "" ?
                    <View style={styles.selectedLocation}>
                        <MaterialIcon name="location-on" color={Colors.darkBlue} size={Dimens.glyphSize} style={{ marginRight: 10 }} />

                        <View style={{ flex: 1 }}>
                            {locationName !== "" ? 
                                <FontText
                                    flavor="semibold"
                                    color={Colors.darkBlue}
                                    size={17}
                                >{locationName}</FontText>
                            : null}

                            {locationAddress !== "" ? 
                                <FontText
                                    flavor="medium"
                                    color={Colors.darkBlue}
                                    size={14}
                                >{locationAddress}</FontText>
                            : null}
                        </View>
                    </View>
                : null}
            </KeyboardAvoidingView>
        </GenericSubScreen>
    );
}
const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    content: {
        backgroundColor: Colors.offGrey,
        minHeight: 400,
        // shadowColor: Colors.black,
        // shadowOffset: { x: 0, y: 0 },
        // shadowOpacity: 0.2,
        // shadowRadius: 20,
        // elevation: 30,
        paddingTop: 30,
        paddingBottom: 80,
        paddingHorizontal: Dimens.screenPaddingHorizontal
    },

    mapOverlay: {
        position: "absolute",
        right: 20,
        bottom: 20
    },
    
    mapContainer: {
        flex: 1
    },

    locationListItem: {
        paddingLeft: Dimens.textBoxPaddingHorizontal,
        paddingRight: Dimens.textBoxPaddingHorizontal + 70,
        paddingVertical: 10
    },

    selectedLocation: {
        flexDirection: "row",
        paddingTop: 15,
        paddingHorizontal: 10
    }
});