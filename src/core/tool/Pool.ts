class Pool {

    private static objs:{[key:string]:any[]} = {};

    /**
     * 从对象池中取出一个数据
     * @param className 类
     * @param arg 初始化参数
     */
    public static pop<T>(className:any,...arg:any[]):T {
        if(!this.objs[className.name]) this.objs[className.name] = [];
        //获取对象
        let o:any;
        if(this.objs[className.name].length) {
            o = this.objs[className.name].pop();
        } else {
            o = new className();
        }
        o.init.apply(o,arg);
        return <T>o;
    }

    /**
     * 将不用的对象放入对象池中
     * 
     */
    public static push(o:any,...arg:any[]):void {
        if(!this.objs[o.name]) {
            Log.log("无该对象所在对象池，无法添加。");
            return;
        }
        o.reset.apply(o,arg);
        this.objs[o.name].push(o);
    }
    
    public static clear():void {
        this.objs = {};
    }
}

interface IPool {
    //初始化
    init(...arg);
    //重置
    reset(...arg);
}