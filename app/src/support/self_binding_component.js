import React, { Component } from 'react';

const baseMethodNames = [
  'getInitialState',
  'getDefaultProps',
  'componentWillMount',
  'componentWillReceiveProps',
  'componentWillUnmount',
  '_parseData',
  '_onSelect',
  'render'
];

class SelfBindingComponentClass extends Component {
  constructor(props) {
    super(props);

    const properties = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    for (var i = 0; i < properties.length; i++) {
      let name = properties[i];
      let method = this[name];

      if (!(method instanceof Function))
        continue;

      // bind away
      this[name] = this[name].bind(this);
    }
  }
}

export const SelfBindingComponent = SelfBindingComponentClass;
