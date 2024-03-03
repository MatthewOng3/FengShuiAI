import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Screenview from '../components/Screenview'
import { Button, Icon } from 'native-base'
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from 'axios'

function Home(){

    // const dispatch = useDispatch<AppDispatch>();
    // const [infoModal, setInfoModal] = useState<boolean>(false);

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

    // function closeModal() {
    //     setInfoModal(false);
    // }

    return (
      <Screenview title='Scan Room' leftIcon={<></>}
      rightIcon={<></>} backgroundColor='white'>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button leftIcon={<Icon as={FontAwesome} name="photo" size="sm" />}
          onPress={() => uploadImage("")}>
            Upload
          </Button>
        </View>
      </Screenview>
    )
}

export default Home

const styles = StyleSheet.create({})