import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2020-03-02",
  typescript: true,
});

interface Props {
  name: string;
  amount: number;
  token: any;
  address: {
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
  };
  shippment: {
    cep: string;
  };
}

async function postCharge(data: Props) {
  const { name, token, amount, shippment, address } = data;

  const charge = await stripe.charges.create({
    amount,
    currency: "brl",
    source: token.id,
    receipt_email: "contact@ourcommerce.com",
    shipping: {
      name,
      address: {
        country: "BR",
        state: address.state,
        city: address.city,
        line1: `${address.neighborhood} - ${address.street} - ${address.number}`,
        postal_code: shippment.cep,
      },
    },
  });

  return charge;
}

export default postCharge;
