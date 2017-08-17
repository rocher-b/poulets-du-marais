export class Chicken {
    id: string;
    batch?: string;
    age: string;
    quantity: string;
    loss?: string;
    arrivingDate: string;
    cullingDate?: boolean;
    henhouseId?: string;
    cost?: Cost;
    culling?: Culling[];

    constructor(chicken?: Chicken) {
        this.id = null;

        if (chicken) {
            this.id = chicken.id;
            this.batch = chicken.batch;
            this.age = chicken.age;
            this.quantity = chicken.quantity;
            this.loss = chicken.loss;
            this.arrivingDate = chicken.arrivingDate;
            this.cullingDate = chicken.cullingDate;
            this.henhouseId = chicken.henhouseId;
            this.cost = chicken.cost;
            this.culling = chicken.culling;
        }
    }
}

export interface Cost {
    purchasingPriceUP: string;
    cullingCostUP: string;
    foodUP: string;
    totalUP: string;
}

export interface Culling {
    date: string;
    quantity: string;
}
