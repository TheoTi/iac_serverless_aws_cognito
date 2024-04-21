import { InitiateAuthCommand, UserNotConfirmedException, UserNotFoundException } from '@aws-sdk/client-cognito-identity-provider';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

import { cognitoClient } from '@/libs/cognitoClient';

import { response } from '@/utils/response';
import { bodyParser } from '@/utils/bodyParser';

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const { email, password } = bodyParser(event?.body ?? '');

    const initiateAuthCommand = new InitiateAuthCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    });

    const { AuthenticationResult } = await cognitoClient.send(initiateAuthCommand);

    if (!AuthenticationResult) {
      return response(401, {
        error: 'Invalid credentials.'
      });
    }

    return response(200, {
      accessToken: AuthenticationResult.AccessToken,
      refreshToken: AuthenticationResult.RefreshToken,
    });
  } catch (error) {
    console.error(error, event);

    if (error instanceof UserNotFoundException) {
      return response(401, {
        error: 'Invalid credentials.'
      });
    }

    if (error instanceof UserNotConfirmedException) {
      return response(401, {
        error: 'You need to confirm your account before sign in.'
      });
    }

    return response(500, {
      error: 'Internal server errors'
    });
  }
}
