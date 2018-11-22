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

    /**
     * @param $left 左（上）按钮
     * @param $scroller 滑动容器
     * @param $right 右（下）按钮
     */
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

    /**
     * 滑动到指定子控件位置
     * @param $sInxex 子物体的所在的索引
     */
    public scrollToChildren($sInxex: number): void {
        this.scroller.validateNow();
        let viewport = this.scroller.viewport;
        let curIcon = viewport.$children[$sInxex];
        if(this.HV == 1) {
            this.scrollToH(curIcon,viewport);
        } else {
            this.scrollToV(curIcon,viewport);
        }
    }

    private scrollToH($curIcon:egret.DisplayObject,$viewport:eui.IViewport):void {
        //目标图标移动到中心
        let centerPos = $curIcon.x + $curIcon.width / 2 - this.scroller.width/2;
        $viewport.scrollH = centerPos;
        let maxWidth = $viewport.measuredWidth - $viewport.width;
        //左边界不够
        if($viewport.scrollH < 0) {
            $viewport.scrollH = 0;
        }
        //右边界不够
        else if($viewport.scrollH > maxWidth){
            $viewport.scrollH = maxWidth;
        }
    }

    private scrollToV($curIcon:egret.DisplayObject,$viewport:eui.IViewport):void {
        //目标图标移动到中心
        let centerPos = $curIcon.y + $curIcon.height / 2 - this.scroller.height/2;
        $viewport.scrollV = centerPos;
        let maxHeight = $viewport.measuredHeight - $viewport.height;
        //上边界不够
        if($viewport.scrollV < 0) {
            $viewport.scrollV = 0;
        }
        //下边界不够
        else if($viewport.scrollV > maxHeight){
            $viewport.scrollV = maxHeight;
        }
    }

    private touchBegin($dir: number): void {
        this.scrollDir = $dir;
        if (this.HV == 1) {
            this.scroller.addEventListener(egret.Event.ENTER_FRAME, this.updateH, this);
        }
        else if (this.HV == 2) {
            this.scroller.addEventListener(egret.Event.ENTER_FRAME, this.updateV, this);
        }
    }

    private touchEnd($e: egret.TouchEvent): void {
        this.scrollDir = 0;
        if (this.HV == 1) {
            this.scroller.removeEventListener(egret.Event.ENTER_FRAME, this.updateH, this);
        }
        else if (this.HV == 2) {
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