import { t } from '../t';
import { z } from 'zod';

export const greetingRoute = t.router({
    greet: t.procedure.input(z.string()).query(async ({ input }) => {
        return `Greeting, ${input}!`
    })
})