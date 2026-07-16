export type EmailMessage = { to: string; subject: string; text: string };

export interface EmailTransport { send(message: EmailMessage): Promise<void> }

class DevelopmentTransport implements EmailTransport {
  async send(message: EmailMessage) {
    if (process.env.NODE_ENV !== "development") return;
    console.info(`[email:development] ${message.subject} -> ${message.to.replace(/(^.).*(@.*$)/, "$1***$2")}`);
  }
}

export const emailService: EmailTransport = new DevelopmentTransport();
