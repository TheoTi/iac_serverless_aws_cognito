import type { CustomMessageTriggerEvent } from 'aws-lambda';

export async function handler(event: CustomMessageTriggerEvent): Promise<CustomMessageTriggerEvent> {
  const name = event.request.userAttributes.given_name;
  const email = event.request.userAttributes.email;
  const code = event.request.codeParameter;

  if (event.triggerSource === 'CustomMessage_SignUp') {
    event.response.emailSubject = `Bem-vindo(a) ${name}`;
    event.response.emailMessage = `<h1>Seja bem-vindo(a) ${name}</h1><br /><br /> Use este código para confirmar a sua conta: ${code}`;
  }

  if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.emailSubject = 'Recuperação de conta';
    event.response.emailMessage = `<h1>Para recuperar a sua conta acesse:</h1> <strong>https://app.seuapp.com.br/reset/?email=${encodeURIComponent(email)}&code=${code}</strong>`;
  }

  return event;
}
