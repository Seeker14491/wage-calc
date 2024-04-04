import { TbMoon, TbSun } from "solid-icons/tb";
import { Component } from "solid-js";

const ThemeToggle: Component<{
  darkMode: () => boolean;
  setDarkMode: (_: boolean) => void;
}> = (props) => (
  <label class="flex cursor-pointer gap-2">
    <TbSun class="size-5" />
    <input
      type="checkbox"
      class="theme-controller toggle"
      value="dark"
      checked={props.darkMode()}
      onChange={(ev) => props.setDarkMode(ev.currentTarget.checked)}
    />
    <TbMoon class="size-5" />
  </label>
);

export default ThemeToggle;
