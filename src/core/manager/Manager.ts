abstract class Manager {

    //游戏初始化
    public static gameInit():void {
        EC.addToWindow();
        this.Layer.addAllLayer();
    }

    //控制器
    private static _controller:ControllerManager;
    public static get Controller() {
        if(this._controller == null) this._controller = new ControllerManager();
        return this._controller;
    }

    //层
    private static _layer:LayerManager;
    public static get Layer() {
        if(this._layer == null) this._layer = new LayerManager();
        return this._layer;
    }

    //舞台
    private static _stage:StageManager;
    public static get Stage() {
        if(this._stage == null) this._stage = new StageManager();
        return this._stage;
    }

    //视图
    private static _view:ViewManager;
    public static get View() {
        if(this._view == null) this._view = new ViewManager();
        return this._view;
    }

    //消息传递
    private static _message:MessageManager;
    public static get Message() {
        if(this._message == null) this._message = new MessageManager();
        return this._message;
    }
}