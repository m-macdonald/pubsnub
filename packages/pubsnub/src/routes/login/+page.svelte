<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { Form } from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema } from './schema.js';

    /**@type {import('./$types').PageData}*/
    export let data;

    const form = superForm(data.form, {
        validators: zodClient(formSchema)
    });

    const { form: formData, enhance } = form;
</script>

<form method="post" use:enhance>
    <Form.Field {form} name="username">
        <Form.Control let:attrs>
            <Form.Label>Username</Form.Label>
            <Input {...attrs} bind:value={$formData.username}/>
        </Form.Control>
    </Form.Field>
    <Form.Field {form} name="password">
        <Form.Control let:attrs>
            <Form.Label>Password</Form.Label>
            <Input {...attrs} type="password" bind:value={$formData.password}/>
        </Form.Control>
    </Form.Field>
    <Form.Button>Button</Form.Button>
</form>
