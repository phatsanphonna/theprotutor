import { z } from 'zod';
import { authProcedure } from '../procedures';
import { t } from '../t';

export const appointmentRoutes = t.router({
  getAllAppointment: authProcedure.query(async ({ ctx }) => {
    const { db } = ctx;

    const appointments = await db.appointment.findMany({
      include: {
        student: true
      }
    });

    return { success: true, payload: appointments }
  }),
  getAppointmentById: authProcedure.input(z.number())
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const appointment = await db.appointment.findUnique({
        where: {
          id: input
        },
        include: {
          student: true
        }
      });

      return { success: true, payload: appointment }
    }),
  getOwnAppointments: authProcedure.query(async ({ ctx }) => {
    const { db, user } = ctx;

    const appointments = await db.appointment.findMany({
      where: {
        studentId: user!.id,
        appointmentTime: {
          gte: new Date()
        },
      },
      include: {
        student: true
      }
    });

    return { success: true, payload: appointments }
  }),
  checkValidAppointment: authProcedure.input(z.object({
    appointmentTime: z.string(),
    endTime: z.number()
  }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { appointmentTime, endTime } = input;

      const parsedAppointmentTime = new Date(appointmentTime);
      const parsedEndTime = new Date(parsedAppointmentTime.getTime() + endTime * 60 * 60 * 1000);

      if (parsedAppointmentTime < new Date()) {
        return {
          success: false,
          payload: false
        }
      }

      const appointments = await db.appointment.findMany({
        where: {
          appointmentTime: {
            lte: parsedEndTime
          },
          endTime: {
            gte: parsedAppointmentTime
          }
        }
      });

      return { success: true, payload: appointments.length <= 3 }
    }),
  deleteAppointmentById: authProcedure.input(z.number())
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const appointment = await db.appointment.delete({
        where: {
          id: input
        }
      });

      return { success: true, payload: appointment }
    }),
  createAppointment: authProcedure.input(
    z.object({
      appointmentTime: z.string(),
      endTime: z.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const { db, student } = ctx;
    const { appointmentTime, endTime } = input;

    const parsedAppointmentTime = new Date(appointmentTime);
    const parsedEndTime = new Date(parsedAppointmentTime.getTime() + endTime * 60 * 60 * 1000);

    const data = await db.appointment.create({
      data: {
        appointmentTime: parsedAppointmentTime,
        endTime: parsedEndTime,
        studentId: student!.id,
      }
    })

    return { success: true, payload: data }
  }),
})