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

    /**
     * 根据两点获取一个向量（x、y的移动权重:-1 ~ 1）
     * @param $beginPos 起始点
     * @param $endPos 终点
     */
    public static getDirction($beginPos:[number,number],$endPos:[number,number]):[number,number] {
        let offsetY = $endPos[1] - $beginPos[1];
        let offsetX = $endPos[0] - $beginPos[0];
        //象限判断
        let dirX = offsetX >= 0 ? 1 : -1;
        let dirY = offsetY >= 0 ? 1 : -1;
        let angle = Math.abs(Math.atan(offsetY / offsetX));
        return [dirX * Math.cos(angle),dirY * Math.sin(angle)];
    }
    
}