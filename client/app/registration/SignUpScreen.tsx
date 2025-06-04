import React, { useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useRouter } from 'expo-router'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'

const SignUpScreen = () => {
  const router = useRouter()
  // console.log(AuthSession.makeRedirectUri())

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      '567199935764-ok5g19sj7mr4lud0pe1qmk9g90f0cq37.apps.googleusercontent.com',
    webClientId:
      '567199935764-ok5g19sj7mr4lud0pe1qmk9g90f0cq37.apps.googleusercontent.com',
    androidClientId:
      '567199935764-n8dg0v096n1caqa4r6qjkoumfsld397t.apps.googleusercontent.com',
    iosClientId:
      '567199935764-lb2eefbaqtgjv0vbgnglb8iceqp33kko.apps.googleusercontent.com'
  })

  // Handle the auth response
  useEffect(() => {
    if (response?.type === 'success') {
      // You can use response.authentication.accessToken
      Alert.alert(
        'Google Auth Success',
        JSON.stringify(response.authentication)
      )
    } else if (response?.type === 'error') {
      Alert.alert('Google Auth Error', 'Authentication failed')
    }
  }, [response])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Logo */}
        <Image
          source={require('../../assets/images/Logo.png')}
          alt='Logo'
          resizeMode='contain'
          style={styles.logo}
        />

        {/* Welcome Text */}
        <Text style={styles.title}>Welcome to BON HOTELS ! 👋🏼</Text>
        <Text style={styles.subtitle}>
          GOOD PEOPLE . GOOD THINKING . GOOD FEELING
        </Text>

        {/* Sign Up Buttons */}
        <View style={styles.buttonGroup}>
          <SocialButton
            icon='apple'
            text='Sign Up with Apple'
            onPress={() => Alert.alert('Apple Sign Up not implemented')}
          />
          <SocialButton
            icon='facebook'
            text='Sign Up with Facebook'
            color='#1877F2'
            onPress={() => Alert.alert('Facebook Sign Up not implemented')}
          />
          <SocialButton
            icon='google'
            text='Sign Up with Google'
            color='#EA4335'
            onPress={() => Alert.alert('Google Sign Up not implemented')}
            // Optionally disable if not ready:
            disabled={!promptAsync}
          />
          <SocialButton
            icon='envelope'
            text='Sign Up with Email'
            color='#333'
            onPress={() => router.push('registration/Registration')}
          />
        </View>

        {/* Divider */}
        <Text style={styles.orText}>OR</Text>

        {/* Log In Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log In to my Account</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          By continuing, you agree to BON HOTELS{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  )
}

// Accept and use the "disabled" prop
const SocialButton = ({
  icon,
  text,
  onPress,
  color = '#000',
  disabled = false
}) => (
  <TouchableOpacity
    style={[styles.socialButton, disabled && { opacity: 0.5 }]}
    onPress={onPress}
    disabled={disabled}
  >
    <Icon name={icon} size={20} color={color} style={styles.socialIcon} />
    <Text style={styles.socialText}>{text}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  innerContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: '#a63932',
    textAlign: 'center',
    marginVertical: 10
  },
  buttonGroup: {
    marginTop: 20
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10
  },
  socialIcon: {
    marginRight: 10,
    width: 24,
    textAlign: 'center'
  },
  socialText: {
    fontSize: 16,
    color: '#000'
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#aaa'
  },
  loginButton: {
    backgroundColor: '#a63932',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600'
  },
  footerText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 18
  },
  linkText: {
    color: '#a63932',
    textDecorationLine: 'underline'
  }
})

export default SignUpScreen
