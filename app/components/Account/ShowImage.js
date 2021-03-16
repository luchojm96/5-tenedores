import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';

export default function ShowImage(props) {
  const { photoURL } = props;

  return (
    <View>
      <Image
        style={styles.img}
        source={
          photoURL
            ? { uri: photoURL }
            : require('../../../assets/img/avatar-default.jpg')
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 300,
  },
});
