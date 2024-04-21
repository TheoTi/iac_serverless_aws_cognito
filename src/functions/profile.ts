import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

import { response } from '@/utils/response';
import { AdminGetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from '@/libs/cognitoClient';

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
  const userId = event.requestContext.authorizer.jwt.claims.sub as string;

  const adminGetUserCommand = new AdminGetUserCommand({
    Username: userId,
    UserPoolId: process.env.COGNITO_POOL_ID
  });

  const { UserAttributes } = await cognitoClient.send(adminGetUserCommand);

  return response(200, {
    profile: UserAttributes
  });
}
