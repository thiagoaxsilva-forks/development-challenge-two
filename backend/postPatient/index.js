const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({ region: "sa-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: "sa-east-1",
});

exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  const patientId = uuidv4();

  const patient = {
    ...requestBody,
    id: patientId,
    createdAt: new Date().toUTCString(),
    modifiedAt: new Date().toUTCString(),
  };

  const params = {
    TableName: "patients",
    id: patientId,
    Item: patient,
  };

  try {
    const body = await dynamodb
      .put(params)
      .promise()
      .then(() => {
        return {
          Operation: "SAVE",
          Message: "SUCCESS",
          Item: requestBody,
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
