const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const { title, description } = JSON.parse(event.body);
  const createdAt = Date.now().toString();
  const id = v4();

  const params = {
    TableName: "TaskTable",
    Item: {
      id,
      title,
      description,
      createdAt,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al crear el usuario" }),
    };
  }
};

module.exports = { addTask };
