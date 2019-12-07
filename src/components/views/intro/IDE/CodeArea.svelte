<script>
    import { onMount } from 'svelte';

    let inner = `

    <span class="text-code-keyword">public class</span> <span class="text-code-object">ZackRadisic</span>
    <span class="text-code-keyword">extends</span>
    <span class="text-code-object">Programmer</span>,
    <span class="text-code-object">Musician</span>,
    <span class="text-code-object">Entrepeneur </span>
    &#123;

    <div class="pl-12">
        <br />
        <br />
        <span class="text-code-keyword">private final</span> <span class="text-code-type">String</span> name
        = <span class="text-code-string">"Zack Radisic"</span>;
        <br />
        <span class="text-code-keyword">private</span> <span class="text-code-type">int</span> age
        = <span class="text-code-number">19</span>;
        <br />
        <br />
        <span class="text-code-keyword">public </span>ZackRadisic() &#123;
        <div class="pl-12">
            <span class="text-code-keyword">super</span>(name, age);
        </div>
        &#125;
        <br />
        <br />
        <span class="text-code-keyword">public static</span>
        <span class="text-code-type">void</span>
        main(<span class="text-code-type">String</span>[]
        args) &#123;
        <br />

        <div class="pl-12">
            <span class="text-code-keyword">this</span>.getWebPage().load();
        </div>

        &#125;

    </div>

    &#125;
`;
    export let write = "";
    let showButton = false;
    let height = 0;

let x = 0;
function writer() {
    if(x < inner.length) {
         write += inner.charAt(x);
        x++;
        setTimeout(writer, 10);
    }
    else {
        showButton = true;
    }
}

writer();

function textClick(e) {
    e.preventDefault();
}

function blur(e) {
    e.target.blur();
}
</script>



        <div on:focus={blur} spellcheck="false" class="p-6 flex-1 leading-tight overflow-auto text-code-regular font-code font-light" id="code-text-box" contenteditable="true" bind:innerHTML={write} on:click={textClick} on:keydown={textClick}>
        </div>
