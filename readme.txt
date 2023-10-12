=== DragBlock - Advanced WordPress Gutenberg Full Site Editor ===
Contributors: dragblock, sneeit, Tien Nguyen
Donate link: https://www.paypal.me/sneeit
Tags: gutenberg, blocks, gutenberg blocks, editor, block, site builder, drag-and-drop, visual editor
Requires at least: 5.9
Requires PHP: 7.4
Tested up to: 6.3.1
Stable tag: 23.10.12
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

The "DragBlock" plugin enhances the WordPress Full Site Gutenberg Editor to support designing pixel perfect websites
easily.

== Description ==

The "DragBlock" plugin enhances the WordPress Full Site Gutenberg Editor to support designing pixel perfect websites
easily.

https://www.youtube.com/watch?v=c0kgB-mBDTo&list=PLM7acJv8ZNtio0sPznKOGtxodBUOZWDYR

<h3>YOU CAN:</h3>
<strong><a href="https://www.youtube.com/watch?v=c0kgB-mBDTo" title="Introduce Appearance Panel">Add Appearance Styles</a>:</strong> to design perfect websites. You can also select devices for the styles to create responsive designs.

<strong><a href="https://www.youtube.com/watch?v=KpjyBqkY-MY" title="Introduce Attributes Panel">Add Tag Attributes</a>: </strong> like title, alt, placeholder... to improve both search engine optimization (SEO) and Core Web Vital Score.

<strong><a href="https://www.youtube.com/watch?v=q90uCWkNRKA" title="Introduce Form Blocks">Build Forms</a>: </strong> such as contact forms or any kind of forms. ContactForm7 and all other heavy form plugins are no longer needed

<strong><a href="https://www.youtube.com/watch?v=zqqhUubFawY" title="Introduce Database Panel">Query Database</a>: </strong> to load posts and other dynamic contents to your design.

<strong><a href="https://www.youtube.com/watch?v=UTTi8Smuz3g" title="Introduce Interactions Panel">Define Interactions</a>:</strong> like onClick, onMouseEnter onMouseLeave between blocks.

<strong><a href="https://www.youtube.com/watch?v=KRILy2KsT60" title="Introduce Wrapper Toolbar">Quick Styling</a>: </strong> via the block toolbars.

<strong><a href="https://www.youtube.com/watch?v=bbnUsu-fXU4" title="Introduce Font Library">Pick Google Fonts</a>: </strong> through the font library. You can also upload your custom font to the library.

<strong>Define multilingual texts:</strong> to support many languages without creating separate pages and designs

<h3>DESIGN PHILOSOPHY</h3>
Our philosophy is "block oriented designing" (BOD) which means attaching everything related to a block to itself. By doing that, we can manage things related to an individual block easily and when removing a block, everything that is plugged into it, including server side scripts, client scripts, css and text definitions, will be completely removed as well. This will give a huge impact on improving the performance of websites and also saving the time for developers to not find and clean codes manually like before.

Moreover, we also want to get rid of the era when we treat users like babies by providing them inputs for everything. In the DragBlock, we provide users with dictionaries so they can grasp their layout properties completely without being smashed by a flood of many different kinds of inputs.

In summary, DragBlock empowers users to create professional-looking websites like an expert designer effortlessly with a fresh feeling of managing blocks with simplicity. Everything can be done within the Gutenberg editor, ushering in a new era of Full Site Editing with the DragBlock plugin.

== Frequently Asked Questions ==
= Why I need to use DragBlock? =
To Build pixel perfect and responsive websites with the higest performance, SEO, and aesthetic standards.

= How do I get support? =
Please <a href="https://github.com/tiennguyenvan/wp.org.dragblock/es" title="Submit GitHub Ticket">Submit a Ticket</a> or <a href="https://wordpress.org/support/plugin/dragblock/" title="Support Forum"> Check Support Fourm</a>

= How to contribute to DragBlock? =
Let's join the revolution in changing the way the whole world working with WordPress designs by contributing to our <a href="https://github.com/tiennguyenvan/wp.org.dragblock/" title="DragBlock GitHub OpenSource">DragBlock GitHub</a>

== Screenshots ==
1. **Powerful Block Toolbars** Easily pick design layout for wrapper, font-size, rotation and other attributes for
blocks
2. **Devices and States for Styles** Visually select devices and states for individual styles via the DragBlock
appearance panel
3. **Interaction** Define action and behavior for blocks via the interaction panel
4. **Database Queries** Get posts from the database and place them to custom places via the Database panel
5. **Multilingual Text** Input texts and attributes for different languages easily without need WPML, Polylang or other
language plugin. Saving time by not creating many different pages.
6. **Custom** Create custom forms with beautiful layout and assign form action to process submitted data automatically.
No need Contact-Form 7 or any other form plugins.

== Changelog ==
= 23.10.07 =
* Initial Release

= 23.09.28 =
* Fixed: remove direct script enqueue
* Fixed: remove relative path defines
* New: provide public source code github links
* Fixed: update Tested Upto Version
* Fixed: sanitize variables to echo

= 23.09.11 =
* Switched to the CalVer
* Fixed all code issues related to WordPress Coding Standards
* Reorganized files as a Microservices Architecture
* Simplified our variable names to reduce the naming time
* Mapped code commenting to avoid updating the plugin solely for comment changes.

= 23.08.08 =
* Fixed: replaced move_uploaded_file with wp_handle_upload
* Fixed: added nonce verification for all data processes in the font library
* Fixed: cleaned up font credits to minify the initial release
* Fixed: removed unnecessary system option updates

= 23.07.19 =
* Fixed: incorrect stable tag
* Fixed: prevent accessing files directly
* Fixed: sanitized, escaped, and validated all i/o data
* Fixed: verify nonce before processing form data

== Upgrade Notice ==
= 23.10.07 =
First release with the most stable features