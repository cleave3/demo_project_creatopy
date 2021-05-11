interface IItem {
    id: number
    title: string
    creator: { name: string }
}

type ItemState = {
    submitting: boolean,
    removing: boolean,
    loading: boolean
    items: IItem[]
}

type ItemAction = {
    type: string
    items: IItem
}

type UserState = {
    loading: boolean
    auth: boolean
    name: string
    token: string
}

type AppState = {
    user: UserState
    items: ItemState
}

type DispatchType = (args: ItemAction) => ItemAction