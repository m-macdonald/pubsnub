<script>
	import { Button as ButtonPrimitive } from "bits-ui";
	import { buttonVariants } from "./index.js";
	import { cn } from "$lib/utils.js";
	let className = undefined;
	/**@type {"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | undefined}*/
	export let variant = "default";
	/**@type {"default" | "sm" | "lg" | "icon" | undefined}*/
	export let size = "default";
	/**@type {import('bits-ui').Builder[]}*/
	export let builders = [];
	export { className as class };
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</ButtonPrimitive.Root>
