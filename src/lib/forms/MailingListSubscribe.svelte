<script lang="ts">
	import TextField from '$lib/components/form/TextField.svelte';
	import { Button } from '$lib/components/nav';
	import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
	import { doc, setDoc } from 'firebase/firestore';
	import Fa from 'svelte-fa';
	import db from '../api/firebase/db';
	import { values, schema } from './schema';
	const errors = {
		email: ''
	};
	const handleSubmit = async () => {
		const validatedValues = await schema.validate(values, { abortEarly: false });
		await setDoc(doc(db, 'EmailList', ''), { email: validatedValues.email });
	};
</script>

<form
	method="POST"
	class="text-normal flex flex-col"
	on:submit|preventDefault={handleSubmit}
	in:blur={{ duration: 500, delay: 0, amount: 100 }}
>
	<TextField bind:field={values.email} bind:error={errors.email} type="email" label="Email">
		<Fa slot="icon" icon={faEnvelope} primaryColor="gray" secondaryColor="white" />
	</TextField>
	<div class="lg:mx-auto lg:w-1/2 mt-10">
		<Button toggle alternate type="submit">
			<div slot="text" class="zinc-200 align-center text-normal flex gap-x-4 py-1">
				<Fa
					icon={faEnvelope}
					secondaryOpacity={1}
					size="lg"
					primaryColor="white"
					secondaryColor="white"
				/>
				<div class="inline font-sans font-medium">Sign up</div>
			</div>
		</Button>
	</div>
</form>
