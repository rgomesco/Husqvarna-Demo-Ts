import HomePage from "../page-objects/pages/HomePage";
import NavBar from "../page-objects/components/NavBar";
import Footer from "../page-objects/components/Footer";
import HomePageData from "../testData/HomePageData";
import NavBarData from "../testData/NavBarData";

const homePage = new HomePage();
const navBar = new NavBar();
const footer = new Footer();
const homePageData = new HomePageData();
const navBarData = new NavBarData();

fixture("Home page tests")
    .page(homePageData.homePageUrl);

test("Home page verification", async t => {
    await t.expect(homePage.pageTitle.innerText).contains(homePageData.homePageTitle, "Home page title does not match");
    await t.expect(await navBar.verifyMenuOptions(navBar.menuOptions, navBarData.menuOptions)).ok("Menu options verification failed");
    await t.hover(navBar.menuOptionsProducts);
    await t.expect(await navBar.verifyMenuOptions(navBar.productsMenuOptions, navBarData.productsMenuOptions)).ok("Product menu options verification failed");
});

test("External Link navigation", async t => {
    const currentWindow = await t.getCurrentWindow() as any;
    await t.click(footer.footerFbLink);
    let newWindow = await t.getCurrentWindow() as any;
    // Issue with TestCafe where it sometimes does not open a new tab/window on first click
    // Click again to ensure the link opens in a new tab.
    if (newWindow.id === currentWindow.id) {
        await t.click(footer.footerFbLink);
    }
    newWindow = await t.getCurrentWindow() as any;
    await t.expect(newWindow.id).notEql(currentWindow.id, "New window did not open for Facebook link");
    await t.closeWindow(newWindow);
});
