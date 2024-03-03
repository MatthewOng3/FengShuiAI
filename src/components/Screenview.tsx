import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { BlurView } from '@candlefinance/blur-view';

type ScreenViewProps = {
    title: string;
    leftIcon: JSX.Element | null;
    rightIcon: JSX.Element | null;
    children: ReactNode;
    backgroundImagePath: string | undefined;
    backgroundColor: string;
}

/**
 * @description Reusable Component to encompass a screen and have a header component 
 * @author Matt
 */
function Screenview({rightIcon, leftIcon, title, children, backgroundColor, backgroundImagePath}: ScreenViewProps){

    return (
        <SafeAreaView style={{height: "100%", backgroundColor: backgroundColor}}>

            <View
            style={styles.headerContainer}
            >
                <View style={styles.iconContainers}>{leftIcon}</View>
                <Text style={styles.headerText}>{title}</Text>
                <View style={styles.iconContainers}>{rightIcon}</View>
            </View>
            
            <View style={{flex: 1}}>
                {/* Background image */}
                
                {
                    backgroundImagePath ?
                    <>
                        <ImageBackground source={require( `../../assets/image_background.png` )} style={styles.backgroundImage}>
                            {/* Blur overlay */}
                            {
                                children
                            }
                        </ImageBackground>
                    </>
                    
                    :
                    
                    <>
                        {
                            children
                        }
                    </>
                }
            </View>
        </SafeAreaView>
    )
}

export default Screenview

const styles = StyleSheet.create({
    headerText: {
        fontSize: 27,
        color: "black",
        flex: 1,
        textAlign: "center"
    },
    iconContainers: {
        width: "20%"
    },
    headerContainer:{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        width: "auto"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
        justifyContent: 'center',
    },
    blurOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent black
    },
})