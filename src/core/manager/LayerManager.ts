class LayerManager extends BaseManager{
     
    //游戏背景层
    public bg:BaseLayer = new BaseLayer();
    //游戏元素层(主要层)
    public main:BaseLayer = new BaseLayer();
    //UI控件层
    public ui:BaseLayer = new BaseLayer();
    //新手引导层
    public guide:BaseLayer = new BaseLayer();

    private layerArr:BaseLayer[] = [
        this.bg,
        this.main,
        this.ui,
        this.guide
    ]
     /**
      * 将所有层级添加到舞台
      */
    public addAllLayer():void
    {
        for(var layer of this.layerArr) {
            Manager.Stage.getStage().addChild(layer);
        }
    }
}