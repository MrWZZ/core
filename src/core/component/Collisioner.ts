/**
 * 碰撞比较器
 * 实现对所有需要进行碰撞检测的对象进行判断
 * 并触发该对象的碰撞事件
 */
class Collisioner {

    //是否只单个碰撞
    public static isMutil: boolean = false;

    //碰撞检测
    public static CollisionChecked(collisionList: Collision2D[]) {
        for (let i = 0; i < collisionList.length; i++) {
            //当前对象
            let cur = collisionList[i];
            //碰撞到的对象数组
            let tarList = [];
            for (let j = 0; j < collisionList.length; j++) {
                //目标对象
                let tar = collisionList[j];
                if (cur == tar) continue;
                //是否碰撞到
                let isCollision = this.blockCollision(cur,tar);
                if(isCollision) {
                    //如果是多个碰撞，则先保存碰撞列表，最后在触发碰撞事件
                    if(this.isMutil) {
                        tarList.push(tar);
                    } 
                    //否则直接触发碰撞事件并退出
                    else {
                        cur.onCollision2D(tar);
                        break;
                    }
                }
            }
            //多碰撞事件触发
            if(tarList.length) {
                cur.onCollision2D(tarList);
            }
        }
    }

    //不带旋转的方形碰撞检测
    public static blockCollision(col1:Collision2D, col2:Collision2D):boolean {
        var x = Math.abs(col1.x - col2.x);
        var w = Math.abs((col1.width + col2.width) / 2);
        var y = Math.abs(col1.y - col2.y);
        var h = Math.abs((col1.height + col2.height) / 2);

        return x < w && y < h;
    }
}