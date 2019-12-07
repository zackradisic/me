<script>
	import { writable } from 'svelte/store';
	import styles from './styles.css';
	import vhs from './vhs.scss';

	import Intro from './components/views/intro/Intro.svelte';
	import Header from './components/views/header/Header.svelte';

	const vhsIsOn = writable(true);
	const willLoadIntro = writable(localStorage.getItem("introExpire") === null);
	const shouldCloseIntro = writable(false);

	let closeIntro = $shouldCloseIntro;
	let loadIntro = $willLoadIntro;
	let vhsOn = $vhsIsOn;

	willLoadIntro.subscribe(value => {
		loadIntro = value
		if(value) {
			storeLoadIntro()
		}
	});

	shouldCloseIntro.subscribe(value => {

		try {
			if(value) {
				rebootVhs();
			}
			closeIntro = value;
		} catch(err) {
			console.log(err)
		}

	});

	vhsIsOn.subscribe(value => {
		vhsOn = value ? "vhs-on" : "vhs-off";
	});

	function storeLoadIntro() {
		try {
			let d = new Date(Date.now());
			d.setDate(d.getDate() + 7);
			localStorage.setItem("introExpire", d.toISOString())
			console.log(d)
		} catch(err) {
			console.log(err)
		}
	}

	async function rebootVhs() {
		vhsIsOn.set(false);
		await sleep(1000);
		vhsIsOn.set(true);
		await sleep(500);
        willLoadIntro.set(false);
	}

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
</script>


	{#if loadIntro}
        <div class={"vhs " + vhsOn}>
		    <Intro shouldCloseIntro={shouldCloseIntro}/>
        </div>
	{:else}

		<Header />
	{/if}

