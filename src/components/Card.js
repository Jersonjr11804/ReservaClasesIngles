import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LabelLevel from './LabelLevel';
import {colors, radius,spacing, typography} from '../theme';
import {formatearPrecio} from '..data/clases';

export default function Card({ clase, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: clase.Image }} style={styles.image} />
      <View style={styles.content}>
        <LabelLevel level={clase.level} />
        <View style={styles.info}>
          <Text style={styles.teacher}>{clase.profesor}</Text>
          <Text style={styles.schedule}>{clase.horario}</Text>
          <Text style={styles.price}>{formatearPrecio(clase.precio)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: spacing.md,
  },
  info: {
    marginTop: spacing.sm,
  },
  teacher: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  schedule: {
    fontSize: typography.caption,
    color: colors.muted,
    marginTop: 4,
  },
  price: {
    fontSize: typography.h6,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 6,
  },
});