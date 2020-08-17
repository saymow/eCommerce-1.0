import { Joi, celebrate } from "celebrate";

const Product = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
  convertedPrice: Joi.string(),
  qntd: Joi.number().required(),
});

export default celebrate({
  body: Joi.object().keys({
    data: Joi.object().keys({
      token: Joi.object().keys({
        id: Joi.string().required(),
        object: Joi.valid("token").required(),
        card: Joi.object().required(),
        client_ip: Joi.string().required(),
        created: Joi.number().required(),
        livemode: Joi.boolean().required(),
        type: Joi.valid("card").required(),
        used: Joi.boolean().required(),
      }),

      address: Joi.object().keys({
        id: Joi.number(),
        state: Joi.string().required().length(2),
        city: Joi.string().required(),
        neighborhood: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.number().required().max(9999),
      }),

      shippment: Joi.object().keys({
        cep: Joi.string().required().length(9),
        code: Joi.string().required().length(5),
        deadline: Joi.string().required(),
        price: Joi.string().required(),
        type: Joi.string().required(),
      }),

      cartData: Joi.object().keys({
        totalCart: Joi.number().required(),
        totalCartConverted: Joi.string(),
        cart: Joi.array().items(Product),
      }),
    }),
  }),
});
