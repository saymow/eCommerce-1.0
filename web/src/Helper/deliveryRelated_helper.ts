import { CorreiosBrasil } from "correios-brasil";

import { Services, DeliveryResponse } from "../Types/deliveryRelated_types";

export default class DeliveryManager {
  Delivery: any;
  constructor() {
    this.Delivery = new CorreiosBrasil();
  }

  async calcDelivery(
    cep: string,
    qntd: number
  ): Promise<DeliveryResponse[] | undefined> {
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
      args.map((arg) => {
        return this.Delivery.calcPrecoPrazo(arg);
      })
    );

    if (
      data.find(
        (option) => option.MsgErro || option?.message === "Failed to fetch"
      )
    ) {
      return;
    }

    const serializedData = data.map((option) => ({
      ...option,
      Metodo: Object.keys(Services).find(
        (service) => Services[service as Services] === option.Codigo
      ),
      Valor: option.Valor.replace(",", "."),
    }));

    return serializedData;
  }
}
