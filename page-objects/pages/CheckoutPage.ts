import { Selector, t } from "testcafe";

class CheckoutPage {
    pageTitle: Selector;
    checkoutList: Selector;
    checkoutListItemName: Selector;
    checkoutListItemPrice: Selector;
    continueShopping: Selector;
    deleteProductBtn: Selector;
    emptyCartMessage: Selector;
    checkoutListItemQuantity: Selector;
    continueToDeliveryBtn: Selector;

    constructor() {
        this.pageTitle = Selector("head > title");
        this.checkoutList = Selector("[class^='card product-info']");
        this.checkoutListItemName = this.checkoutList.find(".line-item-name");
        this.checkoutListItemPrice = this.checkoutList.find("[class='col line-item-total-price']");
        this.continueShopping = Selector("#continue-shopping-button");
        this.deleteProductBtn = Selector("button[class='product-card-btn remove-btn-lg remove-product btn btn-light']");
        this.emptyCartMessage = Selector("[class='col-12 text-left'] h2");
         this.checkoutListItemQuantity = Selector("input.form-control.quantity");
        this.continueToDeliveryBtn = Selector(".container.checkout-continue div");
    }

    async deleteProductFromCart(productName: string): Promise<void> {
        const productToDelete = this.deleteProductBtn.withAttribute("data-name", productName);
        await t.click(productToDelete);
    }

    async getProductQuantity(productName: string): Promise<number> {
        const product = this.checkoutListItemQuantity.withAttribute("data-name", productName);
        const value = await product.value;
        return value !== undefined ? Number(value) : 0;
    }
}

export default CheckoutPage;
