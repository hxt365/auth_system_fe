export const hasErrors = fieldsError => {
  console.log(fieldsError);
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};
