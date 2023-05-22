import Stripe from 'stripe';
import { post, put } from "$lib/api";
import { STRIPESECRET } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async ({url}) => {
    try {
        const stripe = new Stripe(STRIPESECRET);
        const sessionId = url.searchParams.get('session_id') ?? '';
        const session = await stripe.checkout.sessions.retrieve(<string>sessionId);
        let customer = {}
        if (session && session.customer) {
            customer = await stripe.customers.retrieve(<string>session.customer);
        }
        return { session, customer };
    } catch (error) {
        console.log(error)
    }
}

export const actions: Actions = {
    new_order: async ({ request, url }) => {
        const data = await request.formData();
        let cartData = data.get('cart_items')
        const sessionId = data.get('session_id')
        const lineItems = []
        const orderMeta = []
        if (!cartData || !sessionId) return fail(400, {message: 'Missing cart items'})
        if (cartData) {
            cartData = JSON.parse(cartData)
            if (cartData && cartData.length) {
                cartData.forEach((item: any) => {
                    lineItems.push({
                        product_id: item.productId,
                        quantity: item.quantity
                    })
                    orderMeta.push({
                        design: item.designPath,
                        quantity: item.quantity,
                        firstLine: item.firstLine,
                        secondLine: item.secondLine,
                        thirdLine: item.thirdLine,
                        icon: item.icon,
                        background: item.background,
                        color: item.color,
                        font: item.fontFamily
                    })
                })
            }
        }
        try {
            const stripe = new Stripe(STRIPESECRET);
            const session = await stripe.checkout.sessions.retrieve(<string>sessionId);
            let customer = {}
            let order = {}
            if (session && session.customer) {
                customer = await stripe.customers.retrieve(<string>session.customer);
            }
            if (customer) {
                const orderReq = {
                    line_items: lineItems,
                    transaction_id: session.payment_intent ?? '',
                    billing: {
                        first_name: customer.name ? customer.name.split(' ').slice(0, -1).join(' ') : '',
                        last_name: customer.name ? customer.name.split(' ').slice(-1).join(' ') : '',
                        email: customer.email ?? '',
                        address_1: customer.address.line1 ?? '',
                        address_2: customer.address.line2 ?? '',
                        city: customer.address.city ?? '',
                        postcode: customer.address.postal_code ?? '',
                        country: customer.address.country ?? '',
                        phone: customer.phone ?? ''
                    },
                    shipping: {
                        first_name: customer.shipping.name ? customer.shipping.name.split(' ').slice(0, -1).join(' ') : '',
                        last_name: customer.shipping.name ? customer.shipping.name.split(' ').slice(-1).join(' ') : '',
                        email: customer.email ?? '',
                        address_1: customer.shipping.address.line1 ?? '',
                        address_2: customer.shipping.address.line2 ?? '',
                        city: customer.shipping.address.city ?? '',
                        postcode: customer.shipping.address.postal_code ?? '',
                        country: customer.shipping.address.country ?? ''
                    },
                    total: session.amount_total ?? 0,
                    order_meta: orderMeta
                }
                const orderRes = await post('lappemaker/order', orderReq);
                order = await orderRes.json();
                console.log('Order created', order)
            }
            return { session, customer, order };
        } catch (error) {
            console.log(error)
        }
    }
}
