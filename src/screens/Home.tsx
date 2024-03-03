import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Screenview from '../components/Screenview'
import { Button, Icon } from 'native-base'
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from 'axios'
import { RestClient } from '../util/RestClient';

const restClient = new RestClient(
    axios.create({
        baseURL: `https://a0f1-180-150-39-111.ngrok-free.app/api`
    })
);


function Home({navigation}){

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
        try{
            
            const base64String = await FileSystem.readAsStringAsync(
                image.uri,
                {
                    encoding: "base64"
                }
            );
            
            const response = await restClient.get(`/google/object-detection`, {
                data: {
                    image: base64String
                },
                headers: {
                    "Content-Type": "application/json"
                }
                
            });
            
            if(response.data){
                navigation.navigate('ObjectDetection', {detectedObjects: response.data})
            }
        }
        catch(e){
            console.log(e)
        }

    }
    
    return (
      <Screenview title='Scan Room' leftIcon={<></>}
        rightIcon={<></>} backgroundColor='white' backgroundImagePath={''} >
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