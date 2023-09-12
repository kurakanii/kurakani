module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'nativewind/babel',

            'transform-inline-environment-variables',
            [
                '@tamagui/babel-plugin',
                {
                    components: ['tamagui'],
                    config: './tamagui.config.ts',
                    logTimings: true,
                },
            ],
            'react-native-reanimated/plugin',

            [
                'module-resolver',
                {
                    alias: {
                        '@components': './src/components',
                        '@screens': './src/screens',
                        '@hooks': './src/hooks',
                        '@libs': './src/libs',
                    },
                },
            ],
        ],
    }
}
