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
 * scan items from dynamodb.
 *
 * @since 3.4.0
 * @category DynamoDB
 * @param {object} params This should conatains tablename.
 * @returns {object} Returns array of items matching query params.
 * @example
 *
 * ScanDynamoDBData(params, callback)
 * // => {}
 */

let params = {
    TableName: config.DYNAMODBTABLENAME,
    ProjectionExpression: config.PROJECTEXPRESSION
};

const ScanDynamoDBData = docClient.scan(params, (err, data) => {
    return new Promise((resolve, reject) => {
        if (!err) {
            //data will be array of query results 
            //perform operations on data

            //if end is not reached
            if (typeof data.LastEvaluatedKey !== 'undefined') {
                //scaning for Next Batch...
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                resolve(ScanDynamoDBData(data));
            }
            else {
                resolve(null);
            }
        } else {
            reject(err);
        }
    });
});

module.exports = ScanDynamoDBData;