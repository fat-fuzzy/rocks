---
title: SignUp
slug: SignUp
category: ['recipes']
group: 'forms'
props_state: ['action']
props_style:
  {
    'blocks': {'block': ['color', 'variant', 'size']},
    'layouts': {'container': ['container', 'size']},
  }
---

## Usage

This is a sample form that validates inputs using the `@fat-fuzzy/validation` package.

### Heads Up

The password validation schema used for this sample form validates patterns, but it does not guarantee a password is secure:

- it will not check against common or compromised passwords: a password such as `password123!!!` will pass validation

To learn more about authentication best practices see: [OWASP Authentication Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html).

### Related Components

- `Button` component in `buttons`
- `Feedback` component in `blocks`

## Resources

- [MDN - The Form Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- [chromium.org - Create Amazing Password Forms](https://www.chromium.org/developers/design-documents/create-amazing-password-forms/)
