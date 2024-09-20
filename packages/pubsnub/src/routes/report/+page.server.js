import { fail, redirect } from '@sveltejs/kit';
import { RouteConstants } from '$lib/constants/route.constants';
import { lucia } from '$lib/server/auth';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import dbConnection from 'db';

/**@type {import('./$types').PageServerLoad} */
export const load = async (event) => {
    if (!event.locals.session) {
        return redirect(302, RouteConstants.LOGIN);
    }

    return {
        form: await superValidate(zod(formSchema))
    }
}

/**@type {import('./$types').Actions} */
export const actions = {
    default: async (event) => {
        const form = await superValidate(event.request, zod(formSchema));

        if (!form.valid) {
            return fail(400, { form })
        }

        console.log(form.data);
        const db = dbConnection();
        try {
            db.run(`
                INSERT INTO snub (snub_indicator, comment)
                VALUES (?, ?)`, [form.data.snubbedInd, form.data.comment]);
        } catch (ex) {
            console.log(ex)
        } finally {
            db.close();
        }                    
    }
}