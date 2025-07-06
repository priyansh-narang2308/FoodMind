import { CustomButtonProps } from "@/type";
import cn from "clsx";
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({
  onPress,
  title = "Click Me",
  className,
  style,
  textStyle,
  leftIcon,
  isLoading = false
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      disabled={isLoading}
      className={cn(
        "w-full flex-row items-center justify-center py-3 px-5 rounded-full bg-orange-500",
        isLoading && "opacity-60",
        className
      )}
    >
      {leftIcon && <View className="mr-2">{leftIcon}</View>}

      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className={cn("text-white text-base font-bold tracking-wide", textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton;