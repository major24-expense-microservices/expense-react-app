import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1 className="display-5">
      <span className="text-primary">Expense Application)</span>
    </h1>
    <p className="lead">Functional expense submission form developed with ReactJS as frontend app and Asp.Net Core2.2 as backend.</p>
    <p className="lead">Application is serviced by three differnt microservices, that can be developed and deployed independently.</p>
    <p className="lead">Deployed to Azure Cloud via CI/CD Pipeline!</p>
    <hr className="my-4" />

    <h4>Built with following technologies</h4>
    <ul className="list-group">
      <li className="list-group-item list-group-item-primary">
        <b>Front End:</b>ReactJS + Redux for store management + Bootstrap + Jest Unit Testing
      </li>
      <li className="list-group-item list-group-item-info">
        <b>Back End:</b> ASP.Net MVC Core, serves the compiled vuejs client pages and secure calls to REST Apis (No CORS)
      </li>
      <li className="list-group-item list-group-item-primary">
        <b>Back End - REST Api:</b> ASP.Net Core 2.2 + Dapper for data access + xUnit Test with Moq
      </li>
      <li className="list-group-item list-group-item-info">
        <b>Database:</b> SQL Server
      </li>
      <li className="list-group-item list-group-item-primary">
        <b>Deployment:</b> Github + CI/CD: Continuous deploment to Azure Cloud
      </li>
      <li className="list-group-item list-group-item-info">
        <b>Hosting:</b> Azure Cloud hosts application, api and sql database
      </li>
    </ul>
    <p></p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
  </div>
);

export default HomePage;
