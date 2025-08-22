// EmailOctopus integration for sending enrollment forms
export interface EnrollmentNotification {
  to: string;
  subject: string;
  enrollmentData: any;
}

export async function sendEnrollmentNotification(notification: EnrollmentNotification): Promise<boolean> {
  try {
    const apiKey = process.env.EMAILOCTOPUS_API_KEY;
    
    if (!apiKey) {
      console.error('EMAILOCTOPUS_API_KEY not found');
      return false;
    }

    // Log the enrollment beautifully to console for debugging
    console.log(`
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                        🌟 ENROLLMENT SUBMISSION 🌟                              ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ To: ${notification.to.padEnd(72)} ┃
┃ Subject: ${notification.subject.padEnd(65)} ┃
┃ Time: ${new Date().toLocaleString().padEnd(67)} ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ SEEKER'S DETAILS:                                                                ┃
┃ Name: ${(notification.enrollmentData.fullName || '').padEnd(69)} ┃
┃ Date of Birth: ${(notification.enrollmentData.dateOfBirth || '').padEnd(62)} ┃
┃ Pronouns: ${(notification.enrollmentData.pronouns || '').padEnd(65)} ┃
┃ Email: ${(notification.enrollmentData.email || '').padEnd(68)} ┃
┃ Phone: ${(notification.enrollmentData.phone || '').padEnd(68)} ┃
┃ Location: ${(notification.enrollmentData.location || '').padEnd(65)} ┃
┃                                                                                  ┃
┃ PATH OF STUDY:                                                                   ┃
┃ ${(notification.enrollmentData.pathOfStudy || []).join(', ').padEnd(76)} ┃
┃                                                                                  ┃
┃ ENROLLMENT TIMELINE: ${(notification.enrollmentData.enrollmentTimeline || '').padEnd(54)} ┃
┃ REALM OF ENTRY: ${(notification.enrollmentData.realmOfEntry || '').padEnd(59)} ┃
┃ LANGUAGES: ${(notification.enrollmentData.languages || '').padEnd(62)} ┃
┃ ACCOMMODATIONS: ${(notification.enrollmentData.accommodations || '').padEnd(57)} ┃
┃ HOW THEY HEARD: ${(notification.enrollmentData.howHeard || '').padEnd(57)} ┃
┃                                                                                  ┃
┃ WHAT THEY SEEK TO RECLAIM:                                                       ┃
┃ ${(notification.enrollmentData.seekToReclaim || '').substring(0, 76).padEnd(76)} ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
    `);

    // Send actual email through EmailOctopus API
    const emailBody = `
Sacred Enrollment Submission

SEEKER'S DETAILS:
Name: ${notification.enrollmentData.fullName || ''}
Date of Birth: ${notification.enrollmentData.dateOfBirth || ''}
Pronouns: ${notification.enrollmentData.pronouns || ''}
Email: ${notification.enrollmentData.email || ''}
Phone: ${notification.enrollmentData.phone || ''}
Location: ${notification.enrollmentData.location || ''}

PATH OF STUDY: ${(notification.enrollmentData.pathOfStudy || []).join(', ')}

ENROLLMENT TIMELINE: ${notification.enrollmentData.enrollmentTimeline || ''}
REALM OF ENTRY: ${notification.enrollmentData.realmOfEntry || ''}
LANGUAGES: ${notification.enrollmentData.languages || ''}
ACCOMMODATIONS: ${notification.enrollmentData.accommodations || ''}
HOW THEY HEARD: ${notification.enrollmentData.howHeard || ''}

WHAT THEY SEEK TO RECLAIM:
${notification.enrollmentData.seekToReclaim || ''}
    `;

    // EmailOctopus API call
    const response = await fetch('https://emailoctopus.com/api/1.6/campaigns/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        to: [notification.to],
        subject: notification.subject,
        content: {
          html: emailBody.replace(/\n/g, '<br>'),
          text: emailBody
        },
        from: {
          name: 'Athenaeum Registration',
          email_address: 'noreply@jakintzaruha.com'
        }
      })
    });

    if (response.ok) {
      console.log('✨ Enrollment notification sent successfully through EmailOctopus');
      return true;
    } else {
      const error = await response.text();
      console.error('EmailOctopus API error:', error);
      return false;
    }
  } catch (error) {
    console.error('EmailOctopus enrollment notification error:', error);
    return false;
  }
}

// Helper function for enrollment submissions
export async function notifyEnrollmentSubmission(enrollmentData: any): Promise<boolean> {
  return sendEnrollmentNotification({
    to: 'athenaeum@jakintzaruha.com',
    subject: 'New Athenaeum Enrollment - Sacred Seeker Awaits',
    enrollmentData
  });
}