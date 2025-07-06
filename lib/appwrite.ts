import { CreateUserProps, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";


export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: process.env.EXPO_PUBLIC_PLATFORM!,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setPlatform(appwriteConfig.platform)
    .setProject(appwriteConfig.projectId)


export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserProps) => {
    try {

        const newAccoung = await account.create(ID.unique(), email, password, name)
        if (!newAccoung) {
            throw Error
        }

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name)

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                email,
                name,
                accountId: newAccoung.$id,
                avatar: avatarUrl
            }
        );

    } catch (error) {
        throw new Error(error as string)
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const sesssion = await account.createEmailPasswordSession(email, password)

    } catch (error) {
        throw new Error(error as string)
    }
}

export const getCurrentUser = async () => {
    try {
        const currAccount = await account.get()
        if (!currAccount) {
            throw Error
        }

        const currUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            // NOTE: DONO KA ID SAME HONA CHHIYE
            [Query.equal("accountId", currAccount.$id)]
        )

        if (!currUser) {
            throw console.error();

        }

        // return one user
        return currUser.documents[0];
    } catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
}