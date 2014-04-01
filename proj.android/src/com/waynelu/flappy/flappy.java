/****************************************************************************
Copyright (c) 2010-2012 cocos2d-x.org

http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package com.waynelu.flappy;

import org.cocos2dx.lib.Cocos2dxActivity;




import com.umeng.analytics.MobclickAgent;

import cn.domob.android.ads.DomobAdManager.ErrorCode;
import cn.domob.android.ads.DomobAdView;
import cn.domob.android.ads.DomobInterstitialAd;
import cn.domob.android.ads.DomobInterstitialAdListener;
import android.util.Log;
import android.view.Gravity;

import android.view.ViewGroup.LayoutParams;
import android.widget.FrameLayout;



import android.app.Activity;
import android.os.Bundle;

public class flappy extends Cocos2dxActivity{
	public static final String PUBLISHER_ID = "56OJw4iYuNLwfWKEF7";
	public static final String InlinePPID = "16TLu37aApfc4NUftfeewngi";
	public static final String interPid="16TLu37aApfc4NUfonVAt6lz";
	
	DomobAdView mAdview320x50;
	static DomobInterstitialAd mInterstitialAd;
    static flappy flappyCpp = null;  
	protected void onCreate(Bundle savedInstanceState){
		
		super.onCreate(savedInstanceState);
		Log.i("tag", "oncreate");
		FrameLayout.LayoutParams btnLytp = new FrameLayout.LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.WRAP_CONTENT);
		btnLytp.gravity = Gravity.BOTTOM;
		
		try{
		mAdview320x50 = new DomobAdView(this, flappy.PUBLISHER_ID, flappy.InlinePPID, DomobAdView.INLINE_SIZE_320X50);

		mInterstitialAd = new DomobInterstitialAd(this, PUBLISHER_ID,
				interPid, DomobInterstitialAd.INTERSITIAL_SIZE_300X250);
		
		mInterstitialAd.setInterstitialAdListener(new DomobInterstitialAdListener() {
			@Override
			public void onInterstitialAdReady() {
				Log.i("DomobSDKDemo", "onAdReady");
			}

			@Override
			public void onLandingPageOpen() {
				Log.i("DomobSDKDemo", "onLandingPageOpen");
			}

			@Override
			public void onLandingPageClose() {
				Log.i("DomobSDKDemo", "onLandingPageClose");
			}

			@Override
			public void onInterstitialAdPresent() {
				Log.i("DomobSDKDemo", "onInterstitialAdPresent");
			}

			@Override
			public void onInterstitialAdDismiss() {
				// Request new ad when the previous interstitial ad was closed.
				mInterstitialAd.loadInterstitialAd();
				Log.i("DomobSDKDemo", "onInterstitialAdDismiss");
			}

			@Override
			public void onInterstitialAdFailed(ErrorCode arg0) {
				Log.i("DomobSDKDemo", "onInterstitialAdFailed");				
			}

			@Override
			public void onInterstitialAdLeaveApplication() {
				Log.i("DomobSDKDemo", "onInterstitialAdLeaveApplication");

			}

			@Override
			public void onInterstitialAdClicked(DomobInterstitialAd arg0) {
				Log.i("DomobSDKDemo", "onInterstitialAdClicked");
			}

		
		});
	

		mInterstitialAd.loadInterstitialAd();
		addContentView(mAdview320x50 ,btnLytp);
		
		}catch(Exception e){
			Log.e("tag", e.toString());
		}
		
	}
	public void onResume() {
		super.onResume();
		MobclickAgent.onResume(this);
	}
	public void onPause() {
		super.onPause();
		MobclickAgent.onPause(this);
		
	}
    public static void showAd(){
    	if (mInterstitialAd.isInterstitialAdReady()){
    		//mInterstitialAd.showInterstitialAd(context)
    		((Activity) getContext()).runOnUiThread(new Runnable() {
                @Override
                public void run() {
                	mInterstitialAd.showInterstitialAd(getContext());
                }
            }) ;
		} else {
			Log.i("DomobSDKDemo", "Interstitial Ad is not ready");
			mInterstitialAd.loadInterstitialAd();
		}
    }

    static {
        System.loadLibrary("cocos2djs");
    }
}
