class Collision2D {

    //作用对象
    public GO:egret.DisplayObject;
    //x坐标
    public get x() : number {
        return this.GO.x;
    }
    //y坐标
    public get y():number {
        return this.GO.y;
    }
    //碰撞体宽度
    public width:number;
    //碰撞体高度
    public height:number;

    public constructor(go:egret.DisplayObject) {
        this.GO = go;
    }

    //触发碰撞事件
    public onCollision2D(target:Collision2D|Collision2D[]) {
        
    }
}