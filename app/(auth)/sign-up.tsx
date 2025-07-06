import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from 'react-native';

import CustomButton from '@/components/custom-button';
import CustomInput from '@/components/custom-input';
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async () => {
    const { name, email, password } = form;

    if (!name || !email || !password) {
      return Alert.alert('Error', 'Please enter your name, email, and password.');
    }

    setIsSubmitting(true);

    try {
      // TODO: Add appwtrite signup logic here
      await createUser({
        email,
        password,
        name
      })

      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#fff7f0] px-6">
      <View className="w-full max-w-md bg-white p-6 rounded-3xl shadow-lg border border-orange-100">
        <Text className="text-3xl mt-8 font-extrabold text-orange-500 mb-6 text-center">
          Create Account 🚀
        </Text>

        <CustomInput
          placeholder="Enter your full name"
          value={form.name}
          onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
          label="Full Name"
        />

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
          title="Sign Up"
          isLoading={isSubmitting}
          onPress={submit}
          className="mt-4"
        />

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600 mb-10">Already have an account?</Text>
          <Link href="/sign-in" className="ml-1 font-semibold text-orange-500">
            Sign In
          </Link>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
