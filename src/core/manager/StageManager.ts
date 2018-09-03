class StageManager extends BaseManager{

    /**
     * 获取当前舞台对象
     */
    public getStage():egret.Stage
    {
        return egret.MainContext.instance.stage;
    }
}