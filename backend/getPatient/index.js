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
  };
  return await dynamodb
    .get(params)
    .promise()
    .then(
      (response) => {
        return buildResponse(200, response.Item);
      },
      (error) => {
        console.error(error);
      }
    );
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
