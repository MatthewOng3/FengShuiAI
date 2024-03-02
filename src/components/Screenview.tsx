import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'

type ScreenViewProps = {
    title: string;
    leftIcon: JSX.Element | null;
    rightIcon: JSX.Element | null;
    children: ReactNode;
}

/**
 * @description Reusable Component to encompass a screen and have a header component 
 * @author Matt
 */
function Screenview({rightIcon, leftIcon, title, children}: ScreenViewProps){
    return (
        <SafeAreaView style={{height: "100%"}}>
            <View
            style={styles.headerContainer}
            >
                <View style={styles.iconContainers}>{leftIcon}</View>
                <Text style={styles.headerText}>{title}</Text>
                <View style={styles.iconContainers}>{rightIcon}</View>
            </View>
            {
                children
            }
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
        paddingHorizontal: 17,
        width: "auto"
    }
})