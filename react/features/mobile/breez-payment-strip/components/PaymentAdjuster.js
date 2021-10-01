import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Button } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ConfettiCannon from 'react-native-confetti-cannon';
import { onBoost, changeSatsPerMinute, setCustomBoostAmount, setCustomSatsPerMinAmount } from '../actions.js';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';

import { useDispatch, useSelector } from 'react-redux';
import { connect } from '../../../base/redux';

const light = {
    backgroundColor: 'rgba(243,248,252,.3)',
    primaryColor: 'rgba(0,133,251,1)',
    fontColor: 'rgba(255,255,255,1)',
    dividerColor: 'rgba(33,33,33,0.2)',
    dialogColor: '#ffffff',
    buttonColor: 'rgba(5, 93, 235, 1)',
};
const dark = {
    primaryColor: 'rgba(255,255,255,0.7)',
    dialogColor: '#152a3d',
    buttonColor: '#7aa5eb',
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

// FIXME: Open input dialog and return value as custom boost & sats/min value instead of the placeholder value
// TODO: Add and remove custom values from preset list
function PaymentAdjuster(props: Props) {
    const {
        _isLightTheme,
        _paymentInfo,
        _presetBoostAmountsList,
        _presetSatsPerMinuteAmountsList,
        _selectedBoostAmountIndex,
        _selectedSatsPerMinuteAmountIndex,
        _customBoostValue,
        _customSatsPerMinAmountValue,
        dispatch = useDispatch()
    } = props;
    let confetti;
    const [boostList, setBoostList] = React.useState(_presetBoostAmountsList);
    const [satsPerMinuteList, setSatsPerMinuteList] = React.useState(_presetSatsPerMinuteAmountsList);

    const [boostAmount, setBoostAmount] = React.useState(_selectedBoostAmountIndex);
    const [satsPerMinuteAmount, setSatsPerMinuteAmount] = React.useState(_selectedSatsPerMinuteAmountIndex);

    const [boostAmountDialogVisible, setBoostAmountDialogVisible] = React.useState(false);

    const showBoostAmountDialog = () => {
        setBoostAmountDialogVisible(true);
    };

    const closeBoostAmountDialog = () => {
        setBoostAmountDialogVisible(false);
    };

    function submitCustomBoostAmount(newBoostAmount) {
         setBoostAmountDialogVisible(false);
         if(newBoostAmount != null) {

             let customBoostAmount = Number(newBoostAmount);
             let newBoostList = _presetBoostAmountsList.filter(item => item !== _customBoostValue);
             newBoostList = insert(customBoostAmount, newBoostList);
             setBoostList(newBoostList);
             dispatch(setCustomBoostAmount(customBoostAmount));
         }
    }

     const [satsPerMinAmountDialogVisible, setSatsPerMinAmountDialogVisible] = React.useState(false);

     const showSatsPerMinAmountDialog = () => {
        setSatsPerMinAmountDialogVisible(true);
     };

     const closeSatsPerMinAmountDialog = () => {
        setSatsPerMinAmountDialogVisible(false);
     };

    function submitCustomSatsPerMinAmount(newSatsPerMinAmount) {
         setSatsPerMinAmountDialogVisible(false);
         if(newSatsPerMinAmount != null) {
             let customSatsPerMinAmount = Number(newSatsPerMinAmount);
             let newSatsPerMinAmountList = _presetSatsPerMinuteAmountsList.filter(item => item !== _customSatsPerMinAmountValue);
             newSatsPerMinAmountList = insert(customSatsPerMinAmount, newSatsPerMinAmountList);
             setSatsPerMinuteList(newSatsPerMinAmountList);
             dispatch(setCustomSatsPerMinAmount(customSatsPerMinAmount));
         }
    }

    function formatAmount(num) {
        return Math.abs(num) > 999999
            ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + 'M'
            : Math.abs(num) > 999
            ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
            : Math.sign(num) * Math.abs(num);
    }

     const boost = () => {
       confetti && confetti.start();
       dispatch(onBoost(boostList[boostAmount],_paymentInfo));
    }

    return (
        <View style={[styles(_isLightTheme).container, props.style]}>
            <View style={styles(_isLightTheme).buttonRow}>
                <TouchableOpacity onPress={boost} style={styles(_isLightTheme).button}>
                    <View style={styles(_isLightTheme).imageRow}>
                        <Image
                            source={require('../assets/icon_boost.png')}
                            tintColor={dark.primaryColor}
                            resizeMode="contain"
                            style={styles(_isLightTheme).image}></Image>
                        <Text style={styles(_isLightTheme).boost2}>BOOST!</Text>
                        <ConfettiCannon count={100} fadeOut={true}keyboardType explosionSpeed={1000} fallSpeed={3000} origin={{x: -80, y: 0}} autoStart={false} ref={ref => (confetti = ref)} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles(_isLightTheme).boostRow}>
                <TouchableOpacity
                    onPress={() => {
                        if (boostAmount >= 1) {
                            setBoostAmount(boostAmount - 1);
                        } else {
                            setBoostAmount(0);
                        }
                    }}>
                    <FeatherIcon name="minus-circle" style={styles(_isLightTheme).minusIcon}></FeatherIcon>
                </TouchableOpacity>
                <TouchableOpacity onLongPress={showBoostAmountDialog}>
                    <View style={styles(_isLightTheme).boostAmountColumn}>
                        <AutoSizeText style={styles(_isLightTheme).boostAmount} fontSize={12} numberOfLines={1} mode={ResizeTextMode.max_lines}>
                            {formatAmount(boostList[boostAmount])}
                        </AutoSizeText>
                        <AutoSizeText style={styles(_isLightTheme).sats} fontSize={10} numberOfLines={1} mode={ResizeTextMode.max_lines}>sats</AutoSizeText>
                        <DialogInput isDialogVisible={boostAmountDialogVisible}
                                     dialogStyle={styles(_isLightTheme).customAmountDialog}
                                     title={"Enter a Custom Amount:"}
                                     textInputProps={{maxLength:10,keyboardType:"number-pad"}}
                                     titleStyle={styles(_isLightTheme).titleStyle}
                                     inputStyle={styles(_isLightTheme).inputStyle}
                                     cancelStyle={styles(_isLightTheme).cancelStyle}
                                     submitText={"APPROVE"}
                                     submitStyle={styles(_isLightTheme).submitStyle}
                                     submitInput={ (customBoostAmount) => {submitCustomBoostAmount(customBoostAmount)} }
                                     closeDialog={closeBoostAmountDialog}>
                        </DialogInput>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (boostAmount < boostList.length - 1) {
                            setBoostAmount(boostAmount + 1);
                        } else {
                            setBoostAmount(boostList.length - 1);
                        }
                    }}>
                    <FeatherIcon name="plus-circle" style={styles(_isLightTheme).plusIcon}></FeatherIcon>
                </TouchableOpacity>
            </View>
            <View style={styles(_isLightTheme).divider} />
            <View style={styles(_isLightTheme).satsPerMinRow}>
                <TouchableOpacity
                    onPress={() => {
                        if (satsPerMinuteAmount >= 1) {
                            setSatsPerMinuteAmount(satsPerMinuteAmount - 1);
                            dispatch(changeSatsPerMinute(satsPerMinuteList[satsPerMinuteAmount - 1]));
                        } else {
                            setSatsPerMinuteAmount(0);
                            dispatch(changeSatsPerMinute(satsPerMinuteList[0]));
                        }
                    }}>
                    <FeatherIcon name="minus-circle" style={styles(_isLightTheme).minusIcon1}></FeatherIcon>
                </TouchableOpacity>
                <TouchableOpacity onLongPress={showSatsPerMinAmountDialog}>
                    <View style={styles(_isLightTheme).satsPerMinAmountColumn}>
                        <AutoSizeText style={styles(_isLightTheme).satsPerMinAmount} fontSize={12} numberOfLines={1} mode={ResizeTextMode.max_lines}>
                            {formatAmount(satsPerMinuteList[satsPerMinuteAmount])}
                        </AutoSizeText>
                        <AutoSizeText style={styles(_isLightTheme).satsPerMinute} fontSize={10} numberOfLines={1} mode={ResizeTextMode.max_lines}>sats/min</AutoSizeText>
                        <DialogInput isDialogVisible={satsPerMinAmountDialogVisible}
                                     dialogStyle={styles(_isLightTheme).customAmountDialog}
                                     title={"Enter a Custom Amount:"}
                                     textInputProps={{maxLength:7,keyboardType:"number-pad"}}
                                     titleStyle={styles(_isLightTheme).titleStyle}
                                     inputStyle={styles(_isLightTheme).inputStyle}
                                     cancelStyle={styles(_isLightTheme).cancelStyle}
                                     submitText={"APPROVE"}
                                     submitStyle={styles(_isLightTheme).submitStyle}
                                     submitInput={ (customSatsPerMinAmount) => {submitCustomSatsPerMinAmount(customSatsPerMinAmount)} }
                                     closeDialog={closeSatsPerMinAmountDialog}>
                        </DialogInput>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (satsPerMinuteAmount < satsPerMinuteList.length - 1) {
                            setSatsPerMinuteAmount(satsPerMinuteAmount + 1);
                            dispatch(changeSatsPerMinute(satsPerMinuteList[satsPerMinuteAmount + 1]));
                        } else {
                            setSatsPerMinuteAmount(satsPerMinuteList.length - 1);
                            dispatch(changeSatsPerMinute(satsPerMinuteList[satsPerMinuteList.length - 1]));
                        }
                    }}>
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
        borderColor: light.dividerColor,
        borderStyle: 'solid',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: light.backgroundColor,
        height: 56,
        justifyContent: 'space-between'
    },
    buttonRow: {
        flex: 11,
        flexDirection: 'row',
        alignItems: "center",
        alignSelf: "center",
        marginLeft: 16,
        marginRight: 12,
    },
    boostRow: {
        flex: 11,
        flexDirection: 'row',
        alignItems: "center",
        alignSelf: "center",
        marginLeft: 16,
        marginRight: 16,
    },
    divider: {
        height: 52,
        width: 2,
        backgroundColor: light.dividerColor,
    },
    satsPerMinRow: {
        flex: 14,
        flexDirection: 'row',
        alignItems: "center",
        alignSelf: "center",
        marginLeft: 12,
        marginRight: 16,
    },
    button: {
        width: 94,
        height: 32,
        backgroundColor: light.backgroundColor,
        borderWidth: 1,
        borderColor: dark.primaryColor,
        borderRadius: 6,
    },
    imageRow: {
        height: 16,
        flexDirection: 'row',
        flex: 1,
        marginRight: 7,
        marginLeft: 8,
        marginTop: 8,
    },
    image: {
        width: 16,
        height: 16,
    },
    boost2: {
        fontFamily: 'IBMPlexSans-SemiBold',
        color: dark.primaryColor,
        height: 16,
        width: 50,
        lineHeight: 18,
        marginLeft: 9,
        marginTop: -2,
    },
    boostAmountColumn: {
        width: 34,
        alignItems: "center",
        alignSelf: "center",
        marginLeft: 6,
        marginRight: 6,
    },
    satsPerMinAmountColumn: {
        width: 48,
        alignItems: "center",
        alignSelf: "center",
        marginLeft: 6,
        marginRight: 6,
    },
    boostAmount: {
        fontFamily: 'IBMPlexSans-SemiBold',
        color: light.fontColor,
        letterSpacing: 1,
        lineHeight: 20,
        textAlign: 'center',
    },
    satsPerMinAmount: {
        fontFamily: 'IBMPlexSans-SemiBold',
        color: light.fontColor,
        letterSpacing: 1,
        lineHeight: 20,
        textAlign: 'center',
    },
    sats: {
        fontFamily: 'IBMPlexSans',
        color: light.fontColor,
        letterSpacing: 1,
        textAlign: 'center',
    },
    satsPerMinute: {
        fontFamily: 'IBMPlexSans',
        color: light.fontColor,
        textAlign: 'center',
        letterSpacing: 1,
    },
    minusIcon: {
        color: dark.primaryColor,
        fontSize: 20,
    },
    plusIcon: {
        color: dark.primaryColor,
        fontSize: 20,
    },
    minusIcon1: {
        color: dark.primaryColor,
        fontSize: 20,
    },
    plusIcon1: {
        color: dark.primaryColor,
        fontSize: 20,
    },
    titleStyle:{
        fontFamily: 'IBMPlexSans',
        fontSize: 18,
        letterSpacing: 0.25,
        color: _isLightTheme ? "#334560" : "#ffffff",
        textAlign:'left',
    },
    inputStyle:{
        fontFamily: 'IBMPlexSans',
        textAlign:'left',
        fontSize: 16,
        color: _isLightTheme ? "#334560" : "rgba(255,255,255,0.6)",
        borderBottomColor: _isLightTheme ? "rgba(51,69,96,0.25)" : "rgba(255,255,255,0.25)",
        borderBottomWidth: 1,
        marginTop: 8,
        padding: 8,
    },
    submitStyle: {
        fontFamily: 'IBMPlexSans',
        fontSize: 14.3,
        letterSpacing: 0.25,
        textAlign:'right',
        padding: 8,
        color: _isLightTheme ? light.buttonColor : dark.buttonColor,
    },
    cancelStyle: {
        fontFamily: 'IBMPlexSans',
        fontSize: 14.3,
        letterSpacing: 0.25,
        textAlign:'right',
        padding: 8,
        color: _isLightTheme ? light.buttonColor : dark.buttonColor,
    },
    customAmountDialog: {
        backgroundColor: _isLightTheme ? light.dialogColor : dark.dialogColor,
        borderRadius: 12,
    }
});

function _mapDispatchToProps(dispatch: Function, ownProps): Object {
    return {};
}


function _mapStateToProps(state, ownProps) {
    const { isLightTheme, paymentOptions } = state['features/base/settings'];
    const participants = state['features/base/participants'];
    const presenter = participants
        .find(participant => participant?.email?.startsWith('breez:'));
    let paymentInfo = presenter?.email?.substring(6);
    let _paymentOptions = JSON.parse(paymentOptions);
    return {
        _isLightTheme: Boolean(isLightTheme),
        _paymentInfo: paymentInfo,
        _presetBoostAmountsList: insert(_paymentOptions.customBoostValue, _paymentOptions.presetBoostAmountsList),
        _presetSatsPerMinuteAmountsList: insert(_paymentOptions.customSatsPerMinAmountValue, _paymentOptions.presetSatsPerMinuteAmountsList),
        _selectedBoostAmountIndex: _paymentOptions.selectedBoostAmountIndex,
        _selectedSatsPerMinuteAmountIndex: _paymentOptions.selectedSatsPerMinuteAmountIndex,
        _customBoostValue: _paymentOptions.customBoostValue,
        _customSatsPerMinAmountValue: _paymentOptions.customSatsPerMinAmountValue,
    };
}

function insert(element, array) {
    if(element > array[0]) {
	    array.splice(locationOf(element, array) + 1, 0, element);
	}
	return array;
}

function locationOf(element, array, start, end) {
	start = start || 0;
	end = end || array.length;
	var pivot = parseInt(start + (end - start) / 2, 10);
	if (end - start <= 1 || array[pivot] === element) return pivot;
	if (array[pivot] < element) {
		return locationOf(element, array, pivot, end);
	}
	else {
		return locationOf(element, array, start, pivot);
	}
}

export default connect(_mapStateToProps, _mapDispatchToProps)(PaymentAdjuster);
