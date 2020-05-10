import { put, takeLatest, all } from 'redux-saga/effects';
function* fetchData() {
  yield put({ type: 'DATA_FETCHING' });

  const json = yield fetch(
    'https://api.npoint.io/1953ab244d9a35de08a6'
  ).then((response) => response.json());

  console.log('json', json);
  yield put({ type: 'DATA_RECEIVED', data: Object.values(json) });
}

function* createBill(action) {
  yield put({ type: 'BILL_CREATE', data: action.data });
}

function* editBill(action) {
  yield put({ type: 'BILL_EDIT', data: action.data });
}
function* actionWatcher() {
  yield takeLatest('GET_DATA', fetchData);
  yield takeLatest('CREATE_BILL', createBill);
  yield takeLatest('EDIT_BILL', editBill);
}
export default function* rootSaga() {
  yield all([actionWatcher()]);
}
