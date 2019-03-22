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

// 向上找到最近的指定组件——findComponentUpward
function findComponentUpward (context, componentName) {
  let parent = this.$parent;
  let name = parent.$options.name;

  while(parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }

  return parent;
}

// 向上找到所有的指定组件-findComponentUpward
 function findComponentsUpward (context, componentName) {
  let parents = [];
  const parent = context.$parent;

  if (parent) {
    if(parent.$options.name === componentName) {
      parents.push(parent);
    }
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
 }

 // 向下找到最近的指定组件 -- findComponentDownward
 function findComponentDownward (context, componentName) {
   let chidrens = context.$chidren;
   let chidren = null;

   if (chidrens.length) {
      for (const child of children) {
        const name = child.$options.name;

        if (name === componentName) {
          children = child;
          break;
        } else {
          findComponentDownward(child, componentName);
          if (children) break;
        }
      }
   }
   return children;
 }

 //向下找到所有指定的组件——findComponentsDownward
function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}

// 找到指定组件的兄弟组件——findBrothersComponents
function findBrothersComponents (context, componentName, exceptMe = true) {
  let res =context.$parent.$children.filter(item => {
     return item.$options.name === componentName;
  });
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

export {findComponentUpward, findComponentsUpward, findComponentDownward, findComponentsDownward, findBrothersComponents};

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
