import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'
import Navigation from './Navigation'
import getBaseUrl from './helper/url'
import { trpc } from './libs/trpc'
import { TamaguiProvider } from 'tamagui'
import config from '../tamagui.config'
import { useFonts } from 'expo-font'

export default function App() {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [httpBatchLink({ url: `${getBaseUrl()}/trpc` })],
            transformer: null,
        })
    )

    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    })

    if (!loaded) {
        console.log('font still not loading')
    }

    return (
        <TamaguiProvider config={config}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                    <Navigation />
                </QueryClientProvider>
            </trpc.Provider>
        </TamaguiProvider>
    )
}
