import AboutView from '@/views/AboutView.vue';
import { mount, shallowMount } from '@vue/test-utils';
import { describe, test, expect, toContain } from "vitest";

describe('AboutView.vue', () => {
  test('renders inner text', () => {
    const wrapper = shallowMount(AboutView);
    // const wrapper = mount(AboutView);
    // const wrapper = mount(AboutView, { shallow: true });

    expect(wrapper.text()).toContain('about');
  })
});

// shallowMount loads only one level of children in a component
// shallowMount is much faster and efficient
// mount loads all the children