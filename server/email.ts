// Simple email notification system
// This can be easily upgraded to use SendGrid, Nodemailer, or other services later

export interface EmailNotification {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmailNotification(notification: EmailNotification): Promise<boolean> {
  try {
    // For now, log to console with formatted output
    // This makes it easy to see new subscriptions in the server logs
    console.log(`
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                           🌟 EMAIL NOTIFICATION 🌟                              ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ To: ${notification.to.padEnd(72)} ┃
┃ Subject: ${notification.subject.padEnd(65)} ┃
┃ Time: ${new Date().toLocaleString().padEnd(67)} ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ Message:                                                                         ┃
┃ ${notification.text.padEnd(76)} ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    `);
    
    // Return true to indicate "success" for UI purposes
    return true;
  } catch (error) {
    console.error('Email notification error:', error);
    return false;
  }
}

// Helper function for newsletter subscriptions
export async function notifyNewsletterSubscription(email: string): Promise<boolean> {
  return sendEmailNotification({
    to: 'info@jakintzaruha.com',
    subject: 'New Newsletter Subscription - Jakintza Ruha',
    text: `A new soul has joined the remembering!\n\nEmail: ${email}\nTime: ${new Date().toLocaleString()}\n\nPlease send them a welcome message to begin their mystical journey.`,
    html: `
      <div style="font-family: serif; color: #2c1810; background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 100%); padding: 30px; border-radius: 10px;">
        <h2 style="color: #d4af37; text-align: center;">🌟 New Soul Joins the Remembering 🌟</h2>
        <div style="background: rgba(212, 175, 55, 0.1); padding: 20px; border-radius: 8px; border: 1px solid #d4af37;">
          <p style="color: #e8e8e8;"><strong>Email:</strong> ${email}</p>
          <p style="color: #e8e8e8;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p style="color: #c9b037; margin-top: 20px;">Please send them a welcome message to begin their mystical journey through Jakintza Ruha.</p>
        </div>
      </div>
    `
  });
}