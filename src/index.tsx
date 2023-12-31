import React from 'react'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './core/redux/store'
import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom/client'
import { Notification } from './common/components/notification/notification'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Notification />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
