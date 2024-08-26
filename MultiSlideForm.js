import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const MultiSlideForm = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Slide {currentSlide + 1}</Text>

      {currentSlide === 0 && (
        <View style={styles.slide}>
          <TextInput style={styles.input} placeholder="Input 1" />
          <TextInput style={styles.input} placeholder="Input 2" />
          <TextInput style={styles.input} placeholder="Input 3" />
          <TextInput style={styles.input} placeholder="Input 4" />
          <Button title="Next" onPress={goToNextSlide} />
        </View>
      )}

      {currentSlide === 1 && (
        <View style={styles.slide}>
          <TextInput style={styles.input} placeholder="Input 5" />
          <TextInput style={styles.input} placeholder="Input 6" />
          <View style={styles.buttonContainer}>
            <Button title="Back" onPress={goToPreviousSlide} />
            <Button title="Next" onPress={goToNextSlide} />
          </View>
        </View>
      )}

      {currentSlide === 2 && (
        <View style={styles.slide}>
          <TextInput style={styles.input} placeholder="Input 7" />
          <TextInput style={styles.input} placeholder="Input 8" />
          <TextInput style={styles.input} placeholder="Input 9" />
          <View style={styles.buttonContainer}>
            <Button title="Back" onPress={goToPreviousSlide} />
            <Button title="Next" onPress={goToNextSlide} />
          </View>
        </View>
      )}

      {currentSlide === 3 && (
        <View style={styles.slide}>
          <TextInput style={styles.input} placeholder="Input 10" />
          <TextInput style={styles.input} placeholder="Input 11" />
          <TextInput style={styles.input} placeholder="Input 12" />
          <View style={styles.buttonContainer}>
            <Button title="Back" onPress={goToPreviousSlide} />
            <Button title="Submit" onPress={() => console.log('Form submitted!')} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default MultiSlideForm;
