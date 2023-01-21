import { Text, View, Alert, TouchableOpacity, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import Logo from "../assets/logo.svg";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export function Login() {
  const CLIENT_ID = process.env.CLIENT_ID as string;
  const discovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    revocationEndpoint: `https://github.com/settings/connections/applications/${CLIENT_ID}`,
  };
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "mobile",
      }),
    },
    discovery
  );
  const handlerSingInGoogle = () => {
    Alert.alert("Alerta", "Você foi hackeado pelo Higor Hackerman");
  };

  const handlerSingInGitHub = async () => {
    try {
      await promptAsync();
      console.log(response);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View className="flex-1 bg-background w-screen items-center justify-evenly ">
      <View className="flex flex-col items-center gap-y-8">
        <Logo className="mx-auto" />
      </View>
      <View className="flex flex-col  items-center gap-y-3 p-7">
        <Text className="text-white text-lg font-semibold m-2">Entre com</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          //   onPress={ha}
          className="flex-row mb-2 items-center"
          accessibilityLabel="Learn more about this purple button"
        >
          <View className=" flex flex-row space-x-5 h-14 w-11/12 bg-purple-600 rounded-lg items-center justify-center border-2 border-white hover:border-purple-500">
            <AntDesign name="google" size={28} color="white" />
            <Text className="text-xl m-1 text-white font-semibold">Google</Text>
          </View>
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold m-1">ou</Text>

        <TouchableOpacity
          onPress={handlerSingInGitHub}
          activeOpacity={0.7}
          className="flex-row mb-2 items-center"
          accessibilityLabel="Learn more about this purple button"
        >
          <View className=" flex flex-row space-x-5 h-14 w-11/12 bg-purple-600 rounded-lg items-center justify-center border-2 border-white hover:border-purple-500">
            <AntDesign name="github" size={28} color="white" />
            <Text className="text-xl m-1 text-white font-semibold">GitHub</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
