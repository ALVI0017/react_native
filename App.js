import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from "react"
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { Ionicons } from 'expo-vector-icons';
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";
import { SafeAreaView } from 'react-native-web';

export const client = sanityClient({
  projectId: "hsph0fgr",
  dataset: "production",
  apiVersion: "2022-08-24",
  useCdn: true,
  token: "ska5R1eTDNP7clIfcoiU9ZhmWbF5zzmLqIKyricnrW0f2jl1j40Ei7tM65cOUzsoRrFEQKnTk2b04NKWyheh8vnMNPbTrpfRZ7hXSIFM4L4ckT5ELJDtqq3HVZBCPjFQ2hyF6bZzqFcLkM4Ls5I6dvjJgQooaYfFXJamEOEaVhr2CH8OhoPk",
});
//  for image 
const build = imageUrlBuilder(client);
// convert understandable url from sanity
export const urlFor = (source) => build.image(source);

const ImageComponent = (props) => {
  const { title, imgUrl, description } = props
  return <SafeAreaView style={{ padding: 30 }} >
    <Text>{title}</Text>
    <Image
      style={{ width: 300, height: 300 }}
      source={{
        uri: imgUrl,
      }}
    />
    <Text>{description}</Text>
  </SafeAreaView>
}

export default function App() {
  const [list, setList] = useState([])

  const testFunc = async () => {
    const query = '*[_type =="imageView"]'
    const imgView = await client.fetch(query)
    setList(imgView)
  }
  useEffect(() => {
    testFunc()
  }, [])

  return (
    <View style={styles.container}>
      {list?.map((data, key) => {
        console.log(urlFor(data?.image).url())
        return (
          <ImageComponent key={key} title={data?.title} description={data?.description} imgUrl={urlFor(data?.image).url()} />
        )
      }
      )}

      <StatusBar style="auto" />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
