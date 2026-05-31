import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../shared/theme';
import { Screen } from '../../shared/ui/Screen';

type HomeScreenProps = {
  appName: string;
};

export function HomeScreen({ appName }: HomeScreenProps) {
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.kicker}>Expo React Native</Text>
        <Text style={styles.title}>{appName}</Text>
        <Text style={styles.subtitle}>
          A small professional starter with TypeScript, linting, formatting, tests, CI, and room to
          grow into your architecture.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Starter boundaries</Text>
        <Text style={styles.panelText}>
          Keep product code in feature folders, reusable primitives in shared, and runtime setup in
          app and config.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
    paddingTop: spacing.xl,
  },
  kicker: {
    color: colors.accent,
    paddingTop: spacing.xl,
    fontSize: typography.sizes.sm,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: typography.sizes.xxl,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.sizes.md,
    lineHeight: 24,
  },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  panelTitle: {
    color: colors.text,
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  panelText: {
    color: colors.muted,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
});
