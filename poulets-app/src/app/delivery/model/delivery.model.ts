export class Delivery {
    id: string;
    date: string;
    order: number[];
    name?: string[];
    chicken?: number[];
    abats?: boolean[];
    eggs?: number[];
    conserves?: Conserves[];

    constructor(delivery?: Delivery) {
        this.id = null;

        if (delivery) {
            this.id = delivery.id;
            this.date = delivery.date;
            this.order = delivery.order;
            this.name = delivery.name;
            this.chicken = delivery.chicken;
            this.abats = delivery.abats;
            this.eggs = delivery.eggs;
            this.conserves = delivery.conserves;
        }
    }
}

export interface Conserves {
        pate: number;
        rillettes: number;
        terrine: number;
        mousse: number;
}
