import Box from '@components/Box'
import { useNavigation } from '@react-navigation/native'
import colors from 'assets/colors'
import { Text, View } from 'react-native'
import { Button } from 'tamagui'
export default function Profile() {
    const navigation = useNavigation()
    return (
        <Box>
            <View className="flex justify-center text-center m-2">
                <Text className="text-2xl font-bold ">Welcome!</Text>
                <Text>Sign in or create a new account</Text>

                <Button
                    className="w-full mt-3"
                    onPress={() => {
                        navigation.navigate('register')
                    }}
                >
                    Go to Sign In
                </Button>
            </View>
        </Box>
    )
}
