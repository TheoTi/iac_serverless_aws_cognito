import { ConfirmForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

import { cognitoClient } from '@/libs/cognitoClient';

import { response } from '@/utils/response';
import { bodyParser } from '@/utils/bodyParser';

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const { email, code, newPassword } = bodyParser(event?.body ?? '');

    const confirmForgotPasswordCommand = new ConfirmForgotPasswordCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      ConfirmationCode: code,
      Username: email,
      Password: newPassword
    });

    await cognitoClient.send(confirmForgotPasswordCommand);

    return response(204);
  } catch (error) {
    return response(500, {
      error: 'Internal server error'
    });
  }
}
