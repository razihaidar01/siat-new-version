/**
 * Offline fallback records for critical certificates.
 * These always verify, even if the cloud database is temporarily paused
 * or unreachable. Keep in sync with the `certificates` table.
 */
export const pinnedCertificates: Record<string, any> = {
  "SIAT/2015-16/113": {
    certificate_number: "SIAT/2015-16/113",
    student_name: "SHAFIA KHATOON",
    father_name: "ASHFAQUE ALAM",
    mother_name: "RUKHSANA KHATOON",
    course_name: "ADIT",
    grade: "A++",
    issue_date: "2016-08-08",
    training_from: "2015-08-03",
    training_to: "2016-08-02",
    is_valid: true,
  },
};

const normalize = (value: string) =>
  value.trim().toUpperCase().replace(/\s+/g, "").replace(/[-_]/g, "-");

export function getPinnedCertificate(certNumber: string) {
  const target = normalize(certNumber);
  const match = Object.keys(pinnedCertificates).find(
    (key) => normalize(key) === target
  );
  return match ? pinnedCertificates[match] : null;
}
