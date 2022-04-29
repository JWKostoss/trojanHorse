import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { PageContext } from "../context";
import FloatingButtonf from '../components/FloatingButtonf';
import { render } from "react-dom";

let initialRender = true;
const HomeScreen = () => {
  // These variables can be considered 'global' to any file that is under the context provider in the root file
  const { fire, authen, lists, refreshs, vitals, pointss, headers } =
    React.useContext(PageContext);
  const [authID, setAuthID] = authen;
  const [refresh, setRefresh] = refreshs;
  const [vitalsigns, setVitalsigns] = vitals;
  const [points, setPoints] = pointss;
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [header, setHeader] = headers;

  // Sets the authID useState to the user ID from firebase, this then allows the useEffect in App.js to trigger
  // and retieve the lists and user points
  useEffect(() => {
    setAuthID(fire.userID);
  }, []);

  // This useEffect triggers when the useState 'lists' changes, when it changes the loading state to false
  // so that the activity indicator is disabled and shows the content of the screen when loaded
  useEffect(() => {
    if (initialRender) {
      initialRender = false;
    } else {
      setLoading(false);
    }
  }, [lists]);

  const handleSignOut = () => {
    fire.detach();
    fire.auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={[styles.container,{bottom:230}]}>
      {/* functional homescreen button call */}
      <View style={styles.container}>
        <FloatingButtonf />
      </View>

      <View>
        <TouchableOpacity
          onPress={handleSignOut}
          style={[styles.button, {top:200}]}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
