/**
 * Created with JetBrains WebStorm.
 * User: waynelu
 * Date: 14-2-17
 * Time: 下午12:30
 * To change this template use File | Settings | File Templates.
 */
Flappy=cc.Layer.extend({
        bird:null,
        getready:null,
        click:null,
        score:0,
        lbScore:null,
        resultScore:0,
        bestScore:0,
        ground:null,
        gameover:null,
        scorepad:null,
        grade:null,
        startmenu:null,
        reStartMenu:null,
        pipeArray:new Array(),
        ctor:function() {
            this._super();
            cc.associateWithNative( this, cc.Layer );
        },
        init: function () {
            if (this._super()) {
                var lastScore=sys.localStorage.getItem('bestscore');
                if(lastScore){
                    this.bestScore= parseInt(sys.localStorage.getItem('bestscore'));
                }
                else{
                    this.bestScore=0;
                }
                MW.SCORE = this.bestScore;
                var spiriteCache=cc.SpriteFrameCache.getInstance();
                spiriteCache.addSpriteFrames(res.flappy_packer_plist);

                var winSize = cc.Director.getInstance().getWinSize();

              //  var bg =  cc.Sprite.createWithSpriteFrameName('bg.png');
                var bg =  cc.Sprite.create('res/bg3.jpg');
                bg.setAnchorPoint(0,0);
                bg.setPosition(0,64) ;
                this.addChild(bg);

//                var bg2 =   cc.Sprite.create('res/bg3.jpg');
//
//                bg2.setAnchorPoint(0,0);
//                bg2.setPosition(winSize.width,64)
//                this.addChild(bg2);
//
//                var bgAct= cc.MoveBy.create(2, cc.p(-320, 0));
//                var bgActBack =cc.MoveTo.create(0, cc.p(0, 64));
//                var bgAct2= cc.MoveBy.create(2, cc.p(-320, 0));
//                var bgActBack2 =cc.MoveTo.create(0, cc.p(320, 64));
//
//
//
//               var bgSq=cc.Sequence.create(bgAct,bgActBack);


               // var bgSq2=cc.Sequence.create(bgAct2,bgActBack2);
                //bg.runAction(cc.RepeatForever.create(bgSq));
                //bg2.runAction(cc.RepeatForever.create(bgSq2));
                //滚动地面


                this.ground=cc.Sprite.createWithSpriteFrameName('road.png');

                this.ground.setAnchorPoint(0,0);
                //this.ground.setPosition(0,64) ;
                var ground1= cc.Sprite.createWithSpriteFrameName('road.png');
                ground1.setAnchorPoint(0,0);
                ground1.setPosition(320,0);
                var bgrAct= cc.MoveBy.create(2, cc.p(-320, 0));
                var bgrActBack =cc.MoveTo.create(0, cc.p(0, 0));
                var bgrAct2= cc.MoveBy.create(2, cc.p(-320, 0));
                var bgrActBack2 =cc.MoveTo.create(0, cc.p(320, 0));



                var bgrSq=cc.Sequence.create(bgrAct,bgrActBack);
                var bgrSq2=cc.Sequence.create(bgrAct2,bgrActBack2);



                this.addChild(ground1, 5000);
                this.addChild(this.ground, 5000);
                this.ground.runAction(cc.RepeatForever.create(bgrSq));
                ground1.runAction(cc.RepeatForever.create(bgrSq2));
                //分数
                this.lbScore = cc.LabelTTF.create(this.score+'', "Arial", 30);
                this.lbScore.setPosition(160,420);
                this.addChild(this.lbScore, 2);

                this.bestScore=cc.LabelTTF.create(this.score+'', "Arial", 15);
                this.bestScore.setPosition(230,240);
                this.bestScore.setVisible(false);
                this.addChild(this.bestScore, 5);

                this.resultScore=cc.LabelTTF.create(this.score+'', "Arial", 15);
                this.resultScore.setPosition(100,240);
                this.resultScore.setVisible(false);
                this.addChild(this.resultScore, 5);
                //this.lbScore.setPosition(winSize.width - 5, winSize.height - 30);
                //ready 图
                this.getready=cc.Sprite.create();
                this.getready.initWithSpriteFrameName('startlogo.png') ;
                this.getready.setPosition(160,375);
                this.addChild(this.getready,3);
                //gameover
                this.gameover=cc.Sprite.create();
                this.gameover.initWithSpriteFrameName('over.png') ;
                this.gameover.setPosition(160,375);
                this.addChild(this.gameover,3);
                this.gameover.setVisible(false);



                this.scorepad=cc.Sprite.create();
                this.scorepad.initWithSpriteFrameName('result.png') ;
                this.scorepad.setPosition(160,265);
                this.addChild(this.scorepad,4);
                this.scorepad.setVisible(false);



                var startmenu=cc.Sprite.createWithSpriteFrameName('rstart.png');


                var startmenu1=cc.Sprite.createWithSpriteFrameName('rstart.png');

                var startmenu2=cc.Sprite.createWithSpriteFrameName('rstart.png');

                var menuItem = cc.MenuItemSprite.create(startmenu, startmenu1,startmenu2,function () {
                       this.replay();

                }.bind(this));

                this.reStartMenu= cc.Menu.create(menuItem);
                this.reStartMenu.setPosition(160,165);
                this.reStartMenu.setVisible(false);
                this.addChild(this.reStartMenu,4);

//                this.grade=cc.Sprite.create();
//                this.grade.initWithSpriteFrameName('grade.png') ;
//                this.grade.setPosition(220,165);
//                this.addChild(this.grade,4);
//                this.grade.setVisible(false);

                //click.png
                this.click=cc.Sprite.create();
                this.click.initWithSpriteFrameName('tip.png') ;
                this.click.setPosition(160,250);
                this.addChild(this.click,4);
                //小鸟
                this.bird=new Bird();
                this.addChild(this.bird,4000);

                this.scheduleUpdate();
                this.schedule(this.makePipes,1.3);

                if (sys.capabilities.hasOwnProperty('keyboard'))
                    this.setKeyboardEnabled(true);

                if (sys.capabilities.hasOwnProperty('mouse'))
                /*if ('mouse' in sys.capabilities)*/
                    this.setMouseEnabled(true);

                if (sys.capabilities.hasOwnProperty('touches'))   {
                /*if ('touches' in sys.capabilities)*/
                    this.setTouchEnabled(true);

                }

            }
            return true;

        },


        onTouchesBegan :function (touches, event) {

            this.processEvent(touches[0]);
        },
        onMouseDown:function(e){
            this.processEvent(e);
        },
        update:function (dt) {
            if(MW.STATE==MW.GAME_STATE.PLAY){
                this.checkIsCollide();
                this.checkPipeOut();
                this.updateScore();

            }

           // this.makePipes();

        },
        updateScore:function(){
            if(MW.STATE==MW.GAME_STATE.PLAY){
               this.lbScore.setString(this.score+"");

            }

        },

        checkPipeOut:function(){
            //检测水管是不是已经溢出界面
            for(var i=0;i<MW.CONTAINER.PIPES.length;i++){
                var pPair=MW.CONTAINER.PIPES[i];
                if(pPair.active==true){


                var upPipe=pPair.up;
                var downPipe=pPair.down;
                if(upPipe.getPosition().x<0){
                    pPair.active=false;
                }
                }


            }
        },
        checkIsCollide:function () {
            //检测是否相撞，检测水管是不是已经溢出界面
            for(var i=0;i<MW.CONTAINER.PIPES.length;i++){
                var pPair=MW.CONTAINER.PIPES[i];
                if(pPair.active==true){
                    var upPipe=pPair.up;
                    var downPipe=pPair.down;


                    if(this.collide(this.bird,upPipe)||this.collide(this.bird,downPipe)||this.bird.getPosition().y<112){
                        MW.STATE=MW.GAME_STATE.OVER;
                        var blinkAct=cc.Blink.create(0.2,1);
                        this.runAction(blinkAct);
                        var downAction=cc.MoveTo.create(0.5, cc.p(160, 120));
                        var that=this;
                        var callback=cc.CallFunc.create(function(){
                            that.gameOver();
                        });
                        var downSeq=cc.Sequence.create(downAction,callback);
                        this.bird.runAction(downSeq);
                        var rotateToDown=cc.RotateTo.create(0.2,90);

                        this.bird.runAction(rotateToDown);

                        // console.log('game over');
                    }
                    else{
                        if(upPipe.getPosition().x<(this.bird.getPositionX()-this.bird.getContentSize().width/2)&&pPair.score==false){
                            this.score++;
                            pPair.score=true;
                        }
                    }
                }
            }
        },
        gameOver:function(){
            this.bird.dead();
            this.resultScore.setString(this.score+"");
            if(MW.SCORE<=this.score) {
                MW.SCORE=this.score;
                sys.localStorage.setItem('bestscore',MW.SCORE+'');
            }
            this.bestScore.setString(MW.SCORE+"");
            this.gameover.setVisible(true);
            this.scorepad.setVisible(true);
            this.resultScore.setVisible(true);
            this.bestScore.setVisible(true);
            this.reStartMenu.setVisible(true);
           // this.grade.setVisible(true);
            MW.STATE=MW.GAME_STATE.OVER;
            MW.GAMEOVERTIME=MW.GAMEOVERTIME+1;
            cc.AudioEngine.getInstance().playMusic('res/274.mp3');
            if(MW.GAMEOVERTIME%5==0){
                var ad=new AdBind();
                var myStr=ad.showAd();
            }


        },
        collide:function(a, b) {
            var pos1 = a.getPosition();
            var pos2 = b.getPosition();


            var aRect = a.collideRect(pos1);
            var bRect = b.collideRect(pos2);

            return cc.rectIntersectsRect(aRect, bRect);
        },
        processEvent:function (event) {
            if(MW.STATE==MW.GAME_STATE.HOME){
                MW.STATE=MW.GAME_STATE.PLAY;
                this.score=0;

            }
            if(MW.STATE==MW.GAME_STATE.PLAY){
                if(this.bird.start==true){
                    var rotateAct=cc.RotateTo.create(0,-50);
                    var rotateBack=cc.RotateTo.create(0.15,0);
                    this.bird.stopAllActions();
                    this.bird.flaywing();

                    var jumpHeight= this.bird.getJumpHeight();
                    this.bird.jump(jumpHeight);
                    //网上跳的时候角度
                    var rotateBackSeq=cc.Sequence.create(rotateAct,rotateBack);
                    this.bird.runAction(rotateBackSeq);

                    var lostActionDelay=cc.DelayTime.create(0.3);
                    var backAction=cc.MoveBy.create(0.15, cc.p(0, -jumpHeight*0.7));
                    var downAction=cc.MoveTo.create(this.bird.getPosition().y/400, cc.p(160, 120));
                    var that=this;
                    var callback=cc.CallFunc.create(function(){
                        that.gameOver();
                    });
                    var downSeq=cc.Sequence.create(lostActionDelay,backAction,downAction,callback);
                    this.bird.runAction(downSeq);

                    var downDelay=cc.DelayTime.create(this.bird.getPosition().y/480);
                    var rotateToDown=cc.RotateTo.create(0.4,90);
                    var rotateToDownSeq=cc.Sequence.create(downDelay,rotateToDown);
                    this.bird.runAction(rotateToDownSeq);

                }
                this.bird.stopFlay();
                this.play();
            }



           // var delta = event.getDelta();


        },
        replay:function(){
            if(MW.STATE!=MW.GAME_STATE.PLAY){
                MW.STATE=MW.GAME_STATE.PLAY;
                this.score=0;

            }
            for(var i=0;i<MW.CONTAINER.PIPES.length;i++){
                var pPair=MW.CONTAINER.PIPES[i];
                pPair.active=false;
                pPair.up.setPosition(-500,0);
                pPair.down.setPosition(-500,0);

            }
            //this.bird.stopFlay();
            this.bird.setPosition(this.bird.appearPosition);
            this.play();

        } ,
        play:function(){
            this.getready.setVisible(false);
            this.click.setVisible(false);
            this.gameover.setVisible(false);
            this.scorepad.setVisible(false);
            this.resultScore.setVisible(false);
            this.bestScore.setVisible(false);
            this.reStartMenu.setVisible(false);
           //
           // this.grade.setVisible(false);
            var rotateBack=cc.RotateTo.create(0,0);
            this.bird.runAction(rotateBack);

            this.bird.setVisible(true);
            this.bird.start=true;
            //cc.AudioEngine.getInstance().setMusicVolume(0.7);
            cc.AudioEngine.getInstance().playMusic('res/276.mp3', false);
           // this.bird.scheduleUpdate();

        },
        makePipes:function(){
            //return false;
            if(MW.STATE==MW.GAME_STATE.PLAY){
                var pipePair=Pipe.getOrCreatePair();
                if(pipePair.first){
                    this.addChild(pipePair.up);
                    this.addChild(pipePair.down);
                }
            }
        }

    }
)
var MainScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Scene );
    },
    onEnter:function () {
        this._super();
        var layer = new Flappy();
        layer.init();
        this.addChild(layer);
    }
});
