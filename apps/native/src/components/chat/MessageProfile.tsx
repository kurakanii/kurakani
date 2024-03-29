import { useCurrentUser } from "@hooks/useCurrentUser"
import { useNavigation } from "@react-navigation/native"
import dayjs from "dayjs"
import { getReceiver } from "../../helper/user"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { RouterOutput } from "types/user"

type MessageTypes = RouterOutput["getChats"][0]

interface MessageProfileProps {
    chat: MessageTypes
}

const MessageProfile = ({ chat }: MessageProfileProps) => {
    const navigation = useNavigation()
    const { user } = useCurrentUser()
    // @ts-ignore
    const latestMessage = chat?.latestMessage
    // @ts-ignore
    const receiver = getReceiver(chat?.users, user)

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className="border-b border-gray-200 py-3 flex-row items-center justify-between"
            onPress={() => {
                // @ts-ignore
                navigation.navigate("MessageChat", {
                    user,
                    chat,
                    receiver,
                })
            }}
        >
            <View className="flex-row items-center gap-5 justify-center">
                <Image source={{ uri: receiver.profile_pic }} className="w-16 h-16 rounded-full" />
                <View className="ml-3 leading-8">
                    <Text className="font-bold text-lg">{receiver.fullName}</Text>
                    <Text className="text-gray-800 text-md">
                        {latestMessage?.content.slice(0, 30)}
                    </Text>
                </View>
            </View>
            <Text className="text-[11px] text-gray-600 px-1 py-3">
                {dayjs(latestMessage?.createdAt).fromNow()}
            </Text>
        </TouchableOpacity>
    )
}

export default MessageProfile
