class StartView extends BaseView {

    private btnB:eui.Button;

    public start(): void {
       let btm = NoviceGuide.shapeCutout(this.btnB);
       Manager.Layer.guide.addChild(btm);
    }
}
