import React from 'react';
// import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import PageNotFound from './PageNotFound';
import CoursesPage from './courses/CoursesPage';
import ManageCoursePage from './courses/ManageCoursePage'; // eslint-disable-line import/no-named-as-default
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SampleContainer from './sampleForm/SampleContainer';
import UserProfileContainer from './userProfile/UserProfileContainer';  // eslint-disable-line import/no-named-as-default
import Login from './userProfile/Login';
import ManageUserContainer from './userProfile/ManageUserContainer';    // eslint-disable-line import/no-named-as-default
import ManageExpenseContainer from './userProfile/ManageExpenseContainer'; // eslint-disable-line import/no-named-as-default
import CreateSampleTransactions from './userProfile/CreateSampleTransactions';  // eslint-disable-line import/no-named-as-default
import ExpenseForm from './userProfile/ExpenseForm';
import ShowMessage from './userProfile/ShowMessage';

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/user-profile" component={UserProfileContainer} />
        <Route path="/login" component={Login} />
        <Route path="/manage-user" component={ManageUserContainer} />
        <Route path="/manage-expense" component={ManageExpenseContainer} />
        <Route path="/manage-sample-transactions" component={CreateSampleTransactions} />
        <Route path="/add-expense" component={ExpenseForm} />
        <Route path="/show-message" component={ShowMessage} />

        <Route path="/courses" component={CoursesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route path="/sample-container" component={SampleContainer} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
