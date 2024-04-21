import { ForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

import { cognitoClient } from '@/libs/cognitoClient';

import { response } from '@/utils/response';
import { bodyParser } from '@/utils/bodyParser';

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const { email } = bodyParser(event?.body ?? '');

    const forgotPasswordCommand = new ForgotPasswordCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email
    });

    await cognitoClient.send(forgotPasswordCommand);

    return response(204);
  } catch (error) {
    console.error(error, event);

    return response(500, {
      error: 'Internal server error'
    });
  }
}
