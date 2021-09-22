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
    backgroundColor: 'rgba(243,248,252,.25)',
    primaryColor: 'rgba(0,133,251,1)',
    fontColor: 'rgba(0,0,0,1)',
    dividerColor: 'rgba(33,33,33,0.1)'
};
const dark = {
    backgroundColor: 'rgba(21,42,61,0.25)',
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

    const [boostagramDialogVisible, setBoostagramDialogVisible] = React.useState(false);

    const showBoostagramDialog = () => {
        setBoostagramDialogVisible(true);
    };

    const closeBoostagramDialog = () => {
        setBoostagramDialogVisible(false);
    };

    function submitBoostagram(boostagramMessage) {
        setBoostagramDialogVisible(false);
        confetti && confetti.start();
        dispatch(onBoost(boostList[boostAmount],_paymentInfo,boostagramMessage));
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
                <TouchableOpacity onLongPress={showBoostagramDialog} onPress={boost} style={styles(_isLightTheme).button}>
                    <View style={styles(_isLightTheme).imageRow}>
                        <Image
                            source={require('../assets/icon_boost.png')}
                            tintColor={_isLightTheme ? light.primaryColor : dark.primaryColor}
                            resizeMode="contain"
                            style={styles(_isLightTheme).image}
                        ></Image>
                        <Text style={styles(_isLightTheme).boost2}>BOOST!</Text>
                        <ConfettiCannon count={100} fadeOut={true}keyboardType explosionSpeed={1000} fallSpeed={3000} origin={{x: -80, y: 0}} autoStart={false} ref={ref => (confetti = ref)} />
                        <DialogInput isDialogVisible={boostagramDialogVisible}
                                     dialogStyle={styles(_isLightTheme).boostagramDialog}
                                     title={"Send a Boostagram"}
                                     textInputProps={{maxLength:90,}}
                                     titleStyle={styles(_isLightTheme).titleStyle}
                                     inputStyle={styles(_isLightTheme).inputStyle}
                                     cancelStyle={styles(_isLightTheme).cancelStyle}
                                     submitText={"BOOST!"}
                                     submitStyle={styles(_isLightTheme).submitStyle}
                                     submitInput={ (boostagramMessage) => {submitBoostagram(boostagramMessage)} }
                                     closeDialog={closeBoostagramDialog}>
                        </DialogInput>
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
                <TouchableOpacity onLongPress={showBoostAmountDialog}>
                    <View style={styles(_isLightTheme).boostAmountColumn}>
                        <AutoSizeText style={styles(_isLightTheme).boostAmount} fontSize={16} numberOfLines={1} mode={ResizeTextMode.max_lines}>
                            {formatAmount(boostList[boostAmount])}
                        </AutoSizeText>
                        <Text style={styles(_isLightTheme).sats}>sats</Text>
                        <DialogInput isDialogVisible={boostAmountDialogVisible}
                                     dialogStyle={styles(_isLightTheme).boostagramDialog}
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
                    }}
                >
                    <FeatherIcon name="plus-circle" style={styles(_isLightTheme).plusIcon}></FeatherIcon>
                </TouchableOpacity>
                <View style={styles(_isLightTheme).divider} />
                <TouchableOpacity
                    onPress={() => {
                        if (satsPerMinuteAmount >= 1) {
                            setSatsPerMinuteAmount(satsPerMinuteAmount - 1);
                            dispatch(changeSatsPerMinute(satsPerMinuteList[satsPerMinuteAmount - 1]));
                        } else {
                            setSatsPerMinuteAmount(0);
                            dispatch(changeSatsPerMinute(satsPerMinuteList[0]));
                        }
                    }}
                >
                    <FeatherIcon name="minus-circle" style={styles(_isLightTheme).minusIcon1}></FeatherIcon>
                </TouchableOpacity>
                <TouchableOpacity onLongPress={showSatsPerMinAmountDialog}>
                    <View style={styles(_isLightTheme).satsPerMinAmountColumn}>
                        <AutoSizeText style={styles(_isLightTheme).satsPerMinAmount} fontSize={16} numberOfLines={1} mode={ResizeTextMode.max_lines}>
                            {formatAmount(satsPerMinuteList[satsPerMinuteAmount])}
                        </AutoSizeText>
                        <Text style={styles(_isLightTheme).satsPerMinute}>sats/min</Text>
                        <DialogInput isDialogVisible={satsPerMinAmountDialogVisible}
                                     dialogStyle={styles(_isLightTheme).boostagramDialog}
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
    titleStyle:{
        fontFamily: 'IBMPlexSans-SemiBold',
        fontWeight: 'bold',
        fontSize: 16,
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
        fontFamily: 'IBMPlexSans-SemiBold',
        fontWeight: "bold",
        fontSize: 14.3,
        letterSpacing: 0.25,
        textAlign:'right',
        padding: 8,
        color: _isLightTheme ? "rgba(5, 93, 235, 1)" : "#7aa5eb",
    },
    cancelStyle: {
        fontFamily: 'IBMPlexSans-SemiBold',
        fontWeight: "bold",
        fontSize: 14.3,
        letterSpacing: 0.25,
        textAlign:'right',
        padding: 8,
        color: _isLightTheme ? "rgba(5, 93, 235, 1)" : "#7aa5eb",
    },
    boostagramDialog: {
        backgroundColor: _isLightTheme ? "#ffffff" : '#152a3d',
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
