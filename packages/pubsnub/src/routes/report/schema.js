import { z } from 'zod';
import { CalendarDate, today, getLocalTimeZone, parseDate } from '@internationalized/date';

export const formSchema = z.object({
    date: z.string().datetime().default(today('UTC').toDate('UTC').toISOString()).refine(val => !!val, "Date cannot be empty"), //z.instanceof(CalendarDate).default(() => today(getLocalTimeZone())), //z.preprocess(val => parseDate(String(val)), z.instanceof(CalendarDate))
    snubbedInd: z.boolean().default(false),
    comment: z.string().default('')
});

/**@typedef { z.infer<typeof formSchema> } Form */