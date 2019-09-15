!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ValueNoise=e():t.ValueNoise=e()}(window,(function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="docs/js",i(i.s=0)}([function(t,e,i){"use strict";function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}i.r(e);var r=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.seed=e%2147483647,this.seed<=0&&(this.seed+=2147483646)}var e,i,r;return e=t,(i=[{key:"next",value:function(){return this.seed=16807*this.seed%2147483647,this.seed}},{key:"generate",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return t+(this.next()-1)/2147483646*(e-t)}}])&&n(e.prototype,i),r&&n(e,r),t}();function o(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}i.d(e,"default",(function(){return s}));var s=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var i=Object.assign({seed:~~(Math.random()*Math.pow(2,31)),wavelength:20,amplitude:1,width:50,height:50,depth:50,dimension:2,octaves:5,octaveIndex:2},e);Object.assign(this,i),this.wavelengthx=i.wavelength,this.wavelengthy=i.wavelength,this.wavelengthz=i.wavelength,this.randomise(this.seed),this.interpolate=this.quadratic}var e,i,n;return e=t,(i=[{key:"cosine",value:function(t,e,i){var n=i*Math.PI,r=.5*(1-Math.cos(n));return t*(1-r)+e*r}},{key:"cubic",value:function(t,e,i){return i<.5?4*Math.pow(i,3)*(e-t)+t:((i-1)*(2*i-2)*(2*i-2)+1)*(e-t)+t}},{key:"quadratic",value:function(t,e,i){return i<.5?2*Math.pow(i,2)*(e-t)+t:((4-2*i)*i-1)*(e-t)+t}},{key:"linear",value:function(t,e,i){return t+(e-t)*i}},{key:"randomise",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:~~(Math.random()*(Math.pow(2,31)-1)),i=new r(e),n=this.dimension;this.rows=Array(this.height).fill(0).map((function(){return n>1?Array(t.width).fill(0).map((function(){return n>2?Array(t.depth).fill(0).map((function(){return i.generate()*t.amplitude})):i.generate()*t.amplitude})):i.generate()*t.amplitude}))}},{key:"gen2d",value:function(t,e,i,n){var r=t>this.width*i-1?t%(this.width*i):t,o=e>this.height*n-1?e%(this.height*n):e,s=~~(r/i),h=1+~~(r/i)<this.width?1+~~(r/i):0,a=~~(o/n),l=1+~~(o/n)<this.height?1+~~(o/n):0;return e%n==0?t%i==0?this.rows[a][s]:this.interpolate(this.rows[a][s],this.rows[a][h],t%i/i):t%i==0?this.interpolate(this.rows[a][s],this.rows[l][s],e%n/n):this.interpolate(this.interpolate(this.rows[a][s],this.rows[l][s],e%n/n),this.interpolate(this.rows[a][h],this.rows[l][h],e%n/n),t%i/i)}},{key:"gen3d",value:function(t,e,i,n,r,o){var s=t>this.width*n-1?t%(this.width*n):t,h=e>this.height*r-1?e%(this.height*r):e,a=i>this.height*o-1?i%(this.height*o):i,l=~~(s/n),u=1+~~(s/n)<this.width?1+~~(s/n):0,d=~~(h/r),c=1+~~(h/r)<this.height?1+~~(h/r):0,p=~~(a/o),w=1+~~(a/o)<this.depth?1+~~(a/o):0;return i%o==0?e%r==0?t%n==0?this.rows[d][l][p]:this.interpolate(this.rows[d][l][p],this.rows[d][u][p],t%n/n):t%n==0?this.interpolate(this.rows[d][l][p],this.rows[c][l][p],e%r/r):this.interpolate(this.interpolate(this.rows[d][l][p],this.rows[c][l][p],e%r/r),this.interpolate(this.rows[d][u][p],this.rows[c][u][p],e%r/r),t%n/n):e%r==0?t%n==0?this.interpolate(this.rows[d][l][p],this.rows[d][l][w],i%o/o):this.interpolate(this.interpolate(this.rows[d][l][p],this.rows[d][u][p],t%n/n),this.interpolate(this.rows[d][l][w],this.rows[d][u][w],t%n/n),i%o/o):t%n==0?this.interpolate(this.interpolate(this.rows[d][l][p],this.rows[c][l][p],e%r/r),this.interpolate(this.rows[d][l][w],this.rows[c][l][w],e%r/r),i%o/o):this.interpolate(this.interpolate(this.interpolate(this.rows[d][l][p],this.rows[c][l][p],e%r/r),this.interpolate(this.rows[d][u][p],this.rows[c][u][p],e%r/r),t%n/n),this.interpolate(this.interpolate(this.rows[d][l][w],this.rows[c][l][w],e%r/r),this.interpolate(this.rows[d][u][w],this.rows[c][u][w],e%r/r),t%n/n),i%o/o)}},{key:"generate",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=0,n=0,r=0;r<this.octaves;r++){var o=this.amplitude/Math.pow(this.octaveIndex,r),s=Math.max(this.wavelengthx/Math.pow(this.octaveIndex,r),1),h=Math.max(this.wavelengthy/Math.pow(this.octaveIndex,r),1),a=this.gen2d(t,e,s,h)*o;i+=a,n+=1/Math.pow(this.octaveIndex,r)}return i/n}},{key:"generate3d",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:2,r=0,o=0,s=0;s<this.octaves;s++){var h=this.amplitude/Math.pow(this.octaveIndex,s),a=Math.max(this.wavelengthx/Math.pow(this.octaveIndex,s),1),l=Math.max(this.wavelengthy/Math.pow(this.octaveIndex,s),1),u=Math.max(this.wavelengthz/Math.pow(this.octaveIndex,s),1);r+=this.gen3d(t,e,i,a,l,u*n*2,1)*h,o+=1/Math.pow(this.octaveIndex,s)}return r/o}}])&&o(e.prototype,i),n&&o(e,n),t}()}]).default}));
//# sourceMappingURL=value-noise.js.map