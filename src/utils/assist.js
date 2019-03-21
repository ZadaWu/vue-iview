import Vue from 'vue';

export function oneOf(value, validlist) {
  return (validlist.filter(item => item === value) || []).length > 0;
}