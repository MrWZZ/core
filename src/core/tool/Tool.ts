class Tool {

    //日志
    private static _log:Log;
    public static get Log() {
        if(this._log == null) this._log = new Log();
        return this._log;
    }

    //随机
    private static _random:Random;
    public static get Random() {
        if(this._random == null) this._random = new Random();
        return this._random;
    }

    //对象池
    private static _pool:Pool;
    public static get Pool() {
        if(this._pool == null) this._pool = new Pool();
        return this._pool;
    }
}