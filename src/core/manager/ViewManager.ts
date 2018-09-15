class ViewManager extends BaseManager {

    /**
     * 已注册的视图（EmView）
     */
    private _views: { [key: number]: BaseView } = {};

    /**
     * 视图显示前需要注册
     * @param $key 视图的key(EmView)
     * @param $view 注册的视图
     */
    public register($key: number, $view: BaseView): void {
        if (this._views[$key]) {
            Log.log(`该视图已存在，无法重复注册。`);
            return;
        }
        this._views[$key] = $view;
    }

    /**
     * 显示视图
     * @param $key 视图key(EmView)
     */
    public open($key: number, ...$param: any[]): void {
        //todo 显示加载页面
        let view: BaseView = this.getView($key);
        view.layer.addChild(view);
        view.open.apply(view, $param);
    }

    /**
     * 隐藏视图
     * @param $key 视图key(EmView)
     */
    public close($key: number,...$param: any[]): void {
        let view: BaseView = this.getView($key);
        view.layer.removeChild(view);
        view.close.apply(view,$param);
        delete this._views[$key];
    }

    public getView($key: number): BaseView {
        if (!this._views[$key]) {
            Log.error(`${$key}:该视图不存在。`)
            return;
        }
        return this._views[$key];
    }
}