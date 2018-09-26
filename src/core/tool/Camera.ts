class Camera {

    //需要移动的层，遍历移动其下的所有物体
    private _layer: egret.DisplayObject;
    //不需移动的物体
    private _ignore: egret.DisplayObject;
    //相机偏移
    private _offset: [number, number];

    public get x() { return this.position[0] };
    public set x($x: number) { this.position = [$x, this._position[1]]; }

    public get y() { return this.position[1] };
    public set y($y: number) { this.position = [this._position[0], $y]; }
    
    private _position: [number, number];
    public get position() { return this._position };
    public set position($position: [number, number]) {
        if ($position[0] != this._position[0] || $position[1] != this._position[1]) {
            this._offset = [$position[0] - this._position[0], $position[1] - this._position[1]];
            this._position = $position;
            this.moveCamera();
        }
    }

    public constructor($layer: egret.DisplayObject, $ignore?: egret.DisplayObject) {
        this._layer = $layer;
        this._ignore = $ignore;
        this._offset = [0, 0];
        this._position = [0, 0];
    }

    private moveCamera(): void {
        for (let obj of this._layer.$children) {
            //跳过不需要移动的物体
            if (obj == this._ignore) continue;

            obj.x -= this._offset[0];
            obj.y -= this._offset[1];
        }
    }

    public destory(): void {
        this._layer = null;
        this._ignore = null;
    }
}