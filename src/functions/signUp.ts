import { SignUpCommand, UsernameExistsException } from '@aws-sdk/client-cognito-identity-provider';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

import { cognitoClient } from '@/libs/cognitoClient';

import { response } from '@/utils/response';
import { bodyParser } from '@/utils/bodyParser';

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const body = bodyParser(event?.body ?? '');

    const signupCommand = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: body.email,
      Password: body.password,
      UserAttributes: [
        { Name: 'given_name', Value: body.firstName },
        { Name: 'family_name', Value: body.lastName }
      ]
    });

    const { UserSub } = await cognitoClient.send(signupCommand);

    return response(201, {
      userId: UserSub
    });
  } catch (error) {
    console.error(error, event);

    if (error instanceof UsernameExistsException) {
      return response(409, {
        error: 'This username is already in use'
      });
    }

    return response(500, {
      error: 'Internal server error'
    });
  }
}
