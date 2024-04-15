// import './css/index.css';
/* Generated CSS variables */
import './css/tokens/tokens.css'

/* Global config */
// import './css/config/index.css';

/* Resets and global styles, set --current-* CSS var values used in layouts and blocks */
// import './css/globals/index.css';

/* Blocks (self contained, atomic components used in Recipes) */
// import './css/blocks/index.css';

/* Layout (structural components used to organize content on a page or view) */
// import './css/layouts/index.css';

/* Motion (animations, transitions, user-initiated movement) */
// import './css/motion/index.css';

/* Compositions (components that implement common usage patterns using blocks and layouts) */
// import './css/recipes/index.css';

/* Overrides */
import './css/config/visibility.css'

/* Media Queries */
import './css/mixins/index.css'

/* Global config */
import './css/config/reset.css'
import './css/config/debug.css'

/* Theme */
import './css/globals/global.css'
/* import './css/globals/scale.css'; */

/* Color */
/* import './css/globals/color/color.css.css'; */
import './css/globals/color/background.css'
import './css/globals/color/surface.css'
import './css/globals/color/ui.css'
import './css/globals/color/semantic.css'
import './css/globals/contrast.css'
import './css/globals/layers.css'

/* State */
import './css/globals/ui/state.css'
import './css/globals/ui/scale.css'
import './css/globals/ui/variant.css'

/* Assets */
import './css/globals/icons/icon.css' /* Use to display emojis and svg icons */
import './css/globals/icons/svg.css' /* Use to display svg icons */
import './css/globals/icons/assets.css' /* Use to display svg icons */
import './css/globals/icons/emoji.css' /* Use to display emoji icons */
import './css/globals/typography.css'

/**
 * CSS blocks
 * (= "actual content", not layout)
 * These stylesheets must use the tokens defined in `styles/app/my-app/*`
 * where  `my-app` is any folder inside `styles/app` that uses or overrides the design tokens declared in the `styles/app/ui` folder
 */
import './css/blocks/media.css' /* Use for framed elements: video, img, picture, canvas */
import './css/blocks/links.css' /* Use for link styles (<a> element) */
import './css/blocks/button.css' /* Use for basic Button styles and colors (<button> element) */
import './css/blocks/toggle.css' /* Use for Toggle button styles and colors (uses aria-pressed */
import './css/blocks/switch.css' /* Use for Switch button styles and colors (uses aria-pressed */
import './css/blocks/expand.css' /* Use for Expand button styles and colors (uses aria-pressed attribute, <button> element) */
import './css/blocks/form.css' /* Use for form and form inputs */
import './css/blocks/fieldset.css' /* Use for fieldset element: TODO: maybe move to form */
import './css/blocks/tables.css' /* Use for tables = tabular data: https://www.w3.org/TR/tabular-data-model/ */
import './css/blocks/tags.css' /* Use for tables = tabular data: https://www.w3.org/TR/tabular-data-model/ */
import './css/blocks/feedback.css' /* Use for feedback elements (success, warnings, errors, etc) */
import './css/blocks/details.css' /* Use for detail + summary element */
import './css/blocks/code.css' /* Use for code blocks and inline code text */

/* == Layout == */
import './css/layouts/text.css' /* Use for text content width */
import './css/layouts/stack.css' /* Use for stacked column content */
import './css/layouts/sidebar.css' /* Use for sidebar layouts = layouts containing two children: "main" and "side" */
import './css/layouts/switcher.css' /* Use for items that switch between column and row layout when the container reaches a threshold width  */
import './css/layouts/center.css' /* Use for main content centering (wide columns with max-width set using: percentage - margin (in  em units))*/
/* == Grid layouts ==
    - relative order of grid styles is necessary for fallbacks */
/* import './css/layouts/grid-page.css'; /* Use for base grid with page template areas */
/* import './css/layouts/grid-flex.css'; /* Use for layout transitions: mobile flex -> desktop grid (uses page template areas) */
import './css/layouts/flex.css' /* Use for flex layouts */
import './css/layouts/grid.css' /* Use for grid layouts base + gallery grid layout (equal sized areas) */
import './css/layouts/align.css' /* Use for aligning items inside containers and setting widths */
import './css/layouts/burrito.css' /* Use for side content centering (narrow columns with max-width set using sidebar width variables  (in ch units))*/
import './css/layouts/maki.css' /* Use for side content centering without any max-width */
import './css/layouts/frame.css' /* Use for displaying content with a given aspect ratio */
import './css/layouts/card.css' /* Use for displaying self-contained content items */
import './css/layouts/reveal.css' /* Use for displaying hidden content with a button action */
import './css/layouts/reveal-auto.css' /* Use for displaying hidden content in response to a container breakpoint */
import './css/layouts/reveal-fixed.css' /* Use for displaying hidden content in response to a button action */
import './css/layouts/details.css' /* Use to style <details> and <summary> elements */
import './css/layouts/shapes.css' /* Use to style geometric shapes */

/* Layout */
import './css/motion/scroll.css'

/* Compositions */

import './css/recipes/nav.css' /* Use for navigation (navigation = links = hrefs = <a>) */
import './css/recipes/menu.css' /* Use for menus (menus = actions -> use forms [for no-js] -> buttons = <button>) and derived elements */
import './css/recipes/tabs.css' /* Use for tabs */
import './css/recipes/context.css' /* Use for header context box */

import './css/recipes/header-app.css' /* Use for main app header */
import './css/recipes/layout-page.css' /* Define page layout varians here */
import './css/recipes/footer.css' /* Use for main app footer */
import './css/recipes/article.css' /* Use for articles (header + section(s) + optional footer) */

import './css/recipes/grid-header.css' /* Use for a page header layout */
import './css/recipes/grid-sketch.css' /* Use for a Sketch layout */
import './css/recipes/grid-props.css' /* Use for a props inputs layouts */

import './css/recipes/api.css' /* Use for API components (used in Doc website) */
import './css/recipes/app.css' /* Use for app layout specifics */
import './css/recipes/sketch.css' /* Use for player inputs layout */
import './css/recipes/geometry.css' /* Use for geometry inputs layout */
