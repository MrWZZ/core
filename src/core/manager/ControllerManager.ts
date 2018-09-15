class ControllerManager extends BaseManager{

    /**
     * 已注册的控制器（EmController）
     */
    private _controllers:{[key:number]:BaseController} = {};

     /**
      * 清空
      */
    public clear():void{
        this._controllers = {};
    }

    /**
     * 注册控制器
     */
    public register($key:number):void{
        if(this._controllers[$key]) {
            Log.log(`${$key}:该控制器已存在，无法重复注册。`);
            return;
        }
        let name = EmController[$key];
        let base:BaseController = new window[name]();
        this._controllers[$key] = base;
    }

    /**
     * 注销控制器
     */
    public unregister($key):void {
        if(!this._controllers[$key]) {
            Log.log(`${$key}:该控制器不存在，无法注销。`);
            return;
        }
        delete this._controllers[$key];
    }

    /**
     * 取得指定控制器
     * @param $key 控制器key（EmController）
     */
    public getController($key:number):BaseController {
        if($key == undefined && $key == null) {
            Log.error("key值为空！");
            return;
        }
        //没有的话就先注册
        if(!this._controllers[$key]) {
            this.register($key);
        }
        return this._controllers[$key];
    }

    /**
     * 执行指定控制器的指定方法
     * @param $controller 在此管理器中注册的控制器Key(EmController)。
     * @param $funcKey 在目标控制器中方法的key(EmControllerFunc)。
     * @param $param 该方法执行时需要的参数
     */
    public executeFunc($key:number,$funcKey:number,...$param:any[]):void {
        if($key == undefined && $key == null) {
            Log.error("key值为空！");
            return;
        }
        //没有的话就先注册
        if(!this._controllers[$key]) {
            this.register($key);
        }
        let con:BaseController = this._controllers[$key];
        $param.unshift($funcKey);
        return con.executeFunc.apply(con,$param);
    }
}