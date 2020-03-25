# ionic-tabbar-highlighting
Demo project for reproducing a bug with the tab bar icon highlighting on certain devices when invoking navigation from within TypeScript.

When using NavController to navigate tabs, sometimes the tab button highlighting is not removed from the tab that is being navigated away from, even though the `tab-selected` CSS class is removed from the tab bar button.

This bug has only been consistently reproducable on a couple of Galaxy S10 phones, a Galaxy S8 phone, and a Pixel 3 emulator as of right now.
