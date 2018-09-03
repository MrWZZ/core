class Pool {

    private  _objs:{[key:string]:any[]} = {};

    public pop<T>($type:string,...$param:any[]):T {
        if(!this._objs[$type]) this._objs[$type] = [];
        //获取对象
        let o:any;
        if(this._objs[$type].length) {
            o = this._objs[$type].pop();
        } else {
            let fun = egret.getDefinitionByName($type);
            o = new fun();
            this._objs[$type].push(o);
        }
        return <T>o;
    }

    public push($o:any):void {
        let className:string = $o["__proto__"]["__class__"];
        if(!this._objs[className]) {
            Tool.Log.log("无该对象所在对象池，无法添加。");
            return;
        }
        this._objs[className].push($o);
    }

    public clear():void {
        this._objs = {};
    }
}