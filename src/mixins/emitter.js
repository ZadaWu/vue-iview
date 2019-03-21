function broadcast(componentName, eventName, params) {
  this.$chidren.forEach(child => {
    const name = child.$options.name;

    if( name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName]).concat([params]);
    }
  });
}

export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while(parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }

      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
      // TODO 如果想让多个父级 甚至父级的兄弟元素也能够接受到这个时间
      // 这里需要用一个数组来保存符合条件的组件，并且遍历$emit调用
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
