import { put, takeLatest, all } from 'redux-saga/effects';
function* fetchData() {
  yield put({ type: 'DATA_FETCHING' });

  const json = yield fetch(
    'https://api.npoint.io/1953ab244d9a35de08a6'
  ).then((response) => response.json());

  console.log('json', json);
  yield put({ type: 'DATA_RECEIVED', data: Object.values(json) });
}
function* actionWatcher() {
  yield takeLatest('GET_DATA', fetchData);
}
export default function* rootSaga() {
  yield all([actionWatcher()]);
}
