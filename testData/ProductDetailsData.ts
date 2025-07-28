class ProductDetailsData {
    product1: {
        searchTerm: string;
        name: string;
        checkoutName: string;
        price: string;
        category: string;
    };
    constructor() {
        this.product1 = {
            searchTerm: "Husqvarna 120 Mark 2",
            name: "Husqvarna 120 Mark II",
            checkoutName: "120 Mark II",
            price: "£",
            category: "Petrol Chainsaws"
        };
    }
}
export default ProductDetailsData;