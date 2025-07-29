import HomePage from "../page-objects/pages/HomePage";
import CheckoutPage from "../page-objects/pages/CheckoutPage";
import ProductCategoryPage from "../page-objects/pages/ProductCategoryPage";
import Helper from "../utilities/Helper";
import NavBar from "../page-objects/components/NavBar";
import AddedToCartSideDrawer from "../page-objects/components/AddedToCartSideDrawer";
import CartSideDrawer from "../page-objects/components/CartSideDrawer";
import HomePageData from "../testData/HomePageData";
import ProductDetailsData from "../testData/ProductDetailsData";
import ProductCategoryData from "../testData/ProductCategoryData";
import CartData from "../testData/CartPageData";
import { Selector, t } from "testcafe";

const homePage = new HomePage();
const navBar = new NavBar();
const checkoutPage = new CheckoutPage();
const helper = new Helper();
const productCategoryPage = new ProductCategoryPage();
const addedToCartSideDrawer = new AddedToCartSideDrawer();
const cartSideDrawer = new CartSideDrawer();
const homePageData = new HomePageData();
const productDetailsData = new ProductDetailsData();
const productCategoryData = new ProductCategoryData();
const cartData = new CartData();

fixture("Add to cart tests")
    .page(homePageData.homePageUrl);

test("Adding product to cart and checkout", async t => {
    await helper.searchAndAddProductToCart(productDetailsData.product1);
    await t.expect(checkoutPage.pageTitle.innerText).contains(cartData.cartPageTitle, "Cart page title does not match");
    await t.expect(checkoutPage.checkoutListItemName.innerText).contains(productDetailsData.product1.checkoutName, "Product name in cart does not match with the added product");
    await t.expect(checkoutPage.checkoutListItemPrice.innerText).contains(productDetailsData.product1.price, "Product price in cart does not match with the added product");
    await t.expect(await checkoutPage.getProductQuantity(productDetailsData.product1.checkoutName)).eql(1, "Product quantity in cart does not match with the added product");
    await t.expect(checkoutPage.continueToDeliveryBtn.visible).ok("Continue to delivery button is not visible");
    await t.click(checkoutPage.continueShopping);
    await t.click(navBar.homePageLogo);
    await t.expect(homePage.pageTitle.innerText).contains(homePageData.homePageTitle, "Home page title does not match");
});

test("Exploring products , applying filter , adding products to cart", async t => {
    await t.scrollIntoView(homePage.exploreProductsSectionHeader);
    await t.click(homePage.exploreProductsSectionExpandBtn);
    await homePage.selectExploreProductCard(productCategoryData.productCategory);
    await t.expect(productCategoryPage.pageTitle.innerText).contains(productCategoryData.pageTitle, "Product category page title does not match");
    await t.expect(productCategoryPage.header.innerText).contains(productCategoryData.productCategory, "Product category header does not match with selected category");
    await t.expect(productCategoryPage.compareButton.visible).ok("Compare button is not visible");
    await t.expect(productCategoryPage.sortButton.visible).ok("Sort button is not visible");
    await productCategoryPage.setSliderValue("99", "499");
    await t.expect(productCategoryPage.priceRangeSliderMinLabel.innerText).contains("99", "Price range slider min label does not match with expected value");
    await t.expect(productCategoryPage.priceRangeSliderMaxLabel.innerText).contains("499", "Price range slider max label does not match with expected value");
    const productName = await productCategoryPage.productFirstCardWithAddToCartBtnName.innerText;
    const productPrice = (await productCategoryPage.productFirstCardWithAddToCartBtnPrice.innerText).split(" ")[1];
    await t.click(productCategoryPage.productFirstCardWithAddToCartBtn);
    await t.expect(addedToCartSideDrawer.addedToCartSideDrawer.visible).ok("Add to cart sidebar did not appear");
    await t.expect(addedToCartSideDrawer.productAddedToCartMessage.innerText).contains(`${productName} was added to your cart`, "Product name in added to cart message does not match with the added product");
    await helper.waitUntilElementIsEnabled(addedToCartSideDrawer.proceedToCheckoutBtn);
    await t.click(addedToCartSideDrawer.proceedToCheckoutBtn);
    await t.expect(checkoutPage.pageTitle.innerText).contains(cartData.cartPageTitle, "Cart page title does not match");
    await t.expect(checkoutPage.checkoutListItemName.innerText).contains(productName, "Product name in cart does not match with the added product");
    await t.expect(checkoutPage.checkoutListItemPrice.innerText).contains(productPrice, "Product price in cart does not match with the added product");
    await t.click(checkoutPage.continueShopping);
    await t.click(navBar.homePageLogo);
    await t.expect(homePage.pageTitle.innerText).contains(homePageData.homePageTitle, "Home page title does not match");
});

test("Deleting item from cart", async t => {
    await helper.searchAndAddProductToCart(productDetailsData.product1);
    await t.expect(checkoutPage.pageTitle.innerText).contains(cartData.cartPageTitle, "Cart page title does not match");
    await t.expect(checkoutPage.checkoutListItemName.innerText).contains(productDetailsData.product1.checkoutName, "Product name in cart does not match with the added product");
    await t.click(checkoutPage.continueShopping);
    await t.click(navBar.homePageLogo);
    await t.expect(homePage.pageTitle.innerText).contains(homePageData.homePageTitle, "Home page title does not match");
    await t.expect(navBar.cartIconCount.innerText).eql("1", "Cart icon count does not match with the number of products in cart");
    await t.click(navBar.cartIcon);
    await t.expect(cartSideDrawer.cartSideDrawer.visible).ok("Shopping cart sidebar did not appear");
    await t.expect(cartSideDrawer.productName.innerText).contains(productDetailsData.product1.checkoutName, "Product name in shopping cart does not match with the added product");
    await t.click(cartSideDrawer.proceedToCheckoutBtn);
    await t.expect(checkoutPage.pageTitle.innerText).contains(cartData.cartPageTitle, "Cart page title does not match");
    await checkoutPage.deleteProductFromCart(productDetailsData.product1.checkoutName);
    await t.expect(checkoutPage.checkoutList.count).eql(0, "Product was not deleted from cart");
    await t.expect(checkoutPage.emptyCartMessage.innerText).contains(cartData.emptyCartMessage, "Empty cart message not displayed");
});
