(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my_history/index"],{"09b9":function(t,a,e){},"3b7a":function(t,a,e){"use strict";var n;e.d(a,"b",(function(){return o})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return n}));var o=function(){var t=this,a=t.$createElement;t._self._c},i=[]},"3d5b":function(t,a,e){"use strict";var n=e("5a4c"),o=e.n(n);o.a},"5a4c":function(t,a,e){},"619f":function(t,a,e){"use strict";e.r(a);var n=e("81cc"),o=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,(function(){return n[t]}))}(i);a["default"]=o.a},6800:function(t,a,e){"use strict";e.r(a);var n=e("946b"),o=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,(function(){return n[t]}))}(i);a["default"]=o.a},"81cc":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i(e("9a77")),o=i(e("89dc"));function i(t){return t&&t.__esModule?t:{default:t}}var u=getApp(),r={components:{articleList:n.default},data:function(){return{list:[],page:1,isBottom:!1}},onLoad:function(){var t=this,a=u.globalData.userInfo.id,e=u.globalData.userInfo.token,n=u.globalData.site_url+"/appapi/?s=User.History";o.default.requestApi(n,{uid:a,token:e,p:1}).then((function(a){t.list=a.data.info[0].list}))},onReachBottom:function(){var a=this,e=this;if(1!=this.isBottom){var n=this.page+1;this.page=n;var i=u.globalData.userInfo.id,r=u.globalData.userInfo.token,s=u.globalData.site_url+"/appapi/?s=User.History";o.default.requestApi(s,{uid:i,token:r,p:n}).then((function(t){t.data.info[0].list.length<10&&(e.isBottom=!0);for(var n=a.list,o=0;o<t.data.info[0].list.length;o++)n.push(t.data.info[0][o]);a.list=n}))}else t.showToast({title:"已经到底部了",icon:"none"})},methods:{deleteList:function(){var a=this,e=u.globalData.userInfo.id,n=u.globalData.userInfo.token,i=u.globalData.site_url+"/appapi/?s=User.Cleanhistory";o.default.requestApi(i,{uid:e,token:n}).then((function(e){0==e.data.code&&(a.list=[]),t.showToast({title:e.data.msg,icon:"none"})}))}}};a.default=r}).call(this,e("543d")["default"])},"8bc8":function(t,a,e){"use strict";e.r(a);var n=e("3b7a"),o=e("619f");for(var i in o)"default"!==i&&function(t){e.d(a,t,(function(){return o[t]}))}(i);e("ed60");var u,r=e("f0c5"),s=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);a["default"]=s.exports},"8d6b":function(t,a,e){"use strict";var n;e.d(a,"b",(function(){return o})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return n}));var o=function(){var t=this,a=t.$createElement;t._self._c},i=[]},9449:function(t,a,e){"use strict";(function(t){e("c5a6");n(e("66fd"));var a=n(e("8bc8"));function n(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("543d")["createPage"])},"946b":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e=getApp(),n={props:{list:{type:Array,value:[]}},data:function(){return{}},methods:{goH5:function(a){console.log(a.currentTarget),"1"!=e.globalData.first_read&&t.request({url:e.globalData.site_url+"/appapi/?s=Home.AddReadScore",method:"GET",data:{uid:e.globalData.userInfo.id,token:e.globalData.userInfo.token,news_id:a.currentTarget.dataset.id},success:function(a){if(0==a.data.data.code){var e=a.data.data.info["score"];t.showToast({title:"积分+"+e,image:"../../static/images/jifen_shan.png",mask:!0,duration:2e3})}}}),t.navigateTo({url:"/pages/webview/index?url="+a.currentTarget.dataset.url})}}};a.default=n}).call(this,e("543d")["default"])},"9a77":function(t,a,e){"use strict";e.r(a);var n=e("8d6b"),o=e("6800");for(var i in o)"default"!==i&&function(t){e.d(a,t,(function(){return o[t]}))}(i);e("3d5b");var u,r=e("f0c5"),s=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);a["default"]=s.exports},ed60:function(t,a,e){"use strict";var n=e("09b9"),o=e.n(n);o.a}},[["9449","common/runtime","common/vendor"]]]);