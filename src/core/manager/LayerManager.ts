class LayerManager extends BaseManager{
     
    /**
     * 游戏背景层
     */
    public bg:BaseLayer;

    /**
     * 游戏元素层(主要层)
     */
    public main:BaseLayer;

    /**
     * UI控件层
     */
    public ui:BaseLayer;

     /**
      * 将所有层级添加到舞台
      */
    public addAllLayer():void
    {
        this.bg = new BaseLayer();
        this.main = new BaseLayer();
        this.ui = new BaseLayer();
        Manager.Stage.getStage().addChild(this.bg);
        Manager.Stage.getStage().addChild(this.main);
        Manager.Stage.getStage().addChild(this.ui);
        // this.main.horizontalCenter = 0;
        // this.main.verticalCenter = 0;
    }
    
    /**
     * 将所有层级移除出舞台
     */
    public removeAllLayer():void
    {
        Manager.Stage.getStage().removeChild(this.bg);
        Manager.Stage.getStage().removeChild(this.main);
        Manager.Stage.getStage().removeChild(this.ui);
        this.bg = null;
        this.main = null;
        this.ui = null;
    }
}