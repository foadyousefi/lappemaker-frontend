import Stripe from 'stripe';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({url}) => {
    try {
        const stripe = new Stripe('sk_test_51LPa7MLNAyr6S1ooLpAMGSvXfOsa9FYirBbfMZEWTfhMud4SOMT4ahVk93vjm62WMagzA97ePQH1nleCHpNhgreP00yLRGsX3Z');
        const sessionId = url.searchParams.get('session_id') ?? '';
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        let customer = {}
        if (session && session.customer) {
            customer = await stripe.customers.retrieve(session.customer);
        }

        return { ...session, customer };
    } catch (error) {
        console.log(error)
    }
}
