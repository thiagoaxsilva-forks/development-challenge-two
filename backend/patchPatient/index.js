const AWS = require("aws-sdk");
AWS.config.update({ region: "sa-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: "sa-east-1",
});

exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);

  const patientId = requestBody.patientId;
  const updateKey = requestBody.updateKey;
  const updateValue = requestBody.updateValue;

  const params = {
    TableName: "patients",
    Key: {
      id: patientId,
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ":value": updateValue,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const body = await dynamodb
      .update(params)
      .promise()
      .then((response) => {
        const body = {
          Operation: "UPDATE",
          Message: "SUCCESS",
          UpdatedAttributes: response,
        };

        return body;
      });

    const modifiedDateHour = new Date().toUTCString();
    const newParams = {
      TableName: "patients",
      Key: {
        id: patientId,
      },
      UpdateExpression: "set modifiedAt = :value",
      ExpressionAttributeValues: {
        ":value": modifiedDateHour,
      },
      ReturnValues: "UPDATED_NEW",
    };
    await dynamodb.update(newParams).promise();

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
