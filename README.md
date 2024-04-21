
# IaC - AWS Lambda, AWS Cognito and Serverless Framework

This is a TypeScript project focused on developing an authentication flow, including registration, password recovery and account confirmation. We use Infrastructure as Code (Serverless Framework) to configure the services used in the application such as AWS Cognito, AWS Lambda and AWS CloudFront to implement a robust and scalable solution.

## Technologies Used

- NodeJS
- TypeScript
- AWS Cognito
- AWS Lambda
- AWS CloudFront
- Serverless Framework

## Project Structure

`functions` are used to store lambda functions.
`libs` in this case, are used to store Cognito Provider.

## Initial Setting

### Requirements

- Node.js installed (version 12.x or higher)
- AWS CLI Configuration
- Serverless Framework installed

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/TheoTi/iac_serverless_aws_cognito
cd iac_serverless_aws_cognito
npm install
```

## Deploy

To deploy this application, it is essential to have correctly configured the credentials of the provider where the application will be made available, in my case, I will be using AWS, and to configure it is very simple, just run the following command in the terminal:

```bash
aws configure
```
and then provide the credentials that will be requested.
And after completing this configuration step, simply use the following command to deploy the application:

```bash
sls deploy
```
If no compilation error occurs, your application will already be online with the latest changes made, ready to be used.
