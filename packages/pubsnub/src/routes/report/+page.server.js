import { fail, redirect } from '@sveltejs/kit';
import { RouteConstants } from '$lib/constants/route.constants';
import { lucia } from '$lib/server/auth';

/**@type {import('./$types').PageServerLoad} */
export const load = async (event) => {
    if (!event.locals.session) {
        return redirect(302, RouteConstants.LOGIN);
    }

    return {
        user: event.locals.user
    }
}

/**@type {import('./$types').Actions} */
export const actions = {
    //  TODO : Is this the right spot for this?
    default: async (event) => {
        if(!event.locals.session) {
            return(fail(401));
        }

        await lucia.invalidateSession(event.locals.session.id);
        const sessionCookie = await lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });

        return redirect(302, RouteConstants.LOGIN)
    }
}