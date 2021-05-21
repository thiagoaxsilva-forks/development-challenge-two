const AWS = require("aws-sdk");
AWS.config.update({ region: "sa-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: "sa-east-1",
});

exports.handler = async (event) => {
  const patientId = event.queryStringParameters.patientId;

  const params = {
    TableName: "patients",
    Key: {
      id: patientId,
    },
    ReturnValues: "ALL_OLD",
  };

  try {
    const body = await dynamodb
      .delete(params)
      .promise()
      .then((response) => {
        return {
          Operation: "DELETE",
          Message: "SUCCESS",
          Item: response,
        };
      });
    return buildResponse(200, body);
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
