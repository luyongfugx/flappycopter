#include "agAdbind.hpp"
#include "cocos2d_specifics.hpp"
#include "AdBind.h"

template<class T>
static JSBool dummy_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
	TypeTest<T> t;
	T* cobj = new T();
	js_type_class_t *p;
	uint32_t typeId = t.s_id();
	HASH_FIND_INT(_js_global_type_ht, &typeId, p);
	assert(p);
	JSObject *_tmp = JS_NewObject(cx, p->jsclass, p->proto, p->parentProto);
	js_proxy_t *pp = jsb_new_proxy(cobj, _tmp);
	JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(_tmp));

	return JS_TRUE;
}

static JSBool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
	return JS_FALSE;
}


JSClass  *jsb_AdBind_class;
JSObject *jsb_AdBind_prototype;

JSBool js_agAdbind_AdBind_hideAd(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	AdBind* cobj = (AdBind *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		cobj->hideAd();
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_agAdbind_AdBind_showAd(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	AdBind* cobj = (AdBind *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		std::string ret = cobj->showAd();
		jsval jsret;
		jsret = std_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}



void js_agAdbind_AdBind_finalize(JSFreeOp *fop, JSObject *obj) {
    CCLOGINFO("jsbindings: finalizing JS object %p (AdBind)", obj);
    js_proxy_t* nproxy;
    js_proxy_t* jsproxy;
    jsproxy = jsb_get_js_proxy(obj);
    if (jsproxy) {
        nproxy = jsb_get_native_proxy(jsproxy->ptr);

        AdBind *nobj = static_cast<AdBind *>(nproxy->ptr);
        if (nobj)
            delete nobj;
        
        jsb_remove_proxy(nproxy, jsproxy);
    }
}

static JSBool js_agAdbind_AdBind_ctor(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
    AdBind *nobj = new AdBind();
    js_proxy_t* p = jsb_new_proxy(nobj, obj);
    JS_SET_RVAL(cx, vp, JSVAL_VOID);
    return JS_TRUE;
}

void js_register_agAdbind_AdBind(JSContext *cx, JSObject *global) {
	jsb_AdBind_class = (JSClass *)calloc(1, sizeof(JSClass));
	jsb_AdBind_class->name = "AdBind";
	jsb_AdBind_class->addProperty = JS_PropertyStub;
	jsb_AdBind_class->delProperty = JS_PropertyStub;
	jsb_AdBind_class->getProperty = JS_PropertyStub;
	jsb_AdBind_class->setProperty = JS_StrictPropertyStub;
	jsb_AdBind_class->enumerate = JS_EnumerateStub;
	jsb_AdBind_class->resolve = JS_ResolveStub;
	jsb_AdBind_class->convert = JS_ConvertStub;
	jsb_AdBind_class->finalize = js_agAdbind_AdBind_finalize;
	jsb_AdBind_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

	static JSPropertySpec properties[] = {
		{0, 0, 0, JSOP_NULLWRAPPER, JSOP_NULLWRAPPER}
	};

	static JSFunctionSpec funcs[] = {
		JS_FN("hideAd", js_agAdbind_AdBind_hideAd, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("showAd", js_agAdbind_AdBind_showAd, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("ctor", js_agAdbind_AdBind_ctor, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
	};

	JSFunctionSpec *st_funcs = NULL;

	jsb_AdBind_prototype = JS_InitClass(
		cx, global,
		NULL, // parent proto
		jsb_AdBind_class,
		dummy_constructor<AdBind>, 0, // no constructor
		properties,
		funcs,
		NULL, // no static properties
		st_funcs);
	// make the class enumerable in the registered namespace
	JSBool found;
	JS_SetPropertyAttributes(cx, global, "AdBind", JSPROP_ENUMERATE | JSPROP_READONLY, &found);

	// add the proto and JSClass to the type->js info hash table
	TypeTest<AdBind> t;
	js_type_class_t *p;
	uint32_t typeId = t.s_id();
	HASH_FIND_INT(_js_global_type_ht, &typeId, p);
	if (!p) {
		p = (js_type_class_t *)malloc(sizeof(js_type_class_t));
		p->type = typeId;
		p->jsclass = jsb_AdBind_class;
		p->proto = jsb_AdBind_prototype;
		p->parentProto = NULL;
		HASH_ADD_INT(_js_global_type_ht, type, p);
	}
}

void register_all_agAdbind(JSContext* cx, JSObject* obj) {

	js_register_agAdbind_AdBind(cx, obj);
}

