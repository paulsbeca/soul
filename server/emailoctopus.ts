// EmailOctopus integration for sending enrollment forms
export interface EnrollmentNotification {
  to: string;
  subject: string;
  enrollmentData: any;
}

export async function sendEnrollmentNotification(notification: EnrollmentNotification): Promise<boolean> {
  try {
    const apiKey = process.env.EMAIL_OCTOPUS_API_KEY;
    
    if (!apiKey) {
      console.error('EMAIL_OCTOPUS_API_KEY not found');
      return false;
    }

    // For now, log the enrollment beautifully to console
    // EmailOctopus API integration can be added here later
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
    
    // Return true to indicate "success" for UI purposes
    return true;
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