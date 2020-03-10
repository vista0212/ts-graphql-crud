export const catchDBError = () => (err: Error) => {
  console.log(err);
  throw new Error('Database Error');
};
