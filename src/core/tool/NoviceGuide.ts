class NoviceGuide {

    /**
     * 生成圆形镂空遮罩
     */
    public shapeCutout($target:eui.Component) {

        let dis = new egret.DisplayObjectContainer();
        //遮罩
        let rect = new egret.Shape();
        rect.graphics.beginFill(0x000);
        //遮罩大小默认为新手引导层大小
        let guideLayer = Manager.Layer.guide;
        rect.graphics.drawRect(0,0,guideLayer.width,guideLayer.height);
        rect.graphics.endFill();
        rect.alpha = 0.5;
        dis.addChild(rect);
        //圆形镂空
        let cir = new egret.Shape();
        cir.graphics.beginFill(0x000);
        let radius = $target.width > $target.height ? $target.width/2 : $target.height/2;
        //半径略大于控件
        radius += 10;
        let globalPoint = $target.localToGlobal(0,0);
        cir.graphics.drawCircle(globalPoint.x+$target.width/2,globalPoint.y+$target.height/2,radius);
        cir.graphics.endFill();
        cir.blendMode = egret.BlendMode.ERASE;
        dis.addChild(cir);
        //动态纹理
        let ren = new egret.RenderTexture();
        ren.drawToTexture(dis);
        let bmp = new egret.Bitmap(ren);
        bmp.touchEnabled = true;
        bmp.pixelHitTest = true;
        
        //默认将遮罩放进新手引导层中
        Manager.Layer.guide.addChild(bmp);
    }
    
    /**
     * 指引图标
     */
    public finger($target:eui.Component) {
        let globalPoint = $target.localToGlobal(0,0);

        let img = new eui.Image();
        img.touchEnabled = false;
        img.width = 100;
        img.height = 100;
        img.x = globalPoint.x;
        img.y = globalPoint.y;
        //img.source = [图片路径];

        //缓动
        let tw = egret.Tween.get(img,{loop:true});
        let $offset:number = 50;
        let $time:number = 1000;
        tw.to({x:globalPoint.x + $offset,y:globalPoint.y + $offset},$time).wait(100)
          .to({x:globalPoint.x,y:globalPoint.y},$time).wait(100);
        
        //默认将遮罩放进新手引导层中
        Manager.Layer.guide.addChild(img);
    }
 
}