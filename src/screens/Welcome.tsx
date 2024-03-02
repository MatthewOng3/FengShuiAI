import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screenview from '../components/Screenview'
import { Button, Icon } from 'native-base'
import { FontAwesome } from '@expo/vector-icons';
import {StatusBar} from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from 'axios'

function Welcome(){
    
    async function uploadImage(mode: string) {
        try {
            let result: ImagePicker.ImagePickerResult;

            if (mode === "gallery") {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                    base64: true
                });
            } else {
                const response =
                    await ImagePicker.requestCameraPermissionsAsync();

                if (response.granted) {
                    result = await ImagePicker.launchCameraAsync({
                        cameraType: ImagePicker.CameraType.front,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    });
                }
                //If can't be asked again and permission was not granted
                else if (!response.canAskAgain && !response.granted) {
                    //Display a popup directing to enable permission
                    result = {assets: null, canceled: true};
                    //setInfoModal(true);
                }
            }

            if (!result.canceled) {
                await saveImage(result.assets[0]);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function saveImage(image: ImagePicker.ImagePickerAsset) {
        
        console.log(image)

        const base64String = await FileSystem.readAsStringAsync(
            image.uri,
            {
                encoding: "base64"
            }
        );

        const response = await axios.get('https://pecf27ctocane7vz6ba3jq6u3a0jazcy.lambda-url.ap-southeast-2.on.aws/', {
            data:{
                image: base64String
            },
            headers: {
                'Content-Type': 'application/json', // Set the content type according to your image format
            },
        }); 
        
        console.log(response.data)

    }

    return (
        <View style={{height: "100%", backgroundColor: "#35888E"}}>
            <StatusBar style="light"/>

            <ImageBackground source={require( `../../assets/image_background.png` )} style={styles.backgroundImage} resizeMethod='scale'>
            {/* Blur overlay */}
                <View
                style={styles.rootContainer}
                >
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20}}>
                        <Icon as={FontAwesome} name="bars" size="lg" color={"white"}/>
                        <Text style={{fontSize: 20, color: 'white'}}>Login</Text>
                    </View>

                    <View style={styles.bottomConatiner}>
                        <Text style={{...styles.headerText, color: 'white'}}>Elevate your</Text>
                        <Text style={{...styles.headerText, color: "#00F5E6"}}>Personal Space</Text>
                        <Text style={{fontSize: 20, color: 'white'}}>
                            The environment you create is a reflection of your mind
                        </Text>
                        
                        <View style={{paddingHorizontal: 50, marginTop: 20}}>
                            <Button size="lg" style={{borderRadius: 20, backgroundColor: '#00D19F'}} onPress={() => uploadImage("")}>
                                <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>Get Started</Text>
                            </Button>
                        </View>
                        
                    </View>
                    
                </View>
            </ImageBackground>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
        justifyContent: 'center',
    },
    rootContainer: {
        height: '85%',
        justifyContent: 'space-between'
    },
    bottomConatiner:{
        paddingHorizontal: 20
    },
    headerText: {
        fontSize: 50,
        fontWeight: '500'
    }
})