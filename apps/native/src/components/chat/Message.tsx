import Loading from "@components/Loading"
import socket from "@libs/socket"
import { trpc } from "@libs/trpc"
import React, { useState, useCallback, useEffect, useLayoutEffect } from "react"
import { GiftedChat } from "react-native-gifted-chat"

export function Message({ navigation, route }) {
    // const utils = trpc.useContext()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.sender.username,
        })
    })
    const [messages, setMessages] = useState([])
    const chatId = route.params.chatId
    const user = route.params.user
    const { isLoading, data } = trpc.allMessage.useQuery(chatId)
    const { mutate: sendMessageMutate } = trpc.sendMessage.useMutation()
    useEffect(() => {
        socket.emit("join chat", chatId)
    }, [])

    useEffect(() => {
        socket.on("message received", (messages) => {
            sendMessageMutate({
                content: messages[0].text,
                chat_id: chatId,
            })
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        })

        return () => {
            socket.off("message received")
        }
    }, [])

    useEffect(() => {
        if (!data) {
            return
        }
        setMessages(data)
    }, [data])

    const onSend = useCallback((messages = []) => {
        socket.emit("send message", { messages: messages, chatId })
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: user._id.toString(),
            }}
        />
    )
}

export default Message
