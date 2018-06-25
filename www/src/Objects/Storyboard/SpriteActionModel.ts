export default class SpriteActionModel{
    id: string;
    frame: number;
    alpha: number;
    tint: number;
    position: number;

    constructor(id, frame, position, tint, alpha = 1) {
        this.id = id;
        this.frame = frame;
        this.position = position;
        this.alpha = alpha;
        this.tint = tint;
    }
}