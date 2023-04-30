import Stripe from 'stripe';
import { post, put } from "$lib/api";
import { STRIPESECRET } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({url}) => {
    try {
        const stripe = new Stripe(STRIPESECRET);
        const sessionId = url.searchParams.get('session_id') ?? '';
        const session = await stripe.checkout.sessions.retrieve(<string>sessionId);
        let customer = {}
        let order = {}
        let orderUpdate = {}
        if (session && session.customer) {
            customer = await stripe.customers.retrieve(<string>session.customer);
        }
        if (customer) {
            const customerInfo = {
                first_name: customer.name ?? '',
                email: customer.email ?? '',
                address_1: customer.address.line1 ?? '',
                address_2: customer.address.line2 ?? '',
                city: customer.address.city ?? '',
                postcode: customer.address.postal_code ?? '',
                country: customer.address.country ?? '',
                phone: customer.phone ?? ''
            }
            const orderReq = {
                status: 'pending',
                line_items: [
                    {
                        product_id: 11,
                        quantity: 2
                    }
                ],
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
                total: 12000,
                meta_data: [
                  {
                    key: 'meta_1',
                    value: 'some meta value'
                  },
                  {
                    key: 'meta_2',
                    value: 'some other meta value'
                  }
                ]
            }
            const orderRes = await post('orders', orderReq);
            order = await orderRes.json();
            console.log('Order created', order)
        }
        if (customer && order.id) {
            const updateReq = {
                status: 'on-hold',
                payment_method: 'stripe',
                payment_method_title: 'Stripe',
                transaction_id: session.payment_intent ?? '',
            }
            const updateRes = await put(`orders/${order.id}`, updateReq);
            orderUpdate = await updateRes.json();
            console.log('Order Update', orderUpdate)
        }
        return { session, customer, order, orderUpdate };
    } catch (error) {
        console.log(error)
    }
}
