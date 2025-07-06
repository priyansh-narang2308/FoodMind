import CustomButton from '@/components/custom-button';
import CustomInput from '@/components/custom-input';
import { signIn } from '@/lib/appwrite';
import * as Sentry from "@sentry/react-native";

import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const onSubmit = async () => {
    const { email, password } = form;

    if (!email || !password) return Alert.alert('Error', 'Please enter valid email address & password.');

    setIsSubmitting(true)

    try {
      //TODO: To call appwrite sign in fucntion
      await signIn({ email, password });

      router.replace("/")
    } catch (error: any) {
      Alert.alert("Error", error.message)
      Sentry.captureEvent(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-[#fff7f0] px-6">
      <View className="w-full max-w-md bg-white p-6 rounded-3xl shadow-lg border border-orange-100">
        <Text className="text-3xl mt-8 font-extrabold text-orange-500 mb-6 text-center">Welcome Back 👋</Text>

        <CustomInput
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
          label="Email"
          keyboardType="email-address"
        />

        <CustomInput
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
          label="Password"
          secureTextEntry={true}
        />

        <CustomButton
          title="Sign In"
          isLoading={isSubmitting}
          onPress={onSubmit}
        />

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Don&apos;t have an account?</Text>
          <Link href="/sign-up" className="ml-1 font-semibold text-orange-500">
            Sign Up
          </Link>
        </View>
      </View>
    </View>
  )
}

export default SignIn
