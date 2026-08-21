import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {colors, spacing } from '../theme';

export default function LabelLevel({ level }) {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{level}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 3,
        paddingHorizontal: 2,
        borderRadius: radius.full,
        borderWidth: 1
        },
        text: {fontSize: 11, 
            fontWeight: '700', 
            letterspacing: 0.1
             }

        });

