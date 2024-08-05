export const logFormData = (data: FormData) => {
  // @ts-ignore
  for (let val of data.entries()) {
    console.log(val[0] + "\n" + val[1] + "\n");
  }
};
