import { Selector } from "testcafe";

class AddedToCartSideDrawer {
    addedToCartSideDrawer: Selector;
    proceedToCheckoutBtn: Selector;
    productAddedToCartMessage: Selector;
    constructor() {
        this.addedToCartSideDrawer = Selector(".ui-ee.ui-q-.ui-q_.ui-q1.ui-q7.hbd-added-to-cart");
        this.proceedToCheckoutBtn = this.addedToCartSideDrawer.find("button.ui-n3.ui-if.ui-i8.ui-ig.ui-i9.ui-c9.ui-ra");
        this.productAddedToCartMessage = this.addedToCartSideDrawer.find(".ui-a2.ui-a-");
    }
}

export default AddedToCartSideDrawer;
