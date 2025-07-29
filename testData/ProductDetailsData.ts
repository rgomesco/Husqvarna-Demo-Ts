class ProductDetailsData {
    product1: {
        searchTerm: string;
        name: string;
        checkoutName: string;
        price: string;
        category: string;
        description: string;
    };
    constructor() {
        this.product1 = {
            searchTerm: "Husqvarna 120 Mark 2",
            name: "Husqvarna 120 Mark II",
            checkoutName: "120 Mark II",
            price: "£",
            category: "Petrol Chainsaws",
            description: "All-round chainsaw for effortless cutting and felling"
        };
    }
}
export default ProductDetailsData;