<script>
    /**@type {import('./$types').PageData}*/
    export let data;
</script>

<h1>User id is {data.user?.id}</h1>

<!-- This is probably not needed -->
<form method="post">
    <button>Sign Out</button>
</form>