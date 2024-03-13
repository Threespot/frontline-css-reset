# Frontline CSS Reset
![npm version](https://img.shields.io/npm/v/frontline-css-reset) ![gzip size](https://img.badgesize.io/Threespot/frontline-css-reset/master/dist/frontline-css-reset.min.css.svg?compression=gzip)

## Background

All browsers include some basic default styles, like heading sizes, list item bullets, table borders, form field styles, etc. These are known as the user agent styles. If you’d like to see what they look like here’s a [collection](https://meiert.com/en/blog/user-agent-style-sheets/) from the past and present.

When developers began using CSS in the late 1990s and early 2000s they found themselves having to cancel out the user agent styles more often than not, particularly default margins. In an effort to reduce the amount of CSS they had to write on every project, some developers created their own reusable global styles they would include on every project, before their own custom styles. These became known as CSS resets. If you’re interested in the history of CSS reset, check out these resources:

- https://en.wikipedia.org/wiki/Reset_style_sheet
- https://www.webfx.com/blog/web-design/the-hishistorytory-of-css-resets/
- https://css-tricks.com/reboot-resets-reasoning/
- https://css-tricks.com/css-remedy/

CSS resets typically do a combination of the following:

- Remove unwanted default browser styles
  - e.g. remove default margins
- Fix browser bugs and inconsistencies
  - e.g. remove rounded corners on buttons in iOS
- Apply custom global styles
  - e.g. set `box-sizing: border-box;` on all elements

Our CSS reset focuses on removing unwanted default styles. There aren’t many browser inconsistencies to worry about these days, and we prefer to let developers add their own global styles rather than include any opinionated styles in the reset (i.e. unlike [normalize.css](https://nicolasgallagher.com/about-normalize-css/) which aims to improve upon the user agent styles rather than reset them).

## Usage

Download [`frontline-css-reset.min.css`](dist/frontline-css-reset.min.css) and include it in your project before any other custom styles.

It can also be downloaded via npm: `$ npm install frontline-css-reset`

## Browser Support

This reset uses [`:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) as much as possible to reduce specificity to zero, making it easier for devs to override any of the styles later. It’s fully supported in all browser that support `:where()` (see https://caniuse.com/mdn-css_selectors_where).

If your project requires deeper browser support try using version [6.0.1](https://github.com/Threespot/frontline-css-reset/releases/tag/v6.0.1), which doesn’t use `:where()`.

## License

Frontline CSS Reset is free software and may be redistributed under the terms of the [MIT license](https://github.com/Threespot/frontline-css-reset/blob/master/LICENSE.md).

## Thanks

We’re very thankful to the many developers and open-source projects that informed our work. Special thanks to [Eric Meyer](https://meyerweb.com/eric/), [Paul Irish](https://www.paulirish.com), [Nicolas Gallagher](https://nicolasgallagher.com), [Jonathan Neal](https://jonneal.dev), [Andy Bell](https://piccalil.li), [Chris Coyier](https://chriscoyier.net), and [Josh Comeau](https://www.joshwcomeau.com).

Our reset was heavily influenced by these other resets:

- [http://meyerweb.com/eric/tools/css/reset/](http://meyerweb.com/eric/tools/css/reset/)
- [https://github.com/necolas/normalize.css](https://github.com/necolas/normalize.css)
- [https://github.com/10up/sanitize.css](https://github.com/10up/sanitize.css)
- [https://kilianvalkhof.com/2022/css-html/your-css-reset-needs-text-size-adjust-probably/](https://kilianvalkhof.com/2022/css-html/your-css-reset-needs-text-size-adjust-probably/)
- [https://www.joshwcomeau.com/css/custom-css-reset/](https://www.joshwcomeau.com/css/custom-css-reset/)
- [https://piccalil.li/blog/a-more-modern-css-reset/](https://piccalil.li/blog/a-more-modern-css-reset/)


## About Threespot

[Threespot](https://www.threespot.com) is a design and development agency from Washington, DC. We work for organizations that we believe are making a positive change in the world. Find out more [about us](https://www.threespot.com/about-us), [our projects](https://www.threespot.com/our-work) or [hire us](https://www.threespot.com/contact-us)!

[![Threespot](https://avatars3.githubusercontent.com/u/370822?v=3&s=100)](https://www.threespot.com)
