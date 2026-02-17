import { ScrollView, StyleSheet, Text, View } from 'react-native'

import Setting from '../../../components/settings/setting'
import SettingWithSwitch from '../../../components/settings/settingWithSwitch'
import UnregisterButton from '../../../components/buttons/unregisterButton'
import settings from '../../../data/settings.json'

import LanguageModal from '../../../components/modals/settings/languageModal'
import CurrencyModal from '../../../components/modals/settings/currencyModal'
import ThemeModal from '../../../components/modals/settings/themeModal'
import ExportModal from '../../../components/modals/settings/exportModal'
import WipeDataModal from '../../../components/modals/settings/wipeDataModal'
import { useState } from 'react'

const Settings = () => {
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false)
  const [showCurrencyModal, setShowCurrencyModal] = useState<boolean>(false)
  const [showThemeModal, setShowThemeModal] = useState<boolean>(false)
  const [showExportModal, setShowExportModal] = useState<boolean>(false)
  const [showWipeDataModal, setShowWipeDataModal] = useState<boolean>(false)

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.section}>
        <Setting title='Language' tooltip='Select the main language of the app' iconDir='Ionicons' leftIcon='globe-outline' color='#84BC28' showLabel label={settings.language} rightIcon='chevron-forward' setShowModal={setShowLanguageModal} />
        <LanguageModal showModal={showLanguageModal} setShowModal={setShowLanguageModal} />
        <Setting title='Currency' tooltip='Select the main currency of the app' iconDir='FontAwesome5' leftIcon='coins' color='#FBC116' showLabel label={settings.currency} rightIcon='chevron-forward' setShowModal={setShowCurrencyModal} />
        <CurrencyModal showModal={showCurrencyModal} setShowModal={setShowCurrencyModal} />
        <SettingWithSwitch title='Notifications' tooltip='Turn on or off push notifications' iconDir='Ionicons' leftIcon='notifications' color='#FB6A18' toggled={JSON.parse(settings.notification)} />
        <Setting title='Apperance' tooltip='Select the theme of the app' iconDir='Ionicons' leftIcon='moon' color='#404040' showLabel label={settings.theme} rightIcon='chevron-forward' setShowModal={setShowThemeModal} />
        <ThemeModal showModal={showThemeModal} setShowModal={setShowThemeModal} />
      </View>

      <View style={[styles.section, { marginTop: 12 }]}>
        <Setting title='Import data' tooltip='Import your lists from other devices' iconDir='FontAwesome5' leftIcon='download' color='#1375F7' rightIcon='chevron-forward' setShowModal={setShowLanguageModal} />
        <Setting title='Export data' tooltip='Export your lists from this device' iconDir='FontAwesome5' leftIcon='upload' color='#1375F7' rightIcon='chevron-forward' setShowModal={setShowExportModal} />
        <ExportModal showModal={showExportModal} setShowModal={setShowExportModal} />
        <Setting title='Wipe datas' tooltip='Delete all your lists (shared ones included)' iconDir='Ionicons' leftIcon='trash' color='#FB3D3D' rightIcon='chevron-forward' setShowModal={setShowWipeDataModal} />
        <WipeDataModal showModal={showWipeDataModal} setShowModal={setShowWipeDataModal} />
      </View>

      <View style={[styles.section, { marginTop: 12 }]}>
        <Setting title='Contact' tooltip='Contact us if there is any problem' iconDir='Ionicons' leftIcon='mail' color='#B8BFCB' rightIcon='chevron-forward' setShowModal={setShowLanguageModal} />
        <Setting title='Feedback' tooltip='Give us feedback or bug report' iconDir='Ionicons' leftIcon='chatbox' color='#B8BFCB' rightIcon='chevron-forward' setShowModal={setShowLanguageModal} />
      </View>

      <View style={[styles.section, { marginVertical: 12 }]}>
        <UnregisterButton />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    color: '#363636',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 100,
    paddingBottom: 55,
  },
  section: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
  },
})

export default Settings