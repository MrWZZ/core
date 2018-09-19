class CommonUtil {

    /**
     * 指定点是否指定容器内
     * @param $contain 指定容器
     * @param $point 指定点
     */
    public static isInside($contain: egret.DisplayObject, $point: [number, number]): boolean {
        //小于左边界
        if ($point[0] < $contain.x || $point[1] < $contain.y) {
            return false;
        }
        //大于右边界
        if ($point[0] > $contain.width + $contain.x || $point[1] > $contain.height + $contain.y) {
            return false;
        }
        return true;
    }
}