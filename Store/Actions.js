export const GetuserDataRegister = (data) => ({
  type: "LOGIN",
  payload: data,
});

export const changemodife = (data) => ({
  type: "TRANS",
  payload: data,
});

export const GetLastteam = (data) => ({
  type: "GetLast",
  payload: data,
});

export const Getcaptine = (data) => ({
  type: "Getcaptine",
  payload: data,
});

export const Getlastpoint = (data) => ({
  type: "Getpoints",
  payload: data,
});
