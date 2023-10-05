import { prisma } from 'database'

export const generateStudentId = async () => {
  const count = await prisma.student.count() + 1;
  const buddhistYear = new Date().getFullYear() + 543;
  const year = buddhistYear.toString().slice(2);
  const countString = count.toString().padStart(3, '0');
  return `${year}${countString}`;
}