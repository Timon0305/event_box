(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{"IF+5":function(t,e,r){"use strict";r.d(e,"a",(function(){return f}));var n=r("KeVp"),o=r("HcwC"),i=r("0kXZ"),u=r("7RJT"),s=r("q3Kh"),c=r("lwos"),a=r("rNzc"),p=r("vLqr"),d=r("CcnG"),h=r("t/Na"),f=function(){function t(t,e,r,n){this.request=t,this.sessionService=e,this.loader=r,this.http=n,this.headerCount$=new u.BehaviorSubject({messages:0,notifications:0}),this.isResponsiveFilter=!1,this.isAutoLocationSet=!1}return t.prototype.getAllCategories=function(){return this.request.get(o.a.ENDPOINTS.categories).pipe(Object(s.map)((function(t){return t.data})))},t.prototype.getAllStates=function(){return this.request.get(o.a.ENDPOINTS.getStates).pipe(Object(s.map)((function(t){return t.data})))},t.prototype.getProductServiceList=function(t,e){var r=this,n=e?o.a.ENDPOINTS.products:o.a.ENDPOINTS.adminProducts;return this.loader.start(),this.request.get(n,t).pipe(Object(s.map)((function(t){return r.loader.stop(),t})),Object(a.catchError)((function(t){return r.loader.stop(),Object(p.throwError)(t)})))},t.prototype.getProductById=function(t,e){return this.request.get(e?o.a.ENDPOINTS.adminProducts+"/"+t:o.a.ENDPOINTS.products+"/"+t).pipe(Object(s.map)((function(t){return t})))},t.prototype.getPublicProductServiceRecord=function(t){return this.request.get(o.a.ENDPOINTS.productsView+"/"+t).pipe(Object(s.map)((function(t){return t})))},t.prototype.getProductReviews=function(t,e){return this.request.get(o.a.ENDPOINTS.reviews+"/"+t,e).pipe(Object(s.map)((function(t){return t.data})))},t.prototype.getHeaderCountApi=function(){var t=this;return this.request.get(""+o.a.ENDPOINTS.headerCount).pipe(Object(s.map)((function(e){return t.headerCount$.next(e.data.unread),e})))},t.prototype.getHeaderCount=function(){return this.headerCount$},t.prototype.getDashboardCounts=function(){return this.request.get(""+o.a.ENDPOINTS.dashboard).pipe(Object(s.map)((function(t){return t})))},t.prototype.getCountryCodes=function(){return this.http.get("assets/data/country-codes.json").pipe(Object(s.map)((function(t){return t})))},t.prototype.getResponsive=function(t){return this.isResponsiveFilter=!1,window.innerWidth<=t&&(this.isResponsiveFilter=!0),this.isResponsiveFilter},Object.defineProperty(t.prototype,"IsAutoLocation",{get:function(){return this.isAutoLocationSet},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"setIsAutoLocation",{set:function(t){this.isAutoLocationSet=t},enumerable:!0,configurable:!0}),t.ngInjectableDef=d.Zb({factory:function(){return new t(d.ac(n.a),d.ac(i.a),d.ac(c.a),d.ac(h.c))},token:t,providedIn:"root"}),t}()}}]);