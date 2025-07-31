import { Selector } from "testcafe";

class NavBar {
    homePageLogo: Selector;
    menuOptions: Selector;
    menuOptionsProducts: Selector;
    productsMenuOptions: Selector;
    searchIcon: Selector;
    searchInput: Selector;
    searchResults: Selector;
    cartIcon: Selector;
    cartIconCount: Selector;

    constructor() {
        this.homePageLogo = Selector("#d8abd6163720422ea2c6e9915f826469");
        this.menuOptions = Selector("div[class='NQn52AVwHjwOFmJrBTm5Yw== XjlailUrV2bP-RqA+LYnOQ=='] span[class='X9D68nbjuhd172ecd9Wfow== ui-a2 ui-a8']");
        this.menuOptionsProducts = this.menuOptions.withText("Products");
        this.productsMenuOptions = Selector("[id='5d476f3fba274234b9e9751c5a7589a3-navigation-menu-item-focus-trap-firstTrap']")
            .nextSibling()
            .find("p[class='jx9YjxawtpFnz91SqZVTeg== ui-a2 ui-bd']")
            .with({ visibilityCheck: true });
        this.searchIcon = Selector("button[aria-label='Open search']");
        this.searchInput = Selector("#on-page-search");
        this.searchResults = Selector(".hbd-search-results-list__list li a");
        this.cartIcon = Selector("button[aria-label='Shopping cart']");
        this.cartIconCount = Selector("[class='ui-ed ui-d- ui-io ui-ip ui-j4 ui-j2 fRFm0OI5Lt2m9Zhak8mAwA== ui-1 ui-2'] [class='ui-a2 ui-ps ui-bh']");
    }

    /**
     * Verifies that the given menu element contains the expected menu options.
     * @param {Selector} element - The Selector for the menu options
     * @param {string[]} expectedMenuOptions - Array of expected menu option texts
     * @returns {Promise<boolean>} - True if all expected options are present, false otherwise
     */
    async verifyMenuOptions(element: Selector, expectedMenuOptions: string[]): Promise<boolean> {
        let menuCount = await element.count;
        if (menuCount !== expectedMenuOptions.length) {
            return false;
        }
        for (let i = 0; i < menuCount; i++) {
            if (!(await element.nth(i).innerText).includes(expectedMenuOptions[i])) {
                return false;
            }
        }
        return true;
    }
}

export default NavBar;
