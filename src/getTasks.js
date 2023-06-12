const AWS = require("aws-sdk");

const getTasks = async () => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "TaskTable",
  };

  try {
    const { Items } = await dynamoDB.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al obtener las tareas" }),
    };
  }
};

module.exports = { getTasks };
