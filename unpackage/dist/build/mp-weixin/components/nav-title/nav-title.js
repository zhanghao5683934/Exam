(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/nav-title/nav-title"],{"321a":function(t,n,e){},a1c2:function(t,n,e){"use strict";e.r(n);var a=e("c405"),u=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);n["default"]=u.a},a23b:function(t,n,e){"use strict";var a=e("321a"),u=e.n(a);u.a},b97e:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return a}));var u=function(){var t=this,n=t.$createElement;t._self._c},r=[]},c3fa:function(t,n,e){"use strict";e.r(n);var a=e("b97e"),u=e("a1c2");for(var r in u)"default"!==r&&function(t){e.d(n,t,(function(){return u[t]}))}(r);e("a23b");var i,o=e("f0c5"),c=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);n["default"]=c.exports},c405:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=u(e("89dc"));function u(t){return t&&t.__esModule?t:{default:t}}var r=getApp(),i={components:{},props:{title:{type:String,value:""}},created:function(){var t=this;this.navHeight=r.globalData.navHeight+"rpx";var n=r.globalData.site_url+"/appapi/?s=Home.GetConfig";a.default.requestApi(n,{}).then((function(n){t.configInfo=n.data.info[0]}))},data:function(){return{navHeight:0,configInfo:[]}},methods:{}};n.default=i}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/nav-title/nav-title-create-component',
    {
        'components/nav-title/nav-title-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c3fa"))
        })
    },
    [['components/nav-title/nav-title-create-component']]
]);
