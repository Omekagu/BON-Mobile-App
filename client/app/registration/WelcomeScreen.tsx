import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import { useRouter } from 'expo-router'

const WelcomeScreen = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600'
        }}
        style={styles.backgroundImage}
        resizeMode='cover'
      >
        <View style={styles.overlay}>
          {/* Headline */}
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>
              GOOD PEOPLE {'\n'}
              <Text style={styles.highlighted}>GOOD THNKING</Text>
              {'\n'}GOOD FEELING.
            </Text>
          </View>

          {/* Subtext */}
          <Text style={styles.subText}>
            Streamlines where{'\n'}reservations with a{'\n'}wide range hassle.
          </Text>

          {/* Start Button */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => router.push('/registration/SignUpScreen')}
          >
            <Text style={styles.startButtonText}>START</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 20
  },
  headingContainer: {
    marginTop: 40
  },
  headingText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 42
  },
  highlighted: {
    backgroundColor: '#a63932',
    color: '#fff',
    paddingHorizontal: 6
  },
  subText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
    lineHeight: 20
  },
  startButton: {
    backgroundColor: '#a63932',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 30
  },
  startButtonText: {
    color: '#fff',
    fontWeight: '600'
  }
})

export default WelcomeScreen
