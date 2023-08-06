// serverless 함수
exports.handler = async function () {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Leon',
      age: 25,
      email: 'leon@abc.com',
    }),
  };
};
