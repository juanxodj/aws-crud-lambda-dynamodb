const AWS = require("aws-sdk");

const getTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const params = {
    TableName: "TaskTable",
    Key: {
      id,
    },
  };

  try {
    const { Item } = await dynamoDB.get(params).promise();
    if (Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(Item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Tarea no encontrada" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al obtener la tarea" }),
    };
  }
};

module.exports = { getTask };
