import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'

type verifyModalProps = {
  email: string
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

const verifyModal = ({ email, showModal, setShowModal }: verifyModalProps) => {
  const inputs = useRef<TextInput[]>([])
  const [code, setCode] = useState<string[]>(Array(5).fill(''))

  const onClose = () => {
    setShowModal(false)
    setCode(Array(5).fill(''))
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={showModal}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Image style={styles.image} source={require("../../assets/images/verify.png")} />
          <Text style={styles.title}>Verify your account</Text>
          <Text style={styles.message}>Enter 5 digits verification code we have sent to.</Text>
          <Text style={styles.email}>{email ? email : "example@gmail.com"}</Text>

          {/* CODE INPUTS ... */}
          <View style={styles.codeWrapper}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputs.current[index] = ref
                }}
                style={styles.codeInput}
                value={digit}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                onChangeText={(text) => {
                  const newCode = [...code]
                  newCode[index] = text
                  setCode(newCode)

                  if (text && index < 5 - 1) {
                    inputs.current[index + 1]?.focus()
                  }
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    if (code[index] === "" && index > 0) {
                      inputs.current[index - 1]?.focus()
                    }

                    const newCode = [...code]
                    newCode[index] = ""
                    setCode(newCode)
                  }
                }}
                placeholder='×'
                placeholderTextColor={'#d6d6d6'}
              />
            ))}
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={[styles.button, styles.verifyButton]} 
              onPress={() => {
                const verificationCode = code.join("")
                console.log(verificationCode)
              }}>
              <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.biometricButton]}>
              <Ionicons name={'finger-print'} size={24} color={'#363636'}  />
              <Text style={styles.biometricText}>Biometric Verification</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default verifyModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    elevation: 5,
    width: '90%',
    height: 'auto',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  title: {
    color: '#363636',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  message: {
    color: '#989CA9',
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  email: {
    color: '#363636',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  codeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
  },
  codeInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: "#F2F2F7",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  codeInputFocused: {
    borderColor: "#BBBBBE",
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100%',
    maxHeight: 50,
    borderRadius: 999,
    marginBottom: 15,
  },
  verifyButton: {
    backgroundColor: '#2164E7',
  },
  verifyText: {
    color: '#FAFAFA',
    fontSize: 16,
  },
  biometricButton: {
    borderColor: '#F2F2F7',
    borderWidth: 1,
  },
  biometricText: {
    color: '#363636',
    fontSize: 16,
    marginLeft: 5,
  },
})