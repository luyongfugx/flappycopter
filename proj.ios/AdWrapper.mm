//
//  AdWrapper.m
//  flappy
//
//  Created by waynelu on 14-3-11.
//
//

#import "AdWrapper.h"
#import "AppController.h"
void AdWrapper ::testLog(){

}



void AdWrapper::showAd(){
    AppController* appController = (AppController*) [UIApplication sharedApplication].delegate;
    [appController showAd];

}


