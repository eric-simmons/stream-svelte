import { writable } from 'svelte/store'

const defaultSettings = {
    colorScheme: "dark",
    language: 'en',
    fontSize: 12
}


//spreading default settings to create copy so that im not updating original default settings
function createSettingsStore() {
    const { subscribe, set, update } = writable({...defaultSettings})
    return {
        subscribe, set, update, 
        updateSetting: (setting, value) => {
            update((settings) => ({ ...settings, [setting]: value }))
        },
        toggleColorScheme: () => {
            update((settings) => ({
                ...settings,
                colorScheme: settings.colorScheme === ' dark' ? 'light' : 'dark'
            }))
        },
        reset: () => {
            set(defaultSettings)
        }
    }
}
export default createSettingsStore()