# State of React uncontrolled forms in 2022

![Preview](https://raw.githubusercontent.com/ThomasRutzer/State-of-React-uncontrolled-forms-in-2022/main/documentation/form.png)

## How to use

Forms are the backbone of the web – still in 2022! So for a good start into the year, I decided to refresh my knowledge on the current state of web forms with React. It's actually quite nice what you can achieve easily with [uncontrolled React form components](https://reactjs.org/docs/uncontrolled-components.html) and [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation). Use the platform and let the browser do most of the heavy lifting!

This demo is based on static HTML export with [nextjs](https://nextjs.org/). Please refer on their [documentation](https://nextjs.org/docs/getting-started) for further details.

### Main scripts

- `npm run dev` will spin up a dev server running on `http://localhost:3000/`
- `npm run test` will run all tests in watch mode
- `npm run build` will run a production-build with static HTML export in `/out`

## Main foci

### Accessiblity

To provide basic accessibility, semantic HTML elements were used. Invalid states result in `aria`-messages which are connected to the `input`-elements through the correct attributes. In the [accessibility section](https://web.dev/learn/forms/accessibility/) of the web.dev tutorial, they use `aria-describedby`. I actually think that [`aria-invalid` combined with `aria-errormessage`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage#example) is a stronger solution and prefer that.

Further accessibility enhancements were focussing the first invalid input element when trying to submit an incomplete form and rendering visually hidden information (e.g. <fieldset> with a <legend>) for users with screenreaders.

### Usability with disabled JavaScript in the client

Isomorphic React with pre-rendered HTML gives a lot of power in our hands. But with that, I think, comes the responsibility to provide a good experience for users who don't have client-side rendering (CSR). Still in 2022!
The form in this demo can be used without CSR. Of course, some features, like revealing password input, or better validation requires JavaScript in the client. However, this can be seen as a progressive improvement. When CSR is available, it adds attribute `novalidate` to the form and therefore disables basic HTML form validation. But even with disabled JavaScript in the client, submit will call the URL of `action` prop with the preferred `method` and still provide basic validation and a workable form.

### Client-side validation

Client-side form validation is always a user-experience enhancement. In general, I combined [HTML validation attributes](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation#validation-related_attributes) plus custom JavaScript validation functions. The attributes provide basic validation for scenarios with disabled CSR.
Which rules result in HTML attributes are [configured here](/components/forms/validation/validationConfig.js). All other validation constraint will be handled with custom validator functions. They should [therefore be available here](/components/forms/validation/customValidators.js). In this configuration, validation attributes have a higher priority compared to custom validator functions. For example if we decide to delete `required` from the `htmlValidationAttributes`, we should add a validator function with the signature of `() => (value) => boolean` and handle it in `createValidator`.

The properties of the [ValidityState Interface](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) are a bit wild in my opinion and not always attributable to the corresponding HTML validation attribute. But it basically says "yes, I am valid" or if not, it gives you a reason. I [added a mapping](/components/forms/validation/validationConfig.js) from the validation attributes to the property of the `ValidityState`.

### Styling

Styling here is very basic. But one thing I will definitly think of from now on is [`accent-color`](https://css-tricks.com/almanac/properties/a/accent-color/). It at least gives a little power to syle "hard-to-style" elements like `input[type="checkbox"]`.
Also the combination of `outline` and `outline-offset` is really nice, since this is a very common visual requirement for focus states, and often needed some quirks to achieve that.

## Conclusion

In the end, this is a very simple solution. But if you like this approach, using the possibilities of the browser and uncontrolled React form elements, [React Hook Form](https://www.react-hook-form.com/) might be worth it for you!
