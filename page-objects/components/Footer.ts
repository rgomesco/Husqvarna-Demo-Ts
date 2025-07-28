import { Selector } from "testcafe";

class Footer {
    footer: Selector;
    footerFbLink: Selector;
    footerInstaLink: Selector;
    footerYoutubeLink: Selector;
    footerTwitterLink: Selector;
    footerLinkedInLink: Selector;
    constructor() {
        this.footer = Selector("footer.hbd-footer");
        this.footerFbLink = this.footer.find("a[aria-label='Visit us on Facebook']");
        this.footerInstaLink = this.footer.find("[aria-label='Instagram']");
        this.footerYoutubeLink = this.footer.find("[aria-label='YouTube']");
        this.footerTwitterLink = this.footer.find("[aria-label='Twitter']");
        this.footerLinkedInLink = this.footer.find("[aria-label='LinkedIn']");
    }
}

export default Footer;
