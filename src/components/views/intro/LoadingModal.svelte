<script>
    import { fade } from 'svelte/transition';

    export let shouldLoadModal;
    export let shouldCloseIntro;

    let loadModal = $shouldLoadModal;
    let visible = loadModal ? 'visible' : 'invisible';

    shouldLoadModal.subscribe(value => {
        updateVisibility(value);
    })


    async function startAnimation() {
        await sleep(1000);
        let errorStrings = [
            "Compiling resources...",
            "FATAL ERROR in module: 󊣼6",
            "1: node::Abort() [node]",
            "2: 0x876afc [node]",
            "3: v8::Utils::ReportOOMFailure(char const*, bool) [node]",
            "4: v8::internal::V8::FatalProcessOutOfMemory(char const*, bool) [node]",
            "5: 0xdd42b1 [node]",
            "6: v8::internal::Runtime_SparseJoinWithSeparator(int, v8::internal::Object**)",
            "7: v8::interal::0x3629ef50961b",
            "8: v8::internal::Factory::NewRawTwoByteString(int, v8::internal::PretenureFlag)"];

        let a = `10: v8::internal::Factory::NewFillerObject(int, bool, v8::internal::AllocationSpace)
                 11: v8::internal::Heap::AllocateRawWithRetryOrFail(int, v8::internal::AllocationSpace,
                 12: v8::internal::AllocationAlignment) [/usr/local/opt/node@10/bin/node] 11: 0x100418d73
                 13: v8::GCCallbackFlags) [/usr/local/opt/node@10/bin/node]
                 14: 0x10042fd6d v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace,
                 15: v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [/usr/local/opt/node@10/bin/node]
                 16: 0x10043854e v8::internal::Heap::AllocateRawWithLigthRetry(int, v8::internal::AllocationSpace,
                 17: v8::internal::AllocationAlignment) [/usr/local/opt/node@10/bin/node] 10: 0x100438598
                 `;

        errorStrings = errorStrings.concat(a.split("\n"));

        for(let x = 0; x < errorStrings.length; x++) {
            let ms = 0;
            if(x <= 1) ms = 1500;
            else if(x === 2) ms = 750;
            else ms = Math.random() * 25 + 25;
            await sleep(ms);
            let a = errorStrings[x];

            let p = document.createElement('p');
            x === 0 ? p.classList.add('text-xs') : p.classList.add('text-xs', 'text-code-error');
            p.innerText = a;
            document.querySelector('.command-line').appendChild(p);
        }

        await sleep(150);
        shouldCloseIntro.set(true);
    }
    function updateVisibility(value) {
        loadModal = value;
        visible = loadModal ? 'visible' : 'invisible';
        if(value) startAnimation();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

</script>


{#if loadModal}

    <div in:fade="{{delay: 250, duration: 300}}" class={"loading-modal-container " + visible}>

        <div class="rounded-sm overflow-hidden shadow-lg loading-modal font-code font-light">
            <div class="px-6 py-4 command-line overflow-auto scrolling-touch">
                <p class="text-xs">
                    Initializing theRadisic.com@v1.21 ...
                </p>

                <p class="text-xs">

                </p>


            </div>
        </div>

    </div>
{:else}

{/if}
