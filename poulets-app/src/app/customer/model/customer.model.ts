export class Customer {
    id: string;
    firstname: string;
    lastname?: string;
    email?: string;
    tel?: string;
    address?: string;
    giblets: boolean;
    type?: string;

    constructor(customer?: Customer) {
        this.id = null;

        if (customer) {
            this.id = customer.id;
            this.firstname = customer.firstname;
            this.lastname = customer.lastname;
            this.email = customer.tel;
            this.address = customer.address;
            this.giblets = customer.giblets;
            this.type = customer.type;
        }
    }
}
