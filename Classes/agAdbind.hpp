#ifndef __agAdbind_h__
#define __agAdbind_h__

#include "jsapi.h"
#include "jsfriendapi.h"


extern JSClass  *jsb_AdBind_class;
extern JSObject *jsb_AdBind_prototype;

JSBool js_agAdbind_AdBind_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_agAdbind_AdBind_finalize(JSContext *cx, JSObject *obj);
void js_register_agAdbind_AdBind(JSContext *cx, JSObject *global);
void register_all_agAdbind(JSContext* cx, JSObject* obj);
JSBool js_agAdbind_AdBind_hideAd(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_agAdbind_AdBind_showAd(JSContext *cx, uint32_t argc, jsval *vp);
#endif

