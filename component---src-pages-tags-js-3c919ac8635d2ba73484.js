webpackJsonp([0xb2200a1b9a48],{180:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.query=void 0;var c=n(1),i=r(c),f=n(3),l=(r(f),n(183)),s=function(e){function t(){return o(this,t),u(this,e.apply(this,arguments))}return a(t,e),t.prototype.render=function(){var e=(0,l.countTags)(this.props.data.allMarkdownRemark.edges);return i.default.createElement("div",null,e.map(function(e){return i.default.createElement("div",{key:e.name},e.name,": ",e.count)}))},t}(i.default.Component);t.default=s;t.query="** extracted graphql fragment **"},183:function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function o(e){if(0===e.length)return[];var t=a.flatten(e.map(function(e){return e.node.frontmatter.tags})).reduce(function(e,t){return e[t]?e[t]=e[t]+1:e[t]=1,e},{});return Object.entries(t).map(function(e){var t=e[0],n=e[1];return{name:t,count:n}})}t.__esModule=!0,t.countTags=o;var u=n(43),a=r(u)}});
//# sourceMappingURL=component---src-pages-tags-js-3c919ac8635d2ba73484.js.map