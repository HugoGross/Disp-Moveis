import {
    defineAsyncComponent,
    onMounted,
    onUnmounted,
    ref,
    shallowRef,
  } from 'vue';
  
  export function useMonitor() {
    const breakpoint = ref('sm');
    const menu = shallowRef(
      defineAsyncComponent(() => import('../components/menusuperior/MenuSuperiorXs.vue')),
    );
  
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 576) {
        breakpoint.value = 'xs';
        menu.value = defineAsyncComponent(() =>
          import('../components/menusuperior/MenuSuperiorXs.vue'),
        );
      } else if (width < 768) {
        breakpoint.value = 'sm';
        menu.value = defineAsyncComponent(() =>
          import('../components/menusuperior/MenuSuperiorSm.vue'),
        );
      } else if (width < 992) {
        breakpoint.value = 'md';
        menu.value = defineAsyncComponent(() =>
          import('../components/menusuperior/MenuSuperiorMd.vue'),
        );
      } else if (width < 1200) {
        breakpoint.value = 'lg';
        menu.value = defineAsyncComponent(() =>
          import('../components/menusuperior/MenuSuperiorLg.vue'),
        );
      } else {
        breakpoint.value = 'xl';
        menu.value = defineAsyncComponent(() =>
          import('../components/menusuperior/MenuSuperiorXl.vue'),
        );
      }
    };
  
    onMounted(() => {
      updateBreakpoint();
      window.addEventListener('resize', updateBreakpoint);
    });
  
    onUnmounted(() => {
      window.removeEventListener('resize', updateBreakpoint);
    });
  
    return {
      breakpoint,
      menu,
    };
  }