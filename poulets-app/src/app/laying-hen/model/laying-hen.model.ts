export class LayingHen {
    id: string;
    batch?: string;
    age?: string;
    actualQuantity?: string;
    loss?: string;
    arrivingDate: string;
    henhouseId: string;
    sold?: string;
    cost?: Cost;
    clutch?: Clutch[];

    constructor(layingHen?: LayingHen) {
        this.id = null;

        if (layingHen) {
            this.id = layingHen.id;
            this.batch = layingHen.batch;
            this.age = layingHen.age;
            this.actualQuantity = layingHen.actualQuantity;
            this.loss = layingHen.loss;
            this.arrivingDate = layingHen.arrivingDate;
            this.henhouseId = layingHen.henhouseId;
            this.cost = layingHen.cost;
            this.clutch = layingHen.clutch;
        }
    }
}

export interface Cost {
    purchasingUP: string;
    foodUP: string;
}

export interface Clutch {
    date: string;
    quantity: string;
}
