<script lang="ts">
	import ui from '../_firebase';
	import {
		GoogleAuthProvider,
		GithubAuthProvider,
		EmailAuthProvider,
		getAuth,
		signInWithCredential,
		AuthCredential
	} from 'firebase/auth';
	import { onMount } from 'svelte';
	import { Chasing } from 'svelte-loading-spinners';
	import Logo from '$lib/icons/logo.png';

	let loadingFirebaseAuth = true;
	onMount(() => {
		var uiConfig = {
			callbacks: {
				signInSuccessWithAuthResult: function (authResult: any, redirectUrl: any) {
					// User successfully signed in.
					// Return type determines whether we continue the redirect automatically
					// or whether we leave that to developer to handle.
					return true;
				},
				uiShown: function () {
					// The widget is rendered.
					// Hide the loader.
					loadingFirebaseAuth = false;
				},
				// signInFailure callback must be provided to handle merge conflicts which
				// occur when an existing credential is linked to an anonymous user.
				signInFailure: function (error: { code: string; credential: AuthCredential }) {
					// For merge conflicts, the error.code will be
					// 'firebaseui/anonymous-upgrade-merge-conflict'.
					if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
						return Promise.resolve();
					}
					// The credential the user tried to sign in with.
					var cred = error.credential;
					// Copy data from anonymous user to permanent user and delete anonymous
					// user.
					// ...
					// Finish sign-in after data is copied.
					signInWithCredential(getAuth(), cred);
				}
			},
			// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
			autoUpgradeAnonymousUsers: true,
			signInFlow: 'popup',
			signInSuccessUrl: '/dash',
			signInOptions: [
				// Leave the lines as is for the providers you want to offer your users.
				{
					provider: GoogleAuthProvider.PROVIDER_ID,
					scopes: 'userinfo.profile',
					customParameters: {
						// Forces account selection even when one account
						// is available.
						prompt: 'select_account'
					}
				},
				{ provider: GithubAuthProvider.PROVIDER_ID, scopes: 'read:user, user:email' },
				EmailAuthProvider.PROVIDER_ID
			],
			// Terms of service url.
			tosUrl: '<your-tos-url>',
			// Privacy policy url.
			privacyPolicyUrl: '<your-privacy-policy-url>'
		};
		ui.start('#firebaseui-auth-container', uiConfig);
	});
</script>

<!-- The surrounding HTML is left untouched by FirebaseUI.
     Your app may use that space for branding, controls and other customizations.-->
<title>Login</title>
<div
	class="mx-auto flex flex-col place-items-center content-center gap-y-10 rounded-2xl bg-gray-900/75 p-10 backdrop-blur-2xl lg:w-1/2"
>
	<img src={Logo} alt="logo" width={100} />
	<div class="text-center text-5xl text-zinc-100">Dashboard Login</div>

	<div id="firebaseui-auth-container" class="bg-gray-900" />
	{#if loadingFirebaseAuth}
		<div id="loader">
			<Chasing size="60" color="#FFFF" unit="px" duration="2s" />
		</div>
	{/if}
</div>

<style>
	.firebaseui-title {
		display: none;
	}
	.firebaseui-card-header {
		padding-bottom: 16px;
	}
	span.firebaseui-idp-text.firebaseui-idp-text-long {
		content: 'Sign up with email';
		color: rgba(0, 0, 0, 0.87);
		direction: ltr;
		font-size: 20px;
		font-weight: 500;
		line-height: 24px;
		margin: 0;
		padding: 0;
		padding-bottom: 0px;
		text-align: left;
	}
</style>
