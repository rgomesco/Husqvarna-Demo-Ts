import { Selector } from "testcafe";

class CartSideDrawer {
    cartSideDrawer: Selector;
    proceedToCheckoutBtn: Selector;
    productName: Selector;
    constructor() {
        this.cartSideDrawer = Selector(".hui-box.hui-drawer.hui-drawer--active.hui-drawer--sm-right.hbd-shopping-cart");
        this.proceedToCheckoutBtn = this.cartSideDrawer.find("button.ui-n3.ui-id.ui-i6.ui-c9.ui-ra");
        this.productName = this.cartSideDrawer.find("h5[class='WLwtnNxco1C4cPugKSaO0g==");
    }
}

export default CartSideDrawer;
