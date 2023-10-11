import AboutView from '@/views/About.vue';
import { mount } from '@vue/test-utils';
import { describe, test, expect, toBe } from "vitest";

describe('AboutView.vue', () => {
  test('renders inner text', () => {
    const wrapper = mount(AboutView);
  })
});