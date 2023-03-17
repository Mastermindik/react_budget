import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-calendar/dist/Calendar.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from "./components/static/NotFound"
import AddTransaction from './components/addIncomes/AddTransaction';
import IncomesHistory from "./components/history/IncomesHistory";
import Statistic from "./components/statistic/Statistic"
import LogIn from './components/static/LogIn';
import SignUp from './components/static/SignUp';
import Planedtransaction from './components/palnedTransaction/PlanedTransaction';

const router = createBrowserRouter(
  [
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound/>,
    children: [{
      path: "/addtransaction",
      element: <AddTransaction/>
    }, {
      path: "/history",
      element: <IncomesHistory/>
    }, {
      path: "/statistic",
      element: <Statistic/>
    }, {
      path: "/planed",
      element: <Planedtransaction/>
    }]
  }, {
    path: "/login",
    element: <LogIn/>
  }, {
    path: "/signUp",
    element: <SignUp/>
  }
]/* ,
{
  basename: "/react_budget"
} */);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
