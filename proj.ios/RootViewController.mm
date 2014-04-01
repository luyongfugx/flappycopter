
#import "RootViewController.h"


@implementation RootViewController


 // The designated initializer.  Override if you create the controller programmatically and want to perform customization that is not appropriate for viewDidLoad.
//- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
//    if ((self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil])) {
//
//        }
//    return self;
//}



// Implement loadView to create a view hierarchy programmatically, without using a nib.
//- (void)loadView {
// // Custom initialization
// 
// self.title = NSLocalizedString(@"Banner", @"Banner");
// 
// // 创建广告视图，此处使用的是测试ID，请登陆多盟官网（www.domob.cn）获取新的ID
// _dmAdView = [[DMAdView alloc] initWithPublisherId:@"56OJyM1ouMGoULfJaL" placementId:@"16TLwebvAchkANUGSzRHJYcs"
// size:DOMOB_AD_SIZE_320x50];
// // 设置广告视图的位置
// _dmAdView.frame = CGRectMake(0, 0,
// DOMOB_AD_SIZE_320x50.width,
// DOMOB_AD_SIZE_320x50.height);
//}



// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
    
    
//    _dmAdView.delegate = self; // 设置 Delegate
//    _dmAdView.rootViewController = self; // 设置 RootViewController
//    [self.view addSubview:_dmAdView]; // 将广告视图添加到父视图中
//    [_dmAdView loadAd]; // 开始加载广告}
    
}
 

// Override to allow orientations other than the default portrait orientation.
// This method is deprecated on ios6
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return UIInterfaceOrientationIsLandscape( interfaceOrientation );
}

// For ios6, use supportedInterfaceOrientations & shouldAutorotate instead
- (NSUInteger) supportedInterfaceOrientations{
#ifdef __IPHONE_6_0
    return UIInterfaceOrientationMaskAllButUpsideDown;
#endif
}

- (BOOL) shouldAutorotate {
    return YES;
}

//fix not hide status on ios7
- (BOOL)prefersStatusBarHidden
{
    return YES;
}

- (void)didReceiveMemoryWarning {
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

- (void)viewDidUnload {
    [super viewDidUnload];

   // [_dmAdView removeFromSuperview]; // 将广告试图从父视图中移除

    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}


- (void)dealloc {
//    _dmAdView.delegate = nil;
//    _dmAdView.rootViewController = nil;
//    [_dmAdView release];
    [super dealloc];
}


@end
