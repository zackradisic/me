<script>
    import { onMount } from 'svelte';
    import paper from 'paper';

    import binaryBackground from './BinaryBackground.html';


    onMount(() => {
        try {

            createBackground();

            paper.view.pointAnimationX = 0;
            paper.view.isIntroComplete = false;

            paper.view.onFrame = (e) => {
                if(!paper.view.isIntroComplete) {
                    if(parseFloat(paper.view.element.style.opacity) >= 1.0) {
                        paper.view.isIntroComplete = true;
                        document.querySelector('.header-container').classList.add('animated');
                        return;
                    }
                    paper.view.element.style.opacity = parseFloat(paper.view.element.style.opacity) + .1;
                }
                animatePoints(100);
            }

        }
        catch(error) {
            console.log(error)
        }

    });

    function animatePoints(amount) {
        let points = paper.project.activeLayer.children;
        let length = points.length
        for(let i = 0; i < amount; i++) {
            let randPoint = Math.floor(Math.random() * length);
            let point = points[randPoint];
            let rand = Math.floor(Math.random() * 2);


            if(point.fillColor.hue === 159) {
                point.fillColor.brightness += ( rand === 0 ? 0.05 : -0.05);
            }
            else {
                if(point.fillColor.brightness >= .50) {
                    point.fillColor.brightness += ( rand === 0 ? -0.1 : -0.05);

                }
                else {
                    point.fillColor.brightness += ( rand === 0 ? 0.05 : -0.05);
                }

            }

            if(point.fillColor.brightness <= 0) {
                point.fillColor.brightness = ( point.fillColor.brightness < 0 ? 0.25 : point.fillColor.brightness + 0.05);
            }

            paper.view.pointAnimationX++;
        }

    }



    function createBackground() {
        var canvas = document.getElementById('binary-numbers');
        canvas.style.opacity = "0";
        paper.setup(canvas);
        let width = canvas.clientWidth
        let height = canvas.clientHeight
        let fontFamily = "Source Code Pro"
        let color1 = "#235355"
        let color2 = "#1D3A3B"
        let color3 = "#329875"
        let count = 0;
        for(let i = 5; i < width; i += 30) {

            for(let k = 10; k < height; k += 30) {

                let text = new paper.PointText(new paper.Point(i, k));
                text.fontFamily = fontFamily;

                let rnd = Math.random() * 99;
                let rnd2 = Math.floor(Math.random() * Math.floor(2));

                text.content = rnd2 === 0 ? "0" : "1";

                if(rnd < 45) {
                    text.fillColor = color1;
                }
                else if(rnd < 90) {
                    text.fillColor = color2;
                }
                else {
                    text.fillColor = color3;
                }

                count++;

            }

        }
        console.log(count);
        paper.view.draw();

    }

</script>

<div class="h-full w-full overflow-hidden">
    <p class="binary-code-background font-terminal-code"></p>
    <canvas id="binary-numbers" ></canvas>
</div>