import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screenview from '../components/Screenview'
import { FontAwesome } from '@expo/vector-icons';
import { Icon, Image } from 'native-base';
import { RouteProp } from '@react-navigation/native';

type ObjectDetectionProps = {
    route: RouteProp<{params}, "params">;
}

function ObjectDetection({route}){

   //const places = route?.params?.detectedObjects;

    return (
        <Screenview backgroundColor='#35888E' backgroundImagePath={undefined} leftIcon={
            <Icon as={FontAwesome} name="bars" size="lg" color={"white"}/>
        } rightIcon={<></>} title='' >
            <Image/>
        </Screenview>
    )
}

export default ObjectDetection

const styles = StyleSheet.create({})