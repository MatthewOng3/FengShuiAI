import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { StyleSheet, Image } from "react-native";

const TypingText = () => {
  const [text, setText] = useState("");
  const fullText = `Declutter: Remove unnecessary items and clutter from surfaces.\nTime: 15-20 minutes, depending on the amount of clutter.\n\nClean: Dust surfaces, vacuum the floor, and tidy up any mess.\nTime: 15-20 minutes, depending on the size of the room.\n\nImprove Air Quality: Open windows for ventilation or use air purifiers to freshen the air.\nTime: 5 minutes.\n\nBalance Energy Flow: Rearrange furniture to allow for better energy flow (Qi).\nTime: 10-15 minutes, depending on the layout of the room and furniture.\n\nEnhance Lighting: Ensure there's adequate natural light or use soft lighting to create a soothing ambiance.\nTime: 5-10 minutes to adjust curtains or lighting fixtures.\n\nCreate a Restful Sleep Environment: Invest in comfortable bedding and pillows, and ensure the bedroom is conducive to sleep.\nTime: 5-10 minutes for bedding arrangement and adjustment.\n\nSet Intentions: Spend a few moments setting positive intentions for the space, envisioning it as a peaceful sanctuary.\nTime: 5 minutes for reflection and intention-setting.\n\nTotal: 60-85 minutes`;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) {
        clearInterval(typingInterval);
      }
    }, 1); // Adjust typing speed here
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require('../assets/drawer.jpg')}
          style={{ width: '100%', height: 200 }}
        />
        <Text style={styles.title}>Bedroom Feng Shui Checklist</Text>
        <Text style={styles.text}>{text}</Text>
        <Text />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#092223",
  },
  container: {
    flex: 1,
    backgroundColor: "#081515",
    padding: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    marginTop: 20,
    color: "white",
    fontFamily: "sans-serif-light",
  },
  text: {
    fontSize: 18,
    color: "white",
    fontFamily: "sans-serif-light",
    marginHorizontal: 20,
  },
});

export default TypingText;
