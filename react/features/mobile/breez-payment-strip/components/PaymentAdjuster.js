import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Button } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { onBoost, changeSatsPerMinute, setCustomBoostAmount, setCustomSatsPerMinAmount } from '../actions.js';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';

import { useDispatch, useSelector } from 'react-redux';
import { connect } from '../../../base/redux';

const light = {
    backgroundColor: 'rgba(243,248,252,1)',
    primaryColor: 'rgba(0,133,251,1)',
    fontColor: 'rgba(0,0,0,1)',
    dividerColor: 'rgba(33,33,33,0.1)'
};
const dark = {
    backgroundColor: 'rgba(21,42,61,1)',
    primaryColor: 'rgba(255,255,255,0.7)',
    fontColor: 'rgba(255,255,255,1)',
    dividerColor: 'rgba(255,255,255,0.2)'
};

type Props = {
    _isLightTheme?: boolean,
    _paymentInfo: string,
    _presetBoostAmountsList: Array<number>,
    _presetSatsPerMinuteAmountsList: Array<number>,
    _selectedBoostAmountIndex: number,
    _selectedSatsPerMinuteAmountIndex: number,
    _customBoostValue: number,
    _customSatsPerMinAmountValue: number,
    dispatch: Dispatch<any>,
};

function PaymentAdjuster(props: Props) {
    const {
        _isLightTheme,
        _paymentInfo,
        _presetBoostAmountsList,
        _selectedBoostAmountIndex,
        _selectedSatsPerMinuteAmountIndex,
        _presetSatsPerMinuteAmountsList,
        _customBoostValue,
        _customSatsPerMinAmountValue,
        dispatch = useDispatch()
    } = props;

    const [boostAmount, setBoostAmount] = React.useState(_selectedBoostAmountIndex);
    const [satsPerMinuteAmount, setSatsPerMinuteAmount] = React.useState(_selectedSatsPerMinuteAmountIndex);

    function formatAmount(num) {
        return Math.abs(num) > 999999
            ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + 'M'
            : Math.abs(num) > 999
            ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
            : Math.sign(num) * Math.abs(num);
    }

    return (
        <View style={[styles(_isLightTheme).container, props.style]}>
            <View style={styles(_isLightTheme).buttonRow}>
                <TouchableOpacity onPress={() => dispatch(onBoost(_presetBoostAmountsList[boostAmount],_paymentInfo))} style={styles(_isLightTheme).button}>
                    <View style={styles(_isLightTheme).imageRow}>
                        <Image
                            source={require('../assets/icon_boost.png')}
                            tintColor={_isLightTheme ? light.primaryColor : dark.primaryColor}
                            resizeMode="contain"
                            style={styles(_isLightTheme).image}
                        ></Image>
                        <Text style={styles(_isLightTheme).boost2}>BOOST!</Text>
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
                    <FeatherIcon name="minus-circle" style={styles(_isLightTheme).minusIcon}></FeatherIcon>
                </TouchableOpacity>
                // FIXME: Open input dialog and return value as custom boost value instead of placeholder value
                <TouchableOpacity onLongPress={() => dispatch(setCustomBoostAmount(666))}>
                    <View style={styles(_isLightTheme).boostAmountColumn}>
                        <AutoSizeText style={styles(_isLightTheme).boostAmount} fontSize={16} numberOfLines={1} mode={ResizeTextMode.max_lines}>
                            {formatAmount(_presetBoostAmountsList[boostAmount])}
                        </AutoSizeText>
                        <Text style={styles(_isLightTheme).sats}>sats</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (boostAmount < _presetBoostAmountsList.length - 1) {
                            setBoostAmount(boostAmount + 1);
                        } else {
                            setBoostAmount(_presetBoostAmountsList.length - 1);
                        }
                    }}
                >
                    <FeatherIcon name="plus-circle" style={styles(_isLightTheme).plusIcon}></FeatherIcon>
                </TouchableOpacity>
                <View style={styles(_isLightTheme).divider} />
                <TouchableOpacity
                    onPress={() => {
                        if (satsPerMinuteAmount >= 1) {
                            setSatsPerMinuteAmount(satsPerMinuteAmount - 1);
                            dispatch(changeSatsPerMinute(_presetSatsPerMinuteAmountsList[satsPerMinuteAmount - 1]));
                        } else {
                            setSatsPerMinuteAmount(0);
                            dispatch(changeSatsPerMinute(_presetSatsPerMinuteAmountsList[0]));
                        }
                    }}
                >
                    <FeatherIcon name="minus-circle" style={styles(_isLightTheme).minusIcon1}></FeatherIcon>
                </TouchableOpacity>
                // FIXME: Open input dialog and return value as custom sats/min value instead of placeholder value
                <TouchableOpacity onLongPress={() => dispatch(setCustomSatsPerMinAmount(222))}>
                    <View style={styles(_isLightTheme).satsPerMinAmountColumn}>
                        <AutoSizeText
                            style={styles(_isLightTheme).satsPerMinAmount}
                            fontSize={16}
                            numberOfLines={1}
                            mode={ResizeTextMode.max_lines}
                        >
                            {formatAmount(_presetSatsPerMinuteAmountsList[satsPerMinuteAmount])}
                        </AutoSizeText>
                        <Text style={styles(_isLightTheme).satsPerMinute}>sats/min</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (satsPerMinuteAmount < _presetSatsPerMinuteAmountsList.length - 1) {
                            setSatsPerMinuteAmount(satsPerMinuteAmount + 1);
                            dispatch(changeSatsPerMinute(_presetSatsPerMinuteAmountsList[satsPerMinuteAmount + 1]));
                        } else {
                            setSatsPerMinuteAmount(_presetSatsPerMinuteAmountsList.length - 1);
                            dispatch(changeSatsPerMinute(_presetSatsPerMinuteAmountsList[_presetSatsPerMinuteAmountsList.length - 1]));
                        }
                    }}
                >
                    <FeatherIcon name="plus-circle" style={styles(_isLightTheme).plusIcon1}></FeatherIcon>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = (_isLightTheme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 0,
        borderColor: _isLightTheme ? light.dividerColor : dark.dividerColor,
        borderStyle: 'solid',
        borderTopWidth: 2,
        backgroundColor: _isLightTheme ? light.backgroundColor : dark.backgroundColor,
        height: 64,
    },
    button: {
        width: 94,
        height: 36,
        backgroundColor: _isLightTheme ? light.backgroundColor : dark.backgroundColor,
        borderWidth: 1,
        borderColor: _isLightTheme ? light.primaryColor : dark.primaryColor,
        borderRadius: 6,
        flexDirection: 'row',
    },
    image: {
        width: 20,
        height: 20,
    },
    boost2: {
        fontFamily: 'IBMPlexSans-SemiBold',
        color: _isLightTheme ? light.primaryColor : dark.primaryColor,
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
        color: _isLightTheme ? light.primaryColor : dark.primaryColor,
        fontSize: 24,
        marginLeft: 12,
        marginTop: 6,
    },
    boostAmount: {
        fontFamily: 'IBMPlexSans-SemiBold',
        color: _isLightTheme ? light.fontColor : dark.fontColor,
        letterSpacing: 1,
        lineHeight: 20,
        marginTop: -2,
        textAlign: 'center',
    },
    sats: {
        fontFamily: 'IBMPlexSans',
        color: _isLightTheme ? light.fontColor : dark.fontColor,
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
        color: _isLightTheme ? light.primaryColor : dark.primaryColor,
        fontSize: 24,
        marginLeft: 6,
        marginTop: 6,
    },
    divider: {
        height: 64,
        width: 2,
        marginTop: -13,
        marginLeft: 12,
        backgroundColor: _isLightTheme ? light.dividerColor : dark.dividerColor,
    },
    minusIcon1: {
        color: _isLightTheme ? light.primaryColor : dark.primaryColor,
        fontSize: 24,
        marginLeft: 12,
        marginTop: 6,
    },
    satsPerMinAmount: {
        fontFamily: 'IBMPlexSans-SemiBold',
        color: _isLightTheme ? light.fontColor : dark.fontColor,
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
        color: _isLightTheme ? light.fontColor : dark.fontColor,
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
        color: _isLightTheme ? light.primaryColor : dark.primaryColor,
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

function _mapDispatchToProps(dispatch: Function, ownProps): Object {
    return {};
}


function _mapStateToProps(state, ownProps) {
    const { isLightTheme, customBoostValue, customSatsPerMinAmountValue, selectedBoostAmountIndex, selectedSatsPerMinuteAmountIndex } = state['features/base/settings'];
    const participants = state['features/base/participants'];
    const presenter = participants
        .find(participant => participant?.email.startsWith('breez:'));
    let paymentInfo = presenter?.email.substring(6);
    // TODO: Get preset payment options list info from settings
    const presetBoostAmountsList = [1000, 5000, 10000, 25000, 50000, 100000];
    const presetSatsPerMinuteAmountsList = [0, 50, 100, 250, 500, 1000, 2500, 5000];
    return {
        _isLightTheme: Boolean(isLightTheme),
        _paymentInfo: paymentInfo,
        _presetBoostAmountsList: presetBoostAmountsList,
        _presetSatsPerMinuteAmountsList: presetSatsPerMinuteAmountsList,
        _selectedBoostAmountIndex: selectedBoostAmountIndex,
        _selectedSatsPerMinuteAmountIndex: selectedSatsPerMinuteAmountIndex,
        _customBoostValue: customBoostValue,
        _customSatsPerMinAmountValue: customSatsPerMinAmountValue,
    };
}

export default connect(_mapStateToProps, _mapDispatchToProps)(PaymentAdjuster);
