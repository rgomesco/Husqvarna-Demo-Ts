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
    description: string;
}

class Helper {

    /**
     * Waits until the given element is enabled (does not have the 'disabled' attribute) or times out.
     * @param {Selector} element - The element to check
     * @param {number} timeout - Maximum time to wait in milliseconds (default 10000)
     * @param {number} interval - Interval between checks in milliseconds (default 250)
     * @throws {Error} If the element is not enabled within the timeout
     */
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

    /**
     * Searches for a product using the search bar, verifies product details, adds it to the cart, and proceeds to checkout.
     * @param {Object} productData - The product data to search and add
     * @param {number} elementIndexInSearchList - Index of the product in the search results (default 0)
     */
    async searchAndAddProductToCart(productData: ProductData, elementIndexInSearchList = 0): Promise<void> {
        await t.click(navBar.searchIcon);
        await t.typeText(navBar.searchInput, productData.searchTerm);
        await t.click(navBar.searchResults.nth(elementIndexInSearchList));
        await t.expect(productDetailsPage.productTitle.innerText).contains(productData.name, "Product title does not match with selected product");
        await t.expect(productDetailsPage.productPrice.innerText).contains(productData.price, "Product price does not match with selected product");
        await t.expect(productDetailsPage.productCategory.innerText).contains(productData.category, "Product category does not match with selected product");
        await t.expect(productDetailsPage.findAStoreButton.visible).ok("Find a store button is not visible");
        await t.expect(productDetailsPage.productDescriptionHeader.innerText).contains(productData.description, "Product description does not match with selected product");
        await t.expect(productDetailsPage.breadcrumbs.innerText).contains(productData.checkoutName, "Product category does not match with selected product");
        await t.click(productDetailsPage.addToCartButton);
        await t.expect(addedToCartSideDrawer.addedToCartSideDrawer.visible).ok("Add to cart sidebar did not appear");
        await t.expect(addedToCartSideDrawer.productAddedToCartMessage.innerText)
            .contains(`${productData.checkoutName} was added to your cart`, "Product added to cart message does not match with selected product");
        await this.waitUntilElementIsEnabled(addedToCartSideDrawer.proceedToCheckoutBtn);
        await t.click(addedToCartSideDrawer.proceedToCheckoutBtn);
    }
}

export default Helper;
