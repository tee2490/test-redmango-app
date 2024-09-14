import { shoppingCartModel } from "../../interfaces";

export interface orderSummaryProps {
    data: {
        id?: number;
        cartItems?: shoppingCartModel[];
        cartTotal?: number;
        userId?: string;
        stripePaymentIntentId?: string;
        status?: string;
    };
    userInput: {
        name: string;
        email: string;
        phoneNumber: string;
    };
    clientSecret? : any;
}