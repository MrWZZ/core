class Pool {

    private static objs:{[key:string]:any[]} = {};

    public static pop<T>(className:any,...arg:any[]):T {
        if(!this.objs[className.name]) this.objs[className.name] = [];
        //获取对象
        let o:any;
        if(this.objs[className.name].length) {
            o = this.objs[className.name].pop();
        } else {
            o = className.prototype.constructor.apply(className,arg);
        }
        return <T>o;
    }

    public static push(o:any):void {
        if(!this.objs[o.name]) {
            Log.log("无该对象所在对象池，无法添加。");
            return;
        }
        this.objs[o.name].push(o);
    }

    public static clear():void {
        this.objs = {};
    }
}