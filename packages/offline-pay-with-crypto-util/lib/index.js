'use strict'

const utils = require('./utils')

module.exports = offlinePayWithCryptoUtil

/***
 * Pay Offline With Crypto by Chimoney
 * @description offlinePayWithCryptoUtil contains properties responsible to handling payments with crypto
 * @param {*} options
 */

function offlinePayWithCryptoUtil({
  onOpen = () => {},
  onClose = () => {},
  onComplete,
  ...rest
}) {
  if (typeof arguments[0] !== 'object') {
    console.error(
      `Error: offlinePayWithCryptoUtil expected an object but got a ${typeof arguments[0]}`
    )
    return
  }
  // useful configuration data e.g mode_of_payment, reference, typeofTrans(i.e airtime) etc.
  this.config = { ...rest }

  offlinePayWithCryptoUtil.prototype.onOpen = onOpen
  offlinePayWithCryptoUtil.prototype.onClose = onClose
  offlinePayWithCryptoUtil.prototype.onComplete = onComplete
  offlinePayWithCryptoUtil.prototype.utils = utils()
}

offlinePayWithCryptoUtil.prototype.setup = function () {
  offlinePayWithCryptoUtil.prototype.utils.addStyle()
  offlinePayWithCryptoUtil.prototype.utils.init({ onOpen: this.onOpen, ...this.config })
}

offlinePayWithCryptoUtil.prototype.launch = function () {
  offlinePayWithCryptoUtil.prototype.utils.openModal()
}

offlinePayWithCryptoUtil.prototype.closeModal = function () {
  offlinePayWithCryptoUtil.prototype.utils.closeModal()
  this.onClose()
}

offlinePayWithCryptoUtil.prototype.done = function (data) {
  this.onComplete({ ...data})
}

if (global.window !== undefined) {
  window.OfflinePayWithCryptoUtil = offlinePayWithCryptoUtil
}
