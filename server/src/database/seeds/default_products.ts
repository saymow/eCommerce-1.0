import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("products").insert([
    {
      name: "Green t-shirt",
      description:
        "Eius vel ipsa error animi! Ab praesentium in ducimus modi voluptatem dolores minus dolorem quibusdam ipsam porro.",
      price: "40.00",
      qntd: 4,
      image: "green-t-shirt",
    },
    {
      name: "Grey t-shirt",
      description:
        "Eius vel ipsa error animi! Ab praesentium in ducimus modi voluptatem dolores minus dolorem quibusdam ipsam porro.",
      price: "49.00",
      qntd: 3,
      image: "grey-t-shirt",
    },
    {
      name: "Red t-shirt",
      description:
        "Eius vel ipsa error animi! Ab praesentium in ducimus modi voluptatem dolores minus dolorem quibusdam ipsam porro.",
      price: "59.99",
      qntd: 9,
      image: "red-t-shirt",
    },
    {
      name: "Blue t-shirt",
      description:
        "Eius vel ipsa error animi! Ab praesentium in ducimus modi voluptatem dolores minus dolorem quibusdam ipsam porro.",
      price: "49.99",
      qntd: 4,
      image: "blue-t-shirt",
    },
    {
      name: "Cobalt blue t-shirt",
      description:
        "Eius vel ipsa error animi! Ab praesentium in ducimus modi voluptatem dolores minus dolorem quibusdam ipsam porro.",
      price: "40.00",
      qntd: 6,
      image: "cobalt-blue-t-shirt",
    },
    {
      name: "Teal t-shirt",
      description:
        "Eius vel ipsa error animi! Ab praesentium in ducimus modi voluptatem dolores minus dolorem quibusdam ipsam porro.",
      price: "69.99",
      qntd: 9,
      image: "teal-t-shirt",
    },
    {
      name: "Light green t-shirt",
      description:
        "Eius vel ipsa error animi! Ab praesentium in ducimus modi voluptatem dolores minus dolorem quibusdam ipsam porro.",
      price: "69.99",
      qntd: 11,
      image: "light-green-t-shirt",
    },
    {
      name: "Bright purple t-shirt",
      description:
        "Eius vel ipsa error animi! Ab praesentium in ducimus modi voluptatem dolores minus dolorem quibusdam ipsam porro.",
      price: "89.99",
      qntd: 9,
      image: "bright-purple-t-shirt",
    },
    {
      name: "Purple t-shirt",
      description:
        "Eius vel ipsa error animi! Ab praesentium in ducimus modi voluptatem dolores minus dolorem quibusdam ipsam porro.",
      price: "99.99",
      qntd: 15,
      image: "purple-t-shirt",
    },
  ]);
}
