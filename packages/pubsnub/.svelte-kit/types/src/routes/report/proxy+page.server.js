// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import { RouteConstants } from '$lib/constants/route.constants';
import { lucia } from '$lib/server/auth';

/**@param {Parameters<import('./$types').PageServerLoad>[0]} event */
export const load = async (event) => {
    if (!event.locals.session) {
        return redirect(302, RouteConstants.LOGIN);
    }

    return {
        user: event.locals.user
    }
}

/***/
export const actions = {
    //  TODO : Is this the right spot for this?
    default:/** @param {import('./$types').RequestEvent} event */  async (event) => {
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