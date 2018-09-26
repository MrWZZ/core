class EasyMove {
    //移动物体
    private moveObj: any;
    //方法执行环境
    private listenObj:any;
    private isMove:boolean = false;
    //移动起始点
    private beginPos: [number, number];
    private endPos: [number, number];
    //移动方向
    private direction: [number, number];
    //是否是拖动多少就移动多少的类型
    private isDrayType:boolean;

    //移动速度
    public moveSpreed: number = 1;
    //监听事件
    public beginListen:Function;
    public moveListen:Function;
    public endListen:Function;

    /**
     * @param $listenObj 回调方法执行的环境、监听事件的对象
     * @param $moveObj 移动方法的物体
     */
    public constructor($listenObj:any,$moveObj:any,$isDrayType:boolean = true) {
        this.isDrayType = $isDrayType;
        this.listenObj = $listenObj;
        this.moveObj = $moveObj;
        $listenObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        $listenObj.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        $listenObj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
    }

    private touchBegin($e: egret.TouchEvent):void {
        this.beginPos = [$e.stageX, $e.stageY];
        
        if(this.isDrayType) {
            this.listenObj.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchDray, this);
        } else {
            this.listenObj.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
            this.listenObj.addEventListener(egret.Event.ENTER_FRAME,this.update,this);
        }
        //如果有回调则执行
        this.beginListen?this.beginListen.apply(this.listenObj):null;
    }

    private touchEnd($e: egret.TouchEvent): void {
        this.isMove = false;
        
        if(this.isDrayType) {
            this.listenObj.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchDray, this);
        } else {
            this.listenObj.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
            this.listenObj.removeEventListener(egret.Event.ENTER_FRAME,this.update,this);
        }
        //如果有回调则执行
        this.endListen?this.endListen.apply(this.listenObj):null;
    }

    private touchMove($e: egret.TouchEvent): void {
        this.endPos = [$e.stageX, $e.stageY];
        this.direction = this.getDirction(this.beginPos,this.endPos);
        this.isMove = true;
        //如果有回调则执行
        this.moveListen?this.moveListen.apply(this.listenObj):null;
    }

    private touchDray($e:egret.TouchEvent):void {
        this.endPos = [$e.stageX, $e.stageY];
        let offsetY = this.endPos[1] - this.beginPos[1];
        let offsetX = this.endPos[0] - this.beginPos[0];
        this.beginPos = this.endPos;
        this.moveObj.x += offsetX;
        this.moveObj.y += offsetY;
        //如果有回调则执行
        this.moveListen?this.moveListen.apply(this.listenObj):null;
    }

    private update():void {
        if(this.isMove) {
            this.moveObj.x += this.direction[0] * this.moveSpreed;
            this.moveObj.y += this.direction[1] * this.moveSpreed;
        }
    }

    public destroy():void {
        this.listenObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.listenObj.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.listenObj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.listenObj = null;
        this.moveObj = null;
    }

     private getDirction($beginPos:[number,number],$endPos:[number,number]):[number,number] {
        let offsetY = $endPos[1] - $beginPos[1];
        let offsetX = $endPos[0] - $beginPos[0];
        let dirX = offsetX >= 0 ? 1 : -1;
        let dirY = offsetY >= 0 ? 1 : -1;
        let angle = Math.abs(Math.atan(offsetY / offsetX));
        return [dirX * Math.cos(angle),dirY * Math.sin(angle)];
    }
}