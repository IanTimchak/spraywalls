// features/auth/components/authFormStyles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    frame: {
        flex: 1,
        position: 'relative',
    },
    content: {
        flex: 1,
        paddingHorizontal: 12,
    },

    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },

    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center',
    },

    mt30: {
        marginTop: 30,
    },
    mt20: {
        marginTop: 20,
    },
    mt10: {
        marginTop: 10,
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#86939e',
        marginBottom: 6,
    },

    input: {
        borderWidth: 1,
        borderColor: '#86939e',
        borderRadius: 4,
        padding: 12,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#646464',
        borderRadius: 6,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    passwordFieldWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#86939e',
        borderRadius: 4,
    },
    passwordInput: {
        flex: 1,
        padding: 12,
        fontSize: 18,
    },
    passwordToggle: {
        padding: 12,
    },
    forgotPassword: {
        marginTop: 20,
        alignSelf: 'center',
    },
    forgotPasswordText: {
        color: '#646464',
        fontSize: 14,
    },

    orDivider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#86939e',
    },
    orText: {
        marginHorizontal: 8,
        color: '#86939e',
        fontSize: 14,
    },
});
