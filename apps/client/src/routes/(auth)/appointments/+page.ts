import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
  const { payload } = await trpc(event).appointment.getAllAppointment.query()
  return { appointments: payload };
};