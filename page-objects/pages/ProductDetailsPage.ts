import { Selector } from "testcafe";

class ProductDetailsPage {
    productDetailsSection: Selector;
    productCategory: Selector;
    productTitle: Selector;
    productPrice: Selector;
    addToCartButton: Selector;
    addToCartSidebar: Selector;
    proceedToCheckoutButton: Selector;
    productAddedToCartMessage: Selector;
    findAStoreButton: Selector;
    productDescriptionHeader: Selector;
    breadcrumbs: Selector;

    constructor() {
        this.productDetailsSection = Selector("section[data-ui-component='ProductV2Aside']");
        this.productCategory = this.productDetailsSection.find("[class='ui-a2 ui-a-']");
        this.productTitle = this.productDetailsSection.find("h1");
        this.productPrice = this.productDetailsSection.find("[class='ui-a2 ui-ep ui-a6']");
        this.addToCartButton = Selector("#add-to-cart-button-1");
        this.findAStoreButton = Selector("[class='ui-n3 ui-n6 ui-id ui-c9 ui-jy ui-j0']");
        this.productDescriptionHeader = Selector("section h2.ui-a2.ui-if.ui-a6");
        this.breadcrumbs = Selector(".hbd-breadcrumbs__items");
        this.addToCartSidebar = Selector("[class='ui-ee ui-q- ui-q_ ui-q1 ui-q7 hbd-added-to-cart']");
        this.proceedToCheckoutButton = this.addToCartSidebar.find("button[class='ui-n3 ui-if ui-i8 ui-ig ui-i9 ui-c9 ui-ra']");
        this.productAddedToCartMessage = this.addToCartSidebar.find("[class='ui-a2 ui-a-']");
    }
}

export default ProductDetailsPage;
