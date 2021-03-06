import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { BrowserRouter as Router} from 'react-router-dom';
import { HashRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/Store';
import { persistStore } from 'redux-persist'
import { PersistGate} from 'redux-persist/integration/react'

let persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
		{/* <Router> */}
		<HashRouter basename='/'>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>
		</HashRouter>
		{/* </Router> */}
		
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
