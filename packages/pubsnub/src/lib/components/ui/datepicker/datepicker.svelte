<script>
	import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
    import Button from "../button/button.svelte";
    import * as Popover from "../popover";
	import { cn } from "$lib/utils";
	import Calendar from "../calendar/calendar.svelte";
    import CalendarIcon from 'lucide-svelte/icons/calendar';

    const df = new DateFormatter('en-US', {
        dateStyle: 'long'
    });

    /**@typedef {Object} Props
     * @property {import('@internationalized/date').DateValue} value
     * @property {(value: import('@internationalized/date').DateValue) => void} onValueChange
     */
    /**@type {Props} */
    let { value = $bindable(), onValueChange = $bindable() } = $props();
</script>

<Popover.Root openFocus>
    <Popover.Trigger asChild let:builder>
        <Button variant="outline"
        class={cn( 
            'w-[280px] justify-start pl-4 text-left font-normal', 
            !value && 'text-muted-foreground'
        )}
        builders={[builder]}>
            {value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
            <CalendarIcon class="ml-auto h-4 w-4 opacity-50"/>
        </Button>
    </Popover.Trigger>
    <Popover.Content class="p-auto p-0">
        <Calendar {value} {onValueChange} initialFocus preventDeselect />
    </Popover.Content>
</Popover.Root>