var l = Object.defineProperty;
var i = (e, r, s) => r in e ? l(e, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[r] = s;
var t = (e, r, s) => i(e, typeof r != "symbol" ? r + "" : r, s);
var c = /* @__PURE__ */ ((e) => (e.en = "en", e))(c || {});
const R = (e) => `${e} character${Number(e) > 1 ? "s" : ""} maximum`, E = (e) => `${e} character${Number(e) > 1 ? "s" : ""} minimum`, u = (e, r) => {
  let s = r;
  return s || (s = "special character"), `${e} ${s}${Number(e) > 1 ? "s" : ""} minimum`;
}, O = (e) => `Please select at least ${e} option${Number(e) > 1 ? "s" : ""}`, T = {
  FORMAT_EMAIL: "Please enter a valid email",
  FORMAT_PHONE: "Please enter a valid phone number",
  FORMAT_POSTCODE: "Please enter a valid postcode",
  FORMAT_USERNAME: "Characters allowed: alphanumeric characters, hyphens (-), periods (.), underscores (_)",
  CHECKBOX_PATTERN: "Please choose at least one option",
  RADIO_PATTERN: "Please select an option",
  MATCH_PASSWORD: "Passwords do not match"
}, m = {
  FORMAT_PATTERN: u,
  FORMAT_TEXT_MIN: E,
  FORMAT_TEXT_MAX: R,
  CHECKBOX_MIN: O
}, _ = {
  ERRORS: T,
  ERRORS_FUNCTIONS: m
}, M = {
  username: "Username",
  email: "Email",
  password: "Password",
  confirm_password: "Confirm Password"
}, h = {
  LABELS: M
};
class A {
  constructor(r) {
    /**
     * Error messages for form validation
     */
    t(this, "locale", c.en);
    t(this, "errors", {
      // es: errors_es,
      // fr: errors_fr,
      en: _
    });
    t(this, "labels", {
      // es: errors_es,
      // fr: errors_fr,
      en: h
    });
    r && (this.locale = r);
  }
  getError(r, s, ...a) {
    const o = r.ERRORS, n = r.ERRORS_FUNCTIONS;
    return o[s] ? o[s] : a.length && n[s] ? n[s](...a) : s;
  }
  getErrorMessage(r, ...s) {
    return this.errors[this.locale] ? this.getError(this.errors[this.locale], r, ...s) : r;
  }
}
const d = { L10nFormatter: A };
export {
  d as default
};
