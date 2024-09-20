<script>
	import SuperDebug, { superForm, dateProxy, formFieldProxy } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema } from './schema';
    import { Form } from '$lib/components/ui/form';
	import Datepicker from '$lib/components/ui/datepicker/datepicker.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { parseAbsolute, toCalendarDateTime, getLocalTimeZone } from '@internationalized/date';

    /**@typedef {Object} Props
     * @property {import('./$types').PageData} data
    */

    /**@type {Props}*/
    let { data } = $props();

    const superform = superForm(data.form, {
        validators: zodClient(formSchema),
        taintedMessage: null,
        onUpdated: ({form: f}) => {
            if (f.valid) {
                console.log('valid form');
            } else {
                console.log('invalid')
            }
        }
    });

    const { form: formData, enhance } = superform;

    const date = $derived(parseAbsolute($formData.date, getLocalTimeZone()));
    //const { dateValue, dateErrors, dateConstraints } = formFieldProxy(superform, 'date');
</script>

<SuperDebug data={$formData}/>
<h1>Did you get snubbed?</h1>
<form method="post" use:enhance>
    <Form.Field form={superform} name="date">
        <Form.Control let:attrs>
            <Form.Label>Date</Form.Label>
            <Datepicker {...attrs} value={date} onValueChange={val => $formData.date = val.toDate('UTC').toISOString()} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={superform} name="snubbedInd">
        <Form.Control let:attrs>
            <Form.Label>Was I Snubbed?</Form.Label>
            <Switch {...attrs} bind:checked={$formData.snubbedInd} includeInput/>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field form={superform} name="comment">
        <Form.Control let:attrs>
            <Form.Label>Comment</Form.Label>
            <Textarea {...attrs} bind:value={$formData.comment} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Submit</Form.Button>
</form>