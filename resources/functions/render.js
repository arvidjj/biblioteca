
export default function render(render, component) {
    component.innerHTML = ``;
    component.appendChild(render);
}

function toggleComponent(main) {
    main.classList.toggle('inactive');
}

export { render, toggleComponent }