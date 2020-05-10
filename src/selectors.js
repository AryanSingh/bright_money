import { createSelector } from 'reselect';

export const billsSelector = (state) => state.data;

export const sortedBillsSelector = createSelector(billsSelector, (bills) => {
  let newArr = [...bills];
  newArr = newArr.map((bill) => {
    bill.amount = Number(bill.amount);
    return bill;
  });
  newArr.sort((a, b) => {
    // let total = Object.values(student.marks).reduce((a, b) => a + b, 0);
    return new Date(a.date) - new Date(b.date);
  });
  return newArr;
});

export const categorySelector = createSelector(billsSelector, (bills) => {
  let newArr = [];
  bills.map((bill) => {
    // let total = Object.values(student.marks).reduce((a, b) => a + b, 0);
    if (newArr.indexOf(bill.category) === -1) {
      newArr.push({ value: bill.category, label: bill.category });
    }
    return newArr;
  });
  return newArr;
});
