export default class Banner {
    constructor({ text, moveSpeed, colorSpeed, pausedDur, startColor, endColor }) {
        this.reset({ text, moveSpeed, colorSpeed, pausedDur, startColor, endColor });
    }

    // Used to give the banner new properties at any time and start the animation
    reset({ text = 'default', moveSpeed = 500, colorSpeed = 50, pausedDur = 0,
        startColor = { h: 1, s: 100, l: 100 }, endColor = { h: 1, s: 100, l: 100 } }) {

        // Create h1 and add class
        this.heading = document.createElement('h1');
        this.heading.classList.add('banner-h1');

        // Create the outer div, add the h1 and make it absolute
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
        this.div.appendChild(this.heading);
        document.body.appendChild(this.div);

        // set given properties
        this.heading.innerText = text;
        this.moveSpeed = moveSpeed;
        this.colorSpeed = colorSpeed;
        this.pausedDur = pausedDur;
        this.currentColor = startColor;
        this.endColor = endColor;

        //set default values for later use
        this.startTime = document.timeline.currentTime;
        this.previousStep = this.startTime;
        this.pauseTime = 0;
        this.scale = 1;

        // Update starting style
        this.div.style.top = 0;
        this.heading.style.color = `hsl(${startColor.h}, ${startColor.s}%, ${startColor.l}%)`;

        requestAnimationFrame((t) => this.slideStep(t));
    }

    slideStep(timeStamp) {
        let deltaTime = (timeStamp - this.previousStep) / 1000;

        let targetLeft = window.innerWidth / 2 - this.div.offsetWidth / 2;
        let targetTop = window.innerHeight / 2 - this.div.offsetHeight / 2;

        this.previousStep = timeStamp;

        // Slides the div to the center
        if (parseFloat(this.div.style.top) < targetTop) {

            this.div.style.left = targetLeft + 'px';
            this.div.style.top = parseFloat(this.div.style.top) + this.moveSpeed * deltaTime + 'px';
            requestAnimationFrame((t) => this.slideStep(t));
            return;
        }
        // Even if screen size changes,
        // it should stay in the center
        this.div.style.left = targetLeft + 'px';
        this.div.style.top = targetTop + 'px';

        // Animates to end colors
        if (this.currentColor.l != this.endColor.l) {
            this.animateColor(deltaTime);
            requestAnimationFrame((t) => this.slideStep(t));
            return;
        }
        if (this.pauseTime < this.pausedDur) {
            this.pauseTime += deltaTime;
            requestAnimationFrame((t) => this.slideStep(t));
            return;
        }
        if (this.scale > 0.01) {
            this.shrink(deltaTime);
            requestAnimationFrame((t) => this.slideStep(t));
            return;
        }

        document.body.removeChild(this.div);
    }

    slide(deltaTime, targetLeft, targetTop) {
        this.div.style.left = targetLeft + 'px';
        this.div.style.top = parseFloat(this.div.style.top) + this.moveSpeed * deltaTime + 'px';
    }

    animateColor(deltaTime) {
        let sign = (this.endColor.l > this.currentColor.l) ? 1 : -1;
        // Changes the clamp mni and max
        if (this.endColor.l > this.currentColor.l) {
            this.currentColor.l = this.clamp(this.currentColor.l + this.colorSpeed * deltaTime * sign, 0, this.endColor.l);
        }
        else {
            this.currentColor.l = this.clamp(this.currentColor.l + this.colorSpeed * deltaTime * sign, this.endColor.l, 100);
        }

        this.heading.style.color = `hsl(${this.currentColor.h}, ${this.currentColor.s}%, ${this.currentColor.l}%)`;
        this.heading.style.borderColor = `hsl(${this.currentColor.h}, ${this.currentColor.s}%, ${this.currentColor.l}%)`;
    }

    shrink(deltaTime) {
        let shrinkSpeed = 1;

        this.scale -= shrinkSpeed * deltaTime;
        this.div.style.scale = this.scale;
    }

    clamp(value, min, max) { return Math.min(Math.max(value, min), max) }
}
