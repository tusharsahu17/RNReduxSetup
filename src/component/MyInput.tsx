import { FormikProps, useField } from 'formik';
import React, { ReactElement } from 'react';
import {
    ViewStyle,
    StyleSheet,
    Text,
    TextInput,
    View,
    StyleProp,
    TextStyle,
    TextInputProps,
} from 'react-native';
import { THEME } from '../utils/theme';
import { Dropdown } from 'react-native-element-dropdown';

type Data = {
    value: string;
    label: string;
};

type inputType = {
    label?: string;
    info?: {
        required?: boolean;
        showLabel?: boolean;
    };
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    inputStyle?: StyleProp<TextStyle>;
    iCStyle?: StyleProp<TextStyle>;
    formikProps: FormikProps<any>;
    name: string;
    inputProps?: TextInputProps;
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
    select?: {
        isSelect?: boolean;
        labelField?: string;
        valueField?: string;
    };
    search?: boolean;
    data?: Data[];
    onChange?: (e: any) => void;
};

const MyInput = ({
    label,
    formikProps,
    info,
    select = {
        isSelect: false,
        labelField: 'label',
        valueField: 'value',
    },
    search = true,
    data = [],
    ...props
}: inputType) => {
    const [field, meta] = useField(props.name);
    const isError = meta.touched && meta.error;

    return (
        <>
            <View style={[styles.container, props?.containerStyle]}>
                {label ? (
                    <Text style={[styles.label, props?.labelStyle]}>
                        {label}
                        {info?.required ? '*' : ''}
                    </Text>
                ) : null}
                {select.isSelect ? (
                    <Dropdown
                        style={[
                            {
                                borderColor: isError
                                    ? THEME.COLOR_DANGER_DARK
                                    : THEME.COLOR_GRAY,
                                padding: 8,
                                borderWidth: 1,
                                borderRadius: 5,
                                height: 40,
                            },
                            props.iCStyle,
                        ]}
                        data={data}
                        search={search}
                        maxHeight={300}
                        labelField={select.labelField || 'label'}
                        valueField={select.valueField || 'value'}
                        placeholder={`Select ${label}`}
                        searchPlaceholder="Search..."
                        value={meta.value}
                        placeholderStyle={{
                            color: THEME.COLOR_GRAY,
                        }}
                        onChange={item => {
                            formikProps.setFieldValue(
                                props.name,
                                select.valueField ? item[select.valueField] : item.value,
                            );
                            if (props.onChange) {
                                props.onChange(item);
                            }
                        }}
                    />
                ) : (
                    <View
                        style={[
                            styles.inputContainer,
                            {
                                borderColor: isError
                                    ? THEME.COLOR_DANGER_DARK
                                    : THEME.COLOR_GRAY,
                            },
                            props.iCStyle,
                        ]}>
                        {props.leftIcon ? props.leftIcon : null}
                        <TextInput
                            placeholder={`Enter ${label}`}
                            onChangeText={formikProps.handleChange(field.name)}
                            onBlur={formikProps.handleBlur(field.name)}
                            value={meta.value}
                            style={[styles.input, props.inputStyle]}
                            autoCapitalize="none"
                            autoComplete="off"
                            placeholderTextColor={THEME.COLOR_GRAY}
                            {...props.inputProps}
                        />
                        {props.rightIcon ? props.rightIcon : null}
                    </View>
                )}
                {isError ? <Text style={styles.error}>{meta.error}</Text> : null}
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: THEME.COLOR_BLACK,
        height: 40,
    },
    input: {
        flex: 1,
        marginHorizontal: 15,
    },
    label: {
        color: THEME.COLOR_BLACK,
        opacity: 0.7,
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 16,
    },
    error: {
        color: THEME.COLOR_DANGER_DARK,
        marginVertical: 4,
    },
});
export default MyInput;
