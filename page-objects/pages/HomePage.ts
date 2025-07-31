import { Selector, t } from "testcafe";

class HomePage {
    pageTitle: Selector;
    exploreProductsSectionHeader: Selector;
    exploreProductsSectionExpandBtn: Selector;
    exploreProductsSectionCards: Selector;

    constructor() {
        this.pageTitle = Selector("head > title");
        this.exploreProductsSectionHeader = Selector("[class='ui-ii ui-i_ ui-ik ui-jb hbd-card-list']").withText("Explore our range of products");
        this.exploreProductsSectionExpandBtn = Selector("[class='ui-ii ui-i_ ui-ik ui-jb hbd-card-list'] button").withText("Expand");
        this.exploreProductsSectionCards = Selector("h3[class='hui-spacing--sm-mt-4-times-1 WLwtnNxco1C4cPugKSaO0g==']");
    }

    /**
     * Clicks on a product card in the 'Explore our range of products' section by card name.
     * @param {string} cardName - The name of the product card to select
     */
    async selectExploreProductCard(cardName: string): Promise<void> {
        const card = this.exploreProductsSectionCards.withText(cardName);
        await t.click(card);
    }
}

export default HomePage;
