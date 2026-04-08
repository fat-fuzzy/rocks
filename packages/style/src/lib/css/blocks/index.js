/* ========================================= */
/* ============  CSS blocks==================*/
/* ========================================= */
/* These stylesheets CSS variables that must be generated from design token maps (key -> CSS value) */

/* ============  Buttons ==================*/
import './control/button.css' /* Use for basic Button styles and colors (<button> element) */
import './control/expand.css' /* Use for Expand button styles and colors (uses aria-pressed attribute, <button> element) */
import './control/switch.css' /* Use for Switch button styles and colors (uses aria-pressed */
import './control/toggle.css' /* Use for Toggle button styles and colors (uses aria-pressed */

/* ============  Inputs & Forms ==================*/
import './control/fieldset.css' /* Use for fieldset element: TODO: maybe move to form */
import './control/form.css' /* Use for form and form inputs */
import './control/input.css' /* ff-control overrides */

/* ============  Presentation presets ==================*/
import './presentation/media.css' /* Use for framed elements: video, img, picture, canvas */
import './presentation/links.css' /* Use for link styles (<a> element) */
import './presentation/feedback.css' /* Use for feedback elements (success, warnings, errors, etc) */
import './presentation/details.css' /* Use for detail + summary element */
import './presentation/code.css' /* Use for code blocks and inline code text */
import './presentation/magic.css' /* Use for page layout specifics */
import './presentation/table.css' /* Use for tables = tabular data: https://www.w3.org/TR/tabular-data-model/ */
import './presentation/tags.css' /* Use for tabs (navigation + disclosure pattern) data: https://www.w3.org/TR/tabular-data-model/ */

/* ============  Overlay content ==================*/
import './overlay/dialog.css' /* Use for dialogs */
import './overlay/popover.css' /* Use for popovers */
import './overlay/toast.css' /* Use for toasts */
import './overlay/tooltip.css' /* Use for tooltips */
import './overlay/zoomer.css' /* Use for full page zoom dialogs  */
