export interface SendEmailRequest {
  email: string;
  message: string;
}
export interface SendEmailResponse {
  message: string;
  sentTime?: Date | string;
}
