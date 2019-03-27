//已一个页面为单位进行管理
class TipCenter {

    //提示状态列表
    private _tipList: { [key: string]: boolean };
    //当前提示的个数
    private _tipNum: number;
    //当前管理类提示改变事件(回调事件需接收当前改变状态)
    private _centerTipChangeEvent: { callback: Function, target: any };
    //特定提示改变事件(回调事件需接收当前改变状态)
    private _keyTipChangeEvent: { [key: string]: { callback: Function, target: any } };

    //初始化管理器
    public init() {
        this._tipList = {};
        this._tipNum = 0;
    }


    /**
     * 注册当管理提示改变时的事件（只允许存在一个）
     */
    public addCenterTipChangeEvent(callback: Function, target: any) {
        this._centerTipChangeEvent = { callback: callback, target: target };
    }

    //管理提示有改变
    private onCenterTipChange(isTip: boolean) {
        let event = this._centerTipChangeEvent;
        if (event) {
            event.callback.apply(event.target, isTip);
        }
    }

    public removeCenterTipChangeEvent() {
        this._centerTipChangeEvent = null;
    }

    /**
     * 注册某个提示状态信息改变事件
     * @param key 提示名称
     * @param callback 事件
     * @param target 目标
     */
    public addKeyTipChangeEvent(key: string, callback: Function, target: any) {
        this._keyTipChangeEvent[key] = { callback: callback, target: target };
    }

    //管理提示有改变
    private onKeyTipChange(key: string, isTip: boolean) {
        let event = this._keyTipChangeEvent[key];
        if (event) {
            event.callback.apply(event.target, isTip);
        }
    }

    //删除特定key事件
    public removeKeyTipChangeEvent(key: string) {
        this._keyTipChangeEvent[key] = null;
    }

    //删除全部key事件
    public removeAllKeyTipChangeEvent() {
        this._keyTipChangeEvent = null;
    }

    /**
     * 获取当前管理是否有提示
     */
    public isTip(): boolean {
        return this._tipNum ? true : false;
    }

    /**
     * @param key 提示名称
     * @param status 该提示状态
     */
    public setTipStatus(key: string, status: boolean) {
        //当原来的状态是假，新状态是真的增加激活个数
        if (!this._tipList[key] && status) {
            //原来是0的，现在增加了，回调管理事件
            if (this._tipNum <= 0) {
                this.onCenterTipChange(true);
            }
            this.onKeyTipChange(key,true);
            this._tipNum++;
        }
        //当原来的状态是真，新状态是假的减少激活个数
        if (this._tipList[key] && !status) {
            //原来是1，现在减少了，回调管理事件
            if(this._tipNum == 1) {
                this.onCenterTipChange(false);
            }
            this._tipNum--;
            this.onKeyTipChange(key,false);
            //当个数小于0报异常
            if (this._tipNum < 0) {
                console.log(`提示管理异常：key:${key}`);
            }
        }
        this._tipList[key] = status;
    }

    /**
     * 获取某个提示当前状态
     * @param key 提示名称
     */
    public getTipStatus(key: string) {
        if (this._tipList[key]) {
            return this._tipList[key];
        }
        return false;
    }

    //是否为空
    private isNull(obj: any) {
        if (obj == null || obj == undefined) {
            return true;
        }
        return false;
    }

    //销毁该管理器
    public destroy() {
        delete this._tipList;
        this._tipNum = 0;
        this.removeAllKeyTipChangeEvent();
        this.removeCenterTipChangeEvent();
    }
}