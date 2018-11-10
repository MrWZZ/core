/**
 * 实现左右按钮拖动滑动条的功能
 */
class EasyScroller {

    //左滑动按钮
    public left: egret.DisplayObject;
    //滑动条
    public scroller: eui.Scroller;
    //右滑动按钮
    public right: egret.DisplayObject;

    //滑动条滑动速度
    public spreed: number = 5;
    //水平拖动：1、垂直拖动：2
    public HV: number = 1;

    //滑动方向（-1：左（上），1：右（下））
    private scrollDir: number = 0;

    public constructor($left: egret.DisplayObject, $scroller: eui.Scroller, $right: egret.DisplayObject) {
        this.left = $left;
        this.scroller = $scroller;
        this.right = $right;
        //左按钮事件
        $left.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin.bind(this, -1), this);
        $left.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        $left.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        //右按钮事件
        $right.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin.bind(this, 1), this);
        $right.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        $right.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
    }

    private touchBegin($dir: number): void {
        this.scrollDir = $dir;
        if (this.HV == 1) {
            this.scroller.addEventListener(egret.Event.ENTER_FRAME, this.updateH, this);
        } 
        else if(this.HV == 2) {
            this.scroller.addEventListener(egret.Event.ENTER_FRAME, this.updateV, this);
        }
    }

    private touchEnd($e: egret.TouchEvent): void {
        this.scrollDir = 0;
        if (this.HV == 1) {
            this.scroller.removeEventListener(egret.Event.ENTER_FRAME, this.updateH, this);
        } 
        else if(this.HV == 2) {
            this.scroller.removeEventListener(egret.Event.ENTER_FRAME, this.updateV, this);
        }
    }

    //水平拖动
    private updateH(): void {
        let maxWidth = this.scroller.viewport.measuredWidth - this.scroller.viewport.width;
        //左滑动
        if (this.scroller.viewport.scrollH > 0 && this.scrollDir < 0) {
            this.scroller.viewport.scrollH -= this.spreed;
        }
        //右滑动
        else if (this.scroller.viewport.scrollH < maxWidth && this.scrollDir > 0) {
            this.scroller.viewport.scrollH += this.spreed;
        }
    }

    //垂直拖动
    private updateV(): void {
        let maxHeight = this.scroller.viewport.measuredHeight - this.scroller.viewport.height;
        //左滑动
        if (this.scroller.viewport.scrollV > 0 && this.scrollDir < 0) {
            this.scroller.viewport.scrollV -= this.spreed;
        }
        //右滑动
        else if (this.scroller.viewport.scrollV < maxHeight && this.scrollDir > 0) {
            this.scroller.viewport.scrollV += this.spreed;
        }
    }
}