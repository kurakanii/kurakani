import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Toast from "react-native-toast-message"
import Message from "@components/chat/Message"
import DrawerStack from "./DrawerStack"
import FriendRequest from "@screens/FriendRequest"
import colors from "../assets/colors"
import SuggestFriend from "@screens/SuggestFriend"
import Comment from "@components/comment"
import ViewProfile from "@components/ViewProfile"
import { useCurrentUser } from "@hooks/useCurrentUser"
import VerifyProileStack from "./VerifyProfileStack"

const Stack = createNativeStackNavigator()
const AfterAuth = () => {
    const { user } = useCurrentUser()

    if (!user.profile_pic || (!user.fullName && !user.firstName && !user.lastName)) {
        return <VerifyProileStack />
    }
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="Parent"
                    component={DrawerStack}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="MessageChat" component={Message} />
                <Stack.Screen
                    name="Friend Request"
                    component={FriendRequest}
                    options={{
                        headerTitleAlign: "center",
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: colors.primary,
                        },
                    }}
                />
                <Stack.Screen
                    name="Suggestion"
                    component={SuggestFriend}
                    options={{
                        headerTitleAlign: "center",
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: colors.primary,
                        },
                    }}
                />
                <Stack.Screen
                    name="Comment"
                    component={Comment}
                    options={{
                        headerTitleAlign: "center",
                        presentation: "modal",
                    }}
                />
                <Stack.Screen
                    name="View Profile"
                    component={ViewProfile}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
            <Toast position="top" />
        </>
    )
}

export default AfterAuth
