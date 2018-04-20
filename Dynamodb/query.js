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
 * query items from dybnamodb with query params.
 *
 * @since 3.4.0
 * @category DynamoDB
 * @param {object} params This should conatains tablename , tableIndex and key conditions.
 * @returns {object} Returns array of items matching query params.
 * @example
 *
 * QueryDynamoDBData(params, callback)
 * // => {}
 */

let params = {
    TableName: config.DYNAMODBTABLENAME,
    IndexName: config.DYNAMODB_INDEX,
    KeyConditionExpression: '#key = :value',
    ExpressionAttributeValues: {
        ':value': 'key_value'
    },
    ExpressionAttributeNames: {
        '#key': 'key_name'
    }
};

const QueryDynamoDBData = docClient.query(params, (err, data) => {
    return new Promise((resolve, reject) => {
        if (!err) {
            //data will be array of query results 
            //perform operations on data

            //if end is not reached
            if (typeof data.LastEvaluatedKey !== 'undefined') {
                //Querying for Next Batch...
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                resolve(QueryDynamoDBData(data));
            }
            else {
                resolve(null);
            }
        } else {
            reject(err);
        }
    });
});

module.exports = QueryDynamoDBData