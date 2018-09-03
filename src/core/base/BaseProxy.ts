abstract class BaseProxy{
    //控制器
    private _controller:BaseController;

    public constructor($controller:BaseController) {
        $controller.proxy = this;
        this._controller = $controller;
    }
}