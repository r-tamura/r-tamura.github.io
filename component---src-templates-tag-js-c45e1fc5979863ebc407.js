webpackJsonp([0x758a40cb69e9],{34:function(e,t,n){e.exports={default:n(40),__esModule:!0}},35:function(e,t,n){e.exports={default:n(41),__esModule:!0}},36:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n(34),o=r(a);t.default=o.default||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}},38:function(e,t){"use strict";t.__esModule=!0,t.default=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}},40:function(e,t,n){n(46),e.exports=n(10).Object.assign},41:function(e,t,n){n(47),e.exports=n(10).Object.keys},43:function(e,t,n){"use strict";var r=n(18),a=n(56),o=n(44),l=n(25),i=n(67),u=Object.assign;e.exports=!u||n(15)(function(){var e={},t={},n=Symbol(),r="abcdefghijklmnopqrst";return e[n]=7,r.split("").forEach(function(e){t[e]=e}),7!=u({},e)[n]||Object.keys(u({},t)).join("")!=r})?function(e,t){for(var n=l(e),u=arguments.length,c=1,s=a.f,f=o.f;u>c;)for(var d,p=i(arguments[c++]),m=s?r(p).concat(s(p)):r(p),h=m.length,v=0;h>v;)f.call(p,d=m[v++])&&(n[d]=p[d]);return n}:u},45:function(e,t,n){var r=n(14),a=n(10),o=n(15);e.exports=function(e,t){var n=(a.Object||{})[e]||Object[e],l={};l[e]=t(n),r(r.S+r.F*o(function(){n(1)}),"Object",l)}},46:function(e,t,n){var r=n(14);r(r.S+r.F,"Object",{assign:n(43)})},47:function(e,t,n){var r=n(25),a=n(18);n(45)("keys",function(){return function(e){return a(r(e))}})},17:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){return o(E+e)}function o(e){return e.replace(/^\/\//g,"/")}t.__esModule=!0,t.navigateTo=void 0;var l=n(36),i=r(l),u=n(35),c=r(u),s=n(38),f=r(s),d=n(29),p=r(d),m=n(39),h=r(m),v=n(37),_=r(v);t.withPrefix=a;var g=n(1),b=r(g),y=n(51),w=n(5),T=r(w),E="/",O={activeClassName:T.default.string,activeStyle:T.default.object,exact:T.default.bool,strict:T.default.bool,isActive:T.default.func,location:T.default.object},j=function(e,t){var n=new window.IntersectionObserver(function(r){r.forEach(function(r){e===r.target&&(r.isIntersecting||r.intersectionRatio>0)&&(n.unobserve(e),n.disconnect(),t())})});n.observe(e)},x=function(e){function t(n){(0,p.default)(this,t);var r=(0,h.default)(this,e.call(this)),o=!1;return"undefined"!=typeof window&&window.IntersectionObserver&&(o=!0),r.state={to:a(n.to),IOSupported:o},r.handleRef=r.handleRef.bind(r),r}return(0,_.default)(t,e),t.prototype.componentWillReceiveProps=function(e){this.props.to!==e.to&&(this.setState({to:a(e.to)}),this.state.IOSupported||___loader.enqueue(this.state.to))},t.prototype.componentDidMount=function(){this.state.IOSupported||___loader.enqueue(this.state.to)},t.prototype.handleRef=function(e){var t=this;this.state.IOSupported&&e&&j(e,function(){___loader.enqueue(t.state.to)})},t.prototype.render=function(){var e=this,t=this.props,n=t.onClick,r=(0,f.default)(t,["onClick"]),a=void 0;return a=(0,c.default)(O).some(function(t){return e.props[t]})?y.NavLink:y.Link,b.default.createElement(a,(0,i.default)({onClick:function(t){if(n&&n(t),!(0!==t.button||e.props.target||t.defaultPrevented||t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)){var r=e.state.to;if(r.split("#").length>1&&(r=r.split("#").slice(0,-1).join("")),r===window.location.pathname){var a=e.state.to.split("#").slice(1).join("#"),o=document.getElementById(a);if(null!==o)return o.scrollIntoView(),!0}t.preventDefault(),window.___navigateTo(e.state.to)}return!0}},r,{to:this.state.to,innerRef:this.handleRef}))},t}(b.default.Component);x.propTypes=(0,i.default)({},O,{to:T.default.string.isRequired,onClick:T.default.func}),x.contextTypes={router:T.default.object},t.default=x;t.navigateTo=function(e){window.___navigateTo(a(e))}},48:function(e,t){e.exports={article:"src-components----Article-module---article---3DC8m",articleList:"src-components----Article-module---articleList---38Qi2",articleListItem:"src-components----Article-module---articleListItem---3bh5z",articleTitle:"src-components----Article-module---articleTitle---35oTA",articleAbstract:"src-components----Article-module---articleAbstract---1CUhW","artile__read-btns":"src-components----Article-module---artile__read-btns---2eysc",articleBioWrapper:"src-components----Article-module---articleBioWrapper---uPAfb"}},105:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var i=n(1),u=r(i),c=n(106),s=r(c),f=n(48),d=r(f),p=function(e){function t(){return a(this,t),o(this,e.apply(this,arguments))}return l(t,e),t.prototype.render=function(){var e=this.props.articles;return 0===e.length?null:u.default.createElement("ul",{className:""+d.default.articleList},e.map(function(e){var t=e.node;return u.default.createElement("li",{key:t.fields.slug},u.default.createElement(s.default,{node:t}))}))},t}(u.default.Component);t.default=p,e.exports=t.default},106:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n(1),o=r(a),l=n(17),i=r(l),u=n(52),c=r(u),s=n(48),f=r(s),d=function(e){var t=e.node;return o.default.createElement("section",{className:f.default.articleListItem},o.default.createElement("div",{className:"is-sm"},t.frontmatter.date),o.default.createElement("h3",{style:{marginTop:"10px",marginBottom:"10px"}},o.default.createElement(i.default,{className:"text is-lg is-strong "+f.default.articleTitle,style:{boxShadow:"none"},to:t.fields.slug},t.frontmatter.title)),o.default.createElement(c.default,{tags:t.frontmatter.tags||["test"]}),o.default.createElement("p",{className:""+f.default.articleAbstract},t.excerpt),o.default.createElement("div",{className:"btns is-right artile__read-btns"},o.default.createElement(i.default,{className:"btn is-melt is-round",to:t.fields.slug},"READ")))};t.default=d,e.exports=t.default},32:function(e,t){e.exports={articleTagLinkList:"src-components----Tag-module---articleTagLinkList---17zrK",articleTagIcon:"src-components----Tag-module---articleTagIcon---1tyyk",articleTagLinkWrapper:"src-components----Tag-module---articleTagLinkWrapper---3CU38",articleTag:"src-components----Tag-module---articleTag---25eNq"}},65:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n(1),o=r(a),l=n(17),i=r(l),u=n(32),c=r(u),s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.children,n=void 0===t?"":t,r=e.to;return o.default.createElement(i.default,{to:r,className:c.default.articleTag},n)};t.default=s,e.exports=t.default},52:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n(1),o=r(a),l=n(5),i=r(l),u=n(65),c=r(u),s=n(81),f=n(32),d=r(f),p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.tags,n=void 0===t?[]:t,r=e.styles,a=void 0===r?{}:r,l=e.className,i=void 0===l?"":l;return 0===n.length?null:o.default.createElement("ul",{className:d.default.articleTagLinkList+" "+i},o.default.createElement("li",{className:d.default.articleTagIcon},o.default.createElement("i",{className:"fa fa-tags","aria-hidden":"true"})),n.map(function(e){return o.default.createElement("li",{key:e,style:a},o.default.createElement("div",{className:""+d.default.articleTagLinkWrapper},o.default.createElement(c.default,{to:"/tags/"+(0,s.kebabCase)(e)},e)))}))};p.propTypes={tags:i.default.arrayOf(i.default.string)},t.default=p,e.exports=t.default},264:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.query=void 0;var i=n(1),u=r(i),c=n(105),s=r(c),f=function(e){function t(){return a(this,t),o(this,e.apply(this,arguments))}return l(t,e),t.prototype.render=function(){var e=this.props.data.allMarkdownRemark.edges;return u.default.createElement("div",null,u.default.createElement(s.default,{articles:e}))},t}(u.default.Component);t.default=f;t.query="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-templates-tag-js-c45e1fc5979863ebc407.js.map