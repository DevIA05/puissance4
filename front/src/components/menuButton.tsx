type MenuButtonProps = {
    title: string
}

export default function (props: MenuButtonProps) {
    return (
        <div class="mx-5">
            <div class="text-center h-fit">{props.title}</div>
        </div>
    )
}