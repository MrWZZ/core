abstract class BaseController{
    // 注册方法的数组
    private _funcs:{[key:number]:Function} = {};
    // 该控制器使用的模块
    public model:BaseModel;
     // 该控制器使用的代理
    public proxy:BaseProxy;

    public constructor() {
        // 注册控制器的方法
        let conName:string = this["__proto__"]["__class__"];
        let end = conName.lastIndexOf("Controller");
        let mainName = conName.slice(0,end);
        let funcName = mainName + "Func";
        let fun:any = egret.getDefinitionByName(funcName);
        for(var k in fun) {
            if(Number(k).toString() == "NaN") break; 
            this.registerFunc(Number(k),this["__proto__"][fun[k]])
        }
    }

    /**
     * 注册本控制器的执行方法
     * @param $key 本控制器中方法key(EmControllerFunc)。
     * @param $Func 本控制器中具体执行方法。
     */
    public registerFunc($key:number,$Func:Function) {
        if(this._funcs[$key]) {
            Log.log(`${$key}:该方法已存在，无法重复注册。`);
            return;
        }
        this._funcs[$key] = $Func;
    }

    /**
     * 执行本控制器指定方法
     * @param $key 指定方法key(EmControllerFunc)
     * @param $param 该方法执行需要的参数
     */
    public executeFunc($key:number,...$param:any[]):any {
        if(!this._funcs[$key]) {
            Log.warn(`${$key}:该方法不存在，无法调用该方法！`);
            return;
        }
        return this._funcs[$key].apply(this,$param);
    }
}