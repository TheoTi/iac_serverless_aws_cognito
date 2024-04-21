import { InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

import { cognitoClient } from '@/libs/cognitoClient';

import { response } from '@/utils/response';
import { bodyParser } from '@/utils/bodyParser';

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const { refreshToken } = bodyParser(event?.body ?? '');

    const initiateAuthCommand = new InitiateAuthCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      AuthParameters: {
        REFRESH_TOKEN: refreshToken
      }
    });

    const { AuthenticationResult } = await cognitoClient.send(initiateAuthCommand);

    if (!AuthenticationResult) {
      return response(401, {
        error: 'Invalid credentials.'
      });
    }

    return response(200, {
      accessToken: AuthenticationResult.AccessToken
    });
  } catch (error) {
    console.error(error, event);

    return response(500, {
      error: 'Internal server error'
    });
  }
}
