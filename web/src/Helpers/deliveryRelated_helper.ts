// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Services, DeliveryResponse } from "../Types/deliveryRelated_types";

import { Proxy } from "Services/api";

interface LocationByCep {
  logradouro: string;
  bairro: string;
  uf: string;
  localidade: string;
  cep: string;
}

interface formatedLocationByCep {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  postalCode: string;
}

interface Error {
  message: string;
}

type cb = (
  error: Error | undefined,
  data: DeliveryResponse[] | undefined
) => void;

export default class DeliveryManager {
  formatedLocationByCep: formatedLocationByCep;
  constructor() {
    this.formatedLocationByCep = {
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      postalCode: "",
    };
  }

  searchLocationByCep(cep: string): Promise<formatedLocationByCep> {
    return Proxy.get(`/checkPostalCode/${cep}`)
      .then((response) => {
        const data = response.data as LocationByCep;
        this.setLocationByCep({
          state: data.uf,
          city: data.localidade,
          neighborhood: data.bairro,
          street: data.logradouro,
          postalCode: data.cep,
        });

        return {
          state: data.uf,
          city: data.localidade,
          neighborhood: data.bairro,
          street: data.logradouro,
          postalCode: data.cep,
        };
      })
      .catch((error: any) => {
        throw new Error("Invalid postal code.");
      });
  }

  private setLocationByCep(data: formatedLocationByCep) {
    this.formatedLocationByCep = {
      ...data,
    };
  }
}
