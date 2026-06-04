import { Text } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';

type IconProps = {
    name: string;
    size?: number;
    color?: string;
    style?: StyleProp<TextStyle>;
};

const iconGlyphs: Record<string, string> = {
    eye: 'Show',
    'eye-off': 'Hide',
};

export function Ionicons({ name, size = 20, color = '#000000', style }: IconProps) {
    return (
        <Text style={[{ color, fontSize: size, lineHeight: size }, style]}>
            {iconGlyphs[name] ?? name}
        </Text>
    );
}
