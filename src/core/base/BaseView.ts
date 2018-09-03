class BaseView extends eui.Component{
    //是否已加载完成
    private _complete:boolean;
    //加载完成后的回调方法：执行环境、方法、方法参数
    private _completeFunc:{envir:any,funs:Function,args:any[]}[];
    //控制器
    protected controller:BaseController;
    //视图所在层
    public layer:BaseLayer;

    public constructor($controller:BaseController,$layer:BaseLayer) {
        super();
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this._complete = false;
        this._completeFunc = [];
        this.layer = $layer;
        // 控制器注册
        this.controller = $controller;
        // 资源是否加载完成监听
        this.addEventListener(eui.UIEvent.COMPLETE,this.complete,this);
    }
    
    private complete():void {
        this._complete = true;
        this.removeEventListener(eui.UIEvent.COMPLETE,this.complete,this);
        this.executeCompleteFunc();
    }

    private executeCompleteFunc():void {
        for(var fun in this._completeFunc) {
            let func:Function = this._completeFunc[fun].funs;
            let args:any[] = this._completeFunc[fun].args;
            let envir:any = this._completeFunc[fun].envir;
            func.apply(envir,args);
        }
        this._completeFunc = [];
    }

    /**
     *  @param $envir 调用方法的环境
     *  @param $func 调用的方法
     *  @param $args 调用方法的参数
     */
    public registerCompleteFunc($envir:any,$func:Function,...$args:any[]):void {
        this._completeFunc.push({envir:$envir,funs:$func,args:$args});
    }

    /**
     * 视图是否就加载完成
     */
    public isComplete():boolean {
        return this._complete;
    }

    /**
     * 打开视图
     */
    public open(...args):void {
        this.layer.addChild(this);
    }

      /**
     * 更新视图
     */
    public update(...args):void { }

    /**
     * 关闭视图
     */
    public close(...args):void {
        this.layer.removeChild(this);
    }
}