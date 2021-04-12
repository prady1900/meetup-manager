<template>
<v-alert
  dismissible
  type="error"
>
{{text}}
</v-alert>
</template>

<script>
export default {
    props:['text'],
}
</script>