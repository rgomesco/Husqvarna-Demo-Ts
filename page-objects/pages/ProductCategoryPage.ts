import { Selector, t } from "testcafe";

class ProductCategoryPage {
    pageTitle: Selector;
    header: Selector;
    priceRangeSliderMinSelector: string;
    priceRangeSliderMaxSelector: string;
    priceRangeSliderMinLabel: Selector;
    priceRangeSliderMaxLabel: Selector;
    productCards: Selector;
    productAddToCartButton: Selector;
    productFirstCardWithAddToCartBtn: Selector;
    productFirstCardWithAddToCartBtnName: Selector;

    constructor() {
        this.pageTitle = Selector("head > title");
        this.header = Selector("h1[class='ui-a2 ui-if ui-io ui-i3 ui-jf ui-a4']");
        this.priceRangeSliderMinSelector = "minRangeInput-from_price_incl_vat_td";
        this.priceRangeSliderMaxSelector = "maxRangeInput-from_price_incl_vat_td";
        this.priceRangeSliderMinLabel = Selector("label[for='minRangeInput-from_price_incl_vat_td']");
        this.priceRangeSliderMaxLabel = Selector("label[for='maxRangeInput-from_price_incl_vat_td']");
        this.productCards = Selector("[data-card-type='machine-specification']");
        this.productAddToCartButton = this.productCards.find("[class='ui-n3 ui-jm ui-jo hbd-card-commerce__buy-button ui-n4']");
        this.productFirstCardWithAddToCartBtn = this.productAddToCartButton.nth(0);
        this.productFirstCardWithAddToCartBtnName = this.productFirstCardWithAddToCartBtn.parent("[class='hui-box hui-flexbox--container hui-size--sm-w-full hbd-card__frame']").find("h3");
    }

    async setSliderValue(minValue: string, maxValue: string): Promise<void> {
        let minElementSelector = this.priceRangeSliderMinSelector;
        let maxElementSelector = this.priceRangeSliderMaxSelector;
        await t.eval(() => {
            const rangeMinElement = document.getElementById(minElementSelector);
            if (rangeMinElement) {
                (rangeMinElement as HTMLInputElement).value = minValue;
                rangeMinElement.dispatchEvent(new Event('change', { bubbles: true }));
            }

            const rangeMaxElement = document.getElementById(maxElementSelector);
            if (rangeMaxElement) {
                (rangeMaxElement as HTMLInputElement).value = maxValue;
                rangeMaxElement.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }, {
            dependencies: {
                minValue, maxValue, minElementSelector, maxElementSelector
            }
        });
    }
}

export default ProductCategoryPage;
