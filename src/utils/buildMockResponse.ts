const buildMockResponse = <T>(returnValue: T, apiPath: string) =>
  new Promise<{ data: T }>((resolve) => {
    setTimeout(() => {
      console.log(`mockResponse for ${apiPath}`, { returnValue });
      resolve({ data: returnValue });
    }, 1000);
  });

export default buildMockResponse;
