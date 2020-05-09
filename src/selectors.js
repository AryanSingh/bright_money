import { createSelector } from 'reselect';

export const billsSelector = (state) => state.data;

export const categorySelector = createSelector(
  billsSelector,
  (bills) =>{
  	let newArr = [];
		bills.map((bill) => {
			// let total = Object.values(student.marks).reduce((a, b) => a + b, 0);
			if(newArr.indexOf(bill.category) === -1){
				newArr.push({value: bill.category, label:bill.category});
			}
			return newArr;
		})
		return newArr;
	}

);
