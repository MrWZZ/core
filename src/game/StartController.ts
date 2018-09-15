class StartController extends BaseController {
    
    private StartView:StartView;

    public constructor() {
        super();
    }

    public openStartView() {
        this.StartView = new StartView(this,Manager.Layer.main,SkinPath.StartSkin);
        this.StartView.open();
    }

    public closeStartView() {
        this.StartView.close();
        this.StartView = null;
    }
}