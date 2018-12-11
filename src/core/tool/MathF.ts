class MathF {

    /**
     * 返回单位化后的x,y
     * @param origin 原点(X,Y)
     * @param target 目标点(X,Y)
     */
    public static getVector(origin: number[], target: number[]): number[] {
        let offx = origin[0] - target[0];
        let offy = origin[1] - target[1];
        //弧度
        let dis = this.getDistance(origin,target);
        let unitY = offy / dis;
        let unitX = offx / dis;
        return [unitX, unitY];
    }

    
    public static getDistance(origin: number[], target: number[]): number {
        let offx = origin[0] - target[0];
        let offy = origin[1] - target[1];
        return Math.sqrt(offx*offx + offy*offy);
    }
}