class Sprite {
    constructor({position, imageSrc, frameRate = 1, frameBuffer = 3, scale = 1}) {
        this.position = position
        this.scale = scale
        this.loaded = false
        this.image = new Image()
        this.image.onload = () => { //pull image height/width dynamically once image loads
            this.width = (this.image.width / this.frameRate) * this.scale
            this.height = this.image.height * this.scale
            this.loaded = true
        }
        this.image.src = imageSrc
        this.frameRate = frameRate  //set frame rate dynamically based on number of frames in sprite image
        this.currentFrame = 0   //keeps track of current frame, starts at 0 (first frame)
        this.frameBuffer = frameBuffer //adjust to control animation speed
        this.elapsedFrames = 0  //keeps track of total elapsed frames, necessary for frameBuffer to control animation speed (see updateFrames() method)
    }
    draw() {
        if (!this.image) return;

        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height
        };

        c.drawImage(
            this.image, 
            cropbox.position.x, 
            cropbox.position.y, 
            cropbox.width, 
            cropbox.height,
            this.position.x, 
            this.position.y,
            this.width,
            this.height);
    }
    update() {
        this.draw();
        this.updateFrames();
    }
    updateFrames() {
        this.elapsedFrames++;

        //e.g., if 3 / 3 = 0, update currentFrame
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
            else this.currentFrame = 0;
        } 
    }
}