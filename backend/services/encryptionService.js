var bcrypt = require('bcrypt-nodejs');
var CryptoJS = require('node-cryptojs-aes').CryptoJS;
var SecretPhrases = require('../constants/secretPhrases');

function EncryptionService() {

}

EncryptionService.prototype.encryptString = encryptString;
EncryptionService.prototype.checkPassword = checkPassword;

function encryptString(stringToEncrypt, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(stringToEncrypt, null, null, function(err, hash) {
            callback(err, hash);
        });
    });
}

function checkPassword(password, encryptedPassword, callback) {
    bcrypt.compare(password, encryptedPassword, function(err, result) {
        if (result) {
            callback(err, true);
        } else {
            callback(err, false);
        }
    });
}

module.exports = new EncryptionService();
