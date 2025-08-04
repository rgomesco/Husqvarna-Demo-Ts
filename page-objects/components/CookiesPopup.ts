
import { Selector, t } from "testcafe";

class CookiesPopup {
    acceptAllCookiesButton: Selector;
    rejectAllCookiesButton: Selector;
    constructor() {
        this.acceptAllCookiesButton = Selector("#onetrust-accept-btn-handler").with({ boundTestRun: t });
        this.rejectAllCookiesButton = Selector("#onetrust-reject-all-handler").with({ boundTestRun: t });
    }

 /**
     * Handles the cookies popup by either accepting or rejecting cookies.
     * Clicks the "Accept All" button if value is true, otherwise clicks "Reject All".
     * @param value - If true, accepts cookies; if false, rejects cookies.
     */
    async acceptCookiesPopup(value: boolean): Promise<void> {
        if (await this.acceptAllCookiesButton.exists) {
            if (value) {
                await t.click(this.acceptAllCookiesButton);
            } else{
                await t.click(this.rejectAllCookiesButton);
            }
        }
    }
    }

export default CookiesPopup;