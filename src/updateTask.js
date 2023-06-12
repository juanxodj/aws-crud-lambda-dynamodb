const AWS = require("aws-sdk");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

const updateTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { title, description, done } = event.body;

  const params = {
    TableName: "TaskTable",
    Key: {
      id,
    },
    UpdateExpression:
      "SET title = :title, description = :description, done = :done",
    ExpressionAttributeValues: {
      ":title": title,
      ":description": description,
      ":done": done,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const { Attributes } = await dynamoDB.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(Attributes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al actualizar la tarea" }),
    };
  }
};

module.exports = { updateTask: middy(updateTask).use(jsonBodyParser()) };
