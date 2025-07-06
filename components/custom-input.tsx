import { CustomInputProps } from '@/type';
import cn from 'clsx';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomInput = ({
  placeholder = "Enter text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default"
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const shouldSecure = secureTextEntry && !showPassword;

  return (
    <View className="w-full my-4">
      <Text className={cn(
        'mb-2 ml-2 text-sm font-semibold',
        isFocused ? 'text-orange-500' : 'text-gray-700'
      )}>
        {label}
      </Text>

      <View className="relative w-full">
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={shouldSecure}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={isFocused ? "black" : "#373636"}
          className={cn(
            "w-full px-4 py-3 pr-12 text-base text-black dark:text-black rounded-2xl bg-white dark:bg-neutral-100",
            "transition-all duration-300 ease-in-out",
            isFocused ? "border-2 border-orange-200 " : "border border-gray-300"
          )}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color={isFocused ? "#ff7a00" : "#999"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default CustomInput;
