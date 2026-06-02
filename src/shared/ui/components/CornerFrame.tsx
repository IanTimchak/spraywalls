import { View, StyleSheet } from 'react-native';

type Props = {
    color?: string;
    size?: number;
    width?: number;
    radius?: number;
};

export function CornerFrame({ color = '#5d6c77', size = 30, width = 3, radius = 12 }: Props) {
    const cornerBaseStyle = {
        width: size,
        height: size,
        borderColor: color,
    };

    return (
        <View style={styles.bracketLayer} pointerEvents="none">
            <View
                style={[
                    styles.corner,
                    cornerBaseStyle,
                    styles.topLeft,
                    { borderTopWidth: width, borderLeftWidth: width, borderTopLeftRadius: radius },
                ]}
            />
            <View
                style={[
                    styles.corner,
                    cornerBaseStyle,
                    styles.topRight,
                    {
                        borderTopWidth: width,
                        borderRightWidth: width,
                        borderTopRightRadius: radius,
                    },
                ]}
            />
            <View
                style={[
                    styles.corner,
                    cornerBaseStyle,
                    styles.bottomLeft,
                    {
                        borderBottomWidth: width,
                        borderLeftWidth: width,
                        borderBottomLeftRadius: radius,
                    },
                ]}
            />
            <View
                style={[
                    styles.corner,
                    cornerBaseStyle,
                    styles.bottomRight,
                    {
                        borderBottomWidth: width,
                        borderRightWidth: width,
                        borderBottomRightRadius: radius,
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    bracketLayer: {
        ...StyleSheet.absoluteFillObject,
    },
    corner: {
        position: 'absolute',
    },
    topLeft: {
        top: 0,
        left: 0,
    },
    topRight: {
        top: 0,
        right: 0,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
    },
});
