<template>
    <div id="app">
        <Clock></Clock>
    </div>
</template>

<script>
    import Clock from "@/components/Clock";

    export default {
        name: 'App',
        components: {
            Clock,
        }
    }
</script>

<style>

    body {
        background-color: #2c3e50;
    }

    #app {
        font-family: Blippo, fantasy;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
