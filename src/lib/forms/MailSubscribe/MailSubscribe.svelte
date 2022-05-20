<script lang="ts">
	import type { InferType, ValidationError } from 'yup';
	import TextField from '$lib/components/form/TextField.svelte';
	import { Button } from '$lib/components/nav';
	import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
	import { doc, setDoc } from 'firebase/firestore';
	import Fa from 'svelte-fa';
	import { values, schema } from './schema';
	import { onMount } from 'svelte';
	let errors = {
		email: ''
	};

	onMount(async () => {
		const { db } = await import('$lib/components/api/firebase/_firebase');

		const handleSubmit = async () => {
			try {
				const validatedValues = await schema.validate(values, { abortEarly: false });
				await setDoc(doc(db, 'EmailList', ''), { email: validatedValues.email });
				errors = { email: '' };
			} catch (err: any) {
				const error = err as ValidationError;
				errors = error.inner.reduce((acc, err) => {
					if (error.path) {
						return { ...acc, [error.path]: error.message };
					}
					return { ...acc };
				}, {});
			}
		};
	});
</script>

<form method="POST" class=" flex flex-col" on:submit|preventDefault={handleSubmit}>
	<TextField bind:field={values.email} bind:error={errors.email} type="email">
		<Fa slot="icon" icon={faEnvelope} primaryColor="gray" secondaryColor="white" />
	</TextField>
	<div class="lg:mx-auto lg:w-1/2">
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
