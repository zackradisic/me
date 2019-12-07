<script>
    import IDE from './IDE/IDE.svelte';
    import LoadingModal from './LoadingModal.svelte';

    import { writable } from 'svelte/store';

    const shouldCloseIDE = writable(false);
    const shouldLoadModal = writable(false);

    export let shouldCloseIntro;


    shouldCloseIDE.subscribe(value => {
        if(value) destroyIDE();
    })

    shouldLoadModal.subscribe(value => {

    })

    shouldCloseIntro.subscribe(value => {
        shouldLoadModal.set(false);
    })


    function destroyIDE() {
        console.log('success');
        shouldLoadModal.set(true);
    }


</script>

<LoadingModal shouldLoadModal={shouldLoadModal} shouldCloseIntro={shouldCloseIntro} />
<IDE shouldCloseIDE={shouldCloseIDE} shouldCloseIntro={shouldCloseIntro} />
