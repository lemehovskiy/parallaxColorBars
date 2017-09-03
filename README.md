parallaxColorBars
-------

### Demo

[https://lemehovskiy.github.io/parallaxColorBars/demo](https://lemehovskiy.github.io/parallaxColorBars/demo/)


### Package Managers

```sh
# NPM
npm install parallax_color_bars
```

### Data Attribute Settings


In parallaxColorBars you can now add settings using the data-parallax-color-bar attribute. You still need to call
$(element).parallaxColorBars()
to initialize parallaxColorBars on the element.


Example:

```html
<div data-parallax-color-bar='{"left": 70, "top": 20, "width": 15, "height": 60, "shift": 300, "duration": 2}'></div>
```


### Settings

Option | Type | Default
--- | --- | ---
top | int | 50
left | int | 50
width | int | 10
height | int | 20
shift | int | 10
duration | int | 1.5

### Browser support

* Chrome
* Firefox
* Opera
* IE10/11


### Dependencies

* jQuery 1.7
* Gsap
