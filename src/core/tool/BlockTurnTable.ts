/**
 * 方格抽奖转盘
 */
class BlockTurnTable {

    //旋转圈数
    public loopTime: number = 3;
    //最高时间间隔(毫秒)
    public maxTime: number = 800;
    //最低时间间隔(毫秒)
    public minTime: number = 100;

    //最终转到的位置
    public targetIndex: number;
    //旋转位置数组
    public posArr: egret.DisplayObject[];
    //旋转指示物体，其需要与posArr有相同的坐标系
    public loopObject: egret.DisplayObject;
    //旋转完毕的回调事件-obj:作用域-fun:方法-arg:参数
    public onLoopComplete:{obj:any,fun:Function,arg:any[]};

    //总共移动的次数
    private num: number;
    //每次时间递减数值
    private timeOffset: number;
    //当前延迟时间
    private curDelay: number;
    //当前移动次数
    private curIndex: number;

    //帧调用计时
    private oldTime: number;
    private newTime: number;
    private addTime: number;

    public constructor(posArr: egret.DisplayObject[], loopObject: egret.DisplayObject) {
        this.posArr = posArr;
        this.loopObject = loopObject;
    }

    /**
     * 开始旋转
     * @param targetIndex 最终转到的位置
     */
    public start(targetIndex: number) {
        this.targetIndex = targetIndex;
        this.num = this.posArr.length * this.loopTime + targetIndex;
        this.timeOffset = (this.maxTime - this.minTime) / (this.num / 2);
        this.curDelay = this.maxTime;
        this.addTime = 0;
        this.curIndex = 0;
        this.loopObject.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.oldTime = egret.getTimer();
        //将指示物体放到第一个位置上
        this.moveSlotPos(0);
    }

    public update(e: egret.Event) {
        this.newTime = egret.getTimer();
        let offset = this.newTime - this.oldTime;
        this.oldTime = this.newTime;

        //达到间隔时间
        if (this.addTime >= this.curDelay) {
            //旋转结束
            if (this.curIndex >= this.num) {
                //调用回调
                if(this.onLoopComplete) {
                    this.onLoopComplete.fun.apply(this.onLoopComplete.obj,this.onLoopComplete.arg);
                }
                this.loopObject.removeEventListener(egret.Event.ENTER_FRAME, this.update, this)
                return;
            }

            //旋转加速阶段
            if (this.curIndex < this.num / 2) {
                this.curDelay -= this.timeOffset;
            } 
            //旋转减速阶段
            else {
                this.curDelay += this.timeOffset;
            }
            this.addTime = 0;
            this.curIndex++;
            this.moveSlotPos(this.curIndex);
        } 
        //未达到间隔时间
        else {
            this.addTime += offset;
        }
    }

    //移动当前指示的位置
    public moveSlotPos(index) {
        let posIndex = index % this.posArr.length;
        this.loopObject.x = this.posArr[posIndex].x;
        this.loopObject.y = this.posArr[posIndex].y;
    }
}
