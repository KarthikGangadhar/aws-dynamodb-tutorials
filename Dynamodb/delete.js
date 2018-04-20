'use strict';

const AWS = require('aws-sdk');
const config = require('./config')();

// credentials required for local execution
let credentials = new AWS.Credentials(config.ACCESSKEY, config.SECRETEKEY, config.SESSIONTOKEN);
AWS.config.update({
    credentials: credentials,
    region: 'us-west-2'
});

//creating client
let docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });


/**
 * Delete item from dybnamodb by id.
 *
 * @since 3.4.0
 * @category DynamoDB
 * @param {keytype} primaryKeyId The primary key of the data item.
 * @returns {object} Returns the status after deleting data item.
 * @example
 *
 * DeleteDynamoDBData("123")
 * // => {}
 */

const DeleteDynamoDBData = (primaryKeyId) => {
    let params = {
        TableName: config.DYNAMODBTABLENAME,
        Key: {
            id: primaryKeyId
        }
    };
    return new Promise((resolve, reject) => {
        console.log("Attempting delete for the Key...", primaryKeyId);
        docClient.delete(params, (err, data) => {
            if (err) {
                console.error(`Unable to delete item : \n ${{ message: err.message, stack: err.stack }}`);
                reject({ message: err.message, stack: err.stack });
            } else {
                console.log(`Delete Successfully: ${JSON.stringify(data, null, 2)}`);
                resolve(data);
            }
        });
    });
};

module.exports = DeleteDynamoDBData;