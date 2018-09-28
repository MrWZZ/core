class EasyMove {
    //移动物体
    private moveObj: any;
    //方法执行环境
    private listenObj: any;
    //多指操作用，现在是否能移动
    private canMove: boolean = true;
    //每一帧更新用，是否在移动
    private isMove: boolean = false;
    //移动起始点
    private beginPos: [number, number];
    private endPos: [number, number];
    //移动方向
    private direction: [number, number];
    //是否是拖动多少就移动多少的类型
    private isDrayType: boolean;
    //弧度转角度值:PI/180
    private c: number = 0.017453292;
    //当前点击手指的数量及触点信息
    private touchPoints: Object = { names: [] };
    private touchCon: number = 0;
    //两点触碰之间的距离
    private distance: number = 0;
    //两点触碰之间的反正切
    private defAngle: number = 0;
    //当前对象的旋转角度
    private _currentBirdRotation: number = 0;

    //移动速度
    public moveSpreed: number = 1;
    //是否能旋转
    public canRotate: boolean = true;
    //是否能缩放
    public canScale: boolean = true;
    //监听事件
    public beginListen: Function;
    public moveListen: Function;
    public endListen: Function;

    /**
     * @param $listenObj 回调方法执行的环境、监听事件的对象
     * @param $moveObj 移动方法的物体
     */
    public constructor($listenObj: any, $moveObj: any, $isDrayType: boolean = true) {
        this.isDrayType = $isDrayType;
        this.listenObj = $listenObj;
        this.moveObj = $moveObj;
        $listenObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        $listenObj.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        $listenObj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
    }

    private touchBegin($e: egret.TouchEvent): void {
        this.beginPos = [$e.stageX, $e.stageY];

        if (this.isDrayType) {
            this.listenObj.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchDray, this);
        } else {
            this.listenObj.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
            this.listenObj.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        // 多指操作
        this.mouseDown($e);
        //如果有回调则执行
        this.beginListen ? this.beginListen.apply(this.listenObj) : null;
    }

    private touchEnd($e: egret.TouchEvent): void {
        this.isMove = false;

        if (this.isDrayType) {
            this.listenObj.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchDray, this);
        } else {
            this.listenObj.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
            this.listenObj.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        // 多指操作
        this.mouseUp($e);
        //如果有回调则执行
        this.endListen ? this.endListen.apply(this.listenObj) : null;
    }

    private touchMove($e: egret.TouchEvent): void {
        this.endPos = [$e.stageX, $e.stageY];
        this.direction = this.getDirction(this.beginPos, this.endPos);
        this.isMove = true;
        // 多指操作
        this.mouseMove($e);
        //如果有回调则执行
        this.moveListen ? this.moveListen.apply(this.listenObj) : null;
    }

    private touchDray($e: egret.TouchEvent): void {
        if (this.canMove) {
            this.endPos = [$e.stageX, $e.stageY];
            let offsetY = this.endPos[1] - this.beginPos[1];
            let offsetX = this.endPos[0] - this.beginPos[0];
            this.beginPos = this.endPos;
            this.moveObj.x += offsetX;
            this.moveObj.y += offsetY;
        }
        // 多指操作
        this.mouseMove($e);

        //如果有回调则执行
        this.moveListen ? this.moveListen.apply(this.listenObj) : null;
    }

    private update(): void {
        if (this.isMove && this.canMove) {
            this.moveObj.x += this.direction[0] * this.moveSpreed;
            this.moveObj.y += this.direction[1] * this.moveSpreed;
        }
    }

    //多指操作按下
    private mouseDown(evt: egret.TouchEvent) {
        if (this.touchPoints[evt.touchPointID] == null) {
            this.touchPoints[evt.touchPointID] = new egret.Point(evt.stageX, evt.stageY);
            this.touchPoints["names"].push(evt.touchPointID);
        }
        this.touchCon++;
        if (this.touchCon == 2) {
            this.canMove = false;
            if (this.canScale) {
                this.distance = this.getTouchDistance();
            }
            if (this.canRotate) {
                this.defAngle = this.getTouchAngle();
            }
        }

    }

    //多指操作抬起
    private mouseMove(evt: egret.TouchEvent) {
        this.touchPoints[evt.touchPointID].x = evt.stageX;
        this.touchPoints[evt.touchPointID].y = evt.stageY;
        if (this.touchCon == 2) {
            //是否能进行缩放
            if (this.canScale) {
                var newdistance = this.getTouchDistance();
                this.moveObj.scaleX = newdistance / this.distance;
                this.moveObj.scaleY = this.moveObj.scaleX;
            }
            //是否能进行旋转操作
            if (this.canRotate) {
                var newangle = this.getTouchAngle();
                this.moveObj.rotation = this._currentBirdRotation + newangle - this.defAngle;
            }
        }
    }

    //多指操作抬起
    private mouseUp(evt: egret.TouchEvent) {
        this.canMove = true;
        delete this.touchPoints[evt.touchPointID];
        this.touchCon--;
        this.moveObj.width *= this.moveObj.scaleX;
        this.moveObj.height *= this.moveObj.scaleY;
        this.moveObj.scaleX = 1;
        this.moveObj.scaleY = 1;
        this._currentBirdRotation = this.moveObj.rotation;
    }

    //获取两点之间距离
    private getTouchDistance(): number {
        var _distance: number = 0;
        var names = this.touchPoints["names"];
        _distance = egret.Point.distance(this.touchPoints[names[names.length - 1]],
            this.touchPoints[names[names.length - 2]]);
        return _distance;
    }

    //获取两点之间反正切
    private getTouchAngle(): number {
        var ang: number = 0;
        var names = this.touchPoints["names"];
        var p1: egret.Point = this.touchPoints[names[names.length - 1]];
        var p2: egret.Point = this.touchPoints[names[names.length - 2]];

        ang = Math.atan2((p1.y - p2.y), (p1.x - p2.x)) / this.c;
        return ang;
    }

    // 获取x，y轴的偏移量（-1~1）
    private getDirction($beginPos: [number, number], $endPos: [number, number]): [number, number] {
        let offsetY = $endPos[1] - $beginPos[1];
        let offsetX = $endPos[0] - $beginPos[0];
        let dirX = offsetX >= 0 ? 1 : -1;
        let dirY = offsetY >= 0 ? 1 : -1;
        let angle = Math.abs(Math.atan(offsetY / offsetX));
        return [dirX * Math.cos(angle), dirY * Math.sin(angle)];
    }

    //销毁该物体
    public destroy(): void {
        this.listenObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.listenObj.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.listenObj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.listenObj = null;
        this.moveObj = null;
    }
}