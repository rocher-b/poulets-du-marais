export class Henhouse {
    id: string;
    number: string;
    cleaningDate?: string;
    food: Food[];

    constructor(henhouse?: Henhouse) {
        this.id = null;

        if (henhouse) {
            this.id = henhouse.id;
            this.number = henhouse.number;
            this.cleaningDate = henhouse.cleaningDate;
            this.food = henhouse.food;
        }
    }
}

export interface Food {
    date: string;
    quantity: string;
}
