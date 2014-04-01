
@class RootViewController;
#import "DMAdView.h"
#import "DMInterstitialAdController.h"
@interface AppController : NSObject <UIAccelerometerDelegate, UIAlertViewDelegate, UITextFieldDelegate,UIApplicationDelegate,DMAdViewDelegate,DMInterstitialAdControllerDelegate> {
    UIWindow *window;
    DMAdView *_dmAdView;
    DMInterstitialAdController * _dmInterstitial ;
    RootViewController    *viewController;
}
-(void) showAd;
@end

