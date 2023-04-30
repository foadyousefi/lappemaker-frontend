import type { PageServerLoad } from './$types';
import { STRIPESECRET } from '$env/static/private';
import Stripe from 'stripe';
import {redirect} from '@sveltejs/kit'

// const prices = await stripe.prices.list({
//   active: true
// });
// console.log('Active prices: ', prices)

export const load: PageServerLoad = async ({url}) => {
  const domain = url.origin
  const stripe = new Stripe(STRIPESECRET);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        // price: 'price_1N0u3hLNAyr6S1oo4TuMafCY',
        price_data: {
          currency: 'nok',
          product_data: {
            name: 'Navnelapp',
            tax_code: 'txcd_99999999',
            description: 'Navnelapp for barnehagebarn',
            images: ['https://i.imgur.com/EHyR2nP.png']
          },
          unit_amount: 12000,
          tax_behavior: 'inclusive'
        },
        tax_rates: ['txr_1N1EPrLNAyr6S1ooYZbpgud0'],
        quantity: 2,
      },
    ],
    // consent_collection: {
    //   terms_of_service: 'required',
    // },
    payment_method_types: ['card', 'klarna'],
    locale: 'nb',
    currency: 'nok',
    mode: 'payment',
    customer_creation: 'always',
    phone_number_collection: {
      enabled: true
    },
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['NO']
    },
    success_url: `${domain}/ordre/bekreftelse?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domain}/ordre/kansellert?session_id={CHECKOUT_SESSION_ID}`,
  });

  throw redirect(307, session.url);
}