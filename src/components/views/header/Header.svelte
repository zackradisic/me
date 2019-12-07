<script>
    import macbookIcon from '../../../../public/images/macbook_icon.svg';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { fade } from 'svelte/transition';

    import BinaryBackground from './BinaryBackground.svelte';

    const showTitleStore = writable(false);
    const contentPageStore = writable(0)

    let showTitle = $showTitleStore;
    let contentPage = $contentPageStore

    let buttonOptions = ['CONTACT ME', 'BACK']
    let buttonText = buttonOptions[0]

    showTitleStore.subscribe(value => {
        showTitle = value;
    })

    contentPageStore.subscribe(value => {
        contentPage = value
        buttonText = buttonOptions[value]
    })

    onMount(async () => {

        await sleep(100);
        showTitleStore.set(true);
    })


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function handleClick(e) {
        console.log(contentPage)
        let headerContainer = document.querySelector('.header-container')
        let headerContent = document.querySelector('.header-content-wrapper')
        headerContainer.style.minHeight = headerContainer.clientHeight + "px"
        headerContent.style.minHeight = headerContent.clientHeight + "px"
        contentPageStore.set(contentPage ^ 1)
        
    }

</script>



<div class="header flex flex-col max-w h-full shadow">

        <BinaryBackground></BinaryBackground>

    {#if showTitle}

            <div class="shadow header-wrapper w-11/12 md:w-1/3 absolute font-thin font-terminal-alt header-container justify-center text-center">

                <div class="relative header-content-wrapper h-full pt-12 pb-8 px-1 md:px-0 z-index-40">
                    
                    {#if contentPage == 0}
                        <img class="header-icon w-1/4" src="images/macbook_icon.svg">
                        <h1 class="header-title text-5xl font-light leading-tight text-regular tracking-normal">
                                I'm Zack Radisic
                        </h1>
                        
                        <h6 class="text-regular leading-tight text-center sm:px-0 md:px-16 lg:px-16">I make powerful tools and beautiful art with knowledge and code.</h6>
                    {:else if contentPage == 1}

                        <img class="contact-icon m-auto w-1/12" src="images/github_icon.svg">
                        <a href="https://github.com/zackradisic" class="text-regular hover:text-primary-light font-light leading-tight text-center sm:px-0 md:px-16 lg:px-16">github</a>

                        <img class="contact-icon m-auto w-1/12" src="images/linkedin_icon.svg">
                        <a href="https://www.linkedin.com/in/zack-radisic-61a662196/" class="text-regular hover:text-primary-light font-light leading-tight text-center sm:px-0 md:px-16 lg:px-16">linkedin</a>
                    {/if}

                </div>

                <div class="btn-wrapper-bottom py-1 md:py-2">
                    <a class="btn btn-transparent leading-tight"
                       on:click={handleClick}>
                        {buttonText}
                    </a>
                </div>
            </div>
    {/if}


</div>

