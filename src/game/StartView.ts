class StartView extends BaseView {

    private imgBg:eui.Image;
    private em:EasyMove;

    public start():void {
        this.em = new EasyMove(this,this.imgBg);
    }

}
