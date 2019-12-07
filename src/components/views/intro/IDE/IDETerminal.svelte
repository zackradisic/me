<script>
    import { onMount } from 'svelte';

    let cursor = "_";
    let inputVal = "theRadisic run main()";
    let spaced = false;

    export let shouldCloseIDE;

    onMount(() => {
        blinkCursor();
    })

    function blinkCursor() {
        cursor = cursor === "\xA0" ? "_" : "\xA0";

        setTimeout(blinkCursor, 500);
    }

    function onClick(e) {
        document.getElementById('terminal-input').focus();
    }

    function onKeyDown(e) {
        if(e.code === "Enter") {
            e.preventDefault();

            if(inputVal !== "theRadisic run main()") {
                let element = document.getElementById('terminal-history');
                let br = document.createElement('br');
                let txt = document.createTextNode("theRadisic: '" + inputVal.replace("theRadisic", "") + "' command not found");
                element.prepend(txt, br);
                if(!spaced) spaced = true;
                inputVal = "";
                return;
            }

            shouldCloseIDE.set(true)
        }
    }

</script>

<div class="bg-terminal text-code-regular font-code font-light text-xs p-2 rounded-sm shadow-innerer max-h-25% sm:max-h-10% overflow-auto ">

    <div id="terminal" class="flex flex-col align-text-bottom" on:click={onClick}>

        <div id="terminal-history" class="">

        </div>

        <div class="flex-none">

            <span class="inline">>&nbsp;</span>
            <div class="terminal-input min-w-0.25 text-left font-thin bg-terminal focus:outline-none inline"
                 spellcheck="false"
                 id="terminal-input"
                 contenteditable="true"
                 bind:textContent={inputVal}
                 on:keydown={onKeyDown}>
            </div>
            <div class="inline" id="terminal-input-cursor">
                {cursor}
            </div>

        </div>

    </div>

</div>