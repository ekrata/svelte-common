<script lang="ts">
  import type { InferType, ValidationError } from 'yup';
  import {
    GoogleAuthProvider,
    GithubAuthProvider,
    EmailAuthProvider,
    getAuth,
    signInWithCredential,
    AuthCredential,
  } from 'firebase/auth';
  import { blur } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { Chasing } from 'svelte-loading-spinners';
  import Logo from '$lib/icons/logo.png';
  import { values, schema } from './schema';
  import ui from '../_firebase';
  import TextField from '$lib/components/form/TextField.svelte';
  import Email from '$lib/components/svgs/Email.svelte';
  import Button from '$lib/components/nav/Button.svelte';
  import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa/src/fa.svelte';

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
        },
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
          fullLabel: 'Sign up with Google',
          customParameters: {
            // Forces account selection even when one account
            // is available.
            prompt: 'select_account',
          },
        },
        {
          provider: GithubAuthProvider.PROVIDER_ID,
          scopes: 'read:user, user:email',
          fullLabel: 'Sign up with Github',
        },
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>',
      // Privacy policy url.
      privacyPolicyUrl: '<your-privacy-policy-url>',
    };
    ui.start('#firebaseui-auth-container', uiConfig);
  });
  let errors: any = {
    email: '',
    password: '',
    confirmPassword: '',
    inboundAvenue: '',
    marketingOptIn: false,
  };

  const handleSubmit = async () => {
    try {
      const user = await schema.validate(values, { abortEarly: false });
      type User = InferType<typeof schema>;
      errors = {};
      const submit = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
        }),
      });
      const data = await submit.json();
      console.log(data);
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

  let showForm = false;
</script>

<!-- The surrounding HTML is left untouched by FirebaseUI.
     Your app may use that space for branding, controls and other customizations.-->
<title>Signup</title>
<div
  class="mx-auto flex flex-col place-items-center content-center gap-y-10 rounded-2xl bg-slate-900/75 p-10 font-sans backdrop-blur-2xl lg:w-1/2"
>
  <img src={Logo} alt="logo" width={100} />
  <div class="flex flex-col gap-y-4">
    <div class="text-center text-5xl text-zinc-100">It all starts here..</div>
    <div class="text-center text-xl text-zinc-200">
      Get access to thousands of monthly fixtures and much, much more.
    </div>
    {#if !showForm}
      <div on:click={() => (showForm = true)} class="lg:mx-auto lg:w-1/2">
        <Button toggle alternate>
          <div slot="text" class="zinc-200 align-center text-normal flex gap-x-4 py-1">
            <Fa
              icon={faEnvelope}
              secondaryOpacity={1}
              size="lg"
              primaryColor="white"
              secondaryColor="white"
            />
            <div class="inline font-sans font-medium">Sign up with Email</div>
          </div>
        </Button>
      </div>
    {:else}
      <form
        method="POST"
        class="text-normal flex flex-col"
        on:submit|preventDefault={handleSubmit}
        in:blur={{ duration: 500, delay: 0, amount: 100 }}
      >
        <TextField bind:field={values.email} bind:error={errors.email} type="email" label="Email">
          <Fa slot="icon" icon={faEnvelope} primaryColor="gray" secondaryColor="white" />
        </TextField>
        <TextField
          bind:field={values.password}
          bind:error={errors.password}
          label="Password"
          type="password"
        >
          <Fa
            slot="icon"
            icon={faKey}
            secondaryOpacity={1}
            primaryColor="gray"
            secondaryColor="white"
          />
        </TextField>
        <TextField
          bind:field={values.confirmPassword}
          bind:error={errors.confirmPassword}
          label="Confirm Password"
          type="password"
        >
          <Fa
            slot="icon"
            icon={faKey}
            secondaryOpacity={1}
            primaryColor="gray"
            secondaryColor="white"
          />
        </TextField>

        <div on:click={() => (showForm = true)} class="lg:mx-auto lg:w-1/2 mt-10">
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
    {/if}
    <div class="relative flex items-center">
      <div class="flex-grow border-t-2 border-zinc-200" />
      <span class="mx-4 flex-shrink text-2xl text-zinc-200">Or..</span>
      <div class="flex-grow border-t-2 border-zinc-200" />
    </div>
    <div id="firebaseui-auth-container" class="h-full w-full " />
    {#if loadingFirebaseAuth}
      <div id="loader">
        <Chasing size="60" color="#FFFF" unit="px" duration="2s" />
      </div>
    {/if}
  </div>
</div>

<!-- <div class="input flex flex-col">
      <label for="email">Email</label>
      <input id="email" name="email" type="text" />
      {#if errors.email}
        <span class="error">{errors.email}</span>
      {/if}
    </div>
    <div class="input flex flex-col">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" bind:value={values.password} />
      {#if errors.password}
        <span class="error">{errors.password}</span>
      {/if}
    </div>
    <div class="input flex flex-col">
      <label for="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="text"
        bind:value={values.confirmPassword}
      />
      {#if errors.confirmPassword}
        <span class="error">{errors.confirmPassword}</span>
      {/if}
    </div>
    <div class="input flex flex-col">
      <label for="referers">How did you hear about us?</label>
      <select id="referers" name="referers" bind:value={values.inboundAvenue}>
        <option hidden disabled selected value />
        <option value="Blog">Blog</option>
        <option value="Internet Ad">Internet Ad</option>
        <option value="Search engine">Search engine</option>
        <option value="Social media">Social media</option>
        <option value="Comparison/Product review site">Comparison/Product review site</option>
        <option value="Referral">Referral</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div class="checklist">
      <ul>
        <li>
          <input
            id="m1"
            type="checkbox"
            name="marketingOptIn"
            bind:value={values.marketingOptOut}
          />
          <label for="m1">Opt-in</label>
        </li>
      </ul>
    </div>
    <!--  -->
<style>
  /* .firebaseui-title {
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

  :global(.firebaseui-container) {
    background-color: 'transparent';
  }
  :global(.mdl-card) {
    background-color: 'transparent';
  } */
</style>
