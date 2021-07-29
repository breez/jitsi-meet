// @flow

import { BOOST_PAYMENT, SET_SATS_PER_MINUTE, SET_CUSTOM_BOOST_AMOUNT, SET_CUSTOM_SATS_PER_MINUTE } from './actionTypes';

/**
 * ? Add explanation ?
 *
 * @param {int} boostAmount - ? Add explanation ?
 * @public
 * @returns {{
 *     type: BOOST_PAYMENT,
 *     boostAmount: number
 * }}
 */
export function onBoost(boostAmount: number) {
    // TODO:
}

/**
 * ? Add explanation ?
 *
 * @param {int} satsPerMinute - ? Add explanation ?
 * @protected
 * @returns {{
 *     type: SET_SATS_PER_MINUTE,
 *     satsPerMinute: number
 * }}
 */
export function changeSatsPerMinute(satsPerMinute: number) {
    // TODO:
}

/**
 * ? Add explanation ?
 *
 * @protected
 * @returns {{
 *     type: SET_CUSTOM_BOOST_AMOUNT,
 * }}
 */
export function setCustomBoostAmount() {
    // TODO:
}

/**
 * ? Add explanation ?
 *
 * @protected
 * @returns {{
 *     type: SET_CUSTOM_SATS_PER_MINUTE,
 * }}
 */
export function setCustomSatsPerMinAmount() {
    // TODO:
}
