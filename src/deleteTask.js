const AWS = require("aws-sdk");

const deleteTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const params = {
    TableName: "TaskTable",
    Key: {
      id,
    },
  };

  try {
    await dynamoDB.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Tarea eliminada correctamente" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al eliminar la tarea" }),
    };
  }
};

module.exports = {
  deleteTask,
};
