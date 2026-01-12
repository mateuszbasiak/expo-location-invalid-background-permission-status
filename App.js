import { Alert, Button, View } from "react-native";
import * as Location from "expo-location";

const getBackgroundLocationPermissionsStatus = async () => {
  try {
    return (await Location.getBackgroundPermissionsAsync()).status;
  } catch (e) {
    console.error(e);
  }
};
const onPress = async () => {
  const backgroundLocationPermissionsStatus =
    await getBackgroundLocationPermissionsStatus();

  console.log(
    "backgroundLocationPermissionsStatus",
    backgroundLocationPermissionsStatus
  );

  if (backgroundLocationPermissionsStatus === "denied") {
    Alert.alert(
      "Background location permissions are denied. Please enable them in the settings."
    );
  } else if (backgroundLocationPermissionsStatus !== "granted") {
    void Location.requestForegroundPermissionsAsync().then(() => {
      void Location.requestBackgroundPermissionsAsync();
    });
  }
};

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Request location permissions" onPress={onPress} />
    </View>
  );
}
