import React, { useEffect, useCallback, useState, useLayoutEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../../../firebase';
import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import MyContext from '../../../MyContext';
import manUser from '../../assets/images/manUser.png'
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
const ChatScreen = () => {
    const [user] = useContext(MyContext)
    const navigation = useNavigation()
    const [messages, setMessages] = useState([]);
    // const signOutNow = () => {
    //     signOut(auth).then(() => {
    //         // Sign-out successful.
    //         navigation.replace('Login');
    //     }).catch((error) => {
    //         // An error happened.
    //     });
    // }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={manUser}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 10
                }}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Back</Text>
                </TouchableOpacity>
            )
        })

        const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
        ));

        return () => {
          unsubscribe();
        };

    }, [navigation]);

    const onSend = useCallback((messages = []) => {
        const { _id, createdAt, text, user,} = messages[0]

        addDoc(collection(db, 'chats'), { _id, createdAt,  text, user });
    }, []);

    return (
       <View style={{flex: 1}}>
         <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: user?.username,
                name: user?.firstName,
                avatar: manUser
            }}
         />
       </View>
    );
}

export default ChatScreen;
