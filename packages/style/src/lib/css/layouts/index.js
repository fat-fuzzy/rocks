/* == Layout staples == */
import './text.css' /* Use for text content width */
import './stack.css' /* Use for stacked column content */
import './sidebar.css' /* Use for sidebar layouts = layouts containing two children: "main" and "side" */
import './switcher.css' /* Use for items that switch between column and row layout when the container reaches a threshold width  */
import './frame.css' /* Use for displaying content with a given aspect ratio */

/* Tortillas are for Wrapping */
import './taco.css' /* Use for main content centering (wide columns with max-width set using: percentage - margin (in  em units))*/
import './burrito.css' /* Use for side content centering (narrow columns with max-width set using sidebar width variables  (in ch units))*/

/* Maki is for Margin */
import './maki.css' /* Use for side content centering without any max-width */

/* Pasta is for Padding */
import './cannelloni.css' /* Use single axis padding  */
import './ravioli.css' /* Use for all-round padding  */

/* == Layout recipes == */

/* Use for displaying hidden content with a button action */
import './reveal.css'
import './reveal-sticky.css'
import './details.css' /* Use to style <details> and <summary> elements */

/* == Layout spices  == */
import './breakpoint.css' /* Breakpoint utilities */
import './shapes.css' /* Use to style geometric shapes */
import './flex.css' /* Use for flex layouts */
import './align.css' /* Use for aligning items inside containers */
import './position.css' /* Use for to position elements */
import './layers.css' /* Use to define layers content (uses shadows.css) */

/* == Grids == */
import './grid/base.css'
import './grid/items.css'
import './grid/auto.css' /* Gallery grid layout with equal sized areas */

/* Metro grid collapsible elements */
import './grid/gare/scale.css'
import './grid/gare/base.css'
import './grid/gare/animation.css'

/* Metro grid areas (zones 1- 5 ...) */
import './grid/zone/zone-1.css'
import './grid/zone/zone-2.css'
import './grid/zone/zone-3.css'
import './grid/zone/zone-main.css'
import './grid/zone/context.css'
import './grid/zone/navbar.css'
import './grid/zone/sidebar.css'

import './grid/urbanist/base.css'
import './grid/urbanist/grid.css'
import './grid/urbanist/zone-2.css'
import './grid/urbanist/zone-main.css'

import './grid/metro/zone-2.css'
import './grid/metro/zone-main.css'

import './grid/railway/context.css'
import './grid/railway/zone-2.css'
import './grid/railway/zone-main.css'

import './grid/steam/zone-2.css'
import './grid/steam/zone-main.css'

import './grid/tgv/zone-2.css'
import './grid/tgv/zone-main.css'

import './grid/tram/zone-2.css'
import './grid/tram/zone-main.css'

import './grid/voyager/zone-2.css'
import './grid/voyager/zone-main.css'

/* Grid Demo specific code */
import './grid/demo/gare.css'
import './grid/demo/sidebar.css'
