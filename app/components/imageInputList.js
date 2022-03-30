import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const imageInputList = () => {
  //   const [imageUri, setImageUri] = useState(null);
  const [imageUriArr, setImageUriArr] = useState([]);
  console.log(setImageUri);
  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUriArr.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput
                // imageUri={imageUri}
                // setImageUri={setImageUri}
                imageUriArr={imageUriArr}
                setImageUriArr={setImageUriArr}
                // onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}

          {/* <ImageInput onChangeImage={(uri) => onAddImage(uri)} /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default imageInputList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});
