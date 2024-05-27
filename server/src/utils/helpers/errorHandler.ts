interface ServerError {
  message: string;
}

//@ts-ignore
export const errorHandler = (error): void => {
  console.log("\x1b[33mServer error:\x1b[0m " + error.message);
};
