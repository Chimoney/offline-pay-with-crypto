'use strict'

module.exports = offlinePayWithCryptoWidget

const utils = require('./utils')

/***
 * Pay Offline With Crypto by Chimoney
 * @description PayWithCrypto contains properties responsible to handling payments with crypto
 * @param {*} options
 */

function offlinePayWithCryptoWidget({
  onOpen = () => {},
  onClose = () => {},
  onComplete = () => {},
  ...rest
}) {
  if (typeof arguments[0] !== 'object') {
    console.error(
      `Error: offlinePayWithCryptoWidget expected an object but got a ${typeof arguments[0]}`
    )
    return
  }
  // useful configuration data e.g mode_of_payment, reference, typeofTrans(i.e airtime) etc.
  this.config = { ...rest }

  offlinePayWithCryptoWidget.prototype.onOpen = onOpen
  offlinePayWithCryptoWidget.prototype.onClose = onClose
  offlinePayWithCryptoWidget.prototype.onComplete = onComplete
  offlinePayWithCryptoWidget.prototype.utils = utils()
}

offlinePayWithCryptoWidget.prototype.setup = function () {
  offlinePayWithCryptoWidget.prototype.utils.addStyle()
  offlinePayWithCryptoWidget.prototype.utils.init({ onOpen: this.onOpen })
}

offlinePayWithCryptoWidget.prototype.launch = function () {
  offlinePayWithCryptoWidget.prototype.utils.openModal()
}

offlinePayWithCryptoWidget.prototype.closeModal = function () {
  offlinePayWithCryptoWidget.prototype.utils.closeModal()
  this.onClose()
}

if (global.window !== undefined) {
  window.OfflinePayWithCryptoWidget = offlinePayWithCryptoWidget
}

module.exports = offlinePayWithCryptoWidget
