import { ScrollView, StyleSheet, Text, View } from 'react-native'

import SettingsTextInput from '../../../components/inputField/settings-textinput'
import Hr from '../../../components/horizontalRules/hr'
import settings from '../../../data/settings.json'

const Settings = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.section}>
        <SettingsTextInput title='Language' iconDir='Ionicons' leftIcon='language-outline' color='#84BC28' showLabel label={settings.language} rightIcon='chevron-forward' />
        <Hr color='#EDEDED' width={1} length={'86%'} top={8} bottom={8} align='flex-end' />
        <SettingsTextInput title='Currency' iconDir='FontAwesome5' leftIcon='coins' color='#FBC116' showLabel label={settings.currency} rightIcon='chevron-forward' />
        <Hr color='#EDEDED' width={1} length={'86%'} top={8} bottom={8} align='flex-end' />
        <SettingsTextInput title='Notification' iconDir='Ionicons' leftIcon='notifications' color='#FB6A18' toggled={JSON.parse(settings.notification)} />
        <Hr color='#EDEDED' width={1} length={'86%'} top={8} bottom={8} align='flex-end' />
        <SettingsTextInput title='Dark mode' iconDir='Ionicons' leftIcon='moon' color='#404040' toggled={JSON.parse(settings.darkmode)} />
      </View>

      <View style={[styles.section, { marginTop: 12 }]}>
        <SettingsTextInput title='Import data' iconDir='FontAwesome5' leftIcon='download' color='#1375F7' rightIcon='chevron-forward' />
        <Hr color='#EDEDED' width={1} length={'86%'} top={8} bottom={8} align='flex-end' />
        <SettingsTextInput title='Export data' iconDir='FontAwesome5' leftIcon='upload' color='#1375F7' rightIcon='chevron-forward' />
        <Hr color='#EDEDED' width={1} length={'86%'} top={8} bottom={8} align='flex-end' />
        <SettingsTextInput title='Wipe datas' iconDir='Ionicons' leftIcon='trash' color='#FB3D3D' rightIcon='chevron-forward' />
      </View>

      <View style={[styles.section, { marginTop: 12 }]}>
        <SettingsTextInput title='Contact' iconDir='Ionicons' leftIcon='mail' color='#B8BFCB' rightIcon='chevron-forward' />
        <Hr color='#EDEDED' width={1} length={'86%'} top={8} bottom={8} align='flex-end' />
        <SettingsTextInput title='Feedback' iconDir='Ionicons' leftIcon='chatbox' color='#B8BFCB' rightIcon='chevron-forward' />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 100,
    paddingBottom: 50,
  },
  section: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
  },
})

export default Settings