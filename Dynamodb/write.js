'use strict';

const AWS = require('aws-sdk');
const config = require('./config')();

// credentials required for local execution
let credentials = new AWS.Credentials(config.ACCESSKEY, config.SECRETEKEY, config.SESSIONTOKEN);
AWS.config.update({
    credentials: credentials,
    paramValidation: false,
    region: 'us-west-2'
});

//creating client
let docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', convertEmptyValues: true });

/**
 * write items to dynamodb.
 *
 * @category DynamoDB
 * @param {object} params This should conatains tablename and the json want to insert into db.
 * @returns {object} Returns insertion result.
 * @example
 *
 * WriteToDynamoDB(params, callback)
 * // => {}
 */

var params = {
    TableName: config.DYNAMODB_FAILED,
    Item: dataItem
};

const WriteToDynamoDB = docClient.put(params, (err, data) => {
    return new Promise((resolve, reject) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(data);
        }
    });
});

module.exports = WriteToDynamoDB;