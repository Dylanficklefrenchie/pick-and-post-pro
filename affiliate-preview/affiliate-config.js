/* PICK & POST PRO — AFFILIATE MODE CONFIG (the ONE place to change affiliate wording).
   Used by /affiliate-preview/ (Page 1), /affiliate-preview/picker/ and the affiliate character pages /affiliate-preview/pages/<key>/.
   The brand app (site root + /pages/<key>/) never loads this file: brand captions have no link, no #ad, no footer.
   STATUS: every wording value marked PROPOSED is awaiting Dylan's approval (built 10 Oct 2026). Swap the text here, redeploy, done. */
window.PPP_AFFILIATE_CONFIG = {
  status: 'PROPOSED - awaiting Dylan approval',

  /* Caption in affiliate mode = disclosure + disclosureSeparator + (picture line + line break + closer, unchanged) + footerSeparator + footer */
  disclosure: '#ad',                                    // PROPOSED: first line of every affiliate caption
  disclosureSeparator: '\n',                            // line break after the disclosure
  footer: 'Shop the Royal Court \u2615 link in my bio', // PROPOSED: Instagram caption links are not clickable, so the link stays out of the feed caption
  footerSeparator: '\n\n',                              // blank line between the closer and the footer

  /* Toggle: true = put the raw referral URL in the caption footer instead (uses footerWithLink, {link} = the saved link) */
  footerIncludeLink: false,
  footerWithLink: 'Shop the Royal Court \u2615 {link}', // PROPOSED, only used when footerIncludeLink is true

  /* Per-character overrides (key = folder name under pages/) */
  characters: {
    wheelie: {
      showInPicker: false,   // The Wheelie Roast pays 0% commission: hidden from the affiliate picker by default. Set true to show it.
      footer: 'The Wheelie Roast \u2615 link in my bio (no commission on this blend)',  // PROPOSED no-commission footer, used if shown
      footerWithLink: 'The Wheelie Roast \u2615 {link} (no commission on this blend)'   // PROPOSED, only with footerIncludeLink
    }
  },

  /* Referral link rules: /affiliate-preview/?ref=CODE saves linkBase + CODE; manual entries must be this site with ?ref= */
  linkBase: 'https://ficklefrenchiecoffeeclub.com/?ref=',
  allowedHosts: ['ficklefrenchiecoffeeclub.com', 'www.ficklefrenchiecoffeeclub.com'],
  codePattern: '^[A-Za-z0-9_-]{2,64}$',

  /* UI copy (PROPOSED) */
  copyLinkTip: 'Instagram captions can\u2019t open links \u2014 paste your link in your bio or on a Story link sticker.',
  noLinkPrompt: 'Add your affiliate link first, then tap POST again. Open the link from your welcome email, or paste your link here:',
  invalidLinkMessage: 'Please paste your full Fickle Frenchie Coffee Club link, like https://ficklefrenchiecoffeeclub.com/?ref=YOURCODE'
};
