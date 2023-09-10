import Constants from 'expo-constants'
const getBaseUrl = () => {
    const debuggerHost = Constants.expoConfig?.hostUri
    const localhost = debuggerHost?.split(':')[0]
    if (!localhost) {
        throw new Error(
            'Failed to get localhost. Please point to your production server.'
        )
    }
    return `http://${localhost}:9000`
}

export default getBaseUrl
