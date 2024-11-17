export const pattern = {
  id: /^(?=.{4,16}$)([a-z]+|\d+|[a-z\d]+)$/,
  password: /^(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])(?!.*[A-Z\s]).{4,16}$/,
};
