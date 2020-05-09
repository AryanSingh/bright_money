const initialState = {
  data:  [
    {
      "id": 1,
      "description": "Dominoes",
      "category": "FoodNDining",
      "amount": "430",
      "date": "01-02-2020"
    },
    {
      "id": 2,
      "description": "Car wash",
      "category": "utility",
      "amount": "500",
      "date": "01-06-2020"
    },
    {
      "id": 3,
      "description": "Amazon",
      "category": "shopping",
      "amount": "2030",
      "date": "01-07-2020"
    },
    {
      "id": 4,
      "description": "House rent",
      "category": "Food & Dining",
      "amount": "35900",
      "date": "01-03-2020"
    },
    {
      "id": 5,
      "description": "Tuition",
      "category": "education",
      "amount": "2200",
      "date": "01-12-2020"
    },
    {
      "id": 6,
      "description": "Laundry",
      "category": "Personal Care",
      "amount": "320",
      "date": "01-14-2020"
    },
    {
      "id": 7,
      "description": "Vacation",
      "category": "Travel",
      "amount": "3430",
      "date": "01-18-2020"
    }
  ],
  loading: false,
};
const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'DATA_RECEIVED':
      return { ...state, data: action.data, loading: false };
    case 'DATA_FETCHING':
      return { ...state, loading: true };
    // case 'NEWS_RECEIVED':
    // 	return { ...state, news: action.json[0], loading: false }
    default:
      return state;
  }
};
export default reducer;
