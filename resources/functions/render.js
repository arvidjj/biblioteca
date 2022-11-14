
export default function render(render, component) {
    component.innerHTML = ``;
    component.appendChild(render);
}