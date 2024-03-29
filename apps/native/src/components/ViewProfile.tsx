import { Image, Text } from "react-native"
import { MapPinIcon } from "react-native-heroicons/outline"
import { useState } from "react"
import { View, useWindowDimensions } from "react-native"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import colors from "../assets/colors"
import Post from "@components/tabview/Post"
import Photos from "@components/tabview/Photos"
import Friends from "@components/tabview/Friends"
import { SafeAreaView } from "react-native-safe-area-context"

const renderTabBar = (props: any) => (
    <TabBar
        {...props}
        indicatorStyle={{
            backgroundColor: colors.primary,
        }}
        style={{
            backgroundColor: "white",
            height: 44,
        }}
        renderLabel={({ focused, route }) => (
            <Text className={`text-${focused ? "black" : "gray"} font-bold`}>{route.title}</Text>
        )}
    />
)

export default function ViewProfile({ route }) {
    const { user } = route.params
    const layout = useWindowDimensions()

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: "first", title: "Posts" },
        { key: "second", title: "Photos" },
        { key: "third", title: "Friends" },
    ])

    const renderScene = SceneMap({
        first: () => <Post user={user} />,
        second: () => <Photos user={user} />,
        third: () => <Friends user={user} />,
    })
    return (
        <>
            <SafeAreaView style={{ backgroundColor: "white" }} className="p-4">
                <View className="flex-row items-center gap-3">
                    <Image
                        source={{
                            uri: user.profile_pic,
                        }}
                        className="h-20 w-20 rounded-full"
                    />
                    <View>
                        <Text className="text-xl font-bold">{user.fullName}</Text>
                        <Text className="text-grayish">@{user.username}</Text>
                        <View className="flex-row items-center pt-[1px]">
                            <MapPinIcon size={15} color="black" />
                            <Text>{user.address}</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                animationEnabled={true}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
                style={{ backgroundColor: "white" }}
            />
        </>
    )
}
