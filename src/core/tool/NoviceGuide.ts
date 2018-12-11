abstract class NoviceGuide {

    /**
     * 生成圆形镂空遮罩
     * 需要放在不同的层，否则位置需要重新计算
     */
    public static shapeCutout($target:eui.Component):egret.DisplayObject {

        let dis = new egret.DisplayObjectContainer();
        //遮罩
        let rect = new egret.Shape();
        rect.graphics.beginFill(0x000);
        rect.graphics.drawRect(0,0,egret.MainContext.instance.stage.width,egret.MainContext.instance.stage.height);
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
        
        return bmp;
    }
    
 
}