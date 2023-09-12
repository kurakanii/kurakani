import { View, Text, Image } from 'react-native'
import {
    ChatBubbleOvalLeftIcon,
    EllipsisHorizontalIcon,
    HeartIcon,
} from 'react-native-heroicons/solid'
import colors from '../assets/colors'
import { useState } from 'react'
import { faker } from '@faker-js/faker'
import { Sheet } from 'tamagui'
interface PostProps {
    contentType: string
    description?: string
    imageUrl?: string
    name: string
    avatar: string
}

const CommentBox = () => {
    return (
        <Sheet>
            <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
            />
        </Sheet>
    )
}
export default function Post({
    contentType,
    description,
    imageUrl,
    name,
    avatar,
}: PostProps) {
    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState(10)
    const [commentModal, setCommentModal] = useState<boolean>(false)
    return (
        <>
            <View className="bg-gray-200 rounded-lg overflow-hidden shadow-xl p-4 my-3">
                {/* // Profile */}
                <View className="flex-row justify-between">
                    <View className="flex-row items-center gap-2">
                        <Image
                            source={{
                                uri: avatar,
                            }}
                            className="w-10 h-10 rounded-full "
                            alt="Profile Image"
                        />
                        <View>
                            <Text className="font-bold">{name}</Text>
                            <Text className="text-xs text-gray">
                                4 mins ago
                            </Text>
                        </View>
                    </View>
                    <EllipsisHorizontalIcon
                        color={colors.gray}
                        onPress={() => console.log('helo')}
                    />
                </View>
                {/* // Profile Description */}
                <View className="my-4">
                    {contentType === 'image' ? (
                        <Image
                            source={{
                                uri: imageUrl,
                            }}
                            className="w-full h-96 mb-3 rounded-md object-contain"
                            alt="SOmething"
                        />
                    ) : null}
                    {description ? (
                        <Text className="leading-5">{description}</Text>
                    ) : null}
                </View>
                {/* //Likes */}
                <View className="flex-row items-center gap-12">
                    <View className="relative">
                        {Array.from(Array(3)).map((_, index) => (
                            <Image
                                key={`image-${index}`}
                                source={{
                                    uri: faker.image.avatarLegacy(),
                                }}
                                className={`w-7 h-7 rounded-full 
                            left-${index * 4} 
                            ${index > 0 && 'absolute'}`}
                                alt="Profile Image"
                            />
                        ))}
                    </View>
                    <Text className="text-xs text-gray font-medium">
                        {faker.person.firstName()} and other likes it
                    </Text>
                </View>
                <View className="flex-row mt-5 justify-start items-center gap-3">
                    <View className="flex-row gap-3 items-center">
                        <HeartIcon
                            size={35}
                            color={like ? colors.primary : colors.grayLight}
                            onPress={() => {
                                setLike(prev => !prev)
                                setLikeCount(prev => prev + 1)
                            }}
                            className="text-grayish"
                        />
                        <Text className="text-bold">{likeCount} likes</Text>
                    </View>
                    <View className="flex-row gap-3 items-center">
                        <ChatBubbleOvalLeftIcon
                            size={35}
                            onPress={() => {
                                console.log('hello there')
                                setCommentModal(true)
                            }}
                            color={like ? colors.primary : colors.grayLight}
                        />
                        <Text className="text-bold">{likeCount} comments</Text>
                    </View>
                </View>
            </View>
            {commentModal ? <CommentBox /> : null}
        </>
    )
}
