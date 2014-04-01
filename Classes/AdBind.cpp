//
//  AdBind.cpp
//  flappy
//
//  Created by waynelu on 14-3-11.
//
//
#include "AdBind.h"
#include "cocos2d.h"
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#include "AdWrapper.h"
#else
#include <jni.h>
#include "platform/android/jni/JniHelper.h"
#include <android/log.h>
#endif

std::string AdBind::showAd(){

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    //iOS代码
    AdWrapper *iosAd=new AdWrapper();
    iosAd->showAd();

#else
    //Android代码
    cocos2d::JniMethodInfo minfo;//定义Jni函数信息结构体
    //getStaticMethodInfo 次函数返回一个bool值表示是否找到此函数
    bool isHave = cocos2d::JniHelper::getStaticMethodInfo(minfo,"com/waynelu/flappy/flappy","showAd", "()V");
    
    if (!isHave) {
        //CCLog("jni:此函数不存在");
    }else{
        //CCLog("jni:此函数存在");
        //调用此函数
        minfo.env->CallStaticVoidMethod(minfo.classID, minfo.methodID);
    }
   // CCLog("jni-java函数执行完毕");
#endif
    std::string str="adbind show ad";
    return  str;
}
void AdBind::hideAd(){
    
}
