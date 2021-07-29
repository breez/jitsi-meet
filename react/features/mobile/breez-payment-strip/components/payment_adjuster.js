import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Button } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { onBoost, changeSatsPerMinute, setCustomBoostAmount, setCustomSatsPerMinAmount } from '../actions.js';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';

// TODO: Use values passed from conference config
const presetBoostAmountsList = [100, 500, 1000, 5000, 10000, 50000];
const presetSatsPerMinuteAmountsList = [0, 10, 25, 50, 100, 250, 500, 1000];
const theme = 'light';

function PaymentAdjuster(props) {
    const [boostAmount, setBoostAmount] = React.useState(0);
    const [satsPerMinuteAmount, setSatsPerMinuteAmount] = React.useState(0);

    function formatAmount(num) {
        return Math.abs(num) > 999999
            ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + 'M'
            : Math.abs(num) > 999
            ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
            : Math.sign(num) * Math.abs(num);
    }

    return (
        <View style={[styles.container, props.style]}>
            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => onBoost(presetBoostAmountsList[boostAmount])} style={styles.button}>
                    <View style={styles.imageRow}>
                        <Image
                            source={require('../assets/icon_boost.png')}
                            tintColor={theme == 'light' ? light.primaryColor : dark.primaryColor}
                            resizeMode="contain"
                            style={styles.image}
                        ></Image>
                        <Text style={styles.boost2}>BOOST!</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (boostAmount >= 1) {
                            setBoostAmount(boostAmount - 1);
                        } else {
                            setBoostAmount(0);
                        }
                    }}
                >
                    <FeatherIcon name="minus-circle" style={styles.minusIcon}></FeatherIcon>
                </TouchableOpacity>
                <TouchableOpacity onLongPress={() => setCustomBoostAmount()}>
                    <View style={styles.boostAmountColumn}>
                        <AutoSizeText style={styles.boostAmount} fontSize={16} numberOfLines={1} mode={ResizeTextMode.max_lines}>
                            {formatAmount(presetBoostAmountsList[boostAmount])}
                        </AutoSizeText>
                        <Text style={styles.sats}>sats</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (boostAmount < presetBoostAmountsList.length - 1) {
                            setBoostAmount(boostAmount + 1);
                        } else {
                            setBoostAmount(presetBoostAmountsList.length - 1);
                        }
                    }}
                >
                    <FeatherIcon name="plus-circle" style={styles.plusIcon}></FeatherIcon>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                    onPress={() => {
                        if (satsPerMinuteAmount >= 1) {
                            setSatsPerMinuteAmount(satsPerMinuteAmount - 1);
                            changeSatsPerMinute(presetSatsPerMinuteAmountsList[satsPerMinuteAmount - 1]);
                        } else {
                            setSatsPerMinuteAmount(0);
                            changeSatsPerMinute(presetSatsPerMinuteAmountsList[0]);
                        }
                    }}
                >
                    <FeatherIcon name="minus-circle" style={styles.minusIcon1}></FeatherIcon>
                </TouchableOpacity>
                <TouchableOpacity onLongPress={() => setCustomSatsPerMinAmount()}>
                    <View style={styles.satsPerMinAmountColumn}>
                        <AutoSizeText
                            style={styles.satsPerMinAmount}
                            fontSize={16}
                            numberOfLines={1}
                            mode={ResizeTextMode.max_lines}
                        >
                            {formatAmount(presetSatsPerMinuteAmountsList[satsPerMinuteAmount])}
                        </AutoSizeText>
                        <Text style={styles.satsPerMinute}>sats/min</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (satsPerMinuteAmount < presetSatsPerMinuteAmountsList.length - 1) {
                            setSatsPerMinuteAmount(satsPerMinuteAmount + 1);
                            changeSatsPerMinute(presetSatsPerMinuteAmountsList[satsPerMinuteAmount + 1]);
                        } else {
                            setSatsPerMinuteAmount(presetSatsPerMinuteAmountsList.length - 1);
                            changeSatsPerMinute(presetSatsPerMinuteAmountsList[presetSatsPerMinuteAmountsList.length - 1]);
                        }
                    }}
                >
                    <FeatherIcon name="plus-circle" style={styles.plusIcon1}></FeatherIcon>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const light = {
    backgroundColor: 'rgba(243,248,252,1)',
    primaryColor: 'rgba(0,133,251,1)',
    fontColor: 'rgba(0,0,0,1)',
    dividerColor: 'rgba(33,33,33,0.1)',
};
const dark = {
    backgroundColor: 'rgba(21,42,61,1)',
    primaryColor: 'rgba(255,255,255,0.7)',
    fontColor: 'rgba(255,255,255,1)',
    dividerColor: 'rgba(255,255,255,0.2)',
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 0,
        borderColor: theme == 'light' ? light.dividerColor : dark.dividerColor,
        borderStyle: 'solid',
        borderTopWidth: 2,
        backgroundColor: theme == 'light' ? light.backgroundColor : dark.backgroundColor,
        height: 64,
    },
    button: {
        width: 94,
        height: 36,
        backgroundColor: theme == 'light' ? light.backgroundColor : dark.backgroundColor,
        borderWidth: 1,
        borderColor: theme == 'light' ? light.primaryColor : dark.primaryColor,
        borderRadius: 6,
        flexDirection: 'row',
    },
    image: {
        width: 20,
        height: 20,
    },
    boost2: {
        fontFamily: 'IBMPlexSans-SemiBold',
        color: theme == 'light' ? light.primaryColor : dark.primaryColor,
        height: 20,
        width: 50,
        lineHeight: 20,
        marginLeft: 9,
        marginTop: -2,
    },
    imageRow: {
        height: 20,
        flexDirection: 'row',
        flex: 1,
        marginRight: 7,
        marginLeft: 8,
        marginTop: 8,
    },
    minusIcon: {
        color: theme == 'light' ? light.primaryColor : dark.primaryColor,
        fontSize: 24,
        marginLeft: 12,
        marginTop: 6,
    },
    boostAmount: {
        fontFamily: 'IBMPlexSans-SemiBold',
        color: theme == 'light' ? light.fontColor : dark.fontColor,
        letterSpacing: 1,
        lineHeight: 20,
        marginTop: -2,
        textAlign: 'center',
    },
    sats: {
        fontFamily: 'IBMPlexSans',
        color: theme == 'light' ? light.fontColor : dark.fontColor,
        fontSize: 10,
        letterSpacing: 1,
        height: 12,
        width: 34,
        marginTop: 1,
        textAlign: 'center',
    },
    boostAmountColumn: {
        width: 34,
        marginLeft: 5,
        marginTop: 1,
        marginBottom: 2,
    },
    plusIcon: {
        color: theme == 'light' ? light.primaryColor : dark.primaryColor,
        fontSize: 24,
        marginLeft: 6,
        marginTop: 6,
    },
    divider: {
        height: 64,
        width: 2,
        marginTop: -13,
        marginLeft: 12,
        backgroundColor: theme == 'light' ? light.dividerColor : dark.dividerColor,
    },
    minusIcon1: {
        color: theme == 'light' ? light.primaryColor : dark.primaryColor,
        fontSize: 24,
        marginLeft: 12,
        marginTop: 6,
    },
    satsPerMinAmount: {
        fontFamily: 'IBMPlexSans-SemiBold',
        color: theme == 'light' ? light.fontColor : dark.fontColor,
        fontSize: 16,
        letterSpacing: 1,
        lineHeight: 20,
        height: 20,
        width: 48,
        marginTop: -2,
        textAlign: 'center',
        alignSelf: 'stretch',
    },
    satsPerMinute: {
        fontFamily: 'IBMPlexSans',
        color: theme == 'light' ? light.fontColor : dark.fontColor,
        fontSize: 10,
        letterSpacing: 1,
        marginTop: 2,
        width: 48,
    },
    satsPerMinAmountColumn: {
        width: 47,
        marginLeft: 5,
        marginTop: 1,
        marginBottom: 2,
    },
    plusIcon1: {
        color: theme == 'light' ? light.primaryColor : dark.primaryColor,
        fontSize: 24,
        marginLeft: 7,
        marginTop: 6,
    },
    buttonRow: {
        height: 37,
        flexDirection: 'row',
        flex: 1,
        marginRight: 15,
        marginLeft: 16,
        marginTop: 13,
    },
});

export default PaymentAdjuster;
