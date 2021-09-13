/**
 * The type of redux action to send Sats to room owner
 *
 * {
 *     type: BOOST_PAYMENT,
 *     boostAmount: number,
 *     paymentInfo: string,
 *     boostagram: string
 * }
 *
 * @protected
 */
export const BOOST_PAYMENT = 'BOOST_PAYMENT';

/**
 * The type of redux action to set Sats/minute
 *
 * {
 *     type: SET_SATS_PER_MINUTE,
 *     satsPerMinute: number
 * }
 *
 * @protected
 */
export const SET_SATS_PER_MINUTE = 'SET_SATS_PER_MINUTE';

/**
 * The type of redux action to set custom boost amount
 *
 * {
 *     type: SET_CUSTOM_BOOST_AMOUNT,
 * }
 *
 * @protected
 */
export const SET_CUSTOM_BOOST_AMOUNT = 'SET_CUSTOM_BOOST_AMOUNT';

/**
 * The type of redux action to set custom sats/minute
 *
 * {
 *     type: SET_CUSTOM_SATS_PER_MINUTE,
 * }
 *
 * @protected
 */
export const SET_CUSTOM_SATS_PER_MINUTE = 'SET_CUSTOM_SATS_PER_MINUTE';
