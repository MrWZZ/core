class StartView extends BaseView {

    private btn:eui.Button;

    public start():void {
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtn,this);
        Tool.NoviceGuide.finger(this.btn);
        Tool.NoviceGuide.shapeCutout(this.btn);
    }

    private n = 0;
    public onBtn():void {
        
    }

}