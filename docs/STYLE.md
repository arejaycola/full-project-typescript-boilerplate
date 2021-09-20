# Styling Guidelines

## Indention & Spacing

-   Starting level selectors should have no indention.
-   One space should follow a selector name before the opening declaration bracket.
-   Bottom brackets should be on their own lines

For example:

```scss
.selector,
.another .selector {
	text-align: center;
	vertical-align: middle;
}
```

## Sass Formatting

### Selector Nesting

Please try to keep the number of nested selectors less than 3. 
-   A newline should precede a selector being nested.
-   Place nested selectors after the parent's properties/includes/extends/etc...

For example:

```scss
.selector {
	color: #ffffff;
	background: #000000;

	.nested-selector {
		text-align: center;
		border-radius: 5px;
		color: #cecece;
	}
}
```

### Mixins, Nesting, and You

* When using mixins that act as containers for style declarations (such as `@include breakpoint()`), never nest a selector within the mixins brackets.
* `@includes` etc... should be placed (when sensible) at the beginning of a selector's properties.

For example:

```scss
.selector {
  @extend %selector-to-extend;
  @include button--primary;
  color: #ffffff;
  background: #000000;
  @include breakpoint(lima) {
    color: #eeeeee;
  }
  @include breakpoint(papa) {
    color: #cccccc;
  }

  .nested-selector & {
    // Nested selector content here.
    // Notice the newlines.
  }
}
```

The goal is that all of the styles for an element should be in one place. This tends to be easier to debug than having all styles for a breakpoint in one place.

### Extending

While Sass' `@extend` functionality is pretty, it causes a lot of maintenance nightmares, so use it sparingly. The one absolute rule is:

*Do not `@extend` a selector onto a selector in a different file.*

Generally it's best to use a `@mixin`; due to `@extends` incompatability with `@media` queries and it's unintentional `@extends` if the extended selector is used somewhere else.

## Class Naming Conventions

This project leverages a *Block*-*Element*-*Modifier* syntax for naming classes. This produces rather lengthy class names but also provides quick, easily discernible information to developers.

The primary goal of this syntax is to reduce the [specificity](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/) of CSS selectors.

The syntax looks like this:

```scss
.component
.component__element
.component__element--modifier
```

The class names in this syntax do not imply any structural hierarchy in regard to markup. More often than not, the base _component_ class is the containing element of the sub-components, but this is not always the case. You may end up with a markup structure in which an _element_ is placed above the base _component_ like so:

```html
<div class="component__wrapper">
  <div class="component">
    <!-- other markup here -->
  </div>
</div>
```

Elements should have the base class and the modifier classes, so it can be assumed that `.component__element--variation` is already getting the styles of `.component__element`.

```html
<div class="component">
  <div class="component__element component__element--modifier"></div>
</div>
```

```scss
.component__element {
  // styles
}

.component__element--modifier {
  // separate or overriding styles
}
```

More documentation can be found on [Get Bem](http://getbem.com/naming/)

### Declaring Color

When possible, use one of the predefined Sass variables in place for colors.
Otherwise, when declaring hexadecimal color values, always use the full hex value.
Being consistent makes it much easier to find and replace should we need to.

```scss
// No.
color: #333;
// Yes.
color: #333333;
```

### Comments

Sectioning comments should look like so, with bottom borders extending to 80
characters:

```scss
// This is a section
// -----------------------------------------------------------------------------
.selector {
  color: $blue;
}
```

### Avoiding specificity wars and `!important`

#### Never use `#id` selectors

Ideally a class can be added to any element that only has an `[id]`, but if that HTML cannot be updated please use an attribute selector instead. This will keep specificity lower so the project is easier to work with in the future.

```scss
// No.
#my-element { }

// Yes.
[id='my-element'] { }
```
#### Competing specificities

There is only one scenario when `!important` should be used; when an inline style that is unchangeable, or necessary needs to be overridden in a specific context.

If that is the case, consider putting the style in `_shame.css` with a good comment.

If the competing style is using an id no amount of classes in the selector will overrule an id, so the same amount of id's must be used in your selector.

If that **is not** the case (and there are the same amount of id's in your selector), first write the **ideal** selector. Let's say this selector only selects what it needs to, but isn't specific enough:

```scss
.widget__bit {
  .section--featured & { // My ideal selector
    // Styles
  }
}
```

Adding an ID will start specificity wars in the project, adding extra classes may change what it selects or create confusion down the road.

Though it is silly, the recommended approach is to add unnecessary attribute selectors:

```scss
.widget__bit {
  .section--featured &[class] {
    // Outputs: .section--featured .widget__bit[class]
    // Styles
  }
}
```

We've just said that the `.widget__bit` will have a class attribute, which of course it does. This adds 1 class worth of specificity. If that is not enough, attribute selectors can be chained until they have the specificity desired:


```scss
.widget__bit {
  .section--featured &[class][class][class][class][class] {
    // Outputs: .section--featured .widget__bit[class][class][class][class][class]
    // Styles
  }
}
```