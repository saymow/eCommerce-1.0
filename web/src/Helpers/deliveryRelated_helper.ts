import { calcularPrecoPrazo, consultarCep } from "correios-brasil";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Services, DeliveryResponse } from "../Types/deliveryRelated_types";

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

  async calcAndValidateDelivery(cep: string, qntd: number, cb: cb) {
    try {
      const data = await this.calcDelivery(cep, qntd);

      await this.searchLocationByCep(cep);

      return cb(undefined, data);
    } catch (err) {
      return cb(
        {
          message: err.message,
        },
        undefined
      );
    }
  }

  async calcDelivery(cep: string, qntd: number) {
    let Services = {
      Sedex: "04014",
      Pac: "04510",
    };

    let arg = {
      sCepOrigem: "02513010",
      sCepDestino: cep,
      nVlPeso: (0.2 * qntd).toString(),
      nCdFormato: "3",
      nVlComprimento: "20",
      nVlAltura: "3",
      nVlLargura: "10",
      nVlDiametro: "0",
    };

    let args = Object.keys(Services).map((service) => ({
      ...arg,
      nCdServico: Services[service as Services],
    }));

    const data: DeliveryResponse[] = await Promise.all(
      args.map((arg) => calcularPrecoPrazo(arg))
    );

    if (
      data.find(
        (option) => option.MsgErro || option?.message === "Failed to fetch"
      )
    )
      throw Error("Failed to connect with correios api");

    const serializedData = data.map((option) => ({
      ...option,
      Metodo: Object.keys(Services).find(
        (service) => Services[service as Services] === option.Codigo
      ),
      Valor: option.Valor.replace(",", "."),
    }));

    return serializedData;
  }

  searchLocationByCep(cep: string): Promise<formatedLocationByCep> {
    return consultarCep(cep)
      .then((data: LocationByCep) => {
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
