import { t } from "testcafe";
import NavBar from "../page-objects/components/NavBar";
import ProductDetailsPage from "../page-objects/pages/ProductDetailsPage";
import productDetailsData from "../testData/ProductDetailsData";
import AddedToCartSideDrawer from "../page-objects/components/AddedToCartSideDrawer";

const navBar = new NavBar();
const productDetailsPage = new ProductDetailsPage();
const addedToCartSideDrawer = new AddedToCartSideDrawer();

interface ProductData {
    searchTerm: string;
    name: string;
    price: string;
    category: string;
    checkoutName: string;
}

class Helper {
    async waitUntilElementIsEnabled(element: Selector, timeout = 10000, interval = 250): Promise<void> {
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            if (!await element.hasAttribute('disabled')) {
                return;
            }
            await t.wait(interval);
        }
        throw new Error(`Element was not enabled within ${timeout}ms.`);
    }

    async searchAndAddProductToCart(productData: ProductData, elementIndexInSearchList = 0): Promise<void> {
        await t.click(navBar.searchIcon);
        await t.typeText(navBar.searchInput, productData.searchTerm);
        await t.click(navBar.searchResults.nth(elementIndexInSearchList));
        await t.expect(productDetailsPage.productTitle.innerText).contains(productData.name, "Product title does not match with selected product");
        await t.expect(productDetailsPage.productPrice.innerText).contains(productData.price, "Product price does not match with selected product");
        await t.expect(productDetailsPage.productCategory.innerText).contains(productData.category, "Product category does not match with selected product");
        await t.click(productDetailsPage.addToCartButton);
        await t.expect(addedToCartSideDrawer.addedToCartSideDrawer.visible).ok("Add to cart sidebar did not appear");
        await t.expect(addedToCartSideDrawer.productAddedToCartMessage.innerText)
            .contains(`${productData.checkoutName} was added to your cart`, "Product added to cart message does not match with selected product");
        await this.waitUntilElementIsEnabled(addedToCartSideDrawer.proceedToCheckoutBtn);
        await t.click(addedToCartSideDrawer.proceedToCheckoutBtn);
    }
}

export default Helper;
