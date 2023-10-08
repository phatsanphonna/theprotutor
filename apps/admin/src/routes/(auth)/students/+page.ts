import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
  const { payload } = await trpc(event).student.getStudents.query();

  const students = payload.map(({ studentId, firstname, lastname, nickname, telephoneNumber, user }) => ([
    studentId, `${firstname} ${lastname}`,nickname, user.email, telephoneNumber
  ]))
  const ids = payload.map(({ id }) => [id]);

  return {
    students,
    ids,
  };
};