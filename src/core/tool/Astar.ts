class Astar {
    //网格地形数组
    public static noteArr: AstarNote[][];
    //最大寻路距离
    private static maxFindDistance: number = 500;
    public static set MaxFindDistance($value:number) {
        this.maxFindDistance = $value;
    }

    //开关表
    private static opening: AstarNote[];
    private static closing: AstarNote[];

    /**
     * 获取路径
     * @param $origin 起点坐标
     * @param $target 目标点坐标
     * @param $canDiagonal 是否能斜向行走
     * @returns 返回路径格子数组
     */
    public static getPath($origin: egret.Point, $target: egret.Point, $canDiagonal: boolean): AstarNote[] {

        let findDistance = this.maxFindDistance;
        this.opening = [];
        this.closing = [];

        //起点所在网格
        let ox = Math.round(($origin.x - AstarGrid.originPos.x) / AstarGrid.side);
        let oy = Math.round(($origin.y - AstarGrid.originPos.y) / AstarGrid.side);
        //目标点所在网格
        let tx = Math.round(($target.x - AstarGrid.originPos.x) / AstarGrid.side);
        let ty = Math.round(($target.y - AstarGrid.originPos.y) / AstarGrid.side);

        let startNote = this.noteArr[oy][ox];
        let targetNote = this.noteArr[ty][tx];
        //初始化起点
        startNote.update(targetNote, null);
        this.opening.push(startNote);

        while (this.opening.length != 0) {
            //寻找距离计数
            findDistance--;
            if (findDistance == 0) break;
            //找到总花费最少的点
            let curNote = this.opening[0];
            for (let n of this.opening) {
                if (n.sum <= curNote.sum) {
                    curNote = n;
                }
            }
            let curIndex = this.opening.indexOf(curNote);
            this.opening.splice(curIndex, 1);
            this.closing.push(curNote);

            //如果找到目标点
            if (curNote == targetNote) {
                let path: AstarNote[] = [];
                while (curNote.parent != null) {
                    path.push(curNote);
                    curNote = curNote.parent;
                }
                path.reverse();
                return path;
            }
            //进行下一个点的寻找
            this.nextStep(targetNote, curNote, $canDiagonal);
        }
        return null;
    }

    //更新下一个格子数据
    private static nextStep($target: AstarNote, $parent: AstarNote, $canDiagonal: boolean): void {
        //方格四周格子判断
        for (let tx = -1; tx < 2; tx++) {
            for (let ty = -1; ty < 2; ty++) {
                //是否能对角行走
                if ($canDiagonal) {
                    if (tx == 0 && ty == 0) continue;
                } else {
                    if (Math.abs(tx) == Math.abs(ty)) continue;
                }

                let curNx = $parent.x + tx;
                let curNy = $parent.y + ty;
                //是否超出地图边界
                if (curNx < 0 || curNy < 0 || curNy > (this.noteArr.length - 1) || curNx > (this.noteArr[0].length - 1))
                    continue;

                let curNote = this.noteArr[curNy][curNx];

                if (curNote.canWalk || this.closing.indexOf(curNote) > -1) continue;

                if (this.opening.indexOf(curNote) > 0) {
                    if (!$canDiagonal) continue;
                    let newOd = curNote.getNewOd($target, $parent);
                    if (curNote.od < newOd) {
                        curNote.od = newOd;
                        curNote.parent = $parent;
                    }
                } else {
                    curNote.update($target, $parent);
                    this.opening.push(curNote);
                }
            }
        }
    }
}

class AstarGrid {
    /**
     * 格子边长
     */
    public static side: number = 100;

    /**
     * 网格地图原点坐标
     */
    public static originPos: egret.Point = new egret.Point(0, 0);

    /**
     * 生成网格
     */
    public static createGrid($mapSide: [number, number], $layer: egret.DisplayObject): void {
        //确定长、宽格子个数
        let xNum = $mapSide[0] / AstarGrid.side;
        let yNum = $mapSide[1] / AstarGrid.side;

        //初始化数组
        Astar.noteArr = [];
        for (let i = 0; i < yNum; i++) {
            Astar.noteArr[i] = [];
        }

        for (let i = 0; i < yNum; i++) {
            for (let j = 0; j < xNum; j++) {

                let curPos = new egret.Point(AstarGrid.originPos.x + j * AstarGrid.side + AstarGrid.side / 2,
                    AstarGrid.originPos.y + i * AstarGrid.side + AstarGrid.side / 2);

                //todo 检查父物体下的所有子物体

                let canWalk: boolean = true;
                let risk:number = 0;
                for (var obj of $layer.$children) {
                    //该类型是否用于算法检测
                    let astarObj = <any>obj as AstarObj;
                    let isHit = this.isInside(obj, [curPos.x, curPos.y]);
                    if (isHit && astarObj.canWalk === false) {
                        canWalk = false;
                        risk = astarObj.risk || 0;
                        break;
                    }
                }
                Astar.noteArr[i][j] = new AstarNote(j, i, canWalk,risk);
            }
        }
    }

    //改点是否在显示容器内
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

interface AstarObj {
    canWalk: boolean;
    risk:number;
}

class AstarNote {
    public x: number;
    public y: number;
    public canWalk:boolean;
    //在该点行走所需要衡量的风险，风险越高，越不倾向走该点
    public risk:number;
    public worldPos: egret.Point;
    public parent: AstarNote;
    public td: number;
    public od: number;

    private _sum: number;
    public get sum() {
        return this.td + this.od + this.risk;
    }

    public constructor($x: number, $y: number, $canWalk: boolean,$risk:number = 0) {
        this.x = $x;
        this.y = $y;
        this.canWalk = $canWalk;
        this.risk = $risk;
        this.worldPos = new egret.Point(AstarGrid.originPos.x + $x * AstarGrid.side,
            AstarGrid.originPos.y + $y * AstarGrid.side);
    }

    public update($target: AstarNote, $parent: AstarNote) {
        let curPos = new egret.Point(this.x, this.y);
        if (!$parent) {
            this.parent = null;
            this.od = 0;
        } else {
            this.parent = $parent;
            let otarPos = new egret.Point($parent.x, $parent.y);
            this.od = $parent.od + egret.Point.distance(curPos, otarPos);
        }
        let ttarPos = new egret.Point($target.x, $target.y);
        this.td = egret.Point.distance(curPos, ttarPos);
    }

    public getNewOd($target: AstarNote, $parent: AstarNote): number {
        if (!$parent) {
            return 0;
        } else {
            let curPos = new egret.Point(this.x, this.y);
            let otarPos = new egret.Point($parent.x, $parent.y);
            return $parent.od + egret.Point.distance(curPos, otarPos);
        }
    }

}