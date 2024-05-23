<script setup lang="ts">
onMounted(() => {
  const createEl = document.getElementById('create')

  if (createEl) {
    createEl.onclick = () => {
      const textbox = document.getElementById('count') as HTMLInputElement
      const count = Number.parseInt(textbox?.value ?? 0, 10)
      parent.postMessage(
        { pluginMessage: { type: 'create-rectangles', count } },
        '*',
      )
    }
  }

  const cancelEl = document.getElementById('cancel')
  if (cancelEl) {
    cancelEl.onclick = () => {
      parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
    }
  }
})
</script>

<template>
  <h2 text-red>
    Rectangle Creator
  </h2>
  <p>Count: <input id="count" value="5"></p>
  <button id="create">
    Create
  </button>
  <button id="cancel">
    Cancel
  </button>
</template>

<style scoped>

</style>
