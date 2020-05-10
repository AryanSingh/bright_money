export const getData = () => ({
  type: 'GET_DATA',
});

export const createBill = (data) => {
  return {
    type: 'CREATE_BILL',
    data: data,
  };
};

export const editBill = (data) => {
  return {
    type: 'EDIT_BILL',
    data: data,
  };
};
