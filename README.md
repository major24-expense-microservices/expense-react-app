## expense-react-app
## Expense application with React, Redux and Asp.Net Core 2.2

This Readme file mainly covers for the Backend for Frontend app written in Asp.Net Core<br />
Prior to run this app, follow the readme file in 'ClientApp' and build the script.<br />

### Deployment
First build the 'ClientApp'<br />
Open Visual Studio and use 'Publish' to publish to Azure cloud.<br />
Note: Azure CI/CD pipeline has been set. but now throws an error needs to be looked at.

### Dependency
##### User Profile Microservice
##### Transaction Microservice
##### Expense Microservice
##### SQL Server for three different microservices
##### Azure Queue to update posted transations and Send Pdf document
##### Azure SendGrid Email

Production: Azure - Ensure all these services are running in Azure cloud<br />
Development: Ensure to run all REST Apis running in its localhost. Build the app in clientApp and F5 to launch for development.

#### Developer Notes
To locally test posted transactions queue:<br />
iwr -Method POST -Uri https://ms-expense-react-func-app.azurewebsites.net/api/onExpSubmittedAddToQueToUpdTrans?code=<<get code from azure>> -Headers @{ "content-type"="application/json" } -Body '{"id": 2, "expenseItems": [{ "id": "aa2612d0-626c-4fbc-bd2c-052837a9fa0e", "status": "Processed" }, {"id": "c5204ebf-23fe-40e3-b582-4887cebdf796", "status": "Processed"}]}'`
<br />
To test send email queue<br />
iwr -Method POST -Uri https://ms-expense-react-func-app.azurewebsites.net/api/onExpSubmittedAddToQueToCreatePdfAndSendMail?code=<<...>> -Headers @{ "content-type"="application/json" } -Body '{"user": {"userId": "user1"},"id": 2}'`
<br />
