abstract class BaseModel{
    //控制器
    private _controller:BaseController;
    //数据源
    protected data:BaseData;

    public constructor($controller:BaseController) {
        $controller.model = this;
        this._controller = $controller;
    }
}