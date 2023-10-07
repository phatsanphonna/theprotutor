import type { Student, User } from 'database';

export const generateAvatarInitials = (student: Student, user: User): string => {
  if (student) {
    return `${student.firstname[0]}${student.lastname[0]}`;
  } else {
    const email = user?.email?.split('@')[0];
    return `${email?.charAt(0)}${email?.charAt(1)}`
  }
}