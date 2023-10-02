import { For } from "solid-js"

export default function () {
    return(<div class="flex justify-center"><div class="grid grid-cols-7">
    <For each={Array.from(Array(6).keys())}>{(row: Number) => {
        return (<For each={Array.from(Array(7).keys())}>{(column)=> {
            return(<div class=" m-14">{String(row) + String(column)}</div>)
        }}</For>)

    }}</For></div></div>)
}