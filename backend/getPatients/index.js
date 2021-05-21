const AWS = require("aws-sdk");
AWS.config.update({ region: "sa-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: "sa-east-1",
});

exports.handler = async (event) => {
  const params = {
    TableName: "patients",
  };
  const allPatients = await scanDynamoRecords(params, []);
  const body = {
    patients: allPatients,
  };
  return buildResponse(200, body);
};

const scanDynamoRecords = async (scanParams, itemArray) => {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch (error) {
    console.error(error);
  }
};

const buildResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(body),
  };
};
