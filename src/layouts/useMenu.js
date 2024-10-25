export function useMenu (components, props) {
  const currentGroup = computed(() => {
    return components.value.find((value) => value.component.__name === props.current)
  })
  const currentComponent = computed(() => {
    return currentGroup.value?.component ?? {}
  })
  const currentProps = computed(() => {
    return currentGroup.value?.props ?? {}
  })

  return {
    currentComponent,
    currentProps
  }
}
