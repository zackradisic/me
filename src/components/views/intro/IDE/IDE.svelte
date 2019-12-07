<script>
    import CodeArea from './CodeArea.svelte';
    import IDETerminal from './IDETerminal.svelte'

    export let shouldCloseIDE;
    export let shouldCloseIntro;

    let closeIntro = $shouldCloseIntro;

    shouldCloseIntro.subscribe(value => {
        closeIntro = value;
    })

</script>

{#if !closeIntro}
    <div class="max-w mx-auto flex flex-col shadow-xl bg-code leading-tight h-full ">

        <CodeArea ></CodeArea>
        <IDETerminal shouldCloseIDE={shouldCloseIDE}></IDETerminal>

    </div>
{:else}
    <div class="max-w h-full closed-intro">
        <p>test</p>
    </div>
{/if}