import { images } from '@/constants';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const CartButton = () => {
    const totalItems = 10;

    return (
        <TouchableOpacity
            onPress={() => { }}
            activeOpacity={0.8}
            className="relative w-12 h-12 rounded-full bg-black justify-center items-center shadow-md"
        >
            <Image
                source={images.bag}
                className="w-6 h-6"
                resizeMode="contain"
                tintColor="#fff" 
            />

            {totalItems > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-500 rounded-full px-1.5 min-w-5 h-5 justify-center items-center">
                    <Text className="text-xs font-bold text-white">{totalItems}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default CartButton;
