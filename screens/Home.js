import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header, AirbnbRating, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import WebView from "react-native-webview";
import axios from "axios";

export default class HomeScreen extends Component{
  constructor(){
    super();
    this.state = {
      articleDetails : {}
    }
  }
  componentDidMount(){
    this.getArticle();
  }
  getArticle = () => {
    const url = "http://localhost:5000/get-article";
    axios
      .get(url)
      .then(response => {
        let details = response.data.data;
        this.setState({ articleDetails: details });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  likedArticle = () => {
    const url = "http://localhost:5000/liked-article";
    axios
      .post(url)
      .then(response => {
        this.getArticle();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  dislikedArticle = () => {
    const url = "http://localhost:5000/unliked-article";
    axios
      .post(url)
      .then(response => {
        this.getArticle();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  render() {
    const { articleDetails } = this.state;
    if (articleDetails.url) {
      const { url } = articleDetails.url;
      console.log(url)

      return (
        <SafeAreaProvider>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Header
              centerComponent={{
                text: "Recommended",
                style: styles.headerTitle
              }}
              rightComponent={{
                icon: "search",
                color: "#fff",
                onPress: () =>
                  this.props.navigation.navigate("RecommendedArticles")
              }}
              backgroundColor={"#5DADE2"}
              containerStyle={{ flex: 1 }}
            />
          </View>
          <View style={styles.upperContainer}>
            <WebView 
              source={{ uri: url }} 
              style={styles.webview}/>
          </View>
          <View style={styles.lowerContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.likedArticle}>
                <Icon
                  reverse
                  name={"check"}
                  type={"entypo"}
                  size={RFValue(30)}
                  color={"#2ECC71"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.unlikedArticle}>
                <Icon
                  reverse
                  name={"cross"}
                  type={"entypo"}
                  size={RFValue(30)}
                  color={"#E74C3C"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </SafeAreaProvider>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 0.1
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(25)
  },
  upperContainer: {
    flex: 0.75
  },
  lowerContainer: {
    flex: 0.15
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  webview:{
    flex: 1,
    marginTop: 20,
    maxHeight: 200,
    width: 320,
  }
});