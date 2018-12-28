/**
 * 实现按钮等显示状态改变后不影响布局
 */
class EasyHideShow {
    //显示容器
    public gShow: eui.Group;
    //隐藏容器
    public gHide: eui.Group;
    //固定顺序数组
    public fixArray: egret.DisplayObject[];

    /**
     * @param gShow 显示容器
     * @param gHide 隐藏容器
     */
    public constructor(gShow: eui.Group, gHide: eui.Group) {
        this.gShow = gShow;
        this.gHide = gHide;
        //默认使用原来隐藏时的布局
        let arr = [];
        for (let i = 0; i < this.gHide.$children.length; i++) {
            arr.push(this.gHide.$children[i]);
        }
        this.fixArray = arr;
    }

    //控件的显示状态改变
    public onVisibleChange() {
        this.setShowPosition();
        this.setHidePostion();
    }

    private setShowPosition() {
        let showList = this.gShow.$children;
        for (let i = showList.length - 1; i >= 0; i--) {
            if (!showList[i].visible) {
                this.gHide.addChild(showList[i]);
            }
        }
    }

    private setHidePostion() {
        let hideList = this.gHide.$children;
        for (let i = hideList.length - 1; i >= 0; i--) {
            if (hideList[i].visible) {
                //设置按钮固定顺序
                let index = this.fixArray.indexOf(hideList[i]);
                if (index > -1) {
                    this.gShow.addChildAt(hideList[i], index);
                } else {
                    this.gShow.addChild(hideList[i]);
                }
            }
        }
    }

}