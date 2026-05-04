import { StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useRef, useContext } from 'react'
import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Colors } from '../../../constants/colors'
import { AuthContext } from '../../../utils/authContext';
import { fetchChatResponse, Message } from '../../../utils/handlePrompt'

const AI = () => {
  const authContext = useContext(AuthContext)
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme ?? 'light']

  const [prompt, setPrompt] = useState('');
  const [quickContent, setQuickContent] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    const currentPrompt = quickContent || prompt.trim();
    if (currentPrompt.trim().length === 0 || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentPrompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setQuickContent('');
    setLoading(true);

    try {
      const aiResponseText = await fetchChatResponse(messages, currentPrompt);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: aiResponseText,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      alert("Hiba történt: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView 
        //@ts-ignore
        behavior={Platform.OS === 'ios' ? 'padding' : 'height + 20'} 
        style={{ flex: 1 }}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="menu" size={24} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => setMessages([])}>
            <Feather name="edit" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {messages.length === 0 ? (
          <View style={{ flex: 1 }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Hello {authContext.user?.name?.split(' ').slice(-1)[0]}</Text>
              <Text style={styles.subtitle}>How can I assist you today?</Text>
            </View>
            <View style={styles.quickContainer}>
              <TouchableOpacity 
                style={[styles.quickButton, { borderColor: theme.itemInputBorder }]}
                onPress={() => { setQuickContent("You are a productivity assistant that generates structured shopping lists based on previous shoppings."); handleSend(); }}  
              >
                <MaterialCommunityIcons name="playlist-plus" size={20} color="#A4793E" />
                <Text style={styles.quickText}>Generate List</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.quickButton, { borderColor: theme.itemInputBorder }]}
                onPress={() => { setQuickContent(
                  `You are a creative idea generator, who askes the user what are they planning. 
                  1. Are they interested in new recipes
                  2. Are they interested in recipes based on previously purchased items`
                ); handleSend(); }}
              >
                <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="#B7B069" />
                <Text style={styles.quickText}>Give Idea</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.quickButton, { borderColor: theme.itemInputBorder }]}
                onPress={() => { setQuickContent("You are a financial advisor helping the user making better decisions about purchases based on previous shoppings."); handleSend(); }}  
              >
                <MaterialCommunityIcons name="cash-multiple" size={20} color="#009951" />
                <Text style={styles.quickText}>Finance</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            renderItem={({ item }) => (
              <View style={[
                styles.messageBubble,
                item.role === 'user' ? [styles.userBubble, { backgroundColor: theme.aiInput }] : styles.aiBubble
              ]}>
                <Text style={[styles.messageText, { color: theme.text }]}>
                  {item.content}
                </Text>
              </View>
            )}
          />
        )}

        {loading && <ActivityIndicator color="#007AFF" style={{ marginBottom: 10 }} />}

        <View style={styles.inputContainer}>
          <TextInput 
            value={prompt}
            onChangeText={setPrompt}
            style={[styles.textinput, { backgroundColor: theme.itemInput, borderColor: theme.itemInputBorder }]}
            placeholder='Ask me anything...'
            placeholderTextColor={'#959DB1'}
            multiline
          />
          {prompt.length > 0 && (
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Feather name="arrow-up" size={24} color="#E6E6E6" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AI

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    backgroundColor: '#7676801f',
    padding: 10,
    borderRadius: 999,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 200,
  },
  title: {
    color: '#A099C7',
    fontSize: 36,
    fontFamily: 'InconsolataBold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    color: '#959DB1',
    fontSize: 20,
    fontFamily: 'InconsolataRegular',
    textAlign: 'center',
  },
  quickContainer: {
    marginTop: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  quickText: {
    color: '#91949C',
    fontSize: 12,
    marginLeft: 5,
  },
  chatList: { 
    paddingVertical: 20 
  },
  messageBubble: { 
    padding: 15, 
    borderRadius: 20, 
    marginBottom: 12, 
    maxWidth: '85%' 
  },
  userBubble: { 
    alignSelf: 'flex-end',  
    borderBottomRightRadius: 2 
  },
  aiBubble: { 
    alignSelf: 'flex-start', 
    borderBottomLeftRadius: 2, 
    borderWidth: 1, 
    borderColor: '#76768033' 
  },
  messageText: { 
    fontSize: 16, 
    lineHeight: 22 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 10,
  },
  textinput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 2,
    borderRadius: 20,
    maxHeight: 150,
    color: '#959DB1',
    fontSize: 16,
  },
  sendButton: {
    width: 50,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 999,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
})