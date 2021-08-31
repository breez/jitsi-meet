// @flow

import { BOOST_PAYMENT, SET_SATS_PER_MINUTE, SET_CUSTOM_BOOST_AMOUNT, SET_CUSTOM_SATS_PER_MINUTE } from './actionTypes';

/**
 * Sends host of the conference the boost amount
 *
 * @param {int} boostAmount - Amount to be sent to host in Sats
 * @public
 * @returns {{
 *     type: BOOST_PAYMENT,
 *     boostAmount: number,
 *     paymentInfo: string
 * }}
 */
export function onBoost(boostAmount: number, paymentInfo: string) {
    return {
        type: BOOST_PAYMENT,
        boostAmount,
        paymentInfo
    };
}

/**
 * Change Sats/Minute that is being streamed to the host of the conference
 *
 * @param {int} satsPerMinute - Amount being streamed to host in Sats
 * @protected
 * @returns {{
 *     type: SET_SATS_PER_MINUTE,
 *     satsPerMinute: number
 * }}
 */
export function changeSatsPerMinute(satsPerMinute: number) {
    return {
        type: SET_SATS_PER_MINUTE,
        satsPerMinute
    };
}

/**
 * Opens up a dialog to set a custom boost amount
 *
 * @protected
 * @returns {{
 *     type: SET_CUSTOM_BOOST_AMOUNT,
 * }}
 */
export function setCustomBoostAmount() {
    return { type: SET_CUSTOM_BOOST_AMOUNT };
}

/**
 * Opens up a dialog to set a custom Sats/Minute amount
 *
 * @protected
 * @returns {{
 *     type: SET_CUSTOM_SATS_PER_MINUTE,
 * }}
 */
export function setCustomSatsPerMinAmount() {
    return { type: SET_CUSTOM_SATS_PER_MINUTE };
}
